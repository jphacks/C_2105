### Getting Started

- node のバージョンは 16.13.0(LTS)

- `yarn install`
- `yarn start`


### 一部API(getUserMedia)がhttpsまたはlocalhostでしか動かないため、ipadで動作確認を行う際は`ngrok`等でポートフォワーディングする
- 同時に2つのポートを開ける(ymlの修正) `~/.ngrok2/ngrok.yml`
- [authtoken](https://dashboard.ngrok.com/get-started/setup)
```
authtoken: xxx
tunnels:
  backend:
    addr: 8080
    proto: http
  arduino:
    addr: 3001
    proto: http
```
`./ngrok start backend arduino`
### 環境変数について

- .env.local

```
REACT_APP_REST_URL=*** <-backend server
REACT_APP_ARDUINO_ENDPOINT=*** <-Arduino server
REACT_APP_PJ=*** <-Detail PJ(Another frontend)
HTTPS=true
```

- ディレクトリにについて(src 以下)

```
└── src
    ├── components //Atomic Designガン無視で全部突っ込んであるところ(粒度分けたかったら分割してください🙏)
    ├── context //全体で管理するものがPJの情報くらいしかないので、contextで
    ├── dummyData //Backendできるまでのダミーデータ
    ├── pages //表示されているページ、コンポーネント群を一つにまとめている。
    ├── types //型定義まとめてる
    ├── hooks //APIとかの呼び出し
    └── lib //再利用できそうな便利な関数とか
```

### その他

- css フレームワーク は tailwind css
- グローバルに持ちたい State は Context で、memo と useCallback でできれば不要なレンダリングを避ける
- 後々出てくる API Fetch 等は React Query 等々使って hooks に切り分ける
- https://daisyui.com/ をとりあえず使ってる。
