/**
 * �T�񃁁[���𑗐M����
 * ���s���@ �g���K�[
 * ���s���� ���T���j�� 9��~10��
 */
function sendWeeklyMail() {
  // ���[���p�ϐ��ݒ�
  var mailTo = "";
  var subject = generateSubject();
  var mailBody = generateBodyText();
  var sendAllay = {
    cc: "",
    bcc: "",
    from: "",
    name: ""
  };

  // ���[���𑗐M
  GmailApp.sendEmail(mailTo, subject, mailBody, sendAllay);

  // �u���T�̃^�X�N�v���u��T�̃^�X�N�v�Ɉڂ�
  backupTaskCells();
  // ��Ǝ��ԕ\���X�V
  updateTimeTable();
  // ���[�����M�p�̃g���K�[���폜����
  deleteTrigger("sendWeeklyMail");
}
