function setWTEID(retry) {
    try {
      if (typeof window.webtrekkUnloadObjects !== 'undefined' && typeof window.readWebtrekkEIDs !== 'undefined') {
        readWebtrekkEIDs();
      } else {
        if (typeof retry === 'undefined') {
          retry = 1;
        }
        if (retry > 0) {
          setTimeout(function() {
            setWTEID(retry - 1);
          }, 1000);
        }
      }
    } catch (e) {
      error.log(e);
    }
  }
  
  function tView(data, retry, hasWTEIDCookie) {
    try {
      if (typeof utag !== 'undefined') {
        data.no_view = 'no';
        utag.view(data);
        if (typeof hasWTEIDCookie !== 'undefined' && !hasWTEIDCookie) {
          setWTEID(5);
        }
      } else {
        if (typeof retry === 'undefined') {
          retry = 1;
        }
        if (retry > 0) {
          setTimeout(function() {
            tView(data, retry - 1, hasWTEIDCookie);
          }, 1000);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
  
  function tLink(data) {
    try {
      utag.link(data);
    } catch (e) {
      console.log(e);
    }
  }
  
  if (typeof window.wts == 'undefined') {
    window.wts = {
      push: function() {
        if (typeof utag_data !== 'undefined') {
          tView(utag_data);
        }
      },
    };
  }
  