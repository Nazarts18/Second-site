
// Prebid-header JS generator v4.6.0 - SimpleAds integration
var pbjs = pbjs || {};
pbjs.que = pbjs.que || [];

var googletag_ref;

var PREBID_TIMEOUT = 2000;
var FAILSAFE_TIMEOUT = 3000;


// UAM vars
// load the apstag.js library
!function(a9,a,p,s,t,A,g){if(a[a9])return;function q(c,r){a[a9]._Q.push([c,r])}a[a9]={init:function(){q("i",arguments)},fetchBids:function(){q("f",arguments)},setDisplayBids:function(){},targetingKeys:function(){return[]},_Q:[]};A=p.createElement(s);A.async=!0;A.src=t;g=p.getElementsByTagName(s)[0];g.parentNode.insertBefore(A,g)}("apstag",window,document,"script","//c.amazon-adsystem.com/aax2/apstag.js");
// initialize the apstag.js library on the page to allow bidding
apstag.init({
    pubID: '4d82ee98-0c5b-4c96-a74c-68b0a5395433', //enter your pub ID here as shown above, it must within quotes
    adServer: 'googletag'

    ,schain: {
      complete: 1,
      ver: '1.0',
      nodes: [
  {
    "asi":"next14.com",
    "sid":"23554",
    "hp":1
  }
]

    }    

});
var adsSlots;



function printSlots() {
	
}

function zdk_isMobile() {
	return (screen.width <= 1024);
}

function zdkFindCMP() {
    var curr = null;
    var i=0;
    do {
    	try {
    		i++;
        	if (curr == null) curr =  window;
        	else curr = curr.parent;
        	if (typeof curr.__tcfapi  === 'function') return true;
    	} catch(err) {
    		
    	}
    } while (curr !== window.top && i<20); //avoid infinite loop
    return false;
}


/* returns [adUnits, adsSlots] */
function aplus_buildAdUnits(googletag) {
	var slots = new Array();

	// parse google slots definition
	var g_slots = googletag.pubads().getSlots()
	for (s in g_slots) {
		var slot = g_slots[s];
		var sizes = new Array();
		for (z in slot.getSizes()) {
			var size = slot.getSizes()[z];
			sizes.push(new Array(size.l,size.j));
		}
		slots.push({"slot":slot.getAdUnitPath(),"div":slot.getSlotElementId(),"sizes":sizes});
	}

	// generate the adunits & adsSlots
	var adUnits = new Array();
	var adsSlots = new Array();
	for (s in slots) {
		var googleSlot = slots[s];
		var aplus_slot_found = aplus_slots.filter(function(el){
			return (el.slot==googleSlot.slot);
		});
		if (!aplus_slot_found || aplus_slot_found.length<1) {
			
			continue;
		}
		var pl_id = (zdk_isMobile())?aplus_slot_found[0].plm:aplus_slot_found[0].pld;
		var aplus_placement_found = aplus_placements.filter(function(el){
			return (el.pl==pl_id);
		});
		if (!aplus_placement_found || aplus_placement_found.length<1) {
			
			continue;
		}
		//console.log("found ["+JSON.stringify(aplus_slot_found[0])+"] -> "+JSON.stringify(aplus_placement_found[0]));
		adUnits.push({
			code: googleSlot.slot,
			mediaTypes: {
				banner: {
					sizes: aplus_placement_found[0].sizes
				}
			},
			bids: aplus_placement_found[0].bids
		});
		adsSlots.push({
			slotID: googleSlot.div,
			slotName: googleSlot.slot,
			sizes: aplus_placement_found[0].sizes
		});
	}
	//console.log("--- slots recreated:");
	//console.log(adUnits);
	//console.log(adsSlots);

	return [adUnits,adsSlots];
}

const zCallback = (tcData, success) => {
    //console.log("__tcfapi ST: "+tcData.eventStatus);
    if (success && (tcData.eventStatus === 'tcloaded' || tcData.eventStatus === 'useractioncomplete')) {
		
		zEngineStart();
        // remove the ourself to not get called more than once
        __tcfapi('removeEventListener', 2, (success) => {}, tcData.listenerId);
    } else {
        //console.log("__tcfapi ??");
    }
}

// ***** parallel UAM+criteo+pbjs *****
// config/sync object
window.hb_status = {
    n_adserver_callback: [],
    adserverRequestSent: false, // true once everything has been completed
    prebidTargetingSet: false
};
//if i don't have criteo / uam integration, just set them already done
window.hb_status.n_adserver_callback.push("criteo");


function zEngineStart() {
	pbjs.que.push(function() {
		
	
		// <invoke all bidders (and set timeout)>
		
		// ===== APS request
		
		apstag.fetchBids({
			slots: adsSlots,
			timeout: PREBID_TIMEOUT
			},function(bids) {
				
				adServerCallback('aps');
			});
		
	
		// ===== Prebid callback
		
		pbjs.requestBids({
			bidsBackHandler: function() {
				
				adServerCallback('prebid');
			},
			timeout: PREBID_TIMEOUT
		});
	
		// ===== Safety timeout 
		
		setTimeout(function() {
			adServerCallback('timeout');
		}, FAILSAFE_TIMEOUT);
		// </invoke all bidders (and set timeout)>
	});
	
	
		
		
	
}


