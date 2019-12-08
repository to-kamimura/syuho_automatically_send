# 週報自動送信ツール
## 概要
Google Apps Scriptと連動して,手動で送るのが面倒な週報の送信を自動化.  
下記のサンプルスプレッドシートの構造を使い必要情報を入力すると,  
毎週初営業日の09:00~10:00に週報を自動で送信します.
## サンプルスプレッドシート
https://docs.google.com/spreadsheets/d/1voZXdKUTCv7P3Bhi8iFNHj4G5Q6FtKcOHYYfU2CKm2M/edit?usp=sharing
## トリガー設定
- 毎週月曜日05時~06時
  - sendMail.gs : setTriggerSendWeeklyMail()
- 毎週金曜日18時~19時
  - remind.gs : remindInputData()
## 開発環境
google/claspを利用し,ローカル環境にて開発.
