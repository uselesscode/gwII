var recipes = {
  recipes: function (options) {
    var cacheLength = getCacheLength(options, ms1hour),
      dfd = $.Deferred(),
      reject = makeRejector(dfd);
    get('recipes.json', cacheLength).done(function (recipesObj) {
      dfd.resolve(getRaw(recipesObj, 'recipes', options));
    }).fail(reject);
    return dfd.promise();
  },
  recipeDetails: function (recipeId, options) {
    var cacheLength = getCacheLength(options, ms1day),
      dfd = $.Deferred(),
      reject = makeRejector(dfd),
      lang = getLang(options);
    get('recipe_details.json', cacheLength, {lang: lang, recipe_id: recipeId}).done(function (details) {
      var intPaths =
        [
          ',recipe_id',
          ',output_item_id',
          ',output_item_count',
          ',min_rating',
          ',time_to_craft_ms',
          ',ingredients,item_id',
          ',ingredients,count'
        ],
        out = normalizeObj(details, options, intPaths);
      dfd.resolve(out);
    }).fail(reject);
    return dfd.promise();
  }
};
