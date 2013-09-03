test( "hello test", function() {
  ok( 1 == "1", "Passed!" );
});

module('Cache');
test('cacheSet', function () {
  var cache = daCache();
  cache.set('foo', 'bar');
  strictEqual(cache.get('foo'), 'bar', 'foo was set to bar');
});
test('cache.get length = true', function () {
  var cache = daCache();
  cache.set('bar', 'foo');
  strictEqual(cache.get('bar', true), 'foo', 'used cached value');
});
test('cache.get length === false', function () {
  var cache = daCache();
  cache.set('bar', 'foo');
  strictEqual(cache.get('bar', false), undefined, 'did not use cached value');
});
test('cache.get length === 60000', function () {
  var cache = daCache();
  cache.set('bar', 'foo');
  strictEqual(cache.get('bar', 60000), 'foo', 'value did not expire yet, returned foo');
});
asyncTest('cache.get test expiring', function () {
  var cache = daCache();
  expect(2);
  cache.set('foo', 'bar');
  var after,
    before = cache.get('foo', 500);

  strictEqual(before, 'bar', 'imediatly querying returned the cached value');
  setTimeout(function () {
    after = cache.get('foo', 500);
    strictEqual(after, undefined, 'cached value expired');
    start();
  }, 750);
});
test('cache.get store $.Deferred', function () {
  var cache = daCache()
    dfd = $.Deferred();

  cache.set('foo', dfd);
  var v = cache.get('foo');

  strictEqual(v.state(), 'pending', 'value is a pending Deferred');
});
test('cache.clear()', function () {
  var cache = daCache();

  cache.set('foo', 'bar');

  var out = cache.get('foo');

  strictEqual(out, 'bar', 'cache contained bar');

  cache.clear();

  out = cache.get('foo');
  strictEqual(out, undefined, 'cache no longer contains bar');
});
test('Collision test', function () {
  var cache1 = daCache(),
    cache2 = daCache();

  cache1.set('foo', 'bar');
  cache2.set('foo', 'baz');

  var out1 = cache1.get('foo');
    out2 = cache2.get('foo');

  strictEqual(out1, 'bar', 'cache1 contained bar');
  strictEqual(out2, 'baz', 'cache2 contained baz');

  cache1.clear();

  out1 = cache1.get('foo');
  out2 = cache2.get('foo');

  strictEqual(out1, undefined, 'cache1 no longer contains bar');
  strictEqual(out2, 'baz', 'cache2 still contains baz');
});
test('cache.get store non-Deferred, return Deferred', function () {
  var cache = daCache();
  cache.set('foo', 'bar');
  var v = cache.get('foo', true, true);

  strictEqual(v.state(), 'resolved', 'value is a resolved Deferred');
  v.done(function (ret) {
    strictEqual(ret, 'bar', 'value bar retrived from Deferred object');
  }).fail(function () {
    ok(false, 'Deferred failed');
  });

});
test('cache.get non-existing with returnDeferred', function () {
  var cache = daCache();

  var v = cache.get('foo', true, true);

  strictEqual(v, undefined, 'value is undefined');
});


test('External cache', function () {
  var cache1 = gw2.cache(),
    cache2 = gw2.cache();

  cache1.set('foo', 'bar');
  cache2.set('foo', 'baz');

  var out1 = cache1.get('foo');
    out2 = cache2.get('foo');

  strictEqual(out1, 'bar', 'cache1 contained bar');
  strictEqual(out2, 'baz', 'cache2 contained baz');

  cache1.clear();

  out1 = cache1.get('foo');
  out2 = cache2.get('foo');

  strictEqual(out1, undefined, 'cache1 no longer contains bar');
  strictEqual(out2, 'baz', 'cache2 still contains baz');
});




