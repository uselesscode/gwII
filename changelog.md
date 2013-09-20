v1.0.3
* The new WvW objectives broke `gw2.wvw.potentialPoints`, this update
changes the way the value of objectives are calculated to correct
this. This change should also protect against future non-scoring
objectives interfering with score calculation.

* `gw2.wvw.objectiveFullName` and `gw2.wvw.objectiveFullNamesAsObject`
now include the names of the new objectives.

* All Unicode characters in items returned by `gw2.wvw.objectiveFullName`
and `gw2.wvw.objectiveFullNamesAsObject` should now be properly encoded.

v1.0.2
Fixing typo in 1.0.1 that caused error building. Adding built files.
Adding changelog.md

v1.0.1
Previously, when an API call was made the result was immediately
parsed into an object and then stored in the cache. Since objects
in JS are passed by reference, this led to the possibility of
objects stored in the cache being altered and no longer reflecting
the actual API response.

As of v1.0.1 the text of the response is stored in the cache and is
parsed every time it is returned, ensuring the cached response is
identical to the first one.
