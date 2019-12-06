/**
 * �f�[�^���̓��}�C���h��Slack�ɑ��M����
 * ���s���@ �g���K�[
 * ���s���� ���T���j�� 18��~19��
 */
function remindInputData() {
  var channel = "";
  var text = "���T�̏T��f�[�^����͂��܂������H";
  var username = "�T��f�[�^���̓��}�C���h";
  var icon_emoji = ":flushed:";

  postSlackMessage(channel, text, username, icon_emoji);
}

/**
 * Slack�ɑ��M����
 * @param {String} channel Slack�`�����l��
 * @param {String} text ���M�e�L�X�g
 * @param {String} username ���M���[�U�[��
 * @param {String} icon_emoji Slack�A�C�R��
 */
function postSlackMessage(channel, text, username, icon_emoji) {
  // Slack API
  var url = "https://slack.com/api/chat.postMessage";

  // Slack�A�J�E���g�Ńg�[�N���擾
  var token = "";

  // �p�����[�^
  var method = "post";
  var payload = {
    token: token,
    channel: channel,
    text: text,
    username: username,
    icon_emoji: icon_emoji
  };
  var params = {
    method: method,
    payload: payload
  };

  // Slack�ő��M����
  try {
    var response = UrlFetchApp.fetch(url, params);
    return true;
  } catch (e) {
    Logger.log(e);
    return false;
  }
}