module('Utility');
test('isSupportedLang de', function () {
  strictEqual(isSupportedLang('de'), true, 'de is a supported language');
});
test('isSupportedLang en', function () {
  strictEqual(isSupportedLang('en'), true, 'en is a supported language');
});
test('isSupportedLang es', function () {
  strictEqual(isSupportedLang('es'), true, 'es is a supported language');
});
test('isSupportedLang fr', function () {
  strictEqual(isSupportedLang('fr'), true, 'fr is a supported language');
});
test('isSupportedLang fb', function () {
  strictEqual(isSupportedLang('fb'), false, 'fb is not a supported language');
});

test('returnTrue', function () {
  strictEqual(returnTrue(), true, 'returnTrue() returns true');
  strictEqual(returnTrue(false), true, 'returnTrue(false) returns true');
});

test('makeRejector', function () {
  var dfd = $.Deferred(),
    rejector = makeRejector(dfd);

  ok(dfd.state() === 'pending', 'dfd is pending before calling rejector');
  rejector();
  ok(dfd.state() === 'rejected', 'dfd is rejected after calling rejector');
});

asyncTest('getItemById no getProp', function () {
  var items = [
      {
        id: 'foo',
        name: 'bar'
      },
      {
        id: 1,
        name: 'baz'
      }
    ],
    getter = function () {
      var dfd = $.Deferred();
      dfd.resolve(items);
      return dfd;
    };

  getItemById('foo', getter, 'id')
    .done(function (ret) {

      deepEqual(ret, items[0], 'the foo objectg was retrived');
      start();
    })
    .fail(function () {
      ok(false, 'getter failed');
      start();
    });
});

asyncTest('getItemById with getProp', function () {
  var items = [
      {
        id: 'foo',
        name: 'bar'
      },
      {
        id: 1,
        name: 'baz'
      }
    ],
    getter = function () {
      var dfd = $.Deferred();
      dfd.resolve(items);
      return dfd;
    };

  getItemById('foo', getter, 'id', 'name')
    .done(function (ret) {
      strictEqual(ret, 'bar', 'bar was found');
      start();
    })
    .fail(function () {
      ok(false, 'getter failed');
      start();
    });
});

test('getKey no data', function () {
  var apiCall = 'http://www.example.com',
    key = getKey(apiCall);

  strictEqual(key, apiCall);
});

test('getKey with data', function () {
  var apiCall = 'http://www.example.com',
    data = {
      foo: 'bar',
      a: 'z',
      z: 'baz'
    },
    key = getKey(apiCall, data);

  strictEqual(key, apiCall + '_a:z_foo:bar_z:baz');
});

test('getKey with empty data', function () {
  var apiCall = 'http://www.example.com',
    data = {},
    key = getKey(apiCall, data);

  strictEqual(key, apiCall);
});

test('normalizeIds no options', function () {
  var arr = [
      {
        id: '0',
        name: 'a'
      },
      {
        id: '1',
        name: 'b'
      },
      {
        id: '2',
        name: 'c'
      },
    ],
    normalized = normalizeIds(arr);

  strictEqual(normalized[0].id, 0, 'id is a number');
  strictEqual(normalized[1].id, 1, 'id is a number');
  strictEqual(normalized[2].id, 2, 'id is a number');
});
test('normalizeIds noNormalize === false', function () {
  var arr = [
      {
        id: '0',
        name: 'a'
      },
      {
        id: '1',
        name: 'b'
      },
      {
        id: '2',
        name: 'c'
      },
    ],
    normalized = normalizeIds(arr, {noNormalize: false});

  strictEqual(normalized[0].id, 0, 'id is a number');
  strictEqual(normalized[1].id, 1, 'id is a number');
  strictEqual(normalized[2].id, 2, 'id is a number');
});
test('normalizeIds noNormalize === true', function () {
  var arr = [
      {
        id: '0',
        name: 'a'
      },
      {
        id: '1',
        name: 'b'
      },
      {
        id: '2',
        name: 'c'
      },
    ],
    notNormalized = normalizeIds(arr, {noNormalize: true});

  strictEqual(notNormalized[0].id, '0', 'id is a number');
  strictEqual(notNormalized[1].id, '1', 'id is a number');
  strictEqual(notNormalized[2].id, '2', 'id is a number');
});

