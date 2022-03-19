var IS_NX = false;
$(document).ready(function(){

  IS_NX = (typeof window.nx !== 'undefined');
  // タッチの無効化 : クラス名「disableTouch」指定した要素のタッチを無効化
  $('.disableTouch').bind('touchstart', function() {
    event.preventDefault();
  });
  $('.disableTouch').bind('touchmove', function() {
    event.preventDefault();
  });
  $('.disableTouch').bind('touchend', function() {
    event.preventDefault();
  });
  // Splatoon2とくろかね70%長体をまぜる
  $(".splatoon2Font").each( function() {
    var text = $(this).html();
    $(this).html(text.replace(/([\u4E00-\u9FFF])/gi,"<span class='narrowFont'>$1</span>"));
  });
  // NXだったらXボタンは効かなくする
  if (IS_NX == true) {
    window.nx.footer.unsetAssign('X');
  }
});

function setAssignLR () {
  // L, RボタンでKeyCode発火処理 : デフォルトでは「document」に対して発火しているのでonkeydownなどはdocumentに設定する
  if (IS_NX == true) {
    window.nx.footer.setAssign('L', '', function() {
      const keyCodeL = 76;
      fireKeyCode(document, keyCodeL);
    });
    window.nx.footer.setAssign('R', '', function() {
      const keyCodeR = 82;
      fireKeyCode(document, keyCodeR);
    });
  }
}

function fireKeyCode (target, keyCode) {
  var event = $.Event('keydown');
  event.keyCode = keyCode;
  $(target).trigger(event); // documentに対して発火
}

// プレイレポート
if (IS_NX) window.nx.playReport.setCounterSetIdentifier(0);
function incCounter(obj) {
  if (IS_NX) window.nx.playReport.incrementCounter(parseInt(obj.dataset.counterId));
}
