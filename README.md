gwII is a library for dealing with the [Guild Wars 2 REST API](http://wiki.guildwars2.com/wiki/API:Main).
Not only does it allow access to the API, it also provides other methods to make dealing with the API easier. It also
handles caching the data you've downloaded and smooths out a few of the warts.

#Features

##Additional utility methods
API calls like `world_names.json` and `event_names.json` will give you an array of names and require you to
manually search them for the item you are looking for. gwII provides methods to make this easier such as
`gw2.worldNameFromId` and `gw2.eventNamesContaining`. Likewise, WvW methods like `gw2.wvw.potentialPoints`
to get the current score for a team with a single call.

##Asynchronous code with Deferred objects
One of the great strengths of AJAX is it's ability to do things asynchronously, gwII embraces this.
All methods return a jQuery [Deferred](http://api.jquery.com/category/deferred-object/) object allowing you to
write code that executes when your data is ready without blocking UI.

##Caching
All items are cached for appropriate lengths of time, although you can manually control caching via the `cache` option on many methods.

##Number normalization
A number of places in the API return numbers represented as strings. By default these numbers will automatically be cast to
number literals so you don't have to do it yourself.

##Removes unneeded structures
A number of the API calls return an object with a single property containing an array. By default gwII returns just the array.

#Requirements
[jQuery](http://jquery.com/) 1.7 or higher. To build you need [Grunt](http://gruntjs.com/) 0.4.1 or higher.

#Example

gwII attaches itself to an object called `gw2` in the global namespace.  To get the current points for all of the teams playing in Blackgate's WvWvW match you could do this:

    var failed = function () {
      $('#scores').text('Error getting scores');
    };

    gw2.worldNamesContaining('Blackgate').done(function (worlds) {
      var worldId = worlds[0].id;
      gw2.wvw.worldMatch(worldId).done(function (match) {
        $.when(gw2.worldNameFromId(match.red_world_id),
            gw2.worldNameFromId(match.green_world_id),
            gw2.worldNameFromId(match.blue_world_id),
            gw2.wvw.potentialPoints(match.red_world_id),
            gw2.wvw.potentialPoints(match.green_world_id),
            gw2.wvw.potentialPoints(match.blue_world_id)).then(function (redName, greenName, blueName,redPoints, greenPoints, bluePoints) {
              $('#scores').html(redName + ': ' + redPoints + '<br>\n' +
                greenName + ': ' + greenPoints + '<br>\n' +
                blueName + ': ' + bluePoints);
        }).fail(failed);
      }).fail(failed);
    });

#Building
After you clone the git repo, run `npm install` to install dependencies. Once the dependencies are installed build by running `grunt`.

#Thanks
* ArenaNet for providing such a great game and the API to interact with it.
* smiley.1438 for posting the list of [WvW objective names](https://forum-en.guildwars2.com/forum/community/api/WvW-objective-names/first#post2070405)
* The [APIMap](http://wiki.guildwars2.com/wiki/User:ThePointless/APIMap) ThePointless built was very helpful figuring out what strings needed to be converted to integers.
* Everyone participating in the [API developer community](https://forum-en.guildwars2.com/forum/community/api) for helping to refine and push the API forward.
* John Resig and the jQuery team.

#Contact
* [GitHub](https://github.com/uselesscode)
* In game and [GW2 forum](https://forum-en.guildwars2.com/forum): ElGreenGo.6734
