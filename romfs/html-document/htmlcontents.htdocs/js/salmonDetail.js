var c_fade_time = 60;
var EVENT_INDEX = 9;

var index = 0;// 自分のindexを覚えておく用

// 自分のindexをURLから割り出して表示切替
$(function() {
  if (document.location.search.length > 1) {
     index = document.location.search.substring(7);
     index = Number(index);// バグりやすいので明示的に数値に変換しておく

     $('.detailContent').css('display','none');
     $('.detailContent').eq(index).fadeTo(c_fade_time, 1);

     // LR表記調整
     showNavi();
  }
});

// LR切り替え
$(function() {
    setAssignLR();
    $(document).on('keydown',function(e) {
      if(e.keyCode !== 76 && e.keyCode !== 82) return;// LRのときだけ以降の処理をしたい

      // 切り替え前のindexをまず取る
      if(e.keyCode === 76) { // L
        if(index === 0) return;// 切り替え必要なし
        --index;
      }
      else if(e.keyCode === 82) { // R
        if(index === 15) return;// 切り替え必要なし
        ++index;
      }

      // 各種切り替え処理
      $('.detailContent').stop(true, true).fadeTo(c_fade_time, 0);
      $('.detailContent').css('display','none');
      $('.detailContent').eq(index).delay(c_fade_time);
      $('.detailContent').eq(index).fadeTo(c_fade_time, 1);

      // はんことふせんのアニメ
      startAnim(index < EVENT_INDEX);

      // LR表記調整
      showNavi();

      // スクロール位置をトップに戻す
      $(document.body).scrollTop(0);
    });
});

$(function(){
    $('.wrapperAll').css({opacity:'0'})
    $('.wrapperAll').animate({opacity:'1'},200);
    startAnim(index < EVENT_INDEX);
});

function startAnim(isStampAnim) {
  // はんこアニメ
  $('.salmonStamp').addClass('isHidden');
  $('.salmonStamp').removeClass('stampAnim');
  $('.salmonStamp')[0].offsetWidth = $('.salmonStamp')[0].offsetWidth;
  if (isStampAnim == true) {
    var pos = getStampPos();
    $('.salmonStamp').css({'top': pos.top+'px', 'left': pos.left+'px'});
    $('.salmonStamp').removeClass('isHidden');
    $('.salmonStamp').addClass('stampAnim');
  }

  // ふせんアニメ
  $('.postitAnimWrapper').removeClass('postitAnim');
  $('.postitAnimWrapper')[0].offsetWidth = $('.postitAnimWrapper')[0].offsetWidth;
  $('.postitAnimWrapper').addClass('postitAnim');
}

function getStampPos () {
  var top;
  var left;
  switch (index) {
    case 0:
      top = 135;
      left = 165;
      break;
    case 1:
      top = 140;
      left = 420;
      break;
    case 2:
      top = 120;
      left = 430;
      break;
    case 3:
      top = 90;
      left = 160;
      break;
    case 4:
      top = 125;
      left = 450;
      break;
    case 5:
      top = 100;
      left = 190;
      break;
    case 6:
      top = 70;
      left = 440;
      break;
    case 7:
      top = 120;
      left = 190;
      break;
    case 8:
      top = 80;
      left = 150;
      break;
    default:
      break;
  }
  return {
    top: top,
    left: left
  }
}

function showNavi() {
  if(index === 0) {
    // L隠す
    $('.naviL').css('display','none');
  } else if(index === 15) {
    // R隠す
    $('.naviR').css('display','none');
  } else {
    $('.naviL').css('display','block');
    $('.naviR').css('display','block');
  }
}
