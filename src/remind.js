/**
 * データ入力リマインドをSlackに送信する
 * 実行方法 トリガー
 * 実行日時 毎週金曜日 18時~19時
 */
function remindInputData() {
  var channel = "";
  var text = "来週の週報データを入力しましたか？";
  var username = "週報データ入力リマインド";
  var icon_emoji = ":flushed:";

  postSlackMessage(channel, text, username, icon_emoji);
}

/**
 * Slackに送信する
 * @param {String} channel Slackチャンネル
 * @param {String} text 送信テキスト
 * @param {String} username 送信ユーザー名
 * @param {String} icon_emoji Slackアイコン
 */
function postSlackMessage(channel, text, username, icon_emoji) {
  // Slack API
  var url = "https://slack.com/api/chat.postMessage";

  // Slackアカウントでトークン取得
  var token = "";

  // パラメータ
  var method = "post";
  var payload = {
    token: token,
    channel: channel,
    text: text,
    username: username,
    icon_emoji: icon_emoji
  };
  var params = {
    method: method,
    payload: payload
  };

  // Slackで送信する
  try {
    var response = UrlFetchApp.fetch(url, params);
    return true;
  } catch (e) {
    Logger.log(e);
    return false;
  }
}
