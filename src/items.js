var items = {
  items: function (options) {
    var cacheLength = getCacheLength(options, ms1day),
      dfd = $.Deferred(),
      reject = makeRejector(dfd);
    get('items.json', cacheLength).done(function (items) {
      dfd.resolve(getRaw(items, 'items', options));
    }).fail(reject);
    return dfd.promise();
  },
  itemDetails: function (itemId, options) {
    var cacheLength = getCacheLength(options, ms1hour),
      dfd = $.Deferred(),
      reject = makeRejector(dfd),
      lang = getLang(options);
    get('item_details.json', cacheLength, {lang: lang, item_id: itemId}).done(function (details) {
      var intPaths = [
          '^,item_id$',
          '^,level$',
          '^,vendor_value$',
          ',infix_upgrade,attributes,modifier$',
          ',suffix_item_id$',
          '^,weapon,min_power$',
          '^,weapon,max_power$',
          '^,(?:armor|weapon),defense$',
          ',duration_ms$',
          '^,size$',
          ',skill_id$'
        ],
        out = normalizeObj(details, options, intPaths);
      dfd.resolve(out);
    }).fail(reject);
    return dfd.promise();
  }
};
