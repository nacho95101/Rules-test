// 定数
// マッチ
const MATCH_GATI = 0;
const MATCH_LEAGUE = 1;
// 種目
const RULE_AREA = 0;
const RULE_YAGURA = 1;
const RULE_HOKO = 2;
const RULE_ASARI = 3;

var PLAYING_MATCH;
var PLAYING_RULE;
var pageIndex = 0; // 表示中のページIndex

// レギュラー、フェスはボタン1つ
// ガチはボタン2つ（ルールと種目）
$(function(){
  setMatchAndRule();
  var isOneColumn = PLAYING_MATCH != MATCH_GATI && PLAYING_MATCH != MATCH_LEAGUE
  if (isOneColumn == false)  {
    // ガチマッチとリーグマッチのみ
    preloadImg();
    setRuleButtonText();
    setLogoImg();
    initPage();
  }
});

var isCheckedDescriptionHeight = false;
function changeImgDescriptionStyle () {
  if (isCheckedDescriptionHeight == true) return;
  var rule;
  switch (PLAYING_RULE) {
    case RULE_AREA:
      rule = '#area';
      break;
    case RULE_YAGURA:
      rule = '#yagura';
      break;
    case RULE_HOKO:
      rule = '#hoko';
      break;
    case RULE_ASARI:
      rule = '#asari';
      break;
    default:
      break;
  }
  var isTwoLine = false;
  var LINE_HEIGHT = 50; // 余裕を持って設定
  var imgDescriptionTextElms = $(rule + ' .imgDescriptionText');
  imgDescriptionTextElms.each(function(i, elm) {
    if ($(elm).height() > LINE_HEIGHT) isTwoLine = true;
  });
  if (isTwoLine == true) {
    $(rule + ' .imgDescription').addClass('line2');
    $(rule + ' .imgDescriptionText').addClass('line2');
    $(rule + ' .imgDescriptionIndex').addClass('line2');
  }
  isCheckedDescriptionHeight = true;
}

function getQuery() {
  if (document.location.search.length > 1) {
     var query = document.location.search.substring(1);
     var parameters = query.split('&');
    var result = new Object();
    for (var i = 0; i < parameters.length; i++) {
      // パラメータ名とパラメータ値に分割する
       var element = parameters[i].split('=');
      var paramName = decodeURIComponent(element[0]);
      var paramValue = decodeURIComponent(element[1]);
       result[paramName] = decodeURIComponent(paramValue);
    }
    return result;
  }
  return null;
}

function setOnKeyDown () {
  document.onkeydown = function(e) {
    // カラム切り替え
    if (e.keyCode == 76 || e.keyCode == 82) { // L, R
      window.scroll(0, 0);
      if (pageIndex == 0) {
        changeToRuleContent();
        changeImgDescriptionStyle();
      } else if (pageIndex == 1) {
        changeToMatchContent();
      }
      dropInk(pageIndex);

      // フェードインは1回だけでいいので消してしまう
      removeFadeIn();

      // LRボタンのアニメ
      if (e.keyCode == 76) {
        $('.buttonL').removeClass('keyDown');
        $('.buttonL')[0].offsetWidth = $('.buttonL')[0].offsetWidth;
        $('.buttonL').addClass('keyDown');
      } else if (e.keyCode == 82) {
        $('.buttonR').removeClass('keyDown');
        $('.buttonR')[0].offsetWidth = $('.buttonR')[0].offsetWidth;
        $('.buttonR').addClass('keyDown');
      }
    }
  };
}

function setMatchAndRule() {
  // ゲームからの引数取得
  var query = getQuery();
  if (query == null) return;
  var VersusMode = query.VersusMode;
  var VersusRule = query.VersusRule;
  // マッチ
  if (VersusMode == 'cGachi') {
    PLAYING_MATCH = MATCH_GATI;
  } else if (VersusMode == 'cLeague') {
    PLAYING_MATCH = MATCH_LEAGUE;
  }
  // 種目
  if (VersusRule == 'cVar') {
    PLAYING_RULE = RULE_AREA;
  } else if (VersusRule == 'cVlf') {
    PLAYING_RULE = RULE_YAGURA;
  } else if (VersusRule == 'cVgl') {
    PLAYING_RULE = RULE_HOKO;
  } else if (VersusRule == 'cVcl') { // FIXME ゲームからの引数を修正する
    PLAYING_RULE = RULE_ASARI;
  }
}

function setLogoImg () {
  var fileName = ''
  if (PLAYING_MATCH == MATCH_GATI) {
    fileName = 'logo_vs_gachi.webp'
  } else if (PLAYING_MATCH == MATCH_LEAGUE) {
    fileName = 'logo_vs_league.webp'
  }
  if (fileName.length !== 0) $('.ruleLogo').attr('src','../../img/'+fileName);
}

function preloadImg() {
  $('<img src="../../img/bg_common_plate_ink_L.webp">');
  $('<img src="../../img/bg_common_plate_ink_R.webp">');
  $('<img src="../../img/bg_common_plate_zigzag_purple.webp">');
  $('<img src="../../img/bg_common_plate_zigzag_pink.webp">');
  $('<img src="../../img/bg_common_plate_zigzag_green.webp">');
  $('<img src="../../img/bg_common_plate_zigzag_blue.webp">');
}

