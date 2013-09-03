var failAsyncTest = function () {
    ok(false, 'Deferred failed');
    start();
  },
  joinOnProp = function (arr, prop, separator) {
    var a = arr.map(function (item) {
      return item[prop];
    });
    separator = separator === undefined ? '' : separator;
    return a.join(separator);
  },
  testGetterWithNames = function () {
    var arr = [
      {
        name: 'item 1',
        value: 'a'
      },
      {
        name: 'item 2',
        value: 'b'
      },
      {
        name: 'item 3',
        value: 'c'
      },
      {
        name: 'items 1',
        value: 'd'
      },
      {
        name: 'items 2',
        value: 'e'
      },
      {
        name: 'items 3',
        value: 'f'
      },
      {
        name: 'foo 1',
        value: 'g'
      },
      {
        name: 'foo 2',
        value: 'h'
      },
      {
        name: 'foo 3',
        value: 'i'
      },
    ],
    dfd = $.Deferred();

    dfd.resolve(arr);

    return dfd;
  };
