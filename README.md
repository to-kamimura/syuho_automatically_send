# 週報自動送信ツール
## 概要
週報を手動でメール送信するのがめんどくさいのでGoogle Apps Scriptを使用して送信を自動化.
## サンプルスプレッドシート
https://docs.google.com/spreadsheets/d/1seSMkO-FQ2Fc9FgXI5DTwu6zENtLfihLdxLVlvqfLC0/edit?usp=sharing
## トリガー設定
- 毎週月曜日05時~06時
  - sendMail.gs:setTriggerSendWeeklyMail()
- 毎週金曜日18時~19時
  - remind.gs:remindInputData()
  
