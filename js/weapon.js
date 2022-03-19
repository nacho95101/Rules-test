const c_fade_time = 60;

// アイテム切り替え
$(function() {
  $('.list_area li').on('focus',function() {
    var item_index = $(this).parents('.list_area').find('li').index(this);
    var menu_index = $('.list_area').index($(this).parents('.list_area'));

    var left_area = $('.main_area').eq(menu_index).find('.left_area');
    if( !left_area.is(':animated') ) {
      left_area.stop(true, true).fadeOut(c_fade_time);
      left_area.eq(item_index).delay(c_fade_time);
      left_area.eq(item_index).fadeIn(c_fade_time);
    }
    else {
      left_area.stop(true, true);
      left_area.css('display','none');
      left_area.eq(item_index).css('display','block');
    }

    var right_area = $('.main_area').eq(menu_index).find('.right_area img');
    if( !right_area.is(':animated') ) {
      right_area.stop(true, true).fadeOut(c_fade_time);
      right_area.eq(item_index).delay(c_fade_time);
      right_area.eq(item_index).fadeIn(c_fade_time);
    }
    else {
      right_area.stop(true, true);
      right_area.css('display','none');
      right_area.eq(item_index).css('display','block');
    }

    $(this).parents('.list_area').find('li').removeClass('select');
    $(this).addClass('select')

    // 揺れてたら止める
    $(this).removeClass('swing');
  });
});

// サブ・スペシャルの切り替え
var dropTimeout = null;
$(function() {
    setAssignLR();
    $(document).on('keydown',function(e) {
      if(e.keyCode !== 76 && e.keyCode !== 82) return;// LRのときだけ以降の処理をしたい

      // 切り替え前のindexをまず取る
      var index = $('.header .weapon_title').index($('.header').find('.select')[0]);
      var tabName;
      var tabColor;
      if(e.keyCode === 76) { // L→サブ
        index--;
        if (index < 0) index = 1;

        // Lボタンのアニメ
        $('.buttonL').removeClass('keyDown');
        $('.buttonL')[0].offsetWidth = $('.buttonL')[0].offsetWidth;
        $('.buttonL').addClass('keyDown');
      }
      else if(e.keyCode === 82) { // R→スペシャル
        index++;
        if (index > 1) index = 0;

        // Rボタンのアニメ
        $('.buttonR').removeClass('keyDown');
        $('.buttonR')[0].offsetWidth = $('.buttonR')[0].offsetWidth;
        $('.buttonR').addClass('keyDown');
      }
      if (index == 0) {
        tabName = 'sub';
        tabColor = '#cdf523';
      } else if (index == 1) {
        tabName = 'special';
        tabColor = '#ffcd00';
      }
      // 背景変更
      $(document.body).css('background-color', tabColor);
      $('.wrapper_all').css('background', 'url(../../img/bg_weapon_'+tabName+'.webp) repeat');

      // 各種切り替え処理
      $('.main_area').stop(true, true).fadeTo(c_fade_time, 0);
      $('.main_area').css('display','none');
      $('.main_area').eq(index).delay(c_fade_time);
      $('.main_area').eq(index).fadeTo(c_fade_time, 1);
      $('.list_area').css('display','none');
      $('.list_area').eq(index).css('display','block');
      $('.header .weapon_title').eq(1-index).removeClass('select');// 片方のselectクラスを除去し
      $('.header .weapon_title').eq(index).addClass('select');// 該当する方にselectクラスを付与する

      // アイテム揺らしたい
      swing(index, false);

      // メニューボタンからしずくをおとす
      dropInk(index);

      // selectを持っているものにフォーカス乗せなおしをしないとバグる
      $('.list_area').eq(index).find('.select')[0].focus();
    });
});

// アイテムのカーソルコントロール
$(function() {
    $('.list_area li').on('keydown',function(e) {
        var elm = $(this).parent().children();// 兄弟要素ということでこれでOK？
        var size = elm.length;
        var index = elm.index(this);
        if (e.keyCode === 37) { //左
          if (index === 0) { // 左端→右端
            elm.eq(size-1).focus();
          }
          else {
            elm.eq(index-1).focus();
          }
        }
        else if (e.keyCode === 39) { //右
          if (index === size-1) { // 右端→左端
            elm.eq(0).focus();
          }
          else {
            elm.eq(index+1).focus();
          }
        }
    });
});

// 開始時のアニメ
window.onload = function() {
  swing(0, true);
  dropInk(0);
}

function swing(index, isDelay) {
  $('.list_area li').removeClass('swing');
  $('.list_area').eq(index).find('li').each(function(){
    if(!$(this).hasClass('select')) {
      $(this).addClass('swing');
      var top_num = $(this).parents('.list_area').find('.top').children().length;
      var item_index = $('.list_area').eq(index).find('li').index(this);
      // 左端から順番に揺らすためにインデックス操作します
      if(item_index >= top_num) {
        item_index = (item_index-top_num)*2+1;
      }
      else {
        item_index *= 2;
      }
      var delay = item_index*0.02;
      if(isDelay) {
        delay += 0.5;
      }
      $(this).css('animation-delay', delay+'s');
    }
  });
}

function dropInk(index) {
  $('.header .inkDropWrapper').eq(index).find('.drop').removeClass('dropUnfocus');
  $('.header .inkDropWrapper').eq(index).find('.drop').addClass('dropFocus');

  $('.header .inkDropWrapper').eq(1-index).find('.drop').removeClass('dropFocus');
  $('.header .inkDropWrapper').eq(1-index).find('.drop').addClass('dropUnfocus');
}
