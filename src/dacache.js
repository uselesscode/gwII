/* daCache v1.0.0 2013-08-31
 * Copyright 2013 Peter Johnson
 * Licensed MIT, GPL-3.0
 * https://github.com/uselesscode/daCache
 */
var daCache = (function ($) {
  "use strict";

var now = function () {
    return (new Date()).getTime();
  },
  hasPromiseMethods = function (v) {
    if (v &&
        v.always &&
        v.done &&
        v.fail &&
        v.pipe &&
        v.progress &&
        v.promise &&
        v.state &&
        v.then) {
      return true;
    }
    return false;
  },
  hasDeferredMethods = function (v) {
    if (v &&
        v.notify &&
        v.notifyWith &&
        v.reject &&
        v.resolve &&
        v.resolveWith) {
      return true;
    }
    return false;
  },
  isDeferred = function (v) {
    if (hasPromiseMethods(v) && hasDeferredMethods(v)) {
      return true;
    }
    return false;
  },
  isExpired = function (record, cacheLength) {
    return record.timestamp + cacheLength < now();
  },
  daCache = function () {
    var cache = {};
    return {
      get: function (key, cacheLength, returnDeffered) {
        var out,
          cacheRecord = cache[key];

        // default to always cache
        if (cacheLength === undefined) {
          cacheLength = true;
        }

        if (cacheRecord) {
          // if the value is a deferred obj and it is still resolving
          if (isDeferred(cacheRecord.value) && cacheRecord.value.state() === 'pending') {
            out = cacheRecord.value;

          // if true always use cached, false never use cache
          // If we are caching and the timestamp has not expired, use cached copy
          } else if (cacheLength === true || (cacheLength !== false && !isExpired(cacheRecord, cacheLength))) {
            out = cacheRecord.value;
            if (returnDeffered && !isDeferred(out)) {
              (function (value) {
                out = $.Deferred();
                out.resolve(value);
              }(out));
            }
          }
        }

        return out;
      },
      set: function (key, value) {
        var n = now();
        cache[key] = {
          timestamp: n,
          value: value
        };
      },
      clear: function () {
        cache = {};
      }
    };
  };

  return daCache;
}(jQuery));
