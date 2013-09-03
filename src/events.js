/* global $, get, getRaw, ms10seconds, ms1minute, ms1day, getCacheLength, getLang, normalizeIds, normalizeObj, getItemById */
var events = {
  worldNames: function (options) {
    var dfd = $.Deferred(),
      cacheLength = getCacheLength(options, true),
      lang = getLang(options);

    get('world_names.json', cacheLength, {lang: lang}).done(function (names) {
      var normalized = normalizeIds(names, options);
      dfd.resolve(normalized);
    });
    return dfd.promise();
  },
  worldNameFromId: function (worldId) {
    worldId = +worldId;
    return getItemById(worldId, events.worldNames, 'id', 'name');
  },
  worldNamesContaining: function (search, options) {
    return namesContaining(events.worldNames, search, options);
  },

  mapNames: function (options) {
    var dfd = $.Deferred(),
      cacheLength = getCacheLength(options, true),
      lang = getLang(options);
    get('map_names.json', cacheLength, {lang: lang}).done(function (names) {
      var normalized = normalizeIds(names, options);
      dfd.resolve(normalized);
    }).fail(function () {
      dfd.reject();
    });
    return dfd.promise();
  },
  mapName: function (mapId) {
    return getItemById(mapId, events.mapNames, 'id', 'name');
  },

  events: function (config, options) {
    var dfd = $.Deferred(),
      cacheLength = getCacheLength(options, ms1minute);
                                                          
    config = config || {};
                                                          
    get('events.json', cacheLength, {
      world_id: config.worldId,
      map_id: config.mapId,
      event_id: config.eventId
    }).done(function (events) {
      dfd.resolve(getRaw(events, 'events', options));
    });

    return dfd.promise();
  },
  eventNames: function (options) {
    var cacheLength = getCacheLength(options, ms1day),
      lang = getLang(options);
    return get('event_names.json', cacheLength, {lang: lang});
  },
  eventName: function (eventId) {
    return getItemById(eventId, events.eventNames, 'id', 'name');
  },
  eventNamesContaining: function (search, options) {
    return namesContaining(events.eventNames, search, options);
  },
  eventNamesAsObject: function (options) {
    var cached,
      cacheLength = getCacheLength(options, ms1day),
      lang = getLang(options),
      key = 'eventNamesAsObject' + '-' + lang,
      dfd = $.Deferred(),
      reject = makeRejector(dfd);

    cached = cache.get(key, cacheLength, true);
    if (cached) {
      return cached;
    }

    events.eventNames({lang: lang}).done(function (eventNames) {
      var oNames = {};
      eventNames.forEach(function (e) {
          oNames[e.id] = e.name;
      });
      dfd.resolve(oNames);
      cache.set(key, oNames);
    }).fail(reject);

    return dfd.promise();
  },
  eventDetails: function (eventId, options) {
    var dfd = $.Deferred(),
      reject = makeRejector(dfd),
      cacheLength = getCacheLength(options, true),
      lang = getLang(options),
      queryData = {lang: lang};
    if (eventId === null) {
      eventId = undefined;
    } else if (eventId !== undefined) {
      queryData.event_id = eventId;
    }
    get('event_details.json', cacheLength, queryData).done(function (data) {
      var raw = getRaw(data, 'events', options);
      if ((options === undefined || !options.raw) && eventId !== undefined) {
        raw = raw[eventId];
      }
      dfd.resolve(raw);
    }).fail(reject);
    return dfd.promise();
  }

};
