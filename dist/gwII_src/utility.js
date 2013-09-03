/* This file holds helper functions and defines all lib-wide vars. */
/*global daCache */

var oldGw2 = window.gw2,
  gwII,
  apiBase = 'https://api.guildwars2.com/v1/',

  ms10seconds = 10000, // 1000 * 10
  ms30seconds = 30000, // 1000 * 30
  ms1minute = 60000, // 1000 * 60
  ms1hour = 3600000, // 1000 * 60 * 60
  ms1day = 86400000, // 1000 * 60 * 60 * 24

  defaultLang = 'en',
  supportedLanguages = ['de', 'en', 'es', 'fr'],
  isSupportedLang =  function (lang) {
    lang = lang.toLowerCase();
    return supportedLanguages.indexOf(lang) !== -1;
  },

  cache = daCache(),

  returnTrue = function () {
    return true;
  },

  makeRejector = function (dfd) {
    return function () {
      dfd.reject();
    };
  },
  promiseWrap = function (value) {
    var dfd = $.Deferred();
    return dfd.resolve(value).promise();
  },

  copyObj = function (obj) {
    return $.extend(true, {}, obj);
  },

  /* Arguments should be functions to execute, in the order they should execute */
  compose = function () {
    var funcs = Array.prototype.slice.call(arguments, 0),
      len = funcs.length,
      exec = function (input) {
        var i,
          out = input;
          for (i = 0; i < len; i += 1) {
            out = funcs[i](out);
          }
        return out;
      };
    return exec;
  },

  getItemById = function (id, getter, idProp, getProp) {
    // If getProp is provided the return value will be the value of the
    // property named by getProp. If getProp is omitted the entire item
    // is returned.
    var dfd = $.Deferred(),
      reject = makeRejector(dfd);

    getter().done(function (collection) {
      var item,
        i = 0,
        len = collection.length;

      while (i < len) {
        item = collection[i];
        if (item[idProp] === id) {
          if (getProp !== undefined) {
            dfd.resolve(item[getProp]);
          } else {
            dfd.resolve(item);
          }
          break;
        }
        i += 1;
      }
      if (dfd.state() !== 'resolved') {
        reject();
      }
    }).fail(reject);

    return dfd.promise();
  },

  // builds a key for caching based on the API endpoint being called
  // and the parameters/values being passed to it
  getKey =  function (apiCall, data) {
    var out = apiCall;
    if (data !== undefined) {
      Object.keys(data).sort().forEach(function (propName) {
        out += '_' + propName + ':' + data[propName];
      });
    }

    return out;
  },

  // takes an array of object that have an .id property
  // that is a numeric string and returns a copy of the
  // array with each .id converted to a number
  normalizeIds = function (arr, opt) {
    var out,
      normalizeId = function (obj) {
        obj.id = obj === '' ? null : +obj.id;
        return obj;
      },
      copyAndMod = compose(copyObj, normalizeId);
    if (!opt || !opt.noNormalize) {
        out = arr.map(copyAndMod);
      return out;
    }

    return arr;
  },

  // Takes an object and a map of possible properties/sub-properties
  // that are numeric strings, returns a copy of the object after
  // searching for those properties and converting them to numbers

  // intPaths is an array of the possible properties.
  // Each item is a regex describing the path to the property.
  // A comma is used to separate sub-properties instead of escaping .
  //   ^,item_id$ would be only base-level properties named .item_id
  //   ,skill_id$ would be any property that is the last in a chain named .skill_id
  //   ^,weapon,min_power$ would only match .weapon.min_power
  normalizeObj = function (obj, opt, intPaths) {
    if (!opt || !opt.noNormalize) {
      var out = copyObj(obj),
        isTargetedPath = function (path) {
          var i = 0,
            len = intPaths.length,
            out = false;

          for (; i < len; i += 1) {
            if (path.match(intPaths[i])) {
              out = true;
              break;
            }
          }
          return out;
        },
        walkObj = function (obj, path) {
          $.each(obj, function (key, itm) {
            var type = $.type(itm),
              myPath = path;

           if ($.type(obj) !== 'array') {
             myPath += ',' + key; // use , as a separator instead of . since RegExp will be used...
           }

            if (type === 'object' || type === 'array') {
              obj[key] = walkObj(itm, myPath);
            } else {
              if (isTargetedPath(myPath)) {
                obj[key] = itm === '' ? null : +itm;
              }
            }
          });
          return obj;
        };

      out = walkObj(out, '');
      return out;
    }

    return obj;
  },

  getRaw = function (obj, prop, opt) {
    if (!opt || !opt.raw) {
      return obj[prop];
    } else {
      return obj;
    }
  },

  getLang = function (opt) {
    if (opt && opt.lang) {
      var lang = opt.lang;
      if (isSupportedLang(lang)) {
        return lang;
      }
    }
    return defaultLang;
  },

  getCacheLength = function (opt, defaultLength) {
    var value;
    // no default specify, no limit on cache length
    if (defaultLength === undefined) {
      defaultLength = true;
    }

    if (!opt || opt.cache === undefined) {
      value = defaultLength;
    } else {
      value = opt.cache;
    }

    return value;
  },

  get = function (apiCall, cacheLength, data) {
    var value,
      key,
      theData,
      doNotCache = false;

    if (cacheLength === null) {
      cacheLength = false;
      doNotCache = true;
    }
    theData = data || {};
    key = getKey(apiCall, theData);

    value = cache.get(key, cacheLength, true);

    if (value === undefined) {
      value = $.Deferred();
      if (!doNotCache) {
        cache.set(key, value);
      }

      $.getJSON(apiBase + apiCall, theData, function (json) {
        if (!doNotCache) {
          cache.set(key, json);
        }
        value.resolve(json);
      }).fail(function () {
        value.reject();
      });
    }

    return value.promise();
  },

  getObjectiveValue = function (id, objectiveNamesObject) {
    var name;

    name = objectiveNamesObject[+id];

    switch (name) {
    case 'Castle':
      return 35;
    case 'Keep':
      return 25;
    case 'Tower':
      return 10;
    default:
      return 5;
    }
  },

  namesContaining = function (getter, search, options) {
    var dfd = $.Deferred(),
      rx;
    rx = search instanceof RegExp ? search : new RegExp(search, 'i');
    getter(options).done(function (items) {
      var found = items.filter(function (item) {
        if (item.name) {
          if (item.name && item.name.match && item.name.match(rx)) {
            return true;
          }
        }
        return false;
      });

      dfd.resolve(found);
    }).fail(function () {
      dfd.reject();
    });
    return dfd.promise();
  },

  // list based on https://gist.github.com/codemasher/bac2b4f87e7af128087e
  wvwObjectiveFullNames = {
    de: {
      1: 'Aussichtspunkt',
      2: 'Tal',
      3: 'Tiefland',
      4: 'Golanta-Lichtung',
      5: 'Pangloss-Anh�he',
      6: 'Speldan Kahlschlag',
      7: 'Danelon-Passage',
      8: 'Umberlichtung-Forst',
      9: 'Schloss Steinnebel',
      10: 'Schurkenbruch',
      11: 'Aldons Vorsprung',
      12: 'Wildbachstrecke',
      13: 'Jerrifers Sumpfloch',
      14: 'Klovan-Senke',
      15: 'Langor-Schlucht',
      16: 'Quentinsee',
      17: 'Mendons Spalt',
      18: 'Anzalias-Pass',
      19: 'Ogerwacht-Kanal',
      20: 'Veloka-Hang',
      21: 'Durios-Schlucht',
      22: 'Bravost-Abhang',
      23: 'Festung',
      24: 'Landgut des Champions',
      25: 'Rotdornstrauch',
      26: 'Gr�nsee',
      27: 'Bucht des Aufstiegs',
      28: 'Horst der Morgend�mmerung',
      29: 'Der Geisterholm',
      30: 'Wald-Freistatt',
      31: 'Askalion-H�gel',
      32: 'Etheron-H�gel',
      33: 'Traumbucht',
      34: 'Sieger-H�tte',
      35: 'Gr�nstrauch',
      36: 'Blausee',
      37: 'Festung',
      38: 'Weitsicht',
      39: 'Das Gottschwert',
      40: 'Felswand',
      41: 'Shadaran-H�gel',
      42: 'Rotsee',
      43: 'H�tte des Helden',
      44: 'Schreckensfall-Bucht',
      45: 'Blaudornstrauch',
      46: 'Festung',
      47: 'Sonnenlichth�gel',
      48: 'Glaubenssprung',
      49: 'Blautal-Zuflucht',
      50: 'Blauwasser-Tiefland',
      51: 'Astralholm',
      52: 'Arahs Hoffnung',
      53: 'Gr�ntal-Zuflucht',
      54: 'Nebel-Freistatt',
      55: 'Rotwasser-Tiefland',
      56: 'Die Titanenpranke',
      57: 'Felsenspitze',
      58: 'G�tterkunde',
      59: 'Rottal-Zuflucht',
      60: 'Sternenhain',
      61: 'Gr�nwasser-Tiefland'
    },
    en: {
      1: 'Overlook',
      2: 'Valley',
      3: 'Lowlands',
      4: 'Golanta Clearing',
      5: 'Pangloss Rise',
      6: 'Speldan Clearcut',
      7: 'Danelon Passage',
      8: 'Umberglade Woods',
      9: 'Stonemist Castle',
      10: 'Rogue\'s Quarry',
      11: 'Aldon\'s Ledge',
      12: 'Wildcreek Run',
      13: 'Jerrifer\'s Slough',
      14: 'Klovan Gully',
      15: 'Langor Gulch',
      16: 'Quentin Lake',
      17: 'Mendon\'s Gap',
      18: 'Anzalias Pass',
      19: 'Ogrewatch Cut',
      20: 'Veloka Slope',
      21: 'Durios Gulch',
      22: 'Bravost Escarpment',
      23: 'Garrison',
      24: 'Champion\'s demense',
      25: 'Redbriar',
      26: 'Greenlake',
      27: 'Ascension Bay',
      28: 'Dawn\'s Eyrie',
      29: 'The Spiritholme',
      30: 'Woodhaven',
      31: 'Askalion Hills',
      32: 'Etheron Hills',
      33: 'Dreaming Bay',
      34: 'Victors\'s Lodge',
      35: 'Greenbriar',
      36: 'Bluelake',
      37: 'Garrison',
      38: 'Longview',
      39: 'The Godsword',
      40: 'Cliffside',
      41: 'Shadaran Hills',
      42: 'Redlake',
      43: 'Hero\'s Lodge',
      44: 'Dreadfall Bay',
      45: 'Bluebriar',
      46: 'Garrison',
      47: 'Sunnyhill',
      48: 'Faithleap',
      49: 'Bluevale Refuge',
      50: 'Bluewater Lowlands',
      51: 'Astralholme',
      52: 'Arah\'s Hope',
      53: 'Greenvale Refuge',
      54: 'Foghaven',
      55: 'Redwater Lowlands',
      56: 'The Titanpaw',
      57: 'Cragtop',
      58: 'Godslore',
      59: 'Redvale Refuge',
      60: 'Stargrove',
      61: 'Greenwater Lowlands'
    },
    es: {
      1: 'Mirador',
      2: 'Valle',
      3: 'Vega',
      4: 'Claro Golanta',
      5: 'Colina Pangloss',
      6: 'Claro Espeldia',
      7: 'Pasaje Danelon',
      8: 'Bosques Clarosombra',
      9: 'Castillo Piedraniebla',
      10: 'Cantera del P�caro',
      11: 'Cornisa de Aldon',
      12: 'Pista Arroyosalvaje',
      13: 'Cenagal de Jerrifer',
      14: 'Barranco Klovan',
      15: 'Barranco Langor',
      16: 'Lago Quentin',
      17: 'Zanja de Mendon',
      18: 'Paso Anzalias',
      19: 'Tajo de la Guardia del Ogro',
      20: 'Pendiente Veloka',
      21: 'Barranco Durios',
      22: 'Escarpadura Bravost',
      23: 'Fuerte',
      24: 'Dominio del Campe�n',
      25: 'Zarzarroja',
      26: 'Lagoverde',
      27: 'Bah�a de la Ascensi�n',
      28: 'Aguilera del Alba',
      29: 'La Isleta Espiritual',
      30: 'Refugio Forestal',
      31: 'Colinas Askalion',
      32: 'Colinas Etheron',
      33: 'Bah�a On�rica',
      34: 'Albergue del Vencedor',
      35: 'Zarzaverde',
      36: 'Lagoazul',
      37: 'Fuerte',
      38: 'Vistaluenga',
      39: 'La Hoja Divina',
      40: 'Despe�adero',
      41: 'Colinas Shadaran',
      42: 'Lagorrojo',
      43: 'Albergue del H�roe',
      44: 'Bah�a Salto Aciago',
      45: 'Zarzazul',
      46: 'Fuerte',
      47: 'Colina Soleada',
      48: 'Salto de Fe',
      49: 'Refugio Valleazul',
      50: 'Tierras Bajas de Aguazul',
      51: 'Isleta Astral',
      52: 'Esperanza de Arah',
      53: 'Refugio de Valleverde',
      54: 'Refugio Neblinoso',
      55: 'Tierras Bajas de Aguarroja',
      56: 'La Garra del Tit�n',
      57: 'Cumbrepe�asco',
      58: 'Sabidur�a de los Dioses',
      59: 'Refugio Vallerojo',
      60: 'Arboleda de las Estrellas',
      61: 'Tierras Bajas de Aguaverde'
    },
    fr: {
      1: 'Belv�d�re',
      2: 'Vall�e',
      3: 'Basses terres',
      4: 'Clairi�re de Golanta',
      5: 'Mont�e de Pangloss',
      6: 'For�t ras�e de Speldan',
      7: 'Passage Danelon',
      8: 'Bois d\'Ombreclair',
      9: 'Ch�teau Brumepierre',
      10: 'Carri�re des voleurs',
      11: 'Corniche d\'Aldon',
      12: 'Piste du Ruisseau sauvage',
      13: 'Bourbier de Jerrifer',
      14: 'Petit ravin de Klovan',
      15: 'Ravin de Langor',
      16: 'Lac Quentin',
      17: 'Faille de Mendon',
      18: 'Col d\'Anzalias',
      19: 'Perc�e de Gardogre',
      20: 'Flanc de Veloka',
      21: 'Ravin de Durios',
      22: 'Falaise de Bravost',
      23: 'Garnison',
      24: 'Fief du champion',
      25: 'Bruyerouge',
      26: 'Lac Vert',
      27: 'Baie de l\'Ascension',
      28: 'Promontoire de l\'aube',
      29: 'L\'antre des esprits',
      30: 'Gentesylve',
      31: 'Collines d\'Askalion',
      32: 'Collines d\'Etheron',
      33: 'Baie des r�ves',
      34: 'Pavillon du vainqueur',
      35: 'Vertebranche',
      36: 'Lac bleu',
      37: 'Garnison',
      38: 'Longuevue',
      39: 'L\'Ep�e divine',
      40: 'Flanc de falaise',
      41: 'Collines de Shadaran',
      42: 'Rougelac',
      43: 'Pavillon du H�ros',
      44: 'Baie du Noir d�clin',
      45: 'Bruyazur',
      46: 'Garnison',
      47: 'Colline ensoleill�e',
      48: 'Ferveur',
      49: 'Refuge de bleubal',
      50: 'Basses terres d\'Eau-Azur',
      51: 'Astralholme',
      52: 'Espoir d\'Arah',
      53: 'Refuge de Valvert',
      54: 'Havre gris',
      55: 'Basses terres de Rubicon',
      56: 'Bras du titan',
      57: 'Sommet de l\'escarpement',
      58: 'Divination',
      59: 'Refuge de Valrouge',
      60: 'Bosquet stellaire',
      61: 'Basses terres d\'Eau-Verdoyante'
    }
  };