test('normalizeObj', function () {
  var obj = {
      id: '0',
      name: 'a',
      hp: 500,
      score: '3',
      stringNumber: '5',
      weapon: {
        score: '7',
        type: 'bow',
        damage: '25'
      }
    },
    paths = [
      '^,id',
      ',hp',
      ',score$',
      '^,weapon,damage'
    ],
    normalized = normalizeObj(obj, {noNormalize: false}, paths);

  strictEqual(normalized.id, 0, 'id is a number');
  strictEqual(normalized.hp, 500, 'hp is still a number');
  strictEqual(normalized.score, 3, 'obj.score is a number');
  strictEqual(normalized.weapon.score, 7, 'obj.weapon.score is a number');
  strictEqual(normalized.stringNumber, '5', 'obj.stringNumber is a string');
  strictEqual(normalized.weapon.damage, 25, 'obj.weapon.damage is a number');
});
test('normalizeObj empty options', function () {
  var obj = {
      id: '0',
      name: 'a',
      hp: 500,
      score: '3',
      stringNumber: '5',
      weapon: {
        score: '7',
        type: 'bow',
        damage: '25'
      }
    },
    paths = [
      '^,id',
      ',hp',
      ',score$',
      '^,weapon,damage'
    ],
    normalized = normalizeObj(obj, {}, paths);

  strictEqual(normalized.id, 0, 'id is a number');
  strictEqual(normalized.hp, 500, 'hp is still a number');
  strictEqual(normalized.score, 3, 'obj.score is a number');
  strictEqual(normalized.weapon.score, 7, 'obj.weapon.score is a number');
  strictEqual(normalized.stringNumber, '5', 'obj.stringNumber is a string');
  strictEqual(normalized.weapon.damage, 25, 'obj.weapon.damage is a number');
});
test('normalizeObj noNormalize', function () {
  var obj = {
      id: '0',
      name: 'a',
      hp: 500,
      score: '3',
      stringNumber: '5',
      weapon: {
        score: '7',
        type: 'bow',
        damage: '25'
      }
    },
    paths = [
      '^,id',
      ',hp',
      ',score$',
      '^,weapon,damage'
    ],
    normalized = normalizeObj(obj, {noNormalize: true}, paths);

  strictEqual(normalized.id, '0', 'id is a string');
  strictEqual(normalized.hp, 500, 'hp is still a number');
  strictEqual(normalized.score, '3', 'obj.score is a string');
  strictEqual(normalized.weapon.score, '7', 'obj.weapon.score is a string');
  strictEqual(normalized.stringNumber, '5', 'obj.stringNumber is a string');
  strictEqual(normalized.weapon.damage, '25', 'obj.weapon.damage is a string');
});

test('getRaw', function () {
  var obj =  {
      stuff: ['foo', 'bar', 'baz']
    },
    raw = getRaw(obj, 'stuff');

  deepEqual(raw, obj.stuff, 'non-raw output returned');
});
test('getRaw raw = false', function () {
  var obj =  {
      stuff: ['foo', 'bar', 'baz']
    },
    raw = getRaw(obj, 'stuff', {raw: false});

  deepEqual(raw, obj.stuff, 'non-raw output returned');
});
test('getRaw raw = true', function () {
  var obj =  {
      stuff: ['foo', 'bar', 'baz']
    },
    raw = getRaw(obj, 'stuff', {raw: true});

  deepEqual(raw, obj, 'raw output returned');
});

test('getLang no lang', function () {
  var lang = getLang();

  strictEqual(lang, defaultLang, 'lang is es');
});
test('getLang invalid lang', function () {
  var lang = getLang({lang: 'qq'});

  strictEqual(lang, defaultLang, 'lang is es');
});
test('getLang lang = es', function () {
  var lang = getLang({lang: 'es'});

  strictEqual(lang, 'es', 'lang is es');
});
test('getLang lang = de', function () {
  var lang = getLang({lang: 'de'});

  strictEqual(lang, 'de', 'lang is es');
});

