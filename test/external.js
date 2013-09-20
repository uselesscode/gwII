module('Events');
asyncTest( "world_names.json english", function() {
  gw2.worldNames().done(function (worlds) {
    strictEqual(worlds.length, 52, 'There are 52 worlds');
    strictEqual(worlds[0].id, 1013, '1013 is the first id in the list');
    strictEqual(worlds[7].id, 1019, '1019 is the 8th id in the list');
    strictEqual(worlds[7].name, 'Blackgate', 'Blackgate is the 8th name in the list');
    strictEqual(worlds[23].id, 2000, '2000 is the 24th id in the list');
    strictEqual(worlds[23].name, 'TEST', 'TEST is the 24th name in the list');
    strictEqual(worlds[worlds.length - 1].id, 2011, '2011 is the last id in the list');
    start();
  });
});

asyncTest("worldNameFromId english", function() {
  gw2.worldNameFromId(1019).done(function (name) {
    strictEqual(name, 'Blackgate', 'Blackgate is server 1019');
    start();
  });
});

asyncTest( "world_names.json spanish", function() {
  gw2.worldNames({lang: 'es'}).done(function (worlds) {
    strictEqual(worlds.length, 52, 'There are 52 worlds');
    strictEqual(worlds[0].id, 1013, '1013 is the first id in the list');
    strictEqual(worlds[7].id, 1019, '1019 is the 8th id in the list');
    strictEqual(worlds[7].name, 'Puertanegra', 'Puertanegra is the 8th name in the list');
    strictEqual(worlds[23].id, 2000, '2000 is the 24th id in the list');
    strictEqual(worlds[23].name, 'TEST', 'TEST is the 24th name in the list');
    strictEqual(worlds[worlds.length - 1].id, 2011, '2011 is the last id in the list');
    start();
  });
});


/* //worldNameFromId does not support .lang
asyncTest("worldNameFromId spanish", function() {
  gw2.worldNameFromId(1019, {lang: 'es'}).done(function (name) {
    strictEqual(name, 'Puertanegra', 'Puertanegra is server 1019');
    start();
  });
});
*/

asyncTest("worldNamesContaining english", function() {
  gw2.worldNamesContaining('Black', {lang: 'en'}).done(function (names) {
    strictEqual(names.length, 2, '2 servers with Black in their name');
    strictEqual(names[0].name, 'Blackgate', 'Blackgate is first');
    strictEqual(names[1].name, 'Blacktide', 'Blacktide is second');
    start();
  });
});


asyncTest( "map_names.json english", function() {
  gw2.mapNames().done(function (names) {
    strictEqual(names.length, 28, 'There are 27 map names');
    strictEqual(names[0].id, 50, '"50" is the first id in the list');
    strictEqual(names[0].name, 'Lion\'s Arch', '"Lion\'s Arch" is the first map name');
    strictEqual(names[5].id, 10000, '"10000" is the 6th id in the list');
    strictEqual(names[names.length - 1].name, 'Caledon Forest', '"Caledon Forest" is the last map name in the list');
    start();
  });
});

asyncTest( "map_names.json spanish", function() {
  gw2.mapNames({lang: 'es'}).done(function (names) {
    strictEqual(names.length, 28, 'There are 27 map names');
    strictEqual(names[0].id, 50, '"50" is the first id in the list');
    strictEqual(names[0].name, 'Arco del León', '"Arco del León" is the first map name');
    strictEqual(names[5].id, 10000, '"10000" is the 6th id in the list');
    strictEqual(names[names.length - 1].name, 'Bosque de Caledon', '"Bosque de Caledon" is the last map name in the list');
    start();
  });
});


asyncTest( "mapName() english", function() {
  gw2.mapName(15).done(function (name) {
    strictEqual(name, 'Queensdale', 'Queensdale is map 15');
    start();
  });
});

// doesn't support .lang (or other options) for now
//asyncTest( "mapName() spanish", function() {
//  gw2.mapName(15, {lang: 'es'}).done(function (names) {
//    strictEqual(name, 'Queensdale', 'Queensdale is map 15');
//    start();
//  });
//});

