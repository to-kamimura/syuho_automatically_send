/**
 * 週報の件名を生成する
 * @return {String} subject 件名
 */
function generateSubject() {
  // 前週開始日付を取得
  var startDate = new Date();
  if (startDate.getDay() > 1) {
    startDate.setDate(startDate.getDate() - (startDate.getDay() - 1));
  }
  startDate.setDate(startDate.getDate() - 7);
  // 前週最終日を取得
  var endDate = new Date(
    startDate.getYear(),
    startDate.getMonth(),
    startDate.getDate() + 4
  );

  // 件名作成
  var subject =
    Utilities.formatDate(startDate, "Asia/Tokyo", "yyyyMMdd") + "~";
  if (startDate.getMonth() == endDate.getMonth()) {
    subject += Utilities.formatDate(endDate, "Asia/Tokyo", "dd") + ")";
  } else {
    subject += Utilities.formatDate(endDate, "Asia/Tokyo", "MMdd") + ")";
  }

  return subject;
}

/**
 * 週報の本文を生成する
 * @return {String} body 週報本文の全文
 */
function generateBodyText() {
  var body = new String();
  body += generatePrefaceText();
  body += generateMainPartText();
  body += generateSignature();

  return body;
}

/**
 * 週報本文の冒頭部を生成する
 * @return {String} preface 週報冒頭部の文字列
 */
function generatePrefaceText() {
  // 前週開始日付を取得
  var startDate = new Date();
  if (startDate.getDay() > 1) {
    startDate.setDate(startDate.getDate() - (startDate.getDay() - 1));
  }
  startDate.setDate(startDate.getDate() - 7);
  // 前週最終日を取得
  var endDate = new Date(startDate.getYear(), startDate.getMonth(), startDate.getDate() + 4);

  // 週報冒頭部テキストを作成
  var preface =
    "お疲れ様です。" + String.fromCharCode(10) +
    Utilities.formatDate(startDate, "Asia/Tokyo", "M月d日") +
    "から" +
    Utilities.formatDate(endDate, "Asia/Tokyo", "M月d日") +
    "の週報を送付します。" +
    String.fromCharCode(10) + String.fromCharCode(10);

  return preface;
}

/**
 * 週報本文のメイン部分を生成する
 * @return {String} main 週報メイン部の文字列
 */
function generateMainPartText() {
  var main =
    "本文" +
    String.fromCharCode(10) +
    "=================================" +
    String.fromCharCode(10) +
    String.fromCharCode(10);

  // ①問題点
  main += generateProblemPoint();
  // ②前週の作業内容
  main += generateLastWeeksTask();
  // ③総作業時間
  main += generateTotalWorkingTime();
  // ④今週の作業予定
  main += generateThisWeeksTask();
  // ⑤休暇・研修予定
  main += generateVacationAndTraining();
  // ⑥所感などその他
  main += generateFeelingAndEtc();

  return main;
}

/**
 * ①問題点 のテキストを生成する
 * @return {String} problemPoint ①問題点
 */
function generateProblemPoint() {
  // 問題点のセルのレンジを取得
  var range = getSheetByName("週報生成用データ入力シート").getRange("C10");

  // 問題点のテキストを生成
  var problemPoint = "①問題点" + String.fromCharCode(10);
  if (range.isBlank()) {
    problemPoint += "　特になし" + String.fromCharCode(10) + String.fromCharCode(10);
  } else {
    problemPoint +=
      "　" + range.getValues() + String.fromCharCode(10) + String.fromCharCode(10);
  }

  return problemPoint;
}

/**
 * ②前週の作業内容 のテキストを作成
 * @return {String} lastWeeksTask ②前週の作業内容
 */
function generateLastWeeksTask() {
  // シートオブジェクトの取得
  var sheet = getSheetByName("週報生成用データ入力シート");
  // シートの列C~D指定用の配列
  var columns = "CDEFGH".split("");

  // ②前週の作業内容テキスト
  var lastWeeksTask = "②前週の作業内容" + String.fromCharCode(10);

  // 運用系タスクのテキストを作成
  lastWeeksTask += "　【運用系】" + String.fromCharCode(10);
  // セルC12~H12 から先週の運用系タスクを取得
  for (var i = 0; i < columns.length; i++) {
    var opeLastWeekCell = columns[i] + "12";
    if (!sheet.getRange(opeLastWeekCell).isBlank()) {
      lastWeeksTask += "　・" + sheet.getRange(opeLastWeekCell).getValues() + String.fromCharCode(10);
    }
  }

  // 開発系タスクのテキストを作成
  lastWeeksTask += "　【開発系】" + String.fromCharCode(10);
  // セルC13:H15 から先週の開発系タスクを取得
  for (var i = 0; i < columns.length; i++) {
    for (var n = 13; n < 16; n++) {
      var devLastWeekCell = columns[i] + n;
      if (!sheet.getRange(devLastWeekCell).isBlank()) {
        if (n == 13) {
          lastWeeksTask += "　・" + sheet.getRange(devLastWeekCell).getValues() + String.fromCharCode(10);
        } else if (n == 14) {
          lastWeeksTask += "　　└ " + sheet.getRange(devLastWeekCell).getValues() + "％" + String.fromCharCode(10);
        } else {
          lastWeeksTask += "　　　 " + sheet.getRange(devLastWeekCell).getValues() + String.fromCharCode(10);
        }
      }
    }
  }

  // 末尾の改行を追加
  lastWeeksTask += String.fromCharCode(10);

  return lastWeeksTask;
}

