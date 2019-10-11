/**
 * 週報メールを送信する
 * 実行方法 トリガー
 * 実行日時 毎週月曜日 9時~10時
 */
function sendWeeklyMail() {
  // メール用変数設定
  var mailTo = "";
  var subject = generateSubject();
  var mailBody = generateBodyText();
  var sendAllay = {
    cc: "",
    bcc: "",
    from: "",
    name: ""
  };

  // メールを送信
  GmailApp.sendEmail(mailTo, subject, mailBody, sendAllay);

  // 「今週のタスク」を「先週のタスク」に移す
  backupTaskCells();
  // 作業時間表を更新
  updateTimeTable();
  // メール送信用のトリガーを削除する
  deleteTrigger("sendWeeklyMail");
}
