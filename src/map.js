/* global $, get, getRaw, getCacheLength, ms1day, makeRejector, getLang */
var map = {
  maps: function (mapId, options) {
    var dfd = $.Deferred(),
      reject = makeRejector(dfd),
      cacheLength = getCacheLength(options, ms1day),
      lang = getLang(options),
      queryData = {lang: lang};
    if (mapId === null) {
      mapId = undefined;
    } else if (mapId !== undefined) {
      mapId = +mapId;
      queryData.map_id = mapId;
    }
    get('maps.json', cacheLength, queryData).done(function (data) {
      var raw = getRaw(data, 'maps', options);
      if ((options === undefined || !options.raw) && mapId !== undefined) {
        raw = raw[mapId];
      }
      dfd.resolve(raw);
    }).fail(reject);
    return dfd.promise();
  },
  continents: function (options) {
    var dfd = $.Deferred(),
      reject = makeRejector(dfd),
      cacheLength = getCacheLength(options, ms1day),
      lang = getLang(options);

    get('continents.json', cacheLength, {lang: lang}).done(function (data) {
      var raw = getRaw(data, 'continents', options);
      dfd.resolve(raw);
    }).fail(reject);
    return dfd.promise();
  },
  mapFloors: function (continentId, floor, options) {
    var cacheLength = getCacheLength(options, ms1day),
      lang = getLang(options),
      queryData = {
        lang: lang,
        continent_id: continentId,
        floor: floor
      };
    return get('map_floor.json', cacheLength, queryData);
  }
};
