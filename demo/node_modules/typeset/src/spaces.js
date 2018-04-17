module.exports = function(text){
  // replaces wide spaces with hair spaces
  text = text.replace(/ × /g, ' × ');
  text = text.replace(/ \/ /g, ' / ');

  return text;
};
