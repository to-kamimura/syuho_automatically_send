/**
 * �T�񎩓����M�����s����ׂ̃g���K�[���Z�b�g����
 * ���s���@ �g���K�[
 * ���s���� ���T���j�� 05��~06��
 */
function setTriggerSendWeeklyMail() {
  // �g���K�[�̐ݒ�����쐬
  var fName = "sendWeeklyMail";
  var triggerDate = new Date();
  var randomMinutes = Math.floor(Math.random() * 60);
  triggerDate.setHours(9);
  triggerDate.setMinutes(randomMinutes);

  // �������c�Ɠ��̏ꍇ�̂݃g���K�[���Z�b�g���A�y���j�̏ꍇ�͗����ōēx�g���K�[�Z�b�g�����s����
  for (var i = 0; i < 5; i++) {
    if (isBusinessDay(triggerDate)) {
      setTrigger(fName, triggerDate);
      break;
    }
    triggerDate.setDate(triggerDate.getDate() + 1);
  }
}

/**
 * �g���K�[���Z�b�g����
 * @param  {String} fName �Z�b�g�Ώۂ̊֐���
 * @param  {Date} date �Z�b�g�������
 */
function setTrigger(fName, date) {
  ScriptApp
    .newTrigger(fName)
    .timeBased()
    .at(date)
    .create();
}

/**
 * �����Ŏw�肳�ꂽ�֐��̃g���K�[���폜����
 * @param  {String} fName �폜�Ώۂ̊֐���
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
 * �c�Ɠ����ǂ������肷��
 * @param {Date} date ����Ώۂ̓���
 * @return {boolean} �c�Ɠ���true, �y���j��false
 */
function isBusinessDay(date) {
    var isBusinessDay = true;
    // ���j��(0)�܂��͓y�j��(6)��false
    if (date.getDay() == 0 || date.getDay() == 6) {
        isBusinessDay = false;
    }
    // Google�J�����_�[�́u���{�̏j���v�ɊY���������false
    var calJa = CalendarApp.getCalendarById("ja.japanese#holiday@group.v.calendar.google.com");
    if (calJa.getEventsForDay(date).length > 0) {
        isBusinessDay = false;
    }
    // ��L�ȊO�̓��͉c�Ɠ��Ƃ���true
    return isBusinessDay;
}
