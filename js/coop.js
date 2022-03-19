// 連打防止
var disableJumpPage = false;

$(document).ready(function(){
  // フォーカス時の処理
  $(".paper").focusin(function(e) {
      $(this).addClass("focus");
    })
    .focusout(function(e) {
      $(this).removeClass("focus");
    });
  // 遷移時フェード表示
  $('a').click(function(){
    // ページ遷移可否判定
    if (disableJumpPage == true) return false;
    disableJumpPage = true;
    // ページ遷移
    var ANIMATION_DURATION = 500;
    var path = $(this).attr("href");
    toggleAnimationClass(true);
    setTimeout(function(){
      // ページ遷移
      location.href = path;
      // CSSリセット。Cruiser対処
      setTimeout(function(){
        window.requestAnimationFrame(function(){
          toggleAnimationClass(false);
          disableJumpPage = false;
        });
      }, 100);
    }, ANIMATION_DURATION);
    return false;
  });
});

function toggleAnimationClass (isShow) {
  if (isShow == true) {
    $('.content').addClass("fadeOut");
    $('#backButton').addClass("fadeOut");
    $(':focus').addClass("infiniteScale");
  } else {
    $('.content').removeClass("fadeOut");
    $('#backButton').removeClass("fadeOut");
    $('.paper').removeClass("infiniteScale");
  }
}
