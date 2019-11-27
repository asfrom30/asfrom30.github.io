exports.getInstance = function(env) {
  // check file.
  return require(`./${env}`);
};