// ===== Combined callback (this callback will be called by Prebid, Criteo, or timeout)  
function adServerCallback(source) {
    
    if (window.hb_status.adserverRequestSent) return;
    // add source to the processed list
    window.hb_status.n_adserver_callback.push(source); // add this source as "bidderDone"
    if (source == 'aps') {
        googletag.cmd.push(function() {
            
            apstag.setDisplayBids();
        });
    } else if (source == 'prebid') {
        // got prebid config request
        googletag.cmd.push(function() {
            pbjs.que.push(function() {
                
                pbjs.setTargetingForGPTAsync(); // configure targeting for prebid
                window.hb_status.prebidTargetingSet = true;
            });
        });
    } else if (source == 'criteo') {
        // got criteo config request
        googletag.cmd.push(function() {
            
            Criteo.SetDFPKeyValueTargeting(); // This will append Criteo keywords to the adserver call
        });
    }
  
    // check if i've completed
    if (window.hb_status.n_adserver_callback.length >= 3) {
        // if all bids have been completed googletag.pubads().refresh();
        window.hb_status.adserverRequestSent = true;

        googletag.cmd.push(function() {
            
            
            googletag.pubads().refresh(); // this will will trigger the adserver calls
        });
    } else if ("timeout" == source) {
        // got timeout (one of prebid or criteo or aps didn't finish in time)
        window.hb_status.adserverRequestSent = true;
        
        googletag.cmd.push(function() {
            // pbjs.setTargetingForGPTAsync(); MUST be done ANYWAY before googletag.pubads().refresh();
            if (!window.hb_status.prebidTargetingSet) {
                pbjs.que.push(function() {
                    
                    pbjs.setTargetingForGPTAsync(); // configure targeting for prebid
                });
            }
            
            
            googletag.pubads().refresh(); // this will will trigger the adserver calls
        });
    };
}

//called by the html page just before "googletag.enableServices()" and after googletag.defineSlot(...)s
function oz_config(googletag) {
	googletag_ref = googletag;
	googletag_ref.pubads().disableInitialLoad();
	googletag_ref.pubads().enableSingleRequest();

	adUnits_adsSlots = aplus_buildAdUnits(googletag_ref);
	adUnits = adUnits_adsSlots[0];
	adsSlots = adUnits_adsSlots[1];

	

	pbjs.que.push(function() { // pbjs 1/2 (cfg)
		configurePBJS();
		bidderSettingsPBJS();
		// pbjs.destroyAdUnits(); - may be needed for single page applications
		pbjs.addAdUnits(adUnits);
		
	});

	// check whether start the engine or wait for CMP approval/refuse
    if (zdkFindCMP()) {
        
        __tcfapi('addEventListener', 2, zCallback);
        //zEngineStart() will be called after CMP approval/refusal
    } else {
        
        zEngineStart();
    }
    
    //it should be done into the publisher's page just after this line, but better twice that none
    googletag_ref.enableServices();
}



// NOCMP based on CMP in page detection + userSync iframe enabled with filters
function configurePBJS() {
	//console.log("configuring pbjs");

	/* pbjsConfig */
	pbjs.setConfig({
		/*userSync: {
			iframeEnabled: true
		},*/
	    userSync: {
	        filterSettings: {
	            iframe: {
	                bidders: '*',   // '*' means all bidders
	                filter: 'include'
	            }
	        }
	    },
		priceGranularity: "dense",
		currency: {
			// enables currency feature
			"adServerCurrency": "EUR",
			//"granularityMultiplier": 1, // 0.50 increment up to 5 is fine for GBP... what is that?!?!
			// until bidder adapters are updated to define the bid currency
			// the system assumes bids are in USD. This can be overridden, for instance:
			"bidderCurrencyDefault": { "openx": "EUR" },
			"conversionRateFile": "//currency.prebid.org/latest.json" // prebid's lib bug fix - this way allows both http and https
		},
		consentManagement: {
			gdpr: {
				cmpApi: 'iab',
				timeout: 8000,
				allowAuctionWithoutConsent: true,
				defaultGdprScope: true
			}
		},
		improvedigital: {
			usePrebidSizes: true
		},
		//rubicon new config: Single-Request optimization
		rubicon: {singleRequest: true}
	});

	pbjs.setConfig({
		"schain": {
			"validation": "strict",
			"config": {
				"ver":"1.0",
				"complete": 1,
				"nodes": [
  {
    "asi":"next14.com",
    "sid":"23554",
    "hp":1
  }
]

			}
		}
	});

	if (!zdkFindCMP()) {
		// no CMP inside the publiser's page. set "NOCMP" parameters overriding consentManagement
		
		pbjs.setConfig({
		  consentManagement: {
		    gdpr: {
		      cmpApi: 'static',
		      consentData: {
		        getConsentData: {
		          'gdprApplies': false
		        }
		      }
		    }
		  }
		});
	} else {
		
	}
	/* /pbjsConfig */
}

