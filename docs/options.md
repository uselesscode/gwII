##lang
There is a library-wide language setting available via the `gw2.lang` property. If you would like to
override that setting for a single query you can use the `lang` option.

`gw2.mapNames({lang: 'es'}).done(function (nombres) {});`

##cache
If `cache` is `true`, if a cached copy exists it will always be used. If `cache` is `false`, a new API request will always be made even if a locally cached copy exists.
If you specify an integer, it will be used as the  number of milliseconds old a cached item must be before it expires. If you use `null`, any cached copies will be
ignored and anything retrieved will not be cached either; if the cache contained a previous value that value will remain in the cache.
All API calls have a reasonable default caching length, it should not be necessary to use the `cache` option unless you want very fine-grained control over caching.
It should be noted that the `cache` length is determined at the time of the call and previous calls do not effect the `cache` length of the current call.
For example, if you made a call using `true` and then six seconds later made a call using `5000`, the item would be considered expired and a new API request
would be sent.

`gw2.wvw.matchDetails('1-1', {cache: false}).done(function (details) { /* always downloads a new copy */});`
`gw2.wvw.matchDetails('1-1', {cache: 5000}).done(function (details) { /* uses cached copy if it is less than 5 seconds old */});`
`gw2.itemDetails(15086, {cache: true}).done(function (details) { /* always uses the cached copy */});`
`gw2.itemDetails(15086, {cache: null}).done(function (details) { /* gets a fresh copy, but does not store it in the cache */});`

##raw
By default, without the `raw` option,  the library removes as much extraneous data as is possible.
Several of the GW2 API calls return an object that contain a single property which contains an array
with the requested data. By default the library removes this unnecessary object and just returns the array.
In some cases the library will also remove other encasing structure if an optional parameter is provided. For instance,
`gw2.map.maps()` will return an object with a property for each map normally. If you specify a `mapId`, the object for that
map is returned, not wrapped in the extra object.
If `raw` is set to `true`, the entire object that the API returns will be returned.

`gw2.items({raw: true}).done(function (itemsObject) {});`

##noNormalize
Several of the GW2 API calls return properties that hold integers represented as strings. By default the
library will convert these strings into integers, or null if the string is empty. Setting the `noNormalize` option to true will disable
this automatic conversion.

`gw2.itemDetails(15086, {noNormalize: true}).done(function (details) {});`
