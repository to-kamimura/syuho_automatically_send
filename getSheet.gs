/**
 * アクティブなスプレッドシートから引数のシート名のシートオブジェクトを取得する
 * @param  {String} str シート名
 * @return {Sheet} sheet シートオブジェクト
 */
function getSheetByName(str) {
  // アクティブなスプレッドシートを取得
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  // シート名strのシートオブジェクトを取得
  var sheet = spreadsheet.getSheetByName(str);

  return sheet;
}