function setRuleButtonText() {
  $('.ruleButton').addClass('isHidden');
  $('#ruleButton').attr('id', null);
  var ruleButtonName;
  if (PLAYING_RULE == RULE_AREA) {
    ruleButtonName = 'area';
  } else if (PLAYING_RULE == RULE_HOKO) {
    ruleButtonName = 'hoko';
  } else if (PLAYING_RULE == RULE_YAGURA) {
    ruleButtonName = 'yagura';
  } else if (PLAYING_RULE == RULE_ASARI) {
    ruleButtonName = 'asari';
  }
  var ruleButtonWrapper = $('.ruleButton[name='+ruleButtonName+']');
  var ruleButton = $('.ruleButton[name='+ruleButtonName+'] .twoColumnButton');
  ruleButtonWrapper.removeClass('isHidden');
  ruleButton.attr('id', 'ruleButton');
}

function initPage () {
  // ヘッダーメニュー表示
  if (PLAYING_MATCH == MATCH_GATI || PLAYING_MATCH == MATCH_LEAGUE) {
    $('#twoButtonMenu').removeClass('isHidden');
  }
  // メイン表示
  changeToMatchContent();
}

function changeToMatchContent() {
  var matchName;
  switch (PLAYING_MATCH) {
    case 0:
      matchName = 'gati';
      break;
    case 1:
      matchName = 'league';
      break;
    default:
      break;
  }
  $('.mainContent').addClass('isHidden');
  $('#'+matchName).removeClass('isHidden');
  // 表示ページの更新
  pageIndex = 0;
  changeMenuButtonStyle();
}
function changeToRuleContent() {
  var ruleName;
  switch (PLAYING_RULE) {
    case 0:
      ruleName = 'area';
      break;
    case 1:
      ruleName = 'yagura';
      break;
    case 2:
      ruleName = 'hoko';
      break;
    case 3:
      ruleName = 'asari';
      break;
    default:
      break;
  }
  $('.mainContent').addClass('isHidden');
  $('#'+ruleName).removeClass('isHidden');
  // 表示ページの更新
  pageIndex = 1;
  changeMenuButtonStyle();
}
function changeMenuButtonStyle() {
  var onTabElmId = ''
  var offTabElmId = ''
  if (pageIndex == 1 && $('#matchButton').hasClass('onTab')) {
    offTabElmId = '#matchButton'
    onTabElmId = '#ruleButton'
  } else if (pageIndex == 0 && $('#ruleButton').hasClass('onTab')) {
    offTabElmId = '#ruleButton'
    onTabElmId = '#matchButton'
  }

  if (onTabElmId.length !== 0 && offTabElmId.length !== 0) {
    $(offTabElmId).removeClass('onTab');
    $(offTabElmId).addClass('offTab');
    $(onTabElmId).removeClass('offTab');
    $(onTabElmId).addClass('onTab');
  }
}

function dropInk(index) {
  var dropFocusElm = '';
  var dropUnfocusElm = '';

  if (index === 0) {
    dropFocusElm = '#matchButton';
    dropUnfocusElm ='#ruleButton';
  } else if (index === 1) {
    dropFocusElm = '#ruleButton';
    dropUnfocusElm ='#matchButton';
  }
  $(dropFocusElm).parent().find('.drop').removeClass('dropUnfocus');
  $(dropFocusElm).parent().find('.drop').addClass('dropFocus');

  $(dropUnfocusElm).parent().find('.drop').removeClass('dropFocus');
  $(dropUnfocusElm).parent().find('.drop').addClass('dropUnfocus');
}

function addFadeIn() {
  $('#twoButtonMenu').addClass('fadeIn');
  $('.mainContent:not(.isHidden) .bgPlate').addClass('fadeIn');
  $('.mainContent:not(.isHidden) .frameDrop').addClass('frameDropAnim');
}

function removeFadeIn() {
  $('.fadeIn').removeClass('fadeIn');
  $('.frameDrop').removeClass('frameDropAnim');
  $('.frameDrop').css('transform', 'translate3d(0,60px,0)');// インク固定
  // アルファ固定
  $('#twoButtonMenu').css('opacity', '1');
  $('.bgPlate').css('opacity', '1');
}

// フォント遅延読み込み用
function addFontFamily() {
  $('.twoColumnButton').css('font-family', 'Splatoon1');
  $('.logoHeaderText').css('font-family', 'Splatoon1');
  $('.ikaHeader').css('font-family', 'Splatoon1');
  $('.imgDescription').css('font-family', 'Splatoon2');
  $('.imgDescriptionText .narrowFont').css('font-family', 'kurokane');
  $('.plateHeader').css('font-family', 'Splatoon2');
  $('.plateHeader .narrowFont').css('font-family', 'kurokane');
  $('.bgPlateContent').css('font-family', '"newrodinpro","NintendoExt003"');
  $('.bgHookInk').css('font-family', 'Splatoon2');
  $('.bgHookContent .narrowFont').css('font-family', 'kurokane');
}

// 画像読み込み完了してからフォントの読み込み開始
window.onload = function() {
  setTimeout(function(){addFontFamily()}, 0);// 別スレッド的な扱いになるせいか？普通にやるより高速化できる
}

// フォント読み込み完了後のアニメ
document.fonts.addEventListener('loadingdone', function() {
  dropInk(0);
  addFadeIn();
  // LR切り替えの有効化
  const DELAY = 500 // インクの垂れる時間に合わせる
  var isOneColumn = PLAYING_MATCH != MATCH_GATI && PLAYING_MATCH != MATCH_LEAGUE
  if (isOneColumn == false)  { // ガチマッチとリーグマッチのみ
    setTimeout(function(){
      setAssignLR();
      setOnKeyDown(isOneColumn);
    }, DELAY);
  }
});
