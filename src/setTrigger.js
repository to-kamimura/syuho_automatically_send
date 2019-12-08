/**
 * 週報自動送信を実行する為のトリガーをセットする
 * 実行方法 トリガー
 * 実行日時 毎週月曜日 05時~06時
 */
function setTriggerSendWeeklyMail() {
  // トリガーの設定情報を作成
  var fName = "sendWeeklyMail";
  var triggerDate = new Date();
  var randomMinutes = Math.floor(Math.random() * 60);
  triggerDate.setHours(9);
  triggerDate.setMinutes(randomMinutes);

  // 当日が営業日の場合のみトリガーをセットし、土日祝の場合は翌日で再度トリガーセットを試行する
  for (var i = 0; i < 5; i++) {
    if (isBusinessDay(triggerDate)) {
      setTrigger(fName, triggerDate);
      break;
    }
    triggerDate.setDate(triggerDate.getDate() + 1);
  }
}

/**
 * トリガーをセットする
 * @param  {String} fName セット対象の関数名
 * @param  {Date} date セットする日時
 */
function setTrigger(fName, date) {
  ScriptApp
    .newTrigger(fName)
    .timeBased()
    .at(date)
    .create();
}

/**
 * 引数で指定された関数のトリガーを削除する
 * @param  {String} fName 削除対象の関数名
 */
function deleteTrigger(fName) {
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() == fName) {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
}

/**
 * 営業日かどうか判定する
 * @param {Date} date 判定対象の日時
 * @return {boolean} 営業日はtrue, 土日祝はfalse
 */
function isBusinessDay(date) {
    var isBusinessDay = true;
    // 日曜日(0)または土曜日(6)はfalse
    if (date.getDay() == 0 || date.getDay() == 6) {
        isBusinessDay = false;
    }
    // Googleカレンダーの「日本の祝日」に該当する日はfalse
    var calJa = CalendarApp.getCalendarById("ja.japanese#holiday@group.v.calendar.google.com");
    if (calJa.getEventsForDay(date).length > 0) {
        isBusinessDay = false;
    }
    // 上記以外の日は営業日としてtrue
    return isBusinessDay;
}