test('getCacheLength option specified', function () {
  var cacheLength = getCacheLength({cache: 60000}, 30000);

  strictEqual(cacheLength, 60000, 'option value used');
});
test('getCacheLength no option specified', function () {
  var cacheLength = getCacheLength({}, 30000);

  strictEqual(cacheLength, 30000, 'default value used');
});
test('getCacheLength true', function () {
  var cacheLength = getCacheLength({}, true);

  strictEqual(cacheLength, true, 'true value used');
});
test('getCacheLength false', function () {
  var cacheLength = getCacheLength({}, false);

  strictEqual(cacheLength, false, 'false value used');
});
test('getCacheLength true option', function () {
  var cacheLength = getCacheLength({cache: true}, false);

  strictEqual(cacheLength, true, 'true value used');
});
test('getCacheLength false option', function () {
  var cacheLength = getCacheLength({cache: false}, true);

  strictEqual(cacheLength, false, 'false value used');
});


test('copyObj', function () {
  var obj =  {
    foo: 'bar',
    1337: 'leet'
  },
  copied = copyObj(obj);
  ok(obj !== copied, 'obj and copied are not the same object');
  deepEqual(obj, copied, 'copied is a exact copy of obj');
});

test('compose', function () {
  var add5ThenMultiplyby2 = compose(
      function add (val) {
        return val + 5;
      },
      function multiply (val) {
        return val * 2;
      }
    );
  strictEqual(add5ThenMultiplyby2(5), 20, '(5 + 5) * 2 === 20');
});

asyncTest('get()', function () {
  get('fake_endpoint', true).done(function (ret) {
    strictEqual(ret.test, 'success', 'got from api');
    start();
  }).fail(failAsyncTest);
});
asyncTest('get() with parameters', function () {
  get('fake_endpoint', true, {id: 'test'}).done(function (ret) {
    strictEqual(ret.test, 'success with param', 'got from api');
    start();
  }).fail(failAsyncTest);
});
asyncTest('get() with null cacheLength', function () {
  var before, after;
  cache.clear();
  before = cache.get('fake_endpoint');
  get('fake_endpoint', null).done(function (ret) {
    after = cache.get('fake_endpoint');
    strictEqual(ret.test, 'success', 'Did retrive value from get()');
    strictEqual(before, undefined, 'before is undefined');
    strictEqual(after, undefined, 'after is undefined');
    start();
  }).fail(failAsyncTest);
});


var testObjectives = {
    0: 'Castle',
    1: 'Keep',
    2: 'Tower',
    3: 'some other objective',
  },
  testGetObjectiveValue = function (id, expected) {
    var name = testObjectives[id],
      value = getObjectiveValue(id, testObjectives);
    strictEqual(value, expected, expected + ' is the value of ' + name);
  };
test('getObjectiveValue', function () {
  testGetObjectiveValue(0, 35);
});
test('getObjectiveValue', function () {
  testGetObjectiveValue(1, 25);
});
test('getObjectiveValue', function () {
  testGetObjectiveValue(2, 10);
});
test('getObjectiveValue', function () {
  testGetObjectiveValue(3, 5);
});


var testNamesContaining = function (search,  expectedItems) {
  var expectedLength =  expectedItems.length,
    items = namesContaining(testGetterWithNames , search);
  items.done(function (items) {
    strictEqual(items.length, expectedLength, expectedLength + ' items returned');
    strictEqual(joinOnProp(items, 'value'), expectedItems, 'Correct items');
    start();
  }).fail(failAsyncTest);
};
asyncTest('namesContaining "item"', function () {
  testNamesContaining('item','abcdef');
});
asyncTest('namesContaining /\\bitem\\b/', function () {
  testNamesContaining(/\bitem\b/, 'abc');
});
asyncTest('namesContaining 3', function () {
  testNamesContaining('3', 'cfi');
});
asyncTest('namesContaining /3/', function () {
  testNamesContaining(/3/, 'cfi');
});
asyncTest('namesContaining /items?\s3/', function () {
  testNamesContaining(/items?\s3/, 'cf');
});
