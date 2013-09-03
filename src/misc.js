var misc= {
  build: function (options) {
    var dfd = $.Deferred(),
      cacheLength = getCacheLength(options, ms10seconds);
    get('build.json', cacheLength).done(function (build) {
      var out = getRaw(build, 'build_id', options);
      dfd.resolve(out);
    }).fail(function () {
      dfd.reject();
    });
    return dfd.promise();
  },

  guildDetails: function (config, options) {
    var data = {},
      cacheLength = getCacheLength(options, ms1day);
   if (config.guildId) {
     data.guild_id = config.guildId;
   } else if (config.guildName) {
     data.guild_name = config.guildName;
   } else {
     if (!config) {
       return $.Deferred.reject();
     }
     data.guild_id = config;
   }

   return get('guild_details.json', cacheLength, data);
  },

  colors: function (options) {
    var cacheLength = getCacheLength(options, true),
      dfd = $.Deferred(),
      reject = makeRejector(dfd),
      lang = getLang(options);

    get('colors.json', cacheLength, {lang: lang}).done(function (colorsObj) {
        dfd.resolve(getRaw(colorsObj, 'colors', options));
    }).fail(reject);
    return dfd.promise();
  },

  files: function (options) {
    var cacheLength = getCacheLength(options, true);
    return get('files.json', cacheLength, {});
  }
};
