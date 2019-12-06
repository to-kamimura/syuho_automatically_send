/**
 * �T��̌����𐶐�����
 * @return {String} subject ����
 */
function generateSubject() {
  // �O�T�J�n���t���擾
  var startDate = new Date();
  if (startDate.getDay() > 1) {
    startDate.setDate(startDate.getDate() - (startDate.getDay() - 1));
  }
  startDate.setDate(startDate.getDate() - 7);
  // �O�T�ŏI�����擾
  var endDate = new Date(
    startDate.getYear(),
    startDate.getMonth(),
    startDate.getDate() + 4
  );

  // �����쐬
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
 * �T��̖{���𐶐�����
 * @return {String} body �T��{���̑S��
 */
function generateBodyText() {
  var body = new String();
  body += generatePrefaceText();
  body += generateMainPartText();
  body += generateSignature();

  return body;
}

/**
 * �T��{���̖`�����𐶐�����
 * @return {String} preface �T��`�����̕�����
 */
function generatePrefaceText() {
  // �O�T�J�n���t���擾
  var startDate = new Date();
  if (startDate.getDay() > 1) {
    startDate.setDate(startDate.getDate() - (startDate.getDay() - 1));
  }
  startDate.setDate(startDate.getDate() - 7);
  // �O�T�ŏI�����擾
  var endDate = new Date(startDate.getYear(), startDate.getMonth(), startDate.getDate() + 4);

  // �T��`�����e�L�X�g���쐬
  var preface =
    "�����l�ł��B" + String.fromCharCode(10) +
    Utilities.formatDate(startDate, "Asia/Tokyo", "M��d��") +
    "����" +
    Utilities.formatDate(endDate, "Asia/Tokyo", "M��d��") +
    "�̏T��𑗕t���܂��B" +
    String.fromCharCode(10) + String.fromCharCode(10);

  return preface;
}

/**
 * �T��{���̃��C�������𐶐�����
 * @return {String} main �T�񃁃C�����̕�����
 */
function generateMainPartText() {
  var main =
    "�{��" +
    String.fromCharCode(10) +
    "=================================" +
    String.fromCharCode(10) +
    String.fromCharCode(10);

  // �@���_
  main += generateProblemPoint();
  // �A�O�T�̍�Ɠ��e
  main += generateLastWeeksTask();
  // �B����Ǝ���
  main += generateTotalWorkingTime();
  // �C���T�̍�Ɨ\��
  main += generateThisWeeksTask();
  // �D�x�ɁE���C�\��
  main += generateVacationAndTraining();
  // �E�����Ȃǂ��̑�
  main += generateFeelingAndEtc();

  return main;
}

/**
 * �@���_ �̃e�L�X�g�𐶐�����
 * @return {String} problemPoint �@���_
 */
function generateProblemPoint() {
  // ���_�̃Z���̃����W���擾
  var range = getSheetByName("�T�񐶐��p�f�[�^���̓V�[�g").getRange("C10");

  // ���_�̃e�L�X�g�𐶐�
  var problemPoint = "�@���_" + String.fromCharCode(10);
  if (range.isBlank()) {
    problemPoint += "�@���ɂȂ�" + String.fromCharCode(10) + String.fromCharCode(10);
  } else {
    problemPoint +=
      "�@" + range.getValues() + String.fromCharCode(10) + String.fromCharCode(10);
  }

  return problemPoint;
}

/**
 * �A�O�T�̍�Ɠ��e �̃e�L�X�g���쐬
 * @return {String} lastWeeksTask �A�O�T�̍�Ɠ��e
 */
function generateLastWeeksTask() {
  // �V�[�g�I�u�W�F�N�g�̎擾
  var sheet = getSheetByName("�T�񐶐��p�f�[�^���̓V�[�g");
  // �V�[�g�̗�C~D�w��p�̔z��
  var columns = "CDEFGH".split("");

  // �A�O�T�̍�Ɠ��e�e�L�X�g
  var lastWeeksTask = "�A�O�T�̍�Ɠ��e" + String.fromCharCode(10);

  // �^�p�n�^�X�N�̃e�L�X�g���쐬
  lastWeeksTask += "�@�y�^�p�n�z" + String.fromCharCode(10);
  // �Z��C12~H12 �����T�̉^�p�n�^�X�N���擾
  for (var i = 0; i < columns.length; i++) {
    var opeLastWeekCell = columns[i] + "12";
    if (!sheet.getRange(opeLastWeekCell).isBlank()) {
      lastWeeksTask += "�@�E" + sheet.getRange(opeLastWeekCell).getValues() + String.fromCharCode(10);
    }
  }

  // �J���n�^�X�N�̃e�L�X�g���쐬
  lastWeeksTask += "�@�y�J���n�z" + String.fromCharCode(10);
  // �Z��C13:H15 �����T�̊J���n�^�X�N���擾
  for (var i = 0; i < columns.length; i++) {
    for (var n = 13; n < 16; n++) {
      var devLastWeekCell = columns[i] + n;
      if (!sheet.getRange(devLastWeekCell).isBlank()) {
        if (n == 13) {
          lastWeeksTask += "�@�E" + sheet.getRange(devLastWeekCell).getValues() + String.fromCharCode(10);
        } else if (n == 14) {
          lastWeeksTask += "�@�@�� " + sheet.getRange(devLastWeekCell).getValues() + "��" + String.fromCharCode(10);
        } else {
          lastWeeksTask += "�@�@�@ " + sheet.getRange(devLastWeekCell).getValues() + String.fromCharCode(10);
        }
      }
    }
  }

  // �����̉��s��ǉ�
  lastWeeksTask += String.fromCharCode(10);

  return lastWeeksTask;
}

/**
 * �B����Ǝ��� �̃e�L�X�g���쐬
 * @return {String} totalTime �B����Ǝ���
 */
function generateTotalWorkingTime() {
  // ����Ǝ��Ԃ̃Z���̃����W���擾
  var range = getSheetByName("�T�񐶐��p�f�[�^���̓V�[�g").getRange("H2");

  // �B����Ǝ��ԃe�L�X�g
  var totalTime =
    "�B����Ǝ���" + String.fromCharCode(10) +
    "�@" + range.getValues() + "����" + String.fromCharCode(10) + String.fromCharCode(10);

  return totalTime;
}

/**
 * �C���T�̍�Ɨ\�� �̃e�L�X�g���쐬
 * @return {String} thisWeeksTask �C���T�̍�Ɨ\��
 */
function generateThisWeeksTask() {
  // �V�[�g�I�u�W�F�N�g�̎擾
  var sheet = getSheetByName("�T�񐶐��p�f�[�^���̓V�[�g");
  // �V�[�g�̗�C~D�w��p�̔z��
  var columns = "CDEFGH".split("");

  // �C���T�̍�Ɨ\��e�L�X�g
  var thisWeeksTask = "�C���T�̍�Ɨ\��" + String.fromCharCode(10);

  // �^�p�n�^�X�N�̃e�L�X�g���쐬
  thisWeeksTask += "�@�y�^�p�n�z" + String.fromCharCode(10);
  // �Z��C4~H4 ���獡�T�̉^�p�n�^�X�N���擾
  for (var i = 0; i < columns.length; i++) {
    var opeThisWeekCell = columns[i] + "4";
    if (!sheet.getRange(opeThisWeekCell).isBlank()) {
      thisWeeksTask += "�@�E" + sheet.getRange(opeThisWeekCell).getValues() + String.fromCharCode(10);
    }
  }

  // �J���n�^�X�N�̃e�L�X�g���쐬
  thisWeeksTask += "�@�y�J���n�z" + String.fromCharCode(10);
  // �Z��C5:H7 ���獡�T�̊J���n�^�X�N���擾
  for (var i = 0; i < columns.length; i++) {
    for (var n = 5; n < 8; n++) {
      var devThisWeekCell = columns[i] + n;
      if (!sheet.getRange(devThisWeekCell).isBlank()) {
        if (n == 5) {
          thisWeeksTask += "�@�E" + sheet.getRange(devThisWeekCell).getValues() + String.fromCharCode(10);
        } else if (n == 6) {
          thisWeeksTask += "�@�@�� " + sheet.getRange(devThisWeekCell).getValues() + "��" + String.fromCharCode(10);
        } else {
          thisWeeksTask += "�@�@�@ " + sheet.getRange(devThisWeekCell).getValues() + String.fromCharCode(10);
        }
      }
    }
  }

  // �����̉��s��ǉ�
  thisWeeksTask += String.fromCharCode(10);

  return thisWeeksTask;
}

/**
 * �D�x�ɁE���C�\�� �̃e�L�X�g���쐬
 * @return {String} vacation �D�x�ɁE���C�\��
 */
function generateVacationAndTraining() {
  // �V�[�g�I�u�W�F�N�g�̎擾
  var sheet = getSheetByName("�T�񐶐��p�f�[�^���̓V�[�g");
  // �x�ɁE���C�\��̃Z���̒l���擾
  var vacation = new String();
  vacation += "�D�x�ɁE���C�\��" + String.fromCharCode(10);
  if (sheet.getRange("C8").isBlank()) {
    vacation += "�@���ɂȂ�" + String.fromCharCode(10);
  } else {
    var columns = "CDEFGH".split("");
    for (var i = 0; i < columns.length; i++) {
      var vacationCell = columns[i] + "8";
      if (!sheet.getRange(vacationCell).isBlank()) {
        vacation +=
          "�@" +
          sheet.getRange(vacationCell).getValues() +
          String.fromCharCode(10);
      }
    }
  }

  // �����̉��s��ǉ�
  vacation += String.fromCharCode(10);

  return vacation;
}

/**
 * �E�����Ȃǂ��̑� �̃e�L�X�g���쐬
 * @return {String} feeling �E�����Ȃǂ��̑�
 */
function generateFeelingAndEtc() {
  // �����Ȃǂ��̑��̃Z���̃����W���擾
  var range = getSheetByName("�T�񐶐��p�f�[�^���̓V�[�g").getRange("C9");
  // �����Ȃǂ��̑��̃Z���̒l���擾
  var feeling = new String();
  feeling += "�E�����Ȃǂ��̑�" + String.fromCharCode(10);
  if (range.isBlank()) {
    feeling += "�@���ɂȂ�" + String.fromCharCode(10);
  } else {
    feeling +=
      "�@" + range.getValues() + String.fromCharCode(10);
  }

  // �����̉��s��ǉ�
  feeling += String.fromCharCode(10);

  return feeling;
}

/**
 * �����𐶐�����
 * @return {String} signature �����̕�����
 */
function generateSignature() {
  var signature = "";

  return signature;
}
