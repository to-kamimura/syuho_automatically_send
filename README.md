# 週報自動送信ツール
## 概要
Google Apps Scriptと連動して,組織ではよくある「週報」の送信を自動化します.  
下記のサンプルスプレッドシートの構造へ必要項目を入力しておくと,  
毎週初営業日を判定し、09:00～10:00の間に週報を自動で送信します.  
自動送信機能の他に,毎週の金曜日18:00～19:00の間にSlackへデータの入力を促すリマインド通知を送信します.  
  
GASプログラムの実行はトリガーによって行い,  
下記の「トリガー設定」項目の周期で該当の関数を実行します.  
  
また,当GASプロジェクトは「開発環境」項目の通りローカル環境での開発に対応しています.
## サンプルスプレッドシート
https://docs.google.com/spreadsheets/d/1voZXdKUTCv7P3Bhi8iFNHj4G5Q6FtKcOHYYfU2CKm2M/edit?usp=sharing
## トリガー設定
- 毎週月曜日05時~06時
  - sendMail.gs : setTriggerSendWeeklyMail()
- 毎週金曜日18時~19時
  - remind.gs : remindInputData()
## 開発環境
google/claspを利用し,ローカル環境での開発に対応しています.  
詳しくは下記のgoogle/claspプロジェクトを御覧ください.  
https://github.com/google/clasp
