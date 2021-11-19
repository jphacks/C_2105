# スマート募金

[![スマート募金](./logo-smartbokin.png)](https://youtu.be/45O0Zeq0DPQ)  
<!-- ### [動画リンク](https://youtu.be/45O0Zeq0DPQ) -->


https://user-images.githubusercontent.com/69241625/142688394-a9d7f264-08a2-46e3-9ade-e0ce4d0f6ea5.mp4



<img src="https://user-images.githubusercontent.com/69241625/139519486-22e9d9e7-505c-4ab3-8e76-2fbf77e22dba.jpg" width="350"> <img src="https://user-images.githubusercontent.com/69241625/139519487-6aa1b9bb-2326-472b-8b67-c68ead1a3878.jpg" width="350"> <img src="https://user-images.githubusercontent.com/69241625/139519491-206e4b61-9dd8-4a07-9196-9bbbbd982cee.jpg" width="250">


## 製品概要

社会課題への参加感のあるインタラクティブな募金箱。気になる社会課題を選んで募金すると、取り組んでいる団体の活動状況と自分の貢献度が可視化される。

### 背景(製品開発のきっかけ、課題等）

この課題に取り組むきっかけは、コンビニや街に置かれる募金は何に、どう使われて、何が良くなるのかがわからない、というところから始まった。議論を進めていくうちに、日本の個人寄付額は世界と比べてかなり低い、ということがわかった。この原因の仮説として、よくわからないものに対してお金を払いたくないのではないか、と考えた。実際、災害時の緊急募金などにはかなりの寄付金額が集まっている。反対に、普段様々な社会課題に取り組んでいる NPO などの団体の活動は彼らが発信活動を積極的にしない限り知ることはない。それならば、寄付することで、彼らの活動に興味を持つきっかけになり、自分の貢献がわかるようなサービスがあればいいのでは、と着想に至った。

### 製品説明（具体的な製品の説明）

1. 社会課題プロジェクト一覧から、興味のあるプロジェクトを選ぶ。特にこだわりがない場合、ランダムでの選択を選ぶことができる。
2. プロジェクトを選び、コインをスマート募金箱に入れる。
3. プロジェクトに寄付が行われ、その結果が表示される。
4. 表示結果の QR コードから Web に飛び、寄付のログと団体の活動状況を伝えるページが表示される。

<img src="https://user-images.githubusercontent.com/69241625/139519610-73ea9eb0-89ad-4dc9-bf70-5cbfc595f8b0.png" width="500">
<!-- ![JPHACK 2 (1)](https://user-images.githubusercontent.com/69241625/139519610-73ea9eb0-89ad-4dc9-bf70-5cbfc595f8b0.png) -->

### 特長

#### 1. スマート募金箱

コインを自動で判別し、ディスプレイに募金した金額を伝える。募金が行われると、自動でプロジェクトへの寄付結果がサーバーに伝えられ、結果が表示される。

#### 2. 貢献度と活動状況がわかる Web サイト

寄付したプロジェクトの Web サイトでは、寄付した時間、金額のログと、団体の活動状況が詳しく見れる。これにより、何が行われていて、自分がどれくらい貢献しているかを実感することができる。

### 解決出来ること

経済合理性がないが、社会のために必要な活動には、公共機関からの資金調達と同時に、寄付が重要である。このサービスでは活動への理解を広めるのと、支援を同時に進めることができる。結果として、個人の寄付への意識を変えて、社会課題を解決するスピードをあげることが出来る。

### 今後の展望

- 電子決済による募金が出来る機能の開発をする。今回は、ハッカソンでの見た目のインパクトとしてコインを入れられるようにしたが、実際にコンビニでは電子決済が広く浸透している。それによる募金額の低下があるので、電子決済で募金を出来るようにしたい。

- 実際に NPO の団体に使ってもらい、フィードバックを得たい。

### 注力したこと（こだわり等）

#### スマート募金箱の設計・開発

- Arduino を使い、コインの重さを測ることでコインの判別を可能にした。原理的には難しくないが、実際に正確に動作させるのは様々な困難があった。

#### UX へのこだわり

- ユーザーの操作をタップ一つで出来るようにした。Arduino のセンサーで金額を読み取り、シリアル通信で iPad に情報を送信し、それを認識して次の画面に進ませる。というように裏側でシステムを操作し、極力ユーザーの操作を省いた。

## 開発技術

- Arduino
- Node.js, Typescript
- Python
- SQLite

#### フレームワーク・ライブラリ・モジュール

- React
- Flask
- Pytorch（改善期間に追加）

#### デバイス

- Arduino
- KKHMF デジタルロードセル + HX711軽量センサーモジュール
- iPad

### 独自技術

#### ハッカソンで開発した独自機能・技術

- 募金箱(ハードウェア部分)
  - [コインの判別、金額判定](https://github.com/jphacks/C_2105/blob/master/arduino/server/serialport.js)
  - [募金されたかどうかを認識する技術](https://github.com/jphacks/C_2105/blob/master/arduino/senser/senser.ino)

- アプリケーション(UI 部分)
  - [募金先一覧](https://github.com/jphacks/C_2105/blob/master/frontend/src/pages/FundRaisingList.tsx)
  - [ローディング](https://github.com/jphacks/C_2105/blob/master/frontend/src/pages/LoadingOnFundraising.tsx)
  - [募金結果](https://github.com/jphacks/C_2105/blob/master/frontend/src/pages/ResultFundRaising.tsx)
  - [個別プロジェクトページ](https://github.com/jphacks/C_2105/blob/master/pjpage/src/page/projects.tsx)
  
- アプリケーション(処理)
  - クライアント
    - [募金検知](https://github.com/jphacks/C_2105/blob/2a1117f8a5c86abe3453a355d3b34559425a802b/frontend/src/pages/FundRaisingList.tsx#L17-L30)
  - サーバ側(プロジェクト取得APIなど)
    - [API](https://github.com/jphacks/C_2105/blob/master/backend/src/app.py)

### 改善期間での追加機能(未完成)

完成には至らなかったが下記の機能の開発を行った

- [ResNetによって投入されたコインの種類を画像処理で識別](https://github.com/jphacks/C_2105/pull/34)  
  -> 現段階では硬貨の識別のみだが、将来的に紙幣への対応やコイン以外の投入物の識別も検討中

- [iPadでの人物検知](https://github.com/jphacks/C_2105/pull/33)  
  - 募金箱の前に人がいるかどうかを検知  
    -> 前に人がいない場合の省エネモードの実装や人がいなくなった際のルートページへの自動遷移などに応用可能
