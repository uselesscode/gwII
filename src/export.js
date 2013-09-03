// collects all the modules into one object, augments it with a .lang
// and then attaches it to the global namespace
gwII = $.extend({}, events, misc, items, recipes);
gwII.render = render;
gwII.wvw = wvw;
gwII.map = map;
gwII.noConfilct = function () {
  window.gw2 = oldGw2;
  return gwII;
};
gwII.clearCache = cache.clear;
gwII.cache = function () {
  return daCache();
};

Object.defineProperties(gwII, {
  'lang': {
     set: function (lang) {
       if (lang) {
         if (isSupportedLang(lang)) {
           defaultLang = lang;
         }
       }
     },
     get: function () {
       return defaultLang;
     }
  }
});

window.gw2 = gwII;
