/**
 * �A�N�e�B�u�ȃX�v���b�h�V�[�g��������̃V�[�g���̃V�[�g�I�u�W�F�N�g���擾����
 * @param  {String} str �V�[�g��
 * @return {Sheet} sheet �V�[�g�I�u�W�F�N�g
 */
function getSheetByName(str) {
  // �A�N�e�B�u�ȃX�v���b�h�V�[�g���擾
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  // �V�[�g��str�̃V�[�g�I�u�W�F�N�g���擾
  var sheet = spreadsheet.getSheetByName(str);

  return sheet;
}
