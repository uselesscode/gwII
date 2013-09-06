$.mockjax({
  responseTime: 10,
  url: 'https://api.guildwars2.com/v1/fake_endpoint',
  data: {
    id: 'test'
  },
  responseText: '{"test":"success with param"}'
});
$.mockjax({
  responseTime: 10,
  url: 'https://api.guildwars2.com/v1/fake_endpoint',
  data: {
    id: 'returnscopy'
  },
  responseText: '{"test": "value", "arr": [1, 2, 3, 4]}'
});
$.mockjax({
  responseTime: 10,
  url: 'https://api.guildwars2.com/v1/fake_endpoint',
  data: {},
  responseText: '{"test":"success"}'
});
$.mockjax({
  responseTime: 10,
  url: 'https://api.guildwars2.com/v1/fake_endpoint',
  responseText: {
    test: 'success'
  }
});

$.mockjax({
  responseTime: 10,
  url: 'https://api.guildwars2.com/v1/build.json',
  proxy: 'mocks/build.json'
});

$.mockjax({
  responseTime: 10,
  url: 'https://api.guildwars2.com/v1/items.json',
  proxy: 'mocks/items.json'
});

$.mockjax({
  responseTime: 10,
  url: 'https://api.guildwars2.com/v1/item_details.json',
  data: {
    item_id: '417',
    lang: 'en'
  },
  proxy: 'mocks/item_details_item_id-417.json'
});

$.mockjax({
  responseTime: 10,
  url: 'https://api.guildwars2.com/v1/item_details.json',
  data: {
    item_id: '15086',
    lang: 'en'
  },
  proxy: 'mocks/item_details_item_id-15086.json'
});

$.mockjax({
  responseTime: 10,
  url: 'https://api.guildwars2.com/v1/recipes.json',
  proxy: 'mocks/recipes.json'
});

$.mockjax({
  responseTime: 10,
  url: 'https://api.guildwars2.com/v1/recipe_details.json',
  data: {
    lang: 'en',
    recipe_id: 1275
  },
  proxy: 'mocks/recipe_details_en_recipe_id-1275.json'
});


$.mockjax({
  responseTime: 10,
  url: 'https://api.guildwars2.com/v1/world_names.json',
  data: {
    lang: 'en'
  },
  proxy: 'mocks/world_names_en.json'
});

$.mockjax({
  responseTime: 10,
  url: 'https://api.guildwars2.com/v1/world_names.json',
  data: {
    lang: 'es'
  },
  proxy: 'mocks/world_names_es.json'
});

$.mockjax({
  responseTime: 10,
  url: 'https://api.guildwars2.com/v1/map_names.json',
  data: {
    lang: 'en'
  },
  proxy: 'mocks/map_names_en.json'
});

$.mockjax({
  responseTime: 10,
  url: 'https://api.guildwars2.com/v1/map_names.json',
  data: {
    lang: 'es'
  },
  proxy: 'mocks/map_names_es.json'
});


$.mockjax({
  responseTime: 10,
  url: 'https://api.guildwars2.com/v1/event_names.json',
  data: {
    lang: 'en'
  },
  proxy: 'mocks/event_names_en.json'
});

$.mockjax({
  responseTime: 10,
  url: 'https://api.guildwars2.com/v1/event_names.json',
  data: {
    lang: 'es'
  },
  proxy: 'mocks/event_names_es.json'
});


$.mockjax({
  responseTime: 10,
  url: 'https://api.guildwars2.com/v1/events.json',
  data: {
    world_id: 1019,
    map_id: 15
  },
  proxy: 'mocks/events_world_id-1019_map_id-15.json'
});

$.mockjax({
  responseTime: 10,
  url: 'https://api.guildwars2.com/v1/events.json',
  data: {
    world_id: 1019
  },
  proxy: 'mocks/events_world_id-1019.json'
});

$.mockjax({
  responseTime: 10,
  url: 'https://api.guildwars2.com/v1/events.json',
  data: {
  },
  proxy: 'mocks/events.json'
});

