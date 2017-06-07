(function(global) {
  console.log('background run!');
})(
  typeof window !== 'undefined'
    ? window
    : typeof global !== 'undefined' ? global : this || {}
);