function bidderSettingsPBJS() {
	//console.log("bidderSettings pbjs");
	
	//ssps price adjustment
	pbjs.bidderSettings = {
		/*appnexus: {
			bidCpmAdjustment : function(bidCpm){	    		
			// bidCpm = bidCpm * 1.0;	    		
			return bidCpm;
			}
		},*/
		rubicon: {
			bidCpmAdjustment : function(bidCpm){	    		
			bidCpm = bidCpm * 0.90;
			return bidCpm;
			}
		},
		/*openx: {
			bidCpmAdjustment : function(bidCpm){	    		
			// bidCpm = bidCpm * 1.0;	    		
			return bidCpm;
			}
		},*/
		adform: {
			bidCpmAdjustment : function(bidCpm){
			bidCpm = bidCpm * 0.90;
			return bidCpm;
			}
		},
		pubmatic: {
			bidCpmAdjustment : function(bidCpm){
			bidCpm = bidCpm * 0.92;
			return bidCpm;
			}
		},
		aol: {
			bidCpmAdjustment : function(bidCpm){
			bidCpm = bidCpm * 0.89;
			return bidCpm;
			}
		},
	    adasta: {
	    	  bidCpmAdjustment : function(bidCpm){
	    		bidCpm = bidCpm * 0.7;
	    		return bidCpm;
	    	}
	    }
	};
}