$.mockjax({
  responseTime: 10,
  url: 'https://api.guildwars2.com/v1/events_details.json',
  data: {
    lang: 'en'
  },
  proxy: 'mocks/event_details_en.json'
});
$.mockjax({
  responseTime: 10,
  url: 'https://api.guildwars2.com/v1/events_details.json',
  data: {
    lang: 'es'
  },
  proxy: 'mocks/event_details_es.json'
});
$.mockjax({
  responseTime: 10,
  url: 'https://api.guildwars2.com/v1/events_details.json',
  data: {
    event_id: '31CEBA08-E44D-472F-81B0-7143D73797F5',
    lang: 'en'
  },
  proxy: 'mocks/event_details_en_-event_id-31CEBA08-E44D-472F-81B0-7143D73797F5.json'
});
$.mockjax({
  responseTime: 10,
  url: 'https://api.guildwars2.com/v1/events_details.json',
  data: {
    event_id: '31CEBA08-E44D-472F-81B0-7143D73797F5',
    lang: 'es'
  },
  proxy: 'mocks/event_details_es_-event_id-31CEBA08-E44D-472F-81B0-7143D73797F5.json'
});

$.mockjax({
  responseTime: 10,
  url: 'https://api.guildwars2.com/v1/guild_details.json',
  data: {
    guild_id: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
  },
  proxy: 'mocks/guild_details_guid-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.json'
});

$.mockjax({
  responseTime: 10,
  url: 'https://api.guildwars2.com/v1/guild_details.json',
  data: {
    guild_name: 'Fake Test Guild 2'
  },
  proxy: 'mocks/guild_details_guild_name-Fake Test Guild 2.json'
});

$.mockjax({
  responseTime: 10,
  url: 'https://api.guildwars2.com/v1/colors.json',
  data: {
    lang: 'en'
  },
  proxy: 'mocks/colors_en.json'
});

$.mockjax({
  responseTime: 10,
  url: 'https://api.guildwars2.com/v1/colors.json',
  data: {
    lang: 'es'
  },
  proxy: 'mocks/colors_es.json'
});

$.mockjax({
  responseTime: 10,
  url: 'https://api.guildwars2.com/v1/files.json',
  proxy: 'mocks/files.json'
});


// ------ WvWvW --------------------------
$.mockjax({
  responseTime: 10,
  url: 'https://api.guildwars2.com/v1/wvw/matches.json',
  proxy: 'mocks/wvw_matches.json'
});

$.mockjax({
  responseTime: 10,
  url: 'https://api.guildwars2.com/v1/wvw/match_details.json',
  data: {
    match_id: '1-1'
  },
  proxy: 'mocks/wvw_match_details_1-1.json'
});

$.mockjax({
  responseTime: 10,
  url: 'https://api.guildwars2.com/v1/wvw/objective_names.json',
  data: {
    lang: 'es'
  },
  proxy: 'mocks/objective_names-es.json'
});

$.mockjax({
  responseTime: 10,
  url: 'https://api.guildwars2.com/v1/wvw/objective_names.json',
  proxy: 'mocks/objective_names.json'
});


// ------ Maps ---------------------------
$.mockjax({
  responseTime: 10,
  url: 'https://api.guildwars2.com/v1/continents.json',
  data: {
    lang: 'en'
  },
  proxy: 'mocks/continents_en.json'
});

$.mockjax({
  responseTime: 10,
  url: 'https://api.guildwars2.com/v1/continents.json',
  data: {
    lang: 'es'
  },
  proxy: 'mocks/continents_es.json'
});

$.mockjax({
  responseTime: 10,
  url: 'https://api.guildwars2.com/v1/maps.json',
  data: {
    lang: 'en',
    map_id: 429
  },
  proxy: 'mocks/maps_map_id-429_lang-en.json'
});

$.mockjax({
  responseTime: 10,
  url: 'https://api.guildwars2.com/v1/maps.json',
  data: {
    map_id: 429,
    lang: 'es'
  },
  proxy: 'mocks/maps_map_id-429_lang-es.json'
});

$.mockjax({
  responseTime: 10,
  url: 'https://api.guildwars2.com/v1/maps.json',
  data: {
    lang: 'es'
  },
  proxy: 'mocks/maps_es.json'
});

$.mockjax({
  responseTime: 10,
  url: 'https://api.guildwars2.com/v1/maps.json',
  data: {
    lang: 'en'
  },
  proxy: 'mocks/maps.json'
});

$.mockjax({
  responseTime: 10,
  url: 'https://api.guildwars2.com/v1/map_floor.json',
  data: {
    continent_id: 1,
    floor: 1,
    lang: 'en'
  },
  proxy: 'mocks/map_floor_continent-1_floor-1_lang-en.json'
});

$.mockjax({
  responseTime: 10,
  url: 'https://api.guildwars2.com/v1/map_floor.json',
  data: {
    continent_id: 1,
    floor: 1,
    lang: 'es'
  },
  proxy: 'mocks/map_floor_continent-1_floor-1_lang-es.json'
});
