/**
 * ��Ǝ��ԕ\���X�V����
 */
function updateTimeTable() {
  generateDates();
  deleteTime();
}

/**
 * ��Ǝ��ԓ��͕\�p�ɍ��T�̓��t���擾���A�Z��C1~G1�ɓ��͂���
 */
function generateDates() {
  // �V�[�g�I�u�W�F�N�g�̎擾
  var sheet = getSheetByName("�T�񐶐��p�f�[�^���̓V�[�g");
  // �V�[�g�̗�C~D�w��p�̔z��
  var columns = "CDEFG".split("");
  // �j���z��
  var weekDayAry = "�����ΐ��؋��y".split("");

  // �T���̌��j��������j���܂œ��t�����ɃZ��C1~G1�ɓ��͂���
  var date = new Date();
  if (date.getDay() > 1) {
    date.setDate(date.getDate() - (date.getDay() - 1));
  }
  for (var i = 0; i < 5; i++) {
    var range = columns[i] + "1";
    sheet
      .getRange(range)
      .setValue(Utilities.formatDate(date, "Asia/Tokyo", "M��d��") + "�i" + weekDayAry[date.getDay()] + "�j");
    date.setDate(date.getDate() + 1);
  }
}

/**
 * �O�T�̍�Ǝ��Ԃ��폜����
 */
function deleteTime() {
  // �V�[�g�I�u�W�F�N�g�̎擾
  var sheet = getSheetByName("�T�񐶐��p�f�[�^���̓V�[�g");
  // �V�[�g�̗�C~D�w��p�̔z��
  var columns = "CDEFG".split("");

  // ��Ǝ��ԃZ��C2~G2�̒l���폜
  for (var i = 0; i < 5; i++) {
    var range = columns[i] + "2";
    sheet
      .getRange(range)
      .clearContent();
  }
}

/**
 * �u���T�̃^�X�N�v�̒l���u��T�̃^�X�N�v�̑Ή�����Z���ɃR�s�[����
 */
function backupTaskCells() {
  // �V�[�g�I�u�W�F�N�g�̎擾
  var sheet = getSheetByName("�T�񐶐��p�f�[�^���̓V�[�g");
  // �u���T�̃^�X�N�v�̒l���u��T�̃^�X�N�v�̃Z���փR�s�[����
  var columns = "CDEFGH".split("");
  for (var i = 0; i < columns.length; i++) {
    for (var n = 4; n < 8; n++) {
      var thisWeekCell = columns[i] + String(n);
      var lastWeekCell = columns[i] + String(n + 8);
      sheet
        .getRange(lastWeekCell)
        .setValue(sheet.getRange(thisWeekCell).getValues());
      // �o�b�N�A�b�v������������A�u���T�̃^�X�N(�J��)�v���́u�ڍׁv�̒l���폜����
      if (n == 7) {
        sheet.getRange(thisWeekCell).clearContent();
      }
    }
  }
}
