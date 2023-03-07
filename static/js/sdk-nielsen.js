if (typeof assetId === 'undefined') {
    let assetId;
  }
  if (typeof sectionId === 'undefined') {
    let sectionId;
  }
  if (typeof appId === 'undefined') {
    let appId;
  }
  
  sectionId = new URL(document.getElementById('sdkNielsen').src).searchParams.get('sectionId');
  assetId = new URL(document.getElementById('sdkNielsen').src).searchParams.get('assetId');
  appId = new URL(document.getElementById('sdkNielsen').src).searchParams.get('applicationId');
  
  !(function(t, n) {
    t[n] = t[n] || {
      nlsQ: function(e, o, c, r, s, i) {
        return (
          (s = t.document),
          (r = s.createElement('script')),
          (r.async = 1),
          (r.src = ('http:' === t.location.protocol ? 'http:' : 'https:') + '//cdn-gl.imrworldwide.com/conf/' + e + '.js#name=' + o + '&ns=' + n),
          (i = s.getElementsByTagName('script')[0]),
          i.parentNode.insertBefore(r, i),
          (t[n][o] = t[n][o] || {
            g: c || {},
            ggPM: function(e, c, r, s, i) {
              (t[n][o].q = t[n][o].q || []).push([e, c, r, s, i]);
            },
          }),
          t[n][o]
        );
      },
    };
  })(window, 'NOLBUNDLE');
  
  // SDK Initialization
  var nSdkInstance = NOLBUNDLE.nlsQ(appId, 'nlsnInstance');
  
  // Content Metadata
  var nielsenMetadata = {
    type: 'static',
    assetid: assetId, // *DYNAMIC METADATA*: unique ID for each article **REQUIRED**
    section: sectionId, // *DYNAMIC METADATA*: section of site **REQUIRED**
  };
  
  // Event 'staticstart' Call
  nSdkInstance.ggPM('staticstart', nielsenMetadata);
  