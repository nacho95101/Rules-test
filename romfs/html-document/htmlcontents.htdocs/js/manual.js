$(function() {
  $('.chapterHeader').each(function(index, elm){
    var textWidth = $(elm).find('span').width() - 35;
    $(elm).find('.chapterHeaderHighlight').css({width: textWidth+'px'});
  });
});
