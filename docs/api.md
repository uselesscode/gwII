Most methods of the gw2 object return a [jQuery Deferred](http://api.jquery.com/category/deferred-object/) promise object which will resolve with the value(s) it retrieves.

##Properties

###gw2.lang
`gw2.lang` is a string that determines the language used for queries that support localized content. `gw2.lang` is set to `"en"` by default. `gw2.lang` can only be set to one of the 4 languages Guild Wars 2 supports: "de", "en", "es", and "fr". `gw2.lang` can also be overridden on a per-call basis using the [lang](options.md) option. Some methods currently do not support the `lang` option, but will return localized content because of the value of `gw2.lang`.

##Basic methods

###gw2.build(options)
* Retrieves the current GW2 build number as an integer from [build.json](http://wiki.guildwars2.com/wiki/API:1/build).
* Supported [options](options.md): cache, raw
* Returns [Promise](http://api.jquery.com/deferred.promise/)

####Example
    gw2.build().done( function (buildNumber) {
      console.log('The current build number is ' + buildNumber);
    });

###gw2.events(config, options)
* Retrieves an object containing event information from [events.json](http://wiki.guildwars2.com/wiki/API:1/events). Events can be filtered via world, map and event id using the config object with the properties `.worldId`, `.mapId` and `.eventId` respectively.
* Supported [options](options.md): cache, raw
* Returns [Promise](http://api.jquery.com/deferred.promise/)

####Example
    gw2.events({worldId: 1019, mapId: 15}).done(function (events) {
      console.log(events);
    });

###gw2.eventDetails(eventId, options)
* Retrieves static event information from [event\_details.json](http://wiki.guildwars2.com/wiki/API:1/event_details) 
* Supported [options](options.md): cache, raw, lang

####Example
    gw2.eventDetails("31CEBA08-E44D-472F-81B0-7143D73797F5").done(function (details) {
      console.log(details);
    });

###gw2.worldNames(options)
* Retrieves an array of world names from [world\_names.json](http://wiki.guildwars2.com/wiki/API:1/world_names). Each array item contains an object with `.id` and `.name` properties.
* Supported [options](options.md): cache, lang, noNormalize
* Returns [Promise](http://api.jquery.com/deferred.promise/)

####Example
    gw2.worldNames().done(function (worlds) {
      console.log(worlds);
    });

###gw2.worldNameFromId(worldId)
* Retrieves world names based on its id. Retrieves the name as a string.
* Returns [Promise](http://api.jquery.com/deferred.promise/)

####Example
    gw2.worldNameFromId(1019).done(function (name) {
      console.log('World #1019 is ' + name); // Blackgate
    });

###gw2.mapNames(options)
* Retrieves an array of GW2 map names from [map\_names.json](http://wiki.guildwars2.com/wiki/API:1/map_names). Each array item contains an object with `.id` and `.name` properties.
* Supported [options](options.md): cache, lang, noNormalize
* Returns [Promise](http://api.jquery.com/deferred.promise/)

####Example
    gw2.mapNames().done(function (names) {
      console.log(names);
    });

###gw2.mapName(mapId)
* Retrieves a string containing the name of the map with the specified `mapId`.
* Returns [Promise](http://api.jquery.com/deferred.promise/)

####Example
    gw2.mapName(15).done(function (name) {
      console.log(name); // "Queensdale"
    });

###gw2.worldNamesContaining(search, options)
* Gets an array of worlds whose name contains `search`. `search` can be a regular expression, a string or a number. Non-regular expressions will be treated as case insensitive, regular expressions will obey their flags. Each item in the retrieved array contains an object with `.id` and `.name` properties.
* Supported [options](options.md): cache, lang
* Returns [Promise](http://api.jquery.com/deferred.promise/)

####Example
    gw2.worldNamesContaining('black').done(function (names) {
      console.log(names);
    });

###gw2.eventNames(options)
* Retrieves an array of event names from [event\_names.json](http://wiki.guildwars2.com/wiki/API:1/event_names). Each array item contains an object with `.id` and `.name` properties.
* Supported [options](options.md): cache, lang
* Returns [Promise](http://api.jquery.com/deferred.promise/)

####Example
    gw2.eventNames().done(function (names) {
      console.log(names);
    });

###gw2.eventNamesAsObject(options)
* Retrieves an object containing event names, keyed by event id.
* Supported [options](options.md): cache, lang
* Returns [Promise](http://api.jquery.com/deferred.promise/)

####Example
    gw2.eventNamesAsObject().done(function (names) {
      console.log(names["31CEBA08-E44D-472F-81B0-7143D73797F5"]); // "Defeat the shadow behemoth."
    });

###gw2.eventName(eventId)
* Retrieves a string representing the name of an event.
* Returns [Promise](http://api.jquery.com/deferred.promise/)

####Example
    gw2.eventName("31CEBA08-E44D-472F-81B0-7143D73797F5").done(function (name) {
      console.log(name); // "Defeat the shadow behemoth."
    });

###gw2.eventNamesContaining(search, options)
* Retrieves an array of event names that match `search`. `search` can be a regular expression, a string or a number. Non-regular expressions will be treated as case insensitive, regular expressions will obey their flags. Each array item contains an object with `.id` and `.name` properties.
* Supported [options](options.md): cache, lang
* Returns [Promise](http://api.jquery.com/deferred.promise/)

####Example
    gw2.eventNamesContaining('behemoth').done(function (names) {
      console.log(names[0].name); // Defeat the shadow behemoth.
      console.log(names[1].name); // Defeat the violent plated behemoth.
    });

###gw2.items(options)
* Retrieves an array containing the ids of all discovered objects in the game from [items.json](http://wiki.guildwars2.com/wiki/API:1/items).
* Supported [options](options.md): cache, raw
* Returns [Promise](http://api.jquery.com/deferred.promise/)

####Example
    gw2.items().done(function (items) {
      console.log(items);
    });

###gw2.itemDetails(itemId, options)
* Retrieves an object describing the item from [item\_details.json](http://wiki.guildwars2.com/wiki/API:1/item_details).
* Supported [options](options.md): cache, lang, noNormalize
* Returns [Promise](http://api.jquery.com/deferred.promise/)

####Example
    gw2.itemDetails(2725).done(function (details) {
      console.log(details);
    });

###gw2.recipes(options)
* Retrieves an array containing the ids of all discovered recipes in the game from [recipes.json](http://wiki.guildwars2.com/wiki/API:1/recipes).
* Supported [options](options.md): cache, raw
* Returns [Promise](http://api.jquery.com/deferred.promise/)

####Example
    gw2.recipes().done(function (recipes) {
      console.log(recipes);
    });

###gw2.recipeDetails(recipeId, options)
* Retrieves an object describing the recipe from [recipe\_details.json](http://wiki.guildwars2.com/wiki/API:1/recipe_details).
* Supported [options](options.md): cache, lang, noNormalize
* Returns [Promise](http://api.jquery.com/deferred.promise/)

####Example
    gw2.recipeDetails(2121).done(function (details) {
      console.log(details);
    });

###gw2.guildDetails.(config, options)
* Retrieves guild details from [guild\_details.json](http://wiki.guildwars2.com/wiki/API:1/guild_details). `config` must have either a `.guildId` or `.guildName` parameter set.
* Supported [options](options.md): cache
* Returns [Promise](http://api.jquery.com/deferred.promise/)

####Example
    gw2.guildDetails.({guildId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"}).done(function (guild) {
      console.log(guild);
    });

###gw2.colors(options)
* Retrieves an array information about dye colors from [colors.json](http://wiki.guildwars2.com/wiki/API:1/colors).
* Supported [options](options.md): cache, raw, lang
* Returns [Promise](http://api.jquery.com/deferred.promise/)

####Example
    gw2.colors().done(function (colors) {
      console.log(colors);
    });


##WvW methods

###gw2.wvw.worldMatch(worldId)
* Retrieves a match object based on a given `worldId`
* Returns [Promise](http://api.jquery.com/deferred.promise/)

####Example
    gw2.wvw.worldMatch(1019).done(function (match) {
      console.log(match);
    });

###gw2.wvw.match(matchId)
* Retrieves a match object for the match with `matchId`
* Returns [Promise](http://api.jquery.com/deferred.promise/)

####Example
    gw2.wvw.match('1-1').done(function (match) {
      console.log(match);
    });

###gw2.wvw.matches(options)
* Retrieves an array containing information about all of the current WvW matches from [matches.json](http://wiki.guildwars2.com/wiki/API:1/wvw/matches).
* Supported [options](options.md): cache, raw
* Returns [Promise](http://api.jquery.com/deferred.promise/)

####Example
    gw2.wvw.matches().done(function (matches) {
      console.log(matches);
    });

###gw2.wvw.matchDetails(matchId, options)
* Retrieves an object containing match details from [match\_details.json](http://wiki.guildwars2.com/wiki/API:1/wvw/match_details).
* Supported [options](options.md): cache
* Returns [Promise](http://api.jquery.com/deferred.promise/)

####Example
    gw2.wvw.matchDetails('1-1').done(function (details) {
      console.log(details);
    });

###gw2.wvw.matchIdFromWorldId(worldId)
* Retrieves the `matchId` based on a given `worldId`
* Returns [Promise](http://api.jquery.com/deferred.promise/)

####Example
    gw2.wvw.matchIdFromWorldId(1019).done(function (matchId) {
      console.log(matchId);
    });

###gw2.wvw.objectiveNames(options)
* Retrieves an array of WvW objectives from [objective\_names.json](http://wiki.guildwars2.com/wiki/API:1/wvw/objective_names).
* Supported [options](options.md): cache, noNormalize, lang
* Returns [Promise](http://api.jquery.com/deferred.promise/)

####Example
    gw2.wvw.objectiveNames().done(function (objectives) {
      console.log(objectives);
    });

###gw2.wvw.objectiveNamesAsObject(options)
* Retrieves an object containing objective names represented as a id:name key-pair. All ids are integers.
* Supported [options](options.md): cache, lang
* Returns [Promise](http://api.jquery.com/deferred.promise/)

####Example
    gw2.wvw.objectiveNamesAsObject().done(function (objectives) {
      console.log(objectives[9]) /* Castle */
    });

###gw2.wvw.objectiveName(objectiveId, options)
* Retrieves the name of the objective as it is listed in the API
* Supported [options](options.md): lang
* Returns [Promise](http://api.jquery.com/deferred.promise/)

####Example
    gw2.wvw.objectiveName(9).done(function (name) {
      console.log(name); // returns 'Castle'
    });

###gw2.wvw.objectiveFullName(objectiveId, options)
* Retrieves the full name of the objective; based on [this data](https://gist.github.com/codemasher/bac2b4f87e7af128087e).
* Supported [options](options.md): lang
* Returns [Promise](http://api.jquery.com/deferred.promise/)

####Example
    gw2.wvw.objectiveFullName(9).done(function (name) {
      console.log(name); // returns 'Stonemist Castle'`
    });

###gw2.wvw.objectiveFullNamesAsObject(options)
* Retrieves an object containing full objective names represented as a id:name key-pair. All ids are integers. Based on [this data](https://gist.github.com/codemasher/bac2b4f87e7af128087e).
* Supported [options](options.md): lang
* Returns [Promise](http://api.jquery.com/deferred.promise/)

####Example
    gw2.wvw.objectiveFullNamesAsObject().done(function (objectivesNames) {
      console.log(objectivesNames[9]) /* Stonemist Castle */
    });`

###gw2.wvw.objectiveValue(objectiveId)
* Retrieves the point value of a WvW objective.
* Returns [Promise](http://api.jquery.com/deferred.promise/)

####Example
    gw2.wvw.objectiveValue(9).done(function (value) {
      console.log(value); /* 35 */
    });

###gw2.wvw.potentialPoints(worldId, map)
* Retrieves an integer representing current potential points a team can win at the next WvW point accumulation based on the objectives they currently hold. If map is provided it can be used to only get potential points for a specific map: "red", "green", "blue" or "center"
* Protip: When specifying a map, the first character is all that matters you can just use 'r', 'g', 'b' or 'c' if you like.
* Returns [Promise](http://api.jquery.com/deferred.promise/)

####Example
    gw2.wvw.potentialPoints(1019).done(function (points) {
      console.log(points);
    });

##Map methods
###gw2.map.continents(options)
* Retrieves information about continents from [continents.json](http://wiki.guildwars2.com/wiki/API:1/continents)
* Supported [options](options.md): cache, raw, lang
* Returns [Promise](http://api.jquery.com/deferred.promise/)
 
####Example
    gw2.map.continents().done(function (continents) {
      console.log(continents);
    });

###gw2.map.maps(mapId, options)
* Retrieves map summary information from [maps.json](http://wiki.guildwars2.com/wiki/API:1/maps).
* mapId is optional, use `null` if you want to specify options without a mapId: `gw2.map.maps(null, {lang: 'es'})`. By default, without the `raw` option,  the library removes as much extraneous data as is possible. If **no mapId** is specified, an object keyed with map ids is returned. If a **mapId is** just the object representing that map is returned.
* Supported [options](options.md): cache, raw, lang
* Returns [Promise](http://api.jquery.com/deferred.promise/)

####Example
    gw2.map.maps().done(function (maps) {
      console.log(maps);
    });

###gw2.map.mapFloor(continentId, floor, options)
* Gets detailed information about a map floor from [map\_floor.json](http://wiki.guildwars2.com/wiki/API:1/map_floor)
* `continentId` and `floor` can be obtained from `gw2.map.maps()`.
* Supported [options](options.md): cache, lang
* Returns [Promise](http://api.jquery.com/deferred.promise/)

####Example
    gw2.map.maps().done(function (maps) {
      console.log(maps);
    });

##Misc methods

###gw2.files(options)
* Retrieves an object containing file information about images for commonly used game assets from [files.json](http://wiki.guildwars2.com/wiki/API:1/files).
* Supported [options](options.md): cache
* Returns [Promise](http://api.jquery.com/deferred.promise/)

####Example
    gw2.files().done(function (files) {
      console.log(files['map_dungeon'].file_id); // 102478
    });

###gw2.render(object, config)
* If passed and object returned by `gw2.itemDetails` or one of the properties of the object returned by `gw2.files`, will return a string representing the URL of an item's icon provided by the [render service](http://wiki.guildwars2.com/wiki/API:Render_service).
* config: format - either 'jpg' or 'png'; defaults to 'jpg'
* Returns String

####Example
    gw2.itemDetails(417).done(function (item) {
      console.log(gw2.render(item, {format: 'png'})); // https://render.guildwars2.com/file/9CD8B8786A6F047FD375A7E5301A52320AD60ACC/61012.png
    });

###gw2.clearCache()
* By default the library makes an effort to cache data for reasonable periods of time. `clearCache` will clear the entire internal cache, useful if you detect a new game build and want to make sure you have the freshest data.

####Example
    gw2.clearCache();

###gw2.noConflict()
* Returns a reference to the library and resets the `gw2` global variable to whatever it was before the library was loaded.

####Example
    var myGw2 = gw2.noConflict();
    console.log(window.gw2); // undefined

##Cache
###gw2.cache()
Returns an instance of [daCache](https://github.com/uselesscode/daCache), the library's internal caching mechanism; check out the daCache documentation for more details on using it.
