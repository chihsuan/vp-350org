var fs = require('fs');

module.exports = function (hbs) {
  // register partials
  //hbs.registerPartial('head', getPartials('head'));
  //hbs.registerPartial('header', getPartials('header'));
};

function getPartials(filename) {
  var template = fs.readFileSync('./layout/partial/' + filename + '.hbs', 'utf8');
  return template;
}
