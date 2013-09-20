/* global $, get, getRaw, ms30seconds, ms1hour, ms1day, getCacheLength, normalizeIds, getItemById, makeRejector, cache, wvwObjectiveFullNames, returnTrue, getObjectiveValue, promiseWrap */
var wvw = {
  matches: function (options) {
    var dfd = $.Deferred(),
      cacheLength = getCacheLength(options, ms1hour);
    get('wvw/matches.json', cacheLength).done(function (json) {
      dfd.resolve(getRaw(json, 'wvw_matches', options));
    }).fail(function () {
      dfd.reject();
    });

    return dfd.promise();
  },
  match: function (matchId) {
    return getItemById(matchId, wvw.matches, 'wvw_match_id');
  },
  matchIdFromWorldId: function (worldId) {
    var dfd = $.Deferred();

    worldId = +worldId;

    wvw.matches().done(function (matches) {
      var match,
        i = 0,
        len = matches.length;

      for (; i < len; i += 1) {
       match = matches[i];
       switch (worldId) {
         case match.red_world_id:
         case match.blue_world_id:
         case match.green_world_id:
           dfd.resolve(match.wvw_match_id);
           return;
       }
      }
      dfd.reject();
    }).fail(function () {
      dfd.reject();
    });
    return dfd.promise();
  },
  worldMatch: function (worldId) {
    var dfd = $.Deferred(),
      reject = makeRejector(dfd);
    wvw.matchIdFromWorldId(worldId).done(function (matchId) {
      wvw.match(matchId).done(function (match) {
        dfd.resolve(match);
      }).fail(reject);
    }).fail(reject);
    return dfd.promise();
  },
  matchDetails: function (matchId, options) {
    var cacheLength = getCacheLength(options, ms30seconds);
    return get('wvw/match_details.json', cacheLength, {match_id: matchId});
  },

  objectiveNames: function (options) {
    var cacheLength = getCacheLength(options, ms1day),
      lang = getLang(options),
      dfd = $.Deferred();

    get('wvw/objective_names.json', cacheLength, {lang: lang}).done(function (names) {
      var normalized = normalizeIds(names, options);
      dfd.resolve(normalized);
    }).fail(function () {
      dfd.reject();
    });

    return dfd.promise();
  },
  objectiveNamesAsObject: function (options) {
    var out = {},
      cached,
      cacheLength = getCacheLength(options, ms1day),
      lang = getLang(options),
      key = 'objectiveNamesAsObject' + '-' + lang,
      dfd,
      reject;

    cached = cache.get(key, cacheLength, true);
    if (cached) {
      return cached;
    }

    dfd = $.Deferred();
    reject = makeRejector(dfd);
    wvw.objectiveNames({noNormalize: true, lang: lang}).done(function (names) {
      names.forEach(function (itm) {
        out[itm.id] = itm.name;
      });
      dfd.resolve(out);
      cache.set(key, out);
    }).fail(reject);

    return dfd.promise();
  },
  objectiveName: function (objectiveId, options) {
    var dfd = $.Deferred(),
      reject = makeRejector(dfd),
      lang = getLang(options);

    wvw.objectiveNamesAsObject({lang: lang}).done(function (objectiveNames) {
      var name = objectiveNames[+objectiveId];

      if (name) {
        dfd.resolve(name);
      } else {
        reject();
      }
    }).fail(reject);

    return dfd.promise();
  },
  objectiveFullName: function (objectiveId, options) {
    var dfd = $.Deferred(),
      reject = makeRejector(dfd);

    wvw.objectiveFullNamesAsObject(options).done(function (names) {
      var name = names[+objectiveId];
      if (name) {
        dfd.resolve(name);
      } else {
        reject();
      }
    }).fail(reject);

    return dfd.promise();
  },
  objectiveFullNamesAsObject: function (options) {
    var lang = getLang(options);
    return promiseWrap(wvwObjectiveFullNames[lang]);
  },
  objectiveValue: function (objectiveId) {
    return promiseWrap(getObjectiveValue(objectiveId));
  },

  potentialPoints: function (worldId, map) {
    var dfd = $.Deferred(),
      reject = makeRejector(dfd),
      mapFilter = returnTrue,
      mapFilterRegEx,
      total = 0;

    if (map) {
      mapFilterRegEx = new RegExp('^' + map.substr(0,1), 'i');
      mapFilter = function (item) {
        return mapFilterRegEx.test(item.type);
      };
    }

    wvw.matchIdFromWorldId(worldId).done(function (matchId) {
      $.when(wvw.match(matchId), wvw.matchDetails(matchId), wvw.objectiveNamesAsObject()).done(function (match, details, objectiveNames) {
        var teamColor;
        switch(worldId) {
        case match.red_world_id:
          teamColor = 'Red';
          break;
        case match.green_world_id:
          teamColor = 'Green';
          break;
        case match.blue_world_id:
          teamColor = 'Blue';
          break;
        }

        details.maps.filter(mapFilter).forEach(function (map) {
          map.objectives.forEach(function (objective) {
            if (objective.owner === teamColor) {
              total += getObjectiveValue(objective.id, objectiveNames);
            }
          });
        });

        dfd.resolve(total);

      }).fail(reject);
    }).fail(reject);

    return dfd.promise();
  }
};
