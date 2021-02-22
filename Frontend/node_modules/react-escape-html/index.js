var eskape = require('eskape');

module.exports = function reactEscapeHTML() {
  return { __html: eskape.apply(undefined, arguments) };
};
