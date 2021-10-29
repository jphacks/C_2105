### Getting Started

- node のバージョンは 16.13.0(LTS)

- `yarn install`
- `yarn start`

- ディレクトリにについて(src以下)

```
└── src
    ├── app //redux使うならいじる(多分使わない)
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
- https://daisyui.com/ 便利なので使いましょう
