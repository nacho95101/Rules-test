// メニューボタンのきりかえ
var dropTimeout = null;
$(function() {
    // LR切り替えの有効化
    const DELAY = 1200 // 要素描画が完了するまで待機
    setTimeout(function(){
      setAssignLR();
    }, DELAY);

    $(document).on('keydown',function(e) {
      if(e.keyCode !== 76 && e.keyCode !== 82) return;// LRのときだけ以降の処理をしたい

      var index = $('header .menuButton').index($('header').find('.select')[0]);
      var pre_index = index;
      if(e.keyCode === 76) {
        if(index === 0) {
          index = 2;// ループ
        }
        else {
          --index;
        }

        // Lボタンのアニメ
        $('.buttonL').removeClass('keyDown');
        $('.buttonL')[0].offsetWidth = $('.buttonL')[0].offsetWidth;
        $('.buttonL').addClass('keyDown');
      }
      else if(e.keyCode === 82) {
        if(index === 2) {
          index = 0;// ループ
        }
        else {
          ++index;
        }

        // Rボタンのアニメ
        $('.buttonR').removeClass('keyDown');
        $('.buttonR')[0].offsetWidth = $('.buttonR')[0].offsetWidth;
        $('.buttonR').addClass('keyDown');
      }

      // 背景変更
      var bg = "url(../../img/bg_post_pattern_0" + (index + 1) + ".webp)";
      $('.bgPattern').css('background-image', bg);

      // スクロール位置をトップに戻す
      $(document.body).scrollTop(0);

      // 各種切り替え処理
      $('.mainContent').css('display','none');
      $('.mainContent').eq(index).css('display','block');

      $('header .menuButton').css('background','url(../../img/bg_common_arrow.webp) repeat');
      $('header .menuButton').removeClass('select');
      $('header .menuButton').eq(index).addClass('select');
      $('header .menuButton').eq(index).css('background', 'url(../../img/bg_common_arrow_0' + (index + 1) + '.webp) repeat');

      // メニューボタンからしずくをおとす
      dropInk(index, pre_index);

      // アイテム揺れ
      swing(false);

      // フェードインは1回だけでいいので消してしまう
      removeFadeIn();
    });
});

// 画像プリロード
$(function() {
  $('<img src="../../img/bg_common_arrow_02.webp">');
  $('<img src="../../img/bg_common_arrow_03.webp">');
  $('<img src="../../img/bg_common_plate_zigzag_green.webp">');
  $('<img src="../../img/bg_post_pattern_02.webp">');
  $('<img src="../../img/bg_post_pattern_03.webp">');
  $('<img src="../../img/bg_common_plate_ink_L.webp">');
  $('<img src="../../img/bg_common_plate_ink_R.webp">');
});

function dropInk(index, pre_index) {
  $('header .menuButton').eq(index).parent().find('.drop').removeClass('dropUnfocus');
  $('header .menuButton').eq(index).parent().find('.drop').addClass('dropFocus');

  $('header .menuButton').eq(pre_index).parent().find('.drop').removeClass('dropFocus');
  $('header .menuButton').eq(pre_index).parent().find('.drop').addClass('dropUnfocus');
}

function swing(isDelay) {
  $('.iconPlate img').removeClass('swing');
  $('.iconPlate img').each(function(){
    $(this).addClass('swing');
    var item_index = $('.iconPlate img').index(this);
    var delay = item_index*0.1;
    if(isDelay) {
      delay += 0.5;// ページ読み込み時のdelayを考慮
    }
    $(this).css('animation-delay', delay+'s');
  });
}

function addFadeIn() {
  $('#howto').addClass('fadeIn');
  $('header').addClass('fadeIn');
}

function removeFadeIn() {
  $('#howto').removeClass('fadeIn');
  $('header').removeClass('frameDropAnim');
  // アルファ固定
  $('#howto').css('opacity', '1');
  $('header').css('opacity', '1');
}

// フォント遅延読み込み用
function addFontFamily() {
  $('.menuButton').css('font-family', '"rowdy", "Splatoon1"');
  $('.iconPlate div').css('font-family', 'Splatoon2');
  $('.iconPlate .narrowFont').css('font-family', 'kurokane');
  $('.bgInkGreen h2').css('font-family', 'Splatoon2');
  $('.bgInkGreen .narrowFont').css('font-family', 'kurokane');
  $('.bgPlate h2').css('font-family', 'Splatoon2');
  $('.bgPlate h2 .narrowFont').css('font-family', 'kurokane');
  $('.description').css('font-family', '"newrodinpro","NintendoExt003"');
  $('.note').css('font-family', '"newrodinpro","NintendoExt003"');
  $('#backButton').css('font-family', 'newrodinpro');// フォントプリロードのため、全然関係ないところにつけてます
}

// 画像読み込み完了してからフォントの読み込み開始
window.onload = function() {
  setTimeout(function(){addFontFamily()}, 0);// 別スレッド的な扱いになるせいか？普通にやるより高速化できる
}

// フォント読み込み完了後のアニメ
document.fonts.addEventListener('loadingdone', function() {
  dropInk(0);
  swing(true);
  addFadeIn();
});
