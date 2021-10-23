### Getting Started

- `yarn install`
- `yarn start`

- ディレクトリにについて(src は以下)

```
└── src
    ├── app //redux使うならいじる(多分使わない)
    ├── components //Atomic Designガン無視で全部突っ込んであるところ(粒度分けたかったら分割してください🙏)
    ├── context //全体で管理するものがPJの情報くらいしかないので、contextで
    ├── dummyData //Backendできるまでのダミーデータ
    ├── features //redux使うならいじる(多分使わない)
    ├── pages //表示されているページ、コンポーネント群を一つにまとめている。
    └── types //型定義まとめてる
```

### その他

- css は tailwind css 使ってます
- グローバルに持ちたい State は Context で、memo と useCallback でできれば不要なレンダリングを避ける
- Unit Test くらいは書いておきたい
- 後々出てくる API Fetch 等は React Query 等々使って hooks に切り分ける
