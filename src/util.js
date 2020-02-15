// namespace pl - PerfectLang as Perfect Language or Pavel Lang
(function(pl, window, undefined) {

  pl.namespace = function(name) {
    name = name.toString().split('.');
    var i, l = name.length;
    var result = pl.namespace;
    var part;
    for (i = 0; i < l; i++) {
      part = name[i];
      if (part === '')
        throw new Error('Invalid namespace (empty string)');

      if (typeof result[part] === 'undefined')
        result = result[part] = {};
      else {
        result = result[part];
        if ((typeof result) !== 'object')
          throw new Error('Invalid namespace (\'' + name + '\' is not object)');
      }
    }
    return result;
  };

  pl.namespace['pl'] = pl;
  pl.namespace['util'] = pl;
  pl.namespace['global'] = window;
  pl.namespace['window'] = window;


  pl.use = function(namespaces, callback) {
    namespaces = namespaces.map(pl.namespace);
    callback.apply(namespaces[namespaces.length - 1], namespaces);
  };

  // borrowed from node.js core
  pl.inherits = function(ctor, superCtor) {
    ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };

})(window.pl || (window.pl = {}), window);
