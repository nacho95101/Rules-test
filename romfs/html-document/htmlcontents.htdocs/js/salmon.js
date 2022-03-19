// 連打防止
var disableJumpPage = false;

// 目次フォーカス時の動作
$(function() {
    $('.salmon,.event').on('focus',function() {
      $(this).find('.imgMask').css({display: 'block'});
      $(this).find('.marker').css({width: '0', display: 'flex'});
      var salmonNameWidth = $(this).find('.salmonName').width() + 40;
      var salmonNameHeight = $(this).find('.salmonName').height();
      $(this).find('.marker').animate({width: salmonNameWidth+'px'}, 350);

      if(salmonNameHeight > 30) {
        // 2行の時は二本分引く
        $(this).find('.marker').css({top: '9px'});// 一行目のマーカー位置を少し上げる
        $(this).find('.marker2').css({width: '0', display: 'flex'});
        $(this).find('.marker2').delay(400);
        $(this).find('.marker2').animate({width: salmonNameWidth+'px'}, 350);
      }
    });
    $('.salmon,.event').on('blur',function() {
      $(this).find('.imgMask').css({display: 'none'});
      $(this).find('.marker').css({width: '0',display: 'none'});// 消すときは一瞬で
      $(this).find('.marker2').css({width: '0',display: 'none'});
    });
});

$(function(){
  $('a').click(function(){
    // ページ遷移可否判定
    if (disableJumpPage == true) return false;
    disableJumpPage = true;
    // ページ遷移前に背景色を緑にする（詳細から戻った時にちらちらする対策）
    $(document.body).css({backgroundColor: '#189139'});
    // ページ遷移
    var pass = $(this).attr("href");
    $('.wrapperAll').animate({opacity:'0', marginLeft:'-150px'},200,function(){
      location.href = pass;
      setTimeout(function(){
        $('.wrapperAll').css({opacity:'1', marginLeft:'0'});
        disableJumpPage = false;
      },100);
    });
    return false;
  });
});

// カーソルコントロール
$(function() {
  // それぞれのセクションの一番最後にある項目にフォーカスがあるときに右を押してもカーソルを動かさない
  // （レイアウトの構造上、右を押してフォーカスするものが変わってもスクロールが発生せずカーソルが画面外に行くため）
  $('.linkList .salmon:last-child, .linkList .event:last-child').on('keydown',function(e) {
      if (e.keyCode === 39) { //右
        e.preventDefault();
      }
  });
});
