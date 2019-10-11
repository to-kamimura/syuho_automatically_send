/**
 * 作業時間表を更新する
 */
function updateTimeTable() {
  generateDates();
  deleteTime();
}

/**
 * 作業時間入力表用に今週の日付を取得し、セルC1~G1に入力する
 */
function generateDates() {
  // シートオブジェクトの取得
  var sheet = getSheetByName("週報生成用データ入力シート");
  // シートの列C~D指定用の配列
  var columns = "CDEFG".split("");
  // 曜日配列
  var weekDayAry = "日月火水木金土".split("");

  // 週初の月曜日から金曜日まで日付を順にセルC1~G1に入力する
  var date = new Date();
  if (date.getDay() > 1) {
    date.setDate(date.getDate() - (date.getDay() - 1));
  }
  for (var i = 0; i < 5; i++) {
    var range = columns[i] + "1";
    sheet
      .getRange(range)
      .setValue(Utilities.formatDate(date, "Asia/Tokyo", "M月d日") + "（" + weekDayAry[date.getDay()] + "）");
    date.setDate(date.getDate() + 1);
  }
}

/**
 * 前週の作業時間を削除する
 */
function deleteTime() {
  // シートオブジェクトの取得
  var sheet = getSheetByName("週報生成用データ入力シート");
  // シートの列C~D指定用の配列
  var columns = "CDEFG".split("");

  // 作業時間セルC2~G2の値を削除
  for (var i = 0; i < 5; i++) {
    var range = columns[i] + "2";
    sheet
      .getRange(range)
      .clearContent();
  }
}

/**
 * 「今週のタスク」の値を「先週のタスク」の対応するセルにコピーする
 */
function backupTaskCells() {
  // シートオブジェクトの取得
  var sheet = getSheetByName("週報生成用データ入力シート");
  // 「今週のタスク」の値を「先週のタスク」のセルへコピーする
  var columns = "CDEFGH".split("");
  for (var i = 0; i < columns.length; i++) {
    for (var n = 4; n < 8; n++) {
      var thisWeekCell = columns[i] + String(n);
      var lastWeekCell = columns[i] + String(n + 8);
      sheet
        .getRange(lastWeekCell)
        .setValue(sheet.getRange(thisWeekCell).getValues());
      // バックアップが完了したら、「今週のタスク(開発)」内の「詳細」の値を削除する
      if (n == 7) {
        sheet.getRange(thisWeekCell).clearContent();
      }
    }
  }
}