/* this will be different for each publisher/site */
var aplus_slots = [
{slot:"/57491254/ilsole24ore.com/italia_mondo/ros/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/mercati/ros/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/economia/ros/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/video/ros/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/finanza/ros/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/norme_tributi/ros/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/motori/ros/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/commenti/ros/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/salute/ros/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/finanza/homepage/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/tecnologia/ros/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/management/ros/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/italia_mondo/homepage/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/sport/ros/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/moda/ros/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/food/ros/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/risparmio/ros/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/casa/ros/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/PNRR_2022_Superdossier/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/scuola24/ros/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/cultura/ros/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/sostenibilita/ros/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/economia/homepage/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/viaggi/ros/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/arteconomy/ros/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/norme_tributi/homepage/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/mercati/fondi_etf/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/motori/homepage/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/risparmio/homepage/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/casa/homepage/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/tecnologia/homepage/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/dossier_ebook/homepage/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/moda/homepage/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/cultura/homepage/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/food/homepage/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/salute/homepage/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/management/homepage/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/arteconomy/homepage/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/viaggi/homepage/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/scuola24/homepage/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/commenti/homepage/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Intesa_San_Paolo_2021_Dossier_Viaggio_ITS/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/il_magazine/homepage/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/video/homepage/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/sostenibilita/homepage/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/24plus/homepage/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/il_magazine/ros/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/sport/homepage/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/2021_Expo_Dubai/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/dossier_young_finance_2021/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Volkswagen_2020_Rapporto_Flotte/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Eni_2021_Super_dossier/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Enel_2021_Superdossier/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/ESOSPHERA_2019_Dossier_Leader_della_Crescita/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/ServiceNow_2021_Dossier_Lavoro_Ibrido/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Enel_2020_Dossier_Cashback/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Reekeep_2021/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Teatro_Regio_2021/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Leonardo_2021_Filiera_Digitalizzazione/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Open_Fiber_2021_Banda_Larga/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Volkswagen_2021_Speciale_Flotte_Nov/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Snam_2022_Energetica_Residenziale/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/TELECOM_2019_Educazione_Digitale_5G/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Terna_2019_Dorsi_Locali_SO-82230/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Renault_2019_Rapporto_Motori_Dicembre/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/BMW_2019_Speciale_Eicma/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Vodafone_2020_Digitalizzazione_Grandi_Imprese/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Terna_2019_Rapporto_Nordest/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/dossier_leonardo_2021/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Eni_2020_Decarbonizzazione_Smart_Home/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/MSeventy_2020_Speciale_Moda/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/default_dossier/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/elezioni_regionali_2020/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Lavazza_2020_Progetto_1895/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/AEROPORTI_DI_ROMA_2019_Dossier_Sostenibilita_Aereoporti_piu_green/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/ENI_2019_Native_Industry/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Micro_Trend_2019_Mondo_Digitale/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Vodafone_2020_Rapporto_Economia_Digitale/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/buccellati_2021_speciale_gioielli/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/premio_campiello/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/ACEA_2019_Dossier_Sviluppo_Sostenibile/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/ENI_2019_Native_Smart_Working/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Unicredit_2019_confirming/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Volkswagen_2020_Confindustria_Evento_Veneto/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/accenture_2022_speciale_filiereproduttive/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/homepage/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/ros/Sidetoside",plm:94704,pld:94699},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Qualita_della_vita_2019/homepage/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Qualita_della_vita_2019/ros/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/mercati/ros/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/italia_mondo/ros/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/video/ros/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/lab24/speciale_coronavirus_2020/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/finanza/ros/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/mercati/homepage/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/lab24/speciale_vaccini_2021/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/argomenti/ros/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/economia/ros/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/finanza/homepage/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/infodata/ros/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/norme_tributi/ros/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Econopoly/Ros/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/italia_mondo/homepage/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/motori/ros/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/commenti/ros/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/risparmio/ros/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/salute/ros/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/tecnologia/ros/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/scuola24/ros/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/PNRR_2022_Superdossier/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/norme_tributi/homepage/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/lab24/calcolatore_assegno_unico_2022/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/consigli24/ros/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/cultura/ros/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/moda/ros/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/lab24/qualita_vita_2021/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/sport/ros/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/management/ros/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/economia/homepage/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/lab24/Speciale_Vaccini_2021_Analisi/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/mercati/fondi_etf/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/food/ros/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/casa/ros/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/arteconomy/ros/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/viaggi/ros/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/PNRR_2022_Superdossier/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/video/homepage/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/sostenibilita/ros/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/scuola24/homepage/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/lab24/database_universita_italiane/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/risparmio/homepage/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/lab24/indice_criminalita_2021/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/casa/homepage/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/tecnologia/homepage/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/management/homepage/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/infodata/homepage/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/cultura/homepage/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/motori/homepage/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/commenti/homepage/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/dossier_ebook/homepage/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/arteconomy/homepage/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/food/homepage/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/moda/homepage/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Intesa_San_Paolo_2021_Dossier_Viaggio_ITS/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/speciale_elezioni_2020/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/viaggi/homepage/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/salute/homepage/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/il_magazine/ros/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/lab24/speciale_coronavirus_2021/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Speciale_Dati_Elezioni_2021/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/2021_Expo_Dubai/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/dossier_young_finance_2021/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/sostenibilita/homepage/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/sport/homepage/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/mercati/ros/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Eni_2021_Super_dossier/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/consigli24/homepage/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/lab24/indice_sportivita_2021/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/lab24/SpecialeCop26/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/lab24/speciale_sanremo_2020/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Speciale_Sfilate_21/MPU_top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Piazza_Copernico_2020_Leader_Crescita/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Volkswagen_2020_Rapporto_Flotte/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/il_magazine/homepage/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Mercedes_2020_DOSSIER_Flotte_PMI/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Sisal_2020_Dossier_GoBeyond/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/lab24/speciale_coronavirus_2020/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/ServiceNow_2021_Dossier_Lavoro_Ibrido/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Reekeep_2021/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Leonardo_2021_Filiera_Digitalizzazione/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Aruba_2020_Dossier/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/ENI_2020_IDROGENO/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/meglio_questo_2022_diretta_evento/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Teatro_Regio_2021/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Dossier_Elezioni_2021/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/dossier_leonardo_2021/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/argomenti/ros/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Open_Fiber_2021_Banda_Larga/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/lab24/speciale_imprenditoria_femminile_2021/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/lab24/speciale_vaccini_2021/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Furla_Speciale_Moda_2020/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/ESOSPHERA_2019_Dossier_Leader_della_Crescita/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Guida_2020_Smart_Business/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Volkswagen_2019_Crescita_PMI/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Snam_2022_Energetica_Residenziale/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Enel_2020_Dossier_Cashback/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/BMW_2019_Speciale_Eicma/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Volkswagen_2021_Speciale_Flotte_Nov/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Enel_2021_Superdossier/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/MSeventy_2020_Speciale_Moda/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Nespresso_2020_Rapporto_Sviluppo_Sostenibile/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/TELECOM_2019_Educazione_Digitale_5G/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/UBS_2020_Rapporto_Private_Banking/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/infodata/ros/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Vodafone_2020_Rapporto_Economia_Digitale/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/elezioni_umbria_2019/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/FERROVIE_2020_TURISMO/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Renault_2019_Rapporto_Motori_Dicembre/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Renault_Koleos_Dossier_Francoforte/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Terna_2019_Dorsi_Locali_SO-82230/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Terna_2019_Rapporto_Nordest/MPU_top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/elezioni_calabria_2020/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/premio_campiello/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/telefisco_2022/homepage/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Vodafone_2020_Digitalizzazione_Grandi_Imprese/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/AEROPORTI_DI_ROMA_2019_Dossier_Sostenibilita_Aereoporti_piu_green/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/FFSS_2019_Rapporto_Turismo_Elite/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/ENI_2019_Native_Industry/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Agricoltura100/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Enel_2020_Speciale_Lab24/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/lab24/speciale_universitacattolica_2021/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Mercedes_2020_Flotte_PMI/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/ENI_2019_Native_Smart_Working/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Eni_2020_Decarbonizzazione_Smart_Home/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/IWBank_2019_Rapporto_Private_Banking/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Suzuki_2020_Ignis_Hybrid/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/telefisco_2022/ros/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/24plus/ros/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Credimi_2020_Rapporto_Economia_Digitale/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Micro_Trend_2019_Mondo_Digitale/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Unicredit_2019_confirming/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Volkswagen_2019_Corporate_Social/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/elezioni_regionali_2020/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Accenture_2020_Banking_Conference/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Lavazza_2020_Progetto_1895/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/CDP_2019_Economia_Giovani/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/lab24/calcolatore_assegno_unico_2022/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/CREDEM_LEASING_2019_Rapporto_Salone_Nautico/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Atlantia_2019_Assicurazioni_Telepass/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Azimut_2019_investimenti_economia_reale/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Econopoly/Ros/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/ENEL_2020_LO_SVILUPPO_DELLE_PMI/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/McDonald_2016_76599/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/buccellati_2021_speciale_gioielli/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Eni_2020_Supercalcolatore_HPC5/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/R1_2020_Progetto_Native/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/accenture_2022_speciale_filiereproduttive/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/consigli24/ros/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/lab24/qualita_vita_2021/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/ACEA_2019_Dossier_Sviluppo_Sostenibile/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Eni_2020_Dossier_Gas_Luce/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Illimity_Bank_2022_diretta_evento/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Poliform_2019_Branded_Content/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Volkswagen_2020_Confindustria_Evento_Veneto/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/commenti/ros/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/italia_mondo/ros/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/lab24/indice_criminalita_2021/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/homepage/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/ros/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/Meteo24/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/ros/MPU_Top",plm:94705,pld:94700},
{slot:"/57491254/ilsole24ore.com/italia_mondo/ros/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/lab24/speciale_coronavirus_2020/Mpu_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/lab24/speciale_vaccini_2021/Mpu_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/mercati/homepage/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/finanza/ros/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/mercati/ros/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/norme_tributi/ros/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/infodata/ros/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/finanza/homepage/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/italia_mondo/homepage/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/tecnologia/ros/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/motori/ros/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/commenti/ros/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/consigli24/ros/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/norme_tributi/homepage/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/moda/ros/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/food/ros/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/lab24/calcolatore_assegno_unico_2022/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/cultura/ros/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/casa/ros/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/salute/ros/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/lab24/Speciale_Vaccini_2021_Analisi/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/scuola24/ros/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/PNRR_2022_Superdossier/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/sport/ros/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/risparmio/ros/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/arteconomy/ros/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/management/ros/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/sostenibilita/ros/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/casa/homepage/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/economia/ros/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/viaggi/ros/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/motori/homepage/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/risparmio/homepage/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/tecnologia/homepage/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/cultura/homepage/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/scuola24/homepage/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/moda/homepage/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/food/homepage/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/infodata/homepage/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/mercati/fondi_etf/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/salute/homepage/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/management/homepage/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/commenti/homepage/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/economia/homepage/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/viaggi/homepage/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/sostenibilita/homepage/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/il_magazine/ros/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/sport/homepage/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Intesa_San_Paolo_2021_Dossier_Viaggio_ITS/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/il_magazine/homepage/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/consigli24/homepage/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/2021_Expo_Dubai/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/lab24/SpecialeCop26/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Piazza_Copernico_2020_Leader_Crescita/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Volkswagen_2020_Rapporto_Flotte/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/lab24/speciale_coronavirus_2020/Mpu_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Mercedes_2020_DOSSIER_Flotte_PMI/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Sisal_2020_Dossier_GoBeyond/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/ServiceNow_2021_Dossier_Lavoro_Ibrido/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Aruba_2020_Dossier/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Leonardo_2021_Filiera_Digitalizzazione/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/ENI_2020_IDROGENO/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Reekeep_2021/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/lab24/speciale_vaccini_2021/Mpu_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/TELECOM_2019_Educazione_Digitale_5G/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Teatro_Regio_2021/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Guida_2020_Smart_Business/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Open_Fiber_2021_Banda_Larga/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Volkswagen_2019_Crescita_PMI/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Renault_2019_Rapporto_Motori_Dicembre/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Snam_2022_Energetica_Residenziale/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Renault_Koleos_Dossier_Francoforte/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/BMW_2019_Speciale_Eicma/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/MSeventy_2020_Speciale_Moda/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Enel_2020_Dossier_Cashback/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/UBS_2020_Rapporto_Private_Banking/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Nespresso_2020_Rapporto_Sviluppo_Sostenibile/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Vodafone_2020_Rapporto_Economia_Digitale/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/IWBank_2019_Rapporto_Private_Banking/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/FERROVIE_2020_TURISMO/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/ENI_2019_Native_Industry/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/AEROPORTI_DI_ROMA_2019_Dossier_Sostenibilita_Aereoporti_piu_green/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Suzuki_2020_Ignis_Hybrid/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Vodafone_2020_Digitalizzazione_Grandi_Imprese/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/premio_campiello/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/infodata/ros/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/ENI_2019_Native_Smart_Working/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/FFSS_2019_Rapporto_Turismo_Elite/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Eni_2020_Decarbonizzazione_Smart_Home/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Micro_Trend_2019_Mondo_Digitale/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Terna_2019_Rapporto_Nordest/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Credimi_2020_Rapporto_Economia_Digitale/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Enel_2021_Superdossier/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Poliform_2019_Branded_Content/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Unicredit_2019_confirming/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/elezioni_regionali_2020/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/lab24/calcolatore_assegno_unico_2022/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Azimut_2019_investimenti_economia_reale/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/ESOSPHERA_2019_Dossier_Leader_della_Crescita/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/CDP_2019_Economia_Giovani/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Accenture_2020_Banking_Conference/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Atlantia_2019_Assicurazioni_Telepass/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/ENEL_2020_LO_SVILUPPO_DELLE_PMI/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Eni_2020_Supercalcolatore_HPC5/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Mercedes_2020_Flotte_PMI/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/R1_2020_Progetto_Native/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Volkswagen_2019_Corporate_Social/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/consigli24/ros/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/lab24/Speciale_Vaccini_2021_Analisi/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Eni_2020_Dossier_Gas_Luce/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Terna_2019_Dorsi_Locali_SO-82230/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/buccellati_2021_speciale_gioielli/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/homepage/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/ros/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/ros/MPU_Middle",plm:94706,pld:94701},
{slot:"/57491254/ilsole24ore.com/scuola24/homepage/MPU_Bottom",plm:94707,pld:94702},
{slot:"/57491254/ilsole24ore.com/homepage/MPU_Bottom",plm:94707,pld:94702},
{slot:"/57491254/ilsole24ore.com/mercati/ros/MaxTicker1",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/mercati/homepage/MaxTicker1",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/mercati/fondi_etf/MaxTicker1",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/homepage/MaxTicker1",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/ros/MaxTicker1",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Qualita_della_vita_2019/homepage/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Qualita_della_vita_2019/ros/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/mercati/ros/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/italia_mondo/ros/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/lab24/speciale_coronavirus_2020/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/finanza/ros/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/video/ros/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/lab24/speciale_vaccini_2021/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/economia/ros/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/argomenti/ros/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/mercati/homepage/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/norme_tributi/ros/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/finanza/homepage/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/motori/ros/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/risparmio/ros/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/salute/ros/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/italia_mondo/homepage/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/commenti/ros/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/scuola24/ros/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/PNRR_2022_Superdossier/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/norme_tributi/homepage/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/lab24/calcolatore_assegno_unico_2022/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/cultura/ros/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/tecnologia/ros/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/casa/ros/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/moda/ros/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/management/ros/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/sport/ros/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/lab24/qualita_vita_2021/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/food/ros/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/economia/homepage/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/mercati/fondi_etf/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/lab24/Speciale_Vaccini_2021_Analisi/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/sostenibilita/ros/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/casa/homepage/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/arteconomy/ros/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/viaggi/ros/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/risparmio/homepage/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/lab24/database_universita_italiane/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/lab24/indice_criminalita_2021/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/video/homepage/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/scuola24/homepage/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/cultura/homepage/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/motori/homepage/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/moda/homepage/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/management/homepage/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/dossier_ebook/homepage/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/food/homepage/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/sostenibilita/homepage/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/arteconomy/homepage/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/salute/homepage/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/tecnologia/homepage/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/viaggi/homepage/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/commenti/homepage/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Intesa_San_Paolo_2021_Dossier_Viaggio_ITS/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/telefisco_2022/homepage/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/telefisco_2022/ros/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/lab24/speciale_coronavirus_2021/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/sport/homepage/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/il_magazine/ros/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/lab24/qualita_vita_bga/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/dossier_young_finance_2021/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/2021_Expo_Dubai/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/il_magazine/homepage/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/lab24/indice_sportivita_2021/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/lab24/speciale_sanremo_2020/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Eni_2021_Super_dossier/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/speciale_elezioni_2020/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/lab24/Superbonus/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/lab24/Lab_2021_Cybersicurezza/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Volkswagen_2020_Rapporto_Flotte/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/lab24/speciale_coronavirus_2020/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Speciale_Sfilate_21/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Piazza_Copernico_2020_Leader_Crescita/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/ENI_2020_Lab24/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/lab24/SpecialeCop26/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Speciale_Dati_Elezioni_2021/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Mercedes_2020_DOSSIER_Flotte_PMI/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Enel_2021_Superdossier/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Leonardo_2021_Filiera_Digitalizzazione/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Sisal_2020_Dossier_GoBeyond/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Volkswagen_2021_Speciale_Flotte_Nov/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/lab24/speciale_vaccini_2021/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/lab24/speciale_imprenditoria_femminile_2021/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Aruba_2020_Dossier/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/ServiceNow_2021_Dossier_Lavoro_Ibrido/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/ESOSPHERA_2019_Dossier_Leader_della_Crescita/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Reekeep_2021/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/meglio_questo_2022_diretta_evento/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Dossier_Elezioni_2021/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Teatro_Regio_2021/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/ENI_2020_IDROGENO/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/argomenti/ros/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/dossier_leonardo_2021/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Open_Fiber_2021_Banda_Larga/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Furla_Speciale_Moda_2020/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Snam_2022_Energetica_Residenziale/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Guida_2020_Smart_Business/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Enel_2020_Dossier_Cashback/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Volkswagen_2019_Crescita_PMI/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/BMW_2019_Speciale_Eicma/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/MSeventy_2020_Speciale_Moda/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Renault_2019_Rapporto_Motori_Dicembre/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Terna_2019_Dorsi_Locali_SO-82230/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/TELECOM_2019_Educazione_Digitale_5G/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Renault_Koleos_Dossier_Francoforte/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Terna_2019_Rapporto_Nordest/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/UBS_2020_Rapporto_Private_Banking/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Agricoltura100/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/FFSS_2019_Rapporto_Turismo_Elite/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Nespresso_2020_Rapporto_Sviluppo_Sostenibile/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Vodafone_2020_Digitalizzazione_Grandi_Imprese/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Eni_2021_Super_dossier/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/FERROVIE_2020_TURISMO/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Vodafone_2020_Rapporto_Economia_Digitale/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/buccellati_2021_speciale_gioielli/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/lab24/speciale_universitacattolica_2021/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/AEROPORTI_DI_ROMA_2019_Dossier_Sostenibilita_Aereoporti_piu_green/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/premio_campiello/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/lab24/calcolatore_assegno_unico_2022/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/ENI_2019_Native_Industry/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Enel_2020_Speciale_Lab24/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/IWBank_2019_Rapporto_Private_Banking/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Eni_2020_Decarbonizzazione_Smart_Home/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/ENI_2019_Native_Smart_Working/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Unicredit_2019_confirming/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/default_dossier/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/italia_mondo/ros/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Mercedes_2020_Flotte_PMI/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Micro_Trend_2019_Mondo_Digitale/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Suzuki_2020_Ignis_Hybrid/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Poliform_2019_Branded_Content/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/accenture_2022_speciale_filiereproduttive/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/elezioni_calabria_2020/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/lab24/qualita_vita_2021/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Credimi_2020_Rapporto_Economia_Digitale/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Atlantia_2019_Assicurazioni_Telepass/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Volkswagen_2019_Corporate_Social/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/argomenti/ros/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Azimut_2019_investimenti_economia_reale/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Lavazza_2020_Progetto_1895/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/McDonald_2016_76599/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/elezioni_umbria_2019/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/CREDEM_LEASING_2019_Rapporto_Salone_Nautico/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/ACEA_2019_Dossier_Sviluppo_Sostenibile/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Accenture_2020_Banking_Conference/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/ENEL_2020_LO_SVILUPPO_DELLE_PMI/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/elezioni_regionali_2020/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/CDP_2019_Economia_Giovani/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Eni_2020_Dossier_Gas_Luce/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Eni_2020_Supercalcolatore_HPC5/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Infocert_2021_Dossier/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Illimity_Bank_2022_diretta_evento/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Speciali_Dossier/Volkswagen_2020_Confindustria_Evento_Veneto/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/lab24/Speciale_Vaccini_2021_Analisi/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/lab24/indice_criminalita_2021/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/homepage/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/ros/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/ros/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/Meteo24/MaxTicker",plm:94708,pld:94703},
{slot:"/57491254/ilsole24ore.com/homepage/Top",pld:95352},
{slot:"/57491254/ilsole24ore.com/mercati/ros/Top",pld:95352},
{slot:"/57491254/ilsole24ore.com/italia_mondo/ros/Top",pld:95352},
{slot:"/57491254/ilsole24ore.com/quotidiano_vetrina/Top",pld:95352},
{slot:"/57491254/ilsole24ore.com/finanza/ros/Top",pld:95352},
{slot:"/57491254/ilsole24ore.com/mercati/homepage/Top",pld:95352},
{slot:"/57491254/ilsole24ore.com/lab24/speciale_coronavirus_2020/Top",pld:95352},
{slot:"/57491254/ilsole24ore.com/finanza/homepage/Top",pld:95352},
{slot:"/57491254/ilsole24ore.com/norme_tributi/ros/Top",pld:95352},
{slot:"/57491254/ilsole24ore.com/economia/ros/Top",pld:95352},
{slot:"/57491254/ilsole24ore.com/video/ros/Top",pld:95352}
];
var aplus_placements = [
{pl:94704,sizes:[[320, 100],[320, 50]],bids:[{bidder:'appnexus', params:{placementId:'24636174'}},{bidder:'criteo', params:{networkId:6093}},{bidder:'adf', params:{mid:'1395079',rcur:'USD'}},{bidder:'yahoossp', params:{dcn:'8a96954b017171304c2b314898900070',pos:'8a969401017f7f992ec29c4b290f0096'}},{bidder:'rubicon', params:{accountId:'13258',siteId:'70942',zoneId:'2356914',sizes:[117,43]}}]},
{pl:94699,sizes:[[970, 250],[990, 250]],bids:[{bidder:'appnexus', params:{placementId:'24636163'}},{bidder:'criteo', params:{networkId:6093}},{bidder:'adf', params:{mid:'1395066',rcur:'USD'}},{bidder:'yahoossp', params:{dcn:'8a96954b017171304c2b31489695006e',pos:'8a969c58017f7f9924059c4631f800b3'}},{bidder:'rubicon', params:{accountId:'13258',siteId:'70942',zoneId:'2356896',sizes:[57]}}]},
{pl:94705,sizes:[[300, 250]],bids:[{bidder:'appnexus', params:{placementId:'24636179'}},{bidder:'criteo', params:{networkId:6093}},{bidder:'adf', params:{mid:'1395080',rcur:'USD'}},{bidder:'yahoossp', params:{dcn:'8a96954b017171304c2b314898900070',pos:'8a969100017f7f9929519c4b61e2009f'}},{bidder:'rubicon', params:{accountId:'13258',siteId:'70942',zoneId:'2356916',sizes:[15]}}]},
{pl:94700,sizes:[[300, 250]],bids:[{bidder:'appnexus', params:{placementId:'24636165'}},{bidder:'criteo', params:{networkId:6093}},{bidder:'adf', params:{mid:'1395067',rcur:'USD'}},{bidder:'yahoossp', params:{dcn:'8a96954b017171304c2b31489695006e',pos:'8a969100017f7f9929519c4678dd009b'}},{bidder:'rubicon', params:{accountId:'13258',siteId:'70942',zoneId:'2356898',sizes:[15]}}]},
{pl:94706,sizes:[[300, 250]],bids:[{bidder:'appnexus', params:{placementId:'24636181'}},{bidder:'criteo', params:{networkId:6093}},{bidder:'adf', params:{mid:'1395082',rcur:'USD'}},{bidder:'yahoossp', params:{dcn:'8a96954b017171304c2b314898900070',pos:'8a969100017f7f9929519c4ba90a00a0'}},{bidder:'rubicon', params:{accountId:'13258',siteId:'70942',zoneId:'2356920',sizes:[15]}}]},
{pl:94701,sizes:[[300, 250]],bids:[{bidder:'appnexus', params:{placementId:'24636168'}},{bidder:'criteo', params:{networkId:6093}},{bidder:'adf', params:{mid:'1395068',rcur:'USD'}},{bidder:'yahoossp', params:{dcn:'8a96954b017171304c2b31489695006e',pos:'8a969c58017f7f9924059c46cf2000b4'}},{bidder:'rubicon', params:{accountId:'13258',siteId:'70942',zoneId:'2356900',sizes:[15]}}]},
{pl:94707,sizes:[[300, 250]],bids:[{bidder:'appnexus', params:{placementId:'24636182'}},{bidder:'criteo', params:{networkId:6093}},{bidder:'adf', params:{mid:'1395083',rcur:'USD'}},{bidder:'yahoossp', params:{dcn:'8a96954b017171304c2b314898900070',pos:'8a969c58017f7f9924059c4bf27800b6'}},{bidder:'rubicon', params:{accountId:'13258',siteId:'70942',zoneId:'2356926',sizes:[15]}}]},
{pl:94702,sizes:[[300, 250]],bids:[{bidder:'appnexus', params:{placementId:'24636170'}},{bidder:'criteo', params:{networkId:6093}},{bidder:'adf', params:{mid:'1395069',rcur:'USD'}},{bidder:'yahoossp', params:{dcn:'8a96954b017171304c2b31489695006e',pos:'8a969100017f7f9929519c47222d009c'}},{bidder:'rubicon', params:{accountId:'13258',siteId:'70942',zoneId:'2356904',sizes:[15]}}]},
{pl:94708,sizes:[[320, 100],[320, 50]],bids:[{bidder:'appnexus', params:{placementId:'24636190'}},{bidder:'criteo', params:{networkId:6093}},{bidder:'adf', params:{mid:'1395084',rcur:'USD'}},{bidder:'yahoossp', params:{dcn:'8a96954b017171304c2b314898900070',pos:'8a969c58017f7f9924059c4cd7d800b7'}},{bidder:'rubicon', params:{accountId:'13258',siteId:'70942',zoneId:'2356930',sizes:[117,43]}}]},
{pl:94703,sizes:[[728, 90],[970, 250],[990, 250],[990, 30]],bids:[{bidder:'appnexus', params:{placementId:'24636172'}},{bidder:'criteo', params:{networkId:6093}},{bidder:'adf', params:{mid:'1395070',rcur:'USD'}},{bidder:'yahoossp', params:{dcn:'8a96954b017171304c2b31489695006e',pos:'8a969c58017f7f9924059c476d2200b5'}},{bidder:'rubicon', params:{accountId:'13258',siteId:'70942',zoneId:'2356908',sizes:[2,57]}}]},
{pl:95352,sizes:[[1, 1]],bids:[{bidder:'appnexus', params:{placementId:'26894416'}},{bidder:'rubicon', params:{accountId:'13258',siteId:'70942',zoneId:'2518472',sizes:[221]}}]}
];