asyncTest( "event_names.json english", function() {
  gw2.eventNames().done(function (names) {
    strictEqual(names.length, 1656, 'There are 1656 event names');
    strictEqual(names[0].id, 'BAD81BA0-60CF-4F3B-A341-57C426085D48', 'BAD81BA0-60CF-4F3B-A341-57C426085D48 is the first id in the list');
    strictEqual(names[0].name, 'Moa Racer Meep', '"Moa Racer Meep" is the first event name');
    strictEqual(names[5].id, 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx is the 6th id in the list');
    strictEqual(names[names.length - 1].name, 'Defend the mosshearts from the Nightmare Court.', '"Defend the mosshearts from the Nightmare Court." is the last event name in the list');
    start();
  });
});
asyncTest( "event_names.json spanish", function() {
  gw2.eventNames({lang: 'es'}).done(function (names) {
    strictEqual(names.length, 1656, 'There are 1656 event names');
    strictEqual(names[0].id, 'BAD81BA0-60CF-4F3B-A341-57C426085D48', 'BAD81BA0-60CF-4F3B-A341-57C426085D48 is the first id in the list');
    strictEqual(names[0].name, 'Meep, moa de carreras', '"Meep, moa de carreras" is the first event name');
    strictEqual(names[5].id, 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx is the 6th id in the list');
    strictEqual(names[names.length - 1].name, 'Defiende a los corazones de musgo de la Corte de la Pesadilla.', '"Defiende a los corazones de musgo de la Corte de la Pesadilla." is the last event name in the list');
    start();
  });
});

asyncTest( "eventNamesAsObject english", function() {
  gw2.eventNamesAsObject().done(function (names) {
    strictEqual(names['BAD81BA0-60CF-4F3B-A341-57C426085D48'], 'Moa Racer Meep', '"Moa Racer Meep" is the first event "BAD81BA0-60CF-4F3B-A341-57C426085D48"');
    strictEqual(names['xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'], 'THIS IS NOT A REAL EVENT', '"THIS IS NOT A REAL EVENT" is the "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"');
    start();
  });
});
asyncTest( "eventNamesAsObject spanish", function() {
  gw2.eventNamesAsObject({lang: 'es'}).done(function (names) {
    strictEqual(names['BAD81BA0-60CF-4F3B-A341-57C426085D48'], 'Meep, moa de carreras', '"Meep, moa de carreras" is the first event "BAD81BA0-60CF-4F3B-A341-57C426085D48"');
    strictEqual(names['xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'], 'THIS IS NOT A REAL EVENT', '"THIS IS NOT A REAL EVENT" is the "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"');
    start();
  });
});



asyncTest( "events world_id: 1019, map_id: 15", function() {
  gw2.events({worldId: 1019, mapId: 15}).done(function (events) {
    strictEqual(events.length, 74, 'There are 74 events');
    strictEqual(events[1].event_id, 'EB075F84-830F-49ED-9676-91C180568F3B', 'EB075F84-830F-49ED-9676-91C180568F3B is the second event_id in the list');
    strictEqual(events[1].map_id, 15, '15 is the second map_id in the list');
    strictEqual(events[1].state, 'Success', 'Success is the second state in the list');
    strictEqual(events[2].state, 'Warmup', 'Warmup is the thrid state in the list');
    strictEqual(events[3].state, 'Success', 'Success is the fourth state in the list');
    strictEqual(events[4].state, 'Fail', 'Fail is the fifth state in the list');
    start();
  });
});

asyncTest( "events world_id: 1019", function() {
  gw2.events({worldId: 1019}).done(function (events) {
    strictEqual(events.length, 1655, 'There are 1655 events');
    strictEqual(events[1].event_id, '330BE72A-5254-4036-ACB6-7AEED05A521C', '330BE72A-5254-4036-ACB6-7AEED05A521C is the second event_id in the list');
    strictEqual(events[1].map_id, 50, '50 is the second map_id in the list');
    strictEqual(events[1].state, 'Success', 'Success');
    strictEqual(events[6].state, 'Preparation', 'Preparation');
    strictEqual(events[14].state, 'Warmup', 'Warmup');
    strictEqual(events[54].state, 'Fail', 'Fail');
    start();
  });
});

asyncTest( "events.json no params", function() {
  gw2.events().done(function (events) {
    strictEqual(events.length, 84405, 'There are 84405 events');
    strictEqual(events[1].event_id, '330BE72A-5254-4036-ACB6-7AEED05A521C', '330BE72A-5254-4036-ACB6-7AEED05A521C is the second event_id in the list');
    strictEqual(events[1].map_id, 50, '50 is the second map_id in the list');
    strictEqual(events[1].state, 'Active', 'Active');
    strictEqual(events[38].state, 'Preparation', 'Preparation');
    strictEqual(events[36].state, 'Inactive', 'Inactive');
    strictEqual(events[42].state, 'Fail', 'Fail');
    start();
  });
});

asyncTest("eventNamesContaining 'Troll' english", function() {
  gw2.eventNamesContaining('Troll', {lang: 'en'}).done(function (names) {
    strictEqual(names.length, 15, '15 servers with Black in their name');
    strictEqual(names[0].name, 'Kill the rampaging jungle troll.', '"Kill the rampaging jungle troll." is first');
    strictEqual(names[1].name, 'Kill the Risen wizard patrolling the Vizier\'s Tower.', '"Kill the Risen wizard patrolling the Vizier\'s Tower." is second');
    strictEqual(names[names.length - 1].name, 'Defeat the enraged troll king.', '"Defeat the enraged troll king." is last');
    start();
  });
});

asyncTest("eventNamesContaining /\bTroll\b/i english", function() {
  gw2.eventNamesContaining(/\bTroll\b/i, {lang: 'en'}).done(function (names) {
    strictEqual(names.length, 9, '9 servers with Black in their name');
    strictEqual(names[0].name, 'Kill the rampaging jungle troll.', '"Kill the rampaging jungle troll." is first');
    strictEqual(names[1].name, 'Slay the massive jungle troll.', '"Slay the massive jungle troll." is second');
    strictEqual(names[names.length - 1].name, 'Defeat the enraged troll king.', '"Defeat the enraged troll king." is last');
    start();
  });
});

asyncTest("eventDetails()", function() {
  gw2.eventDetails().done(function (allDetails) {
    strictEqual(allDetails['EED8A79F-B374-4AE6-BA6F-B7B98D9D7142'].name, 'Defeat the renegade charr.', 'Event is named "Defeat the renegade charr."');
    strictEqual(allDetails['EED8A79F-B374-4AE6-BA6F-B7B98D9D7142'].level, 42, 'Event is a level 42 event');
    strictEqual(allDetails['31CEBA08-E44D-472F-81B0-7143D73797F5'].name, 'Defeat the shadow behemoth.', 'Event is named "Defeat the shadow behemoth."');
    strictEqual(allDetails['31CEBA08-E44D-472F-81B0-7143D73797F5'].level, 15, 'Event is a level 15 event');

    start();
  }).fail(failAsyncTest);
});
asyncTest("eventDetails(null, {lang: 'es'})", function() {
  gw2.eventDetails(null, {lang: 'es'}).done(function (allDetails) {
    strictEqual(allDetails['EED8A79F-B374-4AE6-BA6F-B7B98D9D7142'].name, 'Elimina al charr renegado.', 'Event is named "Elimina al charr renegado."');
    strictEqual(allDetails['EED8A79F-B374-4AE6-BA6F-B7B98D9D7142'].level, 42, 'Event is a level 42 event');
    strictEqual(allDetails['31CEBA08-E44D-472F-81B0-7143D73797F5'].name, 'Derrota al Behemot de las sombras.', 'Event is named "Derrota al Behemot de las sombras."');
    strictEqual(allDetails['31CEBA08-E44D-472F-81B0-7143D73797F5'].level, 15, 'Event is a level 15 event');

    start();
  }).fail(failAsyncTest);
});
asyncTest("eventDetails('31CEBA08-E44D-472F-81B0-7143D73797F5')", function() {
  gw2.eventDetails('31CEBA08-E44D-472F-81B0-7143D73797F5').done(function (details) {
    strictEqual(details.name, 'Defeat the shadow behemoth.', 'Event is named "Defeat the shadow behemoth."');
    strictEqual(details.level, 15, 'Event is a level 15 event');

    start();
  }).fail(failAsyncTest);
});
asyncTest("eventDetails('31CEBA08-E44D-472F-81B0-7143D73797F5', {lang: 'es'})", function() {
  gw2.eventDetails('31CEBA08-E44D-472F-81B0-7143D73797F5', {lang: 'es'}).done(function (details) {
    strictEqual(details.name, 'Derrota al Behemot de las sombras.', 'Event is named "Derrota al Behemot de las sombras."');
    strictEqual(details.level, 15, 'Event is a level 15 event');

    start();
  }).fail(failAsyncTest);
});

module('Items');
asyncTest( "items.json", function() {
  gw2.items().done(function (items) {
    strictEqual(items.length, 20, 'There are 20 items in items.json');
    strictEqual(items[0], 12546, '12546 is the first id in the list');
    strictEqual(items[11], 4323, '4323 is the twelth id in the list');
    strictEqual(items[items.length - 1], 21218, '21218 is the last id in the list');
    start();
  });
});

asyncTest( "items.json raw", function() {
  gw2.items({raw: true}).done(function (items) {
    strictEqual(items.items.length, 20, 'There are 20 items in items.json');
    strictEqual(items.items[0], 12546, '12546 is the first id in the list');
    strictEqual(items.items[11], 4323, '4323 is the twelth id in the list');
    strictEqual(items.items[items.items.length - 1], 21218, '21218 is the last id in the list');
    start();
  });
});

asyncTest( "item_details.json", function() {
  gw2.itemDetails(417).done(function (item) {
    strictEqual(item.item_id, 417, 'There are 20 items in items.json');
    strictEqual(item.name, 'Strong Worn Scale Boots of Infiltration', 'Strong Worn Scale Boots of Infiltration');
    strictEqual(item.type, 'Armor', 'Armor');
    strictEqual(item.level, 38, 'level 38');
    strictEqual(item.vendor_value, 72, 'vendor value 72');
    strictEqual(item.game_types.join(','), 'Activity,Dungeon,Pve,Wvw', 'gametypes: Activity,Dungeon,Pve,Wvw');
    strictEqual(item.armor.infix_upgrade.attributes[0].attribute, 'Power', 'power upgrade');
    strictEqual(item.armor.infix_upgrade.attributes[0].modifier, 10, 'power upgrade modifier');
    strictEqual(item.armor.suffix_item_id, 24705, '24705 is the suffix item id');
    start();
  });
});

asyncTest( "item_details.json noNormalize", function() {
  gw2.itemDetails(417, {noNormalize: true}).done(function (item) {
    strictEqual(item.item_id, '417', 'There are 20 items in items.json');
    strictEqual(item.name, 'Strong Worn Scale Boots of Infiltration', 'Strong Worn Scale Boots of Infiltration');
    strictEqual(item.type, 'Armor', 'Armor');
    strictEqual(item.level, '38', 'level 38');
    strictEqual(item.vendor_value, '72', 'vendor value 72');
    strictEqual(item.game_types.join(','), 'Activity,Dungeon,Pve,Wvw', 'gametypes: Activity,Dungeon,Pve,Wvw');
    strictEqual(item.armor.infix_upgrade.attributes[0].attribute, 'Power', 'power upgrade');
    strictEqual(item.armor.infix_upgrade.attributes[0].modifier, '10', 'power upgrade modifier');
    strictEqual(item.armor.suffix_item_id, '24705', '24705 is the suffix item id');
    start();
  });
});

asyncTest( "item_details.json no suffix_item_id", function() {
  gw2.itemDetails(15086).done(function (item) {
    strictEqual(item.item_id, 15086, 'There are 20 items in items.json');
    strictEqual(item.name, 'Hearty Iron Shield', 'Hearty Iron Shield');
    strictEqual(item.weapon.suffix_item_id, null, 'null is the suffix item id');
    start();
  });
});

asyncTest( "item_details.json no suffix_item_id noNormalize", function() {
  gw2.itemDetails(15086, {noNormalize: true}).done(function (item) {
    strictEqual(item.item_id, '15086', 'There are 20 items in items.json');
    strictEqual(item.name, 'Hearty Iron Shield', 'Hearty Iron Shield');
    strictEqual(item.weapon.suffix_item_id, '', '"" is the suffix item id');
    start();
  });
});

module('Recipes');
asyncTest( "recipes.json", function() {
  gw2.recipes().done(function (items) {
    strictEqual(items.length, 7033, 'There are 7033 items in recipes.json');
    strictEqual(items[0], 1275, '1275 is the first id in the list');
    strictEqual(items[11], 1346, '1346 is the twelth id in the list');
    strictEqual(items[items.length - 1], 5010, '5010 is the last id in the list');
    start();
  });
});

asyncTest( "recipe_details.json", function() {
  gw2.recipeDetails(1275).done(function (recipe) {
    strictEqual(recipe.recipe_id, 1275, '1275 is the recipe_id');
    strictEqual(recipe.type, 'Coat', '"Coat" is the type');
    strictEqual(recipe.disciplines.length, 1, 'There is 1 discipline that can craft it');
    strictEqual(recipe.disciplines[0], 'Leatherworker', '"Leatherworker" is the first discipline that can craft it');
    strictEqual(recipe.flags.length, 0, 'No flags');
    strictEqual(recipe.ingredients.length, 3, '3 ingredients');
    strictEqual(recipe.ingredients[0].item_id, 19797, 'Ingredient #1 is has an item_id of "19797"');
    strictEqual(recipe.ingredients[0].count, 1, 'uses 1 of ingredient #1');
    strictEqual(recipe.ingredients[1].item_id, 13094, 'Ingredient #2 is has an item_id of "13094"');
    strictEqual(recipe.ingredients[1].count, 1, 'uses 1 of ingredient #2');
    strictEqual(recipe.ingredients[2].item_id, 13093, 'Ingredient #3 is has an item_id of "13093"');
    strictEqual(recipe.ingredients[2].count, 1, 'uses 1 of ingredient #3');
    start();
  });
});


module('Misc');

asyncTest( "build", function() {
  gw2.build().done(function (build) {
    strictEqual(build, 8675309, 'Build is 8675309');
    start();
  });
});

asyncTest( "guild_details.json via id", function() {
  gw2.guildDetails({guildId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"}).done(function (details) {
    strictEqual(details.guild_name, 'Fake Test Guild', '"Fake Test Guild" is the guild name');
    strictEqual(details.tag, 'FTG', '"FTG" is the guild tag');
    strictEqual(details.emblem.foreground_id, 159, 'Friendly beaver flag');
    start();
  });
});

asyncTest("guild_details.json via name", function() {
  gw2.guildDetails({guildName: 'Fake Test Guild 2'}).done(function (details) {
    strictEqual(details.guild_name, 'Fake Test Guild 2', '"Fake Test Guild 2" is the guild name');
    strictEqual(details.tag, 'FTG2', '"FTG2" is the guild tag');
    strictEqual(details.emblem.foreground_id, 159, 'Friendly beaver flag');
    start();
  });
});

asyncTest( "colors.json english", function() {
  gw2.colors().done(function (colors) {
    strictEqual(colors[1].name, 'Dye Remover', '"Dye Remover" is dye color "1"');
    strictEqual(colors[2].name, 'Black', '"Black" is dye color "2"');
    strictEqual(colors[1242].name, 'Cinders', '"Cinders" is dye color "1242"');
    start();
  });
});

asyncTest( "colors.json spanish", function() {
  gw2.colors({lang: 'es'}).done(function (colors) {
    strictEqual(colors[1].name, 'Disolvente de tinte', '"Disolvente de tinte" is dye color "1"');
    strictEqual(colors[2].name, 'Negro', '"Negro" is dye color "2"');
    strictEqual(colors[1242].name, 'Ceniza', '"Ceniza" is dye color "1242"');
    start();
  });
});

asyncTest( "files.json", function() {
  gw2.files().done(function (files) {

    var length = 0;
    $.each(files, function () {
        length += 1;
    });

    strictEqual(length, 13, 'There are 13 items in files.json');
    strictEqual(files['map_dungeon'].file_id, 102478, 'The file_id of map_dungeon is 102478');
    strictEqual(files['map_dungeon'].signature, '943538394A94A491C8632FBEF6203C2013443555', 'The signature of map_dungeon is 943538394A94A491C8632FBEF6203C2013443555');

    strictEqual(files['map_waypoint_hover'].file_id, 157354, 'The file_id of map_waypoint_hover is 157354');
    strictEqual(files['map_waypoint_hover'].signature, '95CE3F6B0502232AD90034E4B7CE6E5B0FD3CC5F', 'The signature of map_waypoint_hover is 95CE3F6B0502232AD90034E4B7CE6E5B0FD3CC5F');
    start();
  });
});

module('WvW');

asyncTest( "matches.json", function() {
  gw2.wvw.matches().done(function (matches) {
    strictEqual(matches.length, 17, '17 items in match list');
    strictEqual(matches[0].wvw_match_id, '1-2', 'match 1-2 is first in the list');
    start();
  });
});

asyncTest( "match 1-1", function() {
  gw2.wvw.match('1-1').done(function (match) {
    strictEqual(match.wvw_match_id, '1-1', 'match 1-1');
    strictEqual(match.red_world_id, 1019, '1019 is red');
    strictEqual(match.blue_world_id, 1008, '1008 is blue');
    strictEqual(match.green_world_id, 1013, '1013 is green');
    strictEqual(match.start_time, '2013-09-14T01:00:00Z', 'match started at 2013-09-14T01:00:00Z');
    strictEqual(match.end_time, '2013-09-21T01:00:00Z', 'match started at 2013-09-21T01:00:00Z');

    start();
  });
});

asyncTest( "matchIdFromWorldId", function() {
  gw2.wvw.matchIdFromWorldId(1008).done(function (matchId) {
    strictEqual(matchId, '1-1', 'match 1-1');
    start();
  });
});

asyncTest( "worldMatch", function() {
  gw2.wvw.worldMatch(1008).done(function (match) {
    strictEqual(match.wvw_match_id, '1-1', 'match 1-1');
    strictEqual(match.red_world_id, 1019, '1019 is red');
    strictEqual(match.blue_world_id, 1008, '1008 is blue');
    strictEqual(match.green_world_id, 1013, '1013 is green');
    strictEqual(match.start_time, '2013-09-14T01:00:00Z', 'match started at 2013-09-14T01:00:00Z');
    strictEqual(match.end_time, '2013-09-21T01:00:00Z', 'match started at 2013-09-21T01:00:00Z');

    start();
  });
});

asyncTest( "match_details.json", function() {
  gw2.wvw.matchDetails('1-1').done(function (details) {
    strictEqual(details.match_id, '1-1', 'match 1-1');
    strictEqual(details.scores[0], 170999, 'team #1 score 109893');
    strictEqual(details.scores[1], 150218, 'team #1 score 123736');
    strictEqual(details.scores[2], 163297, 'team #1 score 133075');

    strictEqual(details.maps[0].type, 'RedHome', 'The fisrt map is red');
    strictEqual(details.maps[1].type, 'GreenHome', 'The second map is green');
    strictEqual(details.maps[2].type, 'BlueHome', 'The third map is blue');
    
    strictEqual(details.maps[0].objectives[0].id, 32, 'objective #32 is first');
    strictEqual(details.maps[0].objectives[0].owner, 'Blue', 'Blue owns objective #32');
    strictEqual(details.maps[0].objectives[5].id, 37, 'objective #37 is 6th');
    strictEqual(details.maps[0].objectives[5].owner, 'Red', 'Red owns objective #37');
    strictEqual(details.maps[0].objectives[5].owner_guild, 'E0CA6580-FFEC-406E-B738-B477B1FE9C78', '"Army Of Lightness" claimed objective #37');

    start();
  });
});

asyncTest( "objectiveNames.json", function() {
  var options = {};
  gw2.wvw.objectiveNames(options).done(function (names) {
    strictEqual(names.length, 76, 'There are 76 objectives');
    deepEqual(names[0].id, 30, 'The first item has an id of 30');
    deepEqual(names[0].name, 'Tower', 'The first item has a name of Tower');
    start();
  });
});
asyncTest( "objectiveNames.json noNormalize", function() {
  var options = {noNormalize: true};
  gw2.wvw.objectiveNames(options).done(function (names) {
    strictEqual(names.length, 76, 'There are 76 objectives');
    deepEqual(names[0].id, '30', 'The first item has an id of 30');
    deepEqual(names[0].name, 'Tower', 'The first item has a name of Tower');
    start();
  });
});
asyncTest( "objectiveNames.json {lang: 'es'}", function() {
  var options = {lang: 'es'};
  gw2.wvw.objectiveNames(options).done(function (names) {
    strictEqual(names.length, 76, 'There are 76 objectives');
    deepEqual(names[0].id, 30, 'The first item has an id of 30');
    deepEqual(names[0].name, 'Torre', 'The first item has a name of Tower');
    start();
  });
});
asyncTest( "objectiveNames.json {noNormalize: true, lang: 'es'}", function() {
  var options = {noNormalize: true, lang: 'es'};
  gw2.wvw.objectiveNames(options).done(function (names) {
    strictEqual(names.length, 76, 'There are 76 objectives');
    deepEqual(names[0].id, '30', 'The first item has an id of 30');
    deepEqual(names[0].name, 'Torre', 'The first item has a name of Tower');
    start();
  });
});

asyncTest( "objectiveNamesAsObject", function() {
  gw2.wvw.objectiveNamesAsObject().done(function (names) {
    strictEqual(names[30], 'Tower', '30 is a Tower');
    strictEqual(names[57], 'Tower', '57 is a Tower');
    strictEqual(names[9], 'Castle', '9 is the Castle');
    strictEqual(names[32], 'Keep', '32 is a Keep');
    strictEqual(names[60], 'Lumber Mill', '60 is a Lumber Mill');
    start();
  });
});
asyncTest( "objectiveNamesAsObject", function() {
  gw2.wvw.objectiveNamesAsObject({lang: 'es'}).done(function (names) {
    strictEqual(names[30], 'Torre', '30 is a Tower');
    strictEqual(names[57], 'Torre', '57 is a Tower');
    strictEqual(names[9], 'Castillo', '9 is the Castle');
    strictEqual(names[32], 'Fortaleza', '32 is a Keep');
    strictEqual(names[60], 'Aserradero', '60 is a Lumber Mill');
    start();
  });
});

asyncTest( "objectiveName", function() {
  gw2.wvw.objectiveName(9).done(function (name) {
    strictEqual(name, 'Castle', 'objectiveId 9 is "Castle"');
    start();
  });
});

asyncTest( "objectiveFullName default lang (en)", function() {
  gw2.wvw.objectiveFullName(9).done(function (name) {
    strictEqual(name, 'Stonemist Castle', 'objectiveId 9 is "Stonemist Castle"');
    start();
  });
});

asyncTest( "objectiveFullName(9, {lang: 'en'})", function() {
  gw2.wvw.objectiveFullName(9, {lang: 'en'}).done(function (name) {
    strictEqual(name, 'Stonemist Castle', 'objectiveId 9 is "Stonemist Castle"');
    start();
  });
});

asyncTest( "objectiveFullName(9, {lang: 'es'})", function() {
  gw2.wvw.objectiveFullName(9, {lang: 'es'}).done(function (name) {
    strictEqual(name, 'Castillo Piedraniebla', 'objectiveId 9 is "Castillo Piedraniebla"');
    start();
  });
});

asyncTest( "objectiveFullName(9, {lang: 'de'})", function() {
  gw2.wvw.objectiveFullName(9, {lang: 'de'}).done(function (name) {
    strictEqual(name, 'Schloss Steinnebel', 'objectiveId 9 is "Schloss Steinnebel"');
    start();
  });
});

asyncTest( "objectiveFullName(9, {lang: 'fr'})", function() {
  gw2.wvw.objectiveFullName(9, {lang: 'fr'}).done(function (name) {
    strictEqual(name, 'Ch\xE2teau Brumepierre', 'objectiveId 9 is "Ch\xE2teau Brumepierre"');
    start();
  });
});

asyncTest( "objectiveFullNamesAsObject default lang (en)", function() {
  gw2.wvw.objectiveFullNamesAsObject().done(function (names) {
    strictEqual(names[30], 'Woodhaven', '30 is a Woodhaven');
    strictEqual(names[57], 'Cragtop', '57 is a Cragtop');
    strictEqual(names[9], 'Stonemist Castle', '9 is the Stonemist Castle');
    strictEqual(names[32], 'Etheron Hills', '32 is a Etheron Hills');
    strictEqual(names[60], 'Stargrove', '60 is a Stargrove');
    start();
  });
});

asyncTest( "objectiveFullNamesAsObject en", function() {
  gw2.wvw.objectiveFullNamesAsObject().done(function (names) {
    strictEqual(names[30], 'Woodhaven', '30 is a Woodhaven');
    strictEqual(names[57], 'Cragtop', '57 is a Cragtop');
    strictEqual(names[9], 'Stonemist Castle', '9 is the Stonemist Castle');
    strictEqual(names[32], 'Etheron Hills', '32 is a Etheron Hills');
    strictEqual(names[60], 'Stargrove', '60 is a Stargrove');
    start();
  });
});

asyncTest( "objectiveFullNamesAsObject es", function() {
  gw2.wvw.objectiveFullNamesAsObject({lang: 'es'}).done(function (names) {
    strictEqual(names[30], 'Refugio Forestal', '30 is Refugio Forestal');
    strictEqual(names[57], 'Cumbrepe\xF1asco', '57 is Cumbrepe\xF1asco');
    strictEqual(names[9], 'Castillo Piedraniebla', '9 is Castillo Piedraniebla');
    strictEqual(names[32], 'Colinas Etheron', '32 is Colinas Etheron');
    strictEqual(names[60], 'Arboleda de las Estrellas', '60 is Arboleda de las Estrellas');
    start();
  });
});

asyncTest( "objectiveFullNamesAsObject de", function() {
  gw2.wvw.objectiveFullNamesAsObject({lang: 'de'}).done(function (names) {
    strictEqual(names[30], 'Wald-Freistatt', '30 is Wald-Freistatt');
    strictEqual(names[57], 'Felsenspitze', '57 is Felsenspitze');
    strictEqual(names[9], 'Schloss Steinnebel', '9 is Schloss Steinnebel');
    strictEqual(names[32], 'Etheron-H\xFCgel', '32 is Etheron-H\xFCgel');
    strictEqual(names[60], 'Sternenhain', '60 is Sternenhain');
    start();
  });
});

asyncTest( "objectiveFullNamesAsObject fr", function() {
  gw2.wvw.objectiveFullNamesAsObject({lang: 'fr'}).done(function (names) {
    strictEqual(names[30], 'Gentesylve', '30 is a Gentesylve');
    strictEqual(names[57], 'Sommet de l\'escarpement', '57 is a Sommet de l\'escarpement');
    strictEqual(names[9], 'Ch\xE2teau Brumepierre', '9 is Ch\xE2teau Brumepierre');
    strictEqual(names[32], 'Collines d\'Etheron', '32 is Collines d\'Etheron');
    strictEqual(names[60], 'Bosquet stellaire', '60 is Bosquet stellaire');
    start();
  });
});

asyncTest( "potentialPoints", function() {
  gw2.wvw.potentialPoints(1008).done(function (points) {
    strictEqual(points, 170, 'red team has 170 points');
    start();
  });
});
asyncTest( "potentialPoints red map", function() {
  gw2.wvw.potentialPoints(1008, 'r').done(function (points) {
    strictEqual(points, 45, 'red map red team has 45 points');
    start();
  });
});
asyncTest( "potentialPoints green map", function() {
  gw2.wvw.potentialPoints(1008, 'g').done(function (points) {
    strictEqual(points, 20, 'green map red team has 20 points');
    start();
  });
});
asyncTest( "potentialPoints blue map", function() {
  gw2.wvw.potentialPoints(1008, 'b').done(function (points) {
    strictEqual(points, 25, 'blue map red team has 25 points');
    start();
  });
});
asyncTest( "potentialPoints center map", function() {
  gw2.wvw.potentialPoints(1008, 'c').done(function (points) {
    strictEqual(points, 80, 'center map red team has 80 points');
    start();
  });
});

module('Maps');

asyncTest("map.maps(429)", function() {
  gw2.map.maps(429).done(function (info) {
    strictEqual(info.map_name, 'Rage of the Minotaurs', '"Rage of the Minotaurs" is map 429');
    start();
  });
});
asyncTest("map.maps(429, {lang: 'es'})", function() {
  gw2.map.maps(429, {lang: 'es'}).done(function (info) {
    strictEqual(info.map_name, 'La rabia de los minotauros', '"La rabia de los minotauros" is map 429');
    start();
  });
});
asyncTest("map.maps()", function() {
  gw2.map.maps().done(function (info) {
    strictEqual(Object.keys(info).length, 503, 'There are 503 maps listed');
    strictEqual(info[429].map_name, 'Rage of the Minotaurs', '"Rage of the Minotaurs" is map 429');
    strictEqual(info[423].map_name, 'The Championship Fight', '"The Championship Fight" is map 423');
    start();
  });
});
asyncTest("map.maps(null, {lang: 'es'})", function() {
  gw2.map.maps(null, {lang: 'es'}).done(function (info) {
    strictEqual(Object.keys(info).length, 503, 'There are 503 maps listed');
    strictEqual(info[429].map_name, 'La rabia de los minotauros', '"La rabia de los minotauros" is map 429');
    strictEqual(info[423].map_name, 'La lucha del campeonato', '"La lucha del campeonato" is map 423');
    start();
  });
});

asyncTest("map.maps(429, {raw: true})", function() {
  gw2.map.maps(429, {raw: true}).done(function (maps) {
    strictEqual(Object.keys(maps.maps).length, 1, 'There 1 map listed');
    strictEqual(maps.maps[429].map_name, 'Rage of the Minotaurs', '"Rage of the Minotaurs" is map 429');
    start();
  });
});
asyncTest("map.maps(429, {lang: 'es', raw: true})", function() {
  gw2.map.maps(429, {lang: 'es', raw: true}).done(function (maps) {
    strictEqual(Object.keys(maps.maps).length, 1, 'There 1 map listed');
    strictEqual(maps.maps[429].map_name, 'La rabia de los minotauros', '"La rabia de los minotauros" is map 429');
    start();
  });
});
asyncTest("map.maps(null, {raw: true})", function() {
  gw2.map.maps(null, {raw: true}).done(function (maps) {
    strictEqual(Object.keys(maps.maps).length, 503, 'There are 503 maps listed');
    strictEqual(maps.maps[429].map_name, 'Rage of the Minotaurs', '"Rage of the Minotaurs" is map 429');
    strictEqual(maps.maps[423].map_name, 'The Championship Fight', '"The Championship Fight" is map 423');
    start();
  });
});
asyncTest("map.maps(null, {lang: 'es', raw: true})", function() {
  gw2.map.maps(null, {lang: 'es', raw: true}).done(function (maps) {
    strictEqual(Object.keys(maps.maps).length, 503, 'There are 503 maps listed');
    strictEqual(maps.maps[429].map_name, 'La rabia de los minotauros', '"La rabia de los minotauros" is map 429');
    strictEqual(maps.maps[423].map_name, 'La lucha del campeonato', '"La lucha del campeonato" is map 423');
    start();
  });
});

asyncTest("map.continents()", function() {
  gw2.map.continents().done(function (info) {
    strictEqual(Object.keys(info).length, 2, 'There are 2 continents');
    strictEqual(info[1].name, 'Tyria', '"Tyria" is continent #1');
    strictEqual(info[2].name, 'Mists', '"Mists" is continent #2');
    start();
  });
});
asyncTest("map.continents({lang: 'es'})", function() {
  gw2.map.continents({lang: 'es'}).done(function (info) {
    strictEqual(Object.keys(info).length, 2, 'There are 2 continents');
    strictEqual(info[1].name, 'Tyria', '"Tyria" is continent #1');
    strictEqual(info[2].name, 'La Niebla', '"La Niebla" is continent #2');
    start();
  });
});
asyncTest("map.continents() english raw", function() {
  gw2.map.continents({raw: true}).done(function (info) {
    strictEqual(Object.keys(info.continents).length, 2, 'There are 2 continents');
    strictEqual(info.continents[1].name, 'Tyria', '"Tyria" is continent #1');
    strictEqual(info.continents[2].name, 'Mists', '"Mists" is continent #2');
    start();
  });
});
asyncTest("map.continents({lang: 'es', raw: true})", function() {
  gw2.map.continents({lang: 'es', raw: true}).done(function (info) {
    strictEqual(Object.keys(info.continents).length, 2, 'There are 2 continents');
    strictEqual(info.continents[1].name, 'Tyria', '"Tyria" is continent #1');
    strictEqual(info.continents[2].name, 'La Niebla', '"La Niebla" is continent #2');
    start();
  });
});

asyncTest("map.mapFloors(1, 1)", function() {
  gw2.map.mapFloors(1, 1).done(function (info) {
    strictEqual(Object.keys(info).join(','), 'texture_dims,regions', 'Correct properties');
    strictEqual(info.regions[2].name, 'Ascalon', '"Ascalon" is region 2');
    strictEqual(info.regions[3].name, 'Ruins of Orr', '"Ruins of Orr" is region 3');
    start();
  });
});
asyncTest("map.mapFloors(1, 1, {lang: 'es'})", function() {
  gw2.map.mapFloors(1, 1, {lang: 'es'}).done(function (info) {
    strictEqual(Object.keys(info).join(','), 'texture_dims,regions', 'Correct properties');
    strictEqual(info.regions[2].name, 'Ascalon', '"Ascalon" is region 2');
    strictEqual(info.regions[3].name, 'Ruinas de Orr', '"Ruinas de Orr" is region 3');
    start();
  });
});

module('Render');
test('render({"icon_file_id": "61048", "icon_file_signature": "19F90C0019AF1F763A972B2C01FF424CA63D049C"}) default file extention', function () {
    var out = gw2.render({"icon_file_id": "61048", "icon_file_signature": "19F90C0019AF1F763A972B2C01FF424CA63D049C"});
    strictEqual(out, 'https://render.guildwars2.com/file/19F90C0019AF1F763A972B2C01FF424CA63D049C/61048.jpg', 'Correct url generated');
});
test('render({"icon_file_id": "61048", "icon_file_signature": "19F90C0019AF1F763A972B2C01FF424CA63D049C"}) jpg', function () {
    var options = {
      format: 'jpg'
    },
    out = gw2.render({"icon_file_id": "61048", "icon_file_signature": "19F90C0019AF1F763A972B2C01FF424CA63D049C"}, options);
    strictEqual(out, 'https://render.guildwars2.com/file/19F90C0019AF1F763A972B2C01FF424CA63D049C/61048.jpg', 'Correct url generated');
});
test('render({"icon_file_id": "61048", "icon_file_signature": "19F90C0019AF1F763A972B2C01FF424CA63D049C"}) .jpg', function () {
    var options = {
      format: '.jpg'
    },
    out = gw2.render({"icon_file_id": "61048", "icon_file_signature": "19F90C0019AF1F763A972B2C01FF424CA63D049C"}, options);
    strictEqual(out, 'https://render.guildwars2.com/file/19F90C0019AF1F763A972B2C01FF424CA63D049C/61048.jpg', 'Correct url generated');
});
test('render({"icon_file_id": "61048", "icon_file_signature": "19F90C0019AF1F763A972B2C01FF424CA63D049C"}) png', function () {
    var options = {
      format: 'png'
    },
    out = gw2.render({"icon_file_id": "61048", "icon_file_signature": "19F90C0019AF1F763A972B2C01FF424CA63D049C"}, options);
    strictEqual(out, 'https://render.guildwars2.com/file/19F90C0019AF1F763A972B2C01FF424CA63D049C/61048.png', 'Correct url generated');
});
test('render({"icon_file_id": "61048", "icon_file_signature": "19F90C0019AF1F763A972B2C01FF424CA63D049C"}) .png', function () {
    var options = {
      format: '.png'
    },
    out = gw2.render({"icon_file_id": "61048", "icon_file_signature": "19F90C0019AF1F763A972B2C01FF424CA63D049C"}, options);
    strictEqual(out, 'https://render.guildwars2.com/file/19F90C0019AF1F763A972B2C01FF424CA63D049C/61048.png', 'Correct url generated');
});

// files.json
test('map_dungeon render({file_id:102478, signature:"943538394A94A491C8632FBEF6203C2013443555"}) .png', function () {
    var options = {
      format: '.png'
    },
    out = gw2.render({file_id:102478, signature:'943538394A94A491C8632FBEF6203C2013443555'}, options);
    strictEqual(out, 'https://render.guildwars2.com/file/943538394A94A491C8632FBEF6203C2013443555/102478.png', 'Correct url generated');
});
test('map_dungeon render({file_id:102478, signature:"943538394A94A491C8632FBEF6203C2013443555"}) .jpg', function () {
    var options = {
      format: '.jpg'
    },
    out = gw2.render({file_id:102478, signature:'943538394A94A491C8632FBEF6203C2013443555'}, options);
    strictEqual(out, 'https://render.guildwars2.com/file/943538394A94A491C8632FBEF6203C2013443555/102478.jpg', 'Correct url generated');
});
test('map_dungeon render({file_id:102478, signature:"943538394A94A491C8632FBEF6203C2013443555"}) default', function () {
    var out = gw2.render({file_id:102478, signature:'943538394A94A491C8632FBEF6203C2013443555'});
    strictEqual(out, 'https://render.guildwars2.com/file/943538394A94A491C8632FBEF6203C2013443555/102478.jpg', 'Correct url generated');
});
test('render({})', function () {
    var out = gw2.render({});
    strictEqual(out, null, 'null returned');
});