/**
 * ③総作業時間 のテキストを作成
 * @return {String} totalTime ③総作業時間
 */
function generateTotalWorkingTime() {
  // 総作業時間のセルのレンジを取得
  var range = getSheetByName("週報生成用データ入力シート").getRange("H2");

  // ③総作業時間テキスト
  var totalTime =
    "③総作業時間" + String.fromCharCode(10) +
    "　" + range.getValues() + "時間" + String.fromCharCode(10) + String.fromCharCode(10);

  return totalTime;
}

/**
 * ④今週の作業予定 のテキストを作成
 * @return {String} thisWeeksTask ④今週の作業予定
 */
function generateThisWeeksTask() {
  // シートオブジェクトの取得
  var sheet = getSheetByName("週報生成用データ入力シート");
  // シートの列C~D指定用の配列
  var columns = "CDEFGH".split("");

  // ④今週の作業予定テキスト
  var thisWeeksTask = "④今週の作業予定" + String.fromCharCode(10);

  // 運用系タスクのテキストを作成
  thisWeeksTask += "　【運用系】" + String.fromCharCode(10);
  // セルC4~H4 から今週の運用系タスクを取得
  for (var i = 0; i < columns.length; i++) {
    var opeThisWeekCell = columns[i] + "4";
    if (!sheet.getRange(opeThisWeekCell).isBlank()) {
      thisWeeksTask += "　・" + sheet.getRange(opeThisWeekCell).getValues() + String.fromCharCode(10);
    }
  }

  // 開発系タスクのテキストを作成
  thisWeeksTask += "　【開発系】" + String.fromCharCode(10);
  // セルC5:H7 から今週の開発系タスクを取得
  for (var i = 0; i < columns.length; i++) {
    for (var n = 5; n < 8; n++) {
      var devThisWeekCell = columns[i] + n;
      if (!sheet.getRange(devThisWeekCell).isBlank()) {
        if (n == 5) {
          thisWeeksTask += "　・" + sheet.getRange(devThisWeekCell).getValues() + String.fromCharCode(10);
        } else if (n == 6) {
          thisWeeksTask += "　　└ " + sheet.getRange(devThisWeekCell).getValues() + "％" + String.fromCharCode(10);
        } else {
          thisWeeksTask += "　　　 " + sheet.getRange(devThisWeekCell).getValues() + String.fromCharCode(10);
        }
      }
    }
  }

  // 末尾の改行を追加
  thisWeeksTask += String.fromCharCode(10);

  return thisWeeksTask;
}

/**
 * ⑤休暇・研修予定 のテキストを作成
 * @return {String} vacation ⑤休暇・研修予定
 */
function generateVacationAndTraining() {
  // シートオブジェクトの取得
  var sheet = getSheetByName("週報生成用データ入力シート");
  // 休暇・研修予定のセルの値を取得
  var vacation = new String();
  vacation += "⑤休暇・研修予定" + String.fromCharCode(10);
  if (sheet.getRange("C8").isBlank()) {
    vacation += "　特になし" + String.fromCharCode(10);
  } else {
    var columns = "CDEFGH".split("");
    for (var i = 0; i < columns.length; i++) {
      var vacationCell = columns[i] + "8";
      if (!sheet.getRange(vacationCell).isBlank()) {
        vacation +=
          "　" +
          sheet.getRange(vacationCell).getValues() +
          String.fromCharCode(10);
      }
    }
  }

  // 末尾の改行を追加
  vacation += String.fromCharCode(10);

  return vacation;
}

/**
 * ⑥所感などその他 のテキストを作成
 * @return {String} feeling ⑥所感などその他
 */
function generateFeelingAndEtc() {
  // 所感などその他のセルのレンジを取得
  var range = getSheetByName("週報生成用データ入力シート").getRange("C9");
  // 所感などその他のセルの値を取得
  var feeling = new String();
  feeling += "⑥所感などその他" + String.fromCharCode(10);
  if (range.isBlank()) {
    feeling += "　特になし" + String.fromCharCode(10);
  } else {
    feeling +=
      "　" + range.getValues() + String.fromCharCode(10);
  }

  // 末尾の改行を追加
  feeling += String.fromCharCode(10);

  return feeling;
}

/**
 * 署名を生成する
 * @return {String} signature 署名の文字列
 */
function generateSignature() {
  var signature = "";

  return signature;
}
