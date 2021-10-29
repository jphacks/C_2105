import project_one from '../img/project_one.png';
import project_four from '../img/project_four.png';

export interface dataProps {
  id: number;
  title: string;
  explanation: string;
  Progress: number;
  donateHistory: {
      date: string;
      money: number;
  }[];
  news: {
      title: string;
      body: string;
      date: string;
      img: string;
  }[];
  img: string;
};

export const projectData: dataProps[] = [
  {
    id: 1,
    title: '新型コロナウイルス医療崩壊を防ぐための支援',
    explanation:
      '2019年12月に中国湖北省武漢市を中心に発生した新型コロナウイルスは、未だ猛威をふるっています。国内では新型コロナウイルス感染症の拡大が続き、2021年の年明けとともに首都圏に続いて近畿圏などでも再び緊急事態宣言が出される事態となりました。医療現場では、新型コロナウイルス感染症の患者さんを受け入れるため、ひっ迫している医療体制の維持に貢献できるよう、日々、命がけで尽力されていらっしゃいます。・・・',
    Progress: 165336555,
    donateHistory: [
      {
        date: '2021/10/23 13:59',
        money: 190,
      },
      {
        date: '2021/10/23 13:59',
        money: 190,
      },
      {
        date: '2021/10/23 13:59',
        money: 190,
      },
    ],
    news: [
      {
        title: '進捗状況1',
        body: '本文本文本文~~~',
        date: '2021/09/30',
        img: 'https://3.bp.blogspot.com/-qxetQgSBO1U/XInilu_Z1zI/AAAAAAABR1w/50j_VRxEYqETRHQGDsePI988SWsaLMISACLcBGAs/s400/kafun_tobu_character.png',
      },
      {
        title: '進捗状況2',
        body: '本文本文本文~~~',
        date: '2021/10/03',
        img: 'https://3.bp.blogspot.com/-JNjDiN5yc74/WsiR79sw9cI/AAAAAAABLJg/jM7AFIXRSG4_V2LDEB2jjMNDr8lvuADBgCLcBGAs/s400/ondanka_animal_kuma.png',
      },
      {
        title: '進捗状況3',
        body: '本文本文本文~~~',
        date: '2021/10/20',
        img: 'https://1.bp.blogspot.com/-Pwu92z37txE/X1CLHiIjzAI/AAAAAAABa10/w9jziNrtPgQSRMLtZB-koM9cwafnyTroQCNcBGAsYHQ/s400/saigai_randoseru_mamoru.png',
      },
    ],
    img: project_one,
  },
  {
    id: 2,
    title: 'コロナ寄付プロジェクト医療の現場を支えよう',
    explanation:
      'あなたの思いが医療の力に。新型コロナに立ち向かう医療機関・従事者を支援します新型コロナウイルス感染症（COVID-19）の感染が広がる中、医療体制の破綻が懸念されています。感染者が日々増加する中で、医療機関および医療従事者の負担は大きく、あらゆる支援が必要とされています。・・・',
    Progress: 10000000,
    donateHistory: [
      {
        date: '2021/10/23 13:59',
        money: 190,
      },
      {
        date: '2021/10/23 13:59',
        money: 190,
      },
      {
        date: '2021/10/23 13:59',
        money: 190,
      },
    ],
    news: [
      {
        title: '進捗状況1',
        body: '本文本文本文~~~',
        date: '2021/09/30',
        img: 'https://3.bp.blogspot.com/-qxetQgSBO1U/XInilu_Z1zI/AAAAAAABR1w/50j_VRxEYqETRHQGDsePI988SWsaLMISACLcBGAs/s400/kafun_tobu_character.png',
      },
      {
        title: '進捗状況2',
        body: '本文本文本文~~~',
        date: '2021/10/03',
        img: 'https://3.bp.blogspot.com/-JNjDiN5yc74/WsiR79sw9cI/AAAAAAABLJg/jM7AFIXRSG4_V2LDEB2jjMNDr8lvuADBgCLcBGAs/s400/ondanka_animal_kuma.png',
      },
      {
        title: '進捗状況3',
        body: '本文本文本文~~~',
        date: '2021/10/20',
        img: 'https://1.bp.blogspot.com/-Pwu92z37txE/X1CLHiIjzAI/AAAAAAABa10/w9jziNrtPgQSRMLtZB-koM9cwafnyTroQCNcBGAsYHQ/s400/saigai_randoseru_mamoru.png',
      },
    ],
    img: project_one,
  },
  {
    id: 3,
    title: 'ワクチンを世界中の人々のもとへ新型コロナウイルス緊急募金援',
    explanation:
      '20億回分のワクチンを世界中の人々のもとへ新型コロナウイルス感染症（COVID-19）は、世界中で1億7,000万人以上の感染が確認され、350万人以上が命を落としています（6月1日時点：世界保健機関（WHO）状況レポートより）。パンデミック宣言から約1年半。この間、途上国の子どもたちを取り巻く環境は急速に悪化しました。医療現場への負担の集中や、多くの医療従事者の罹患（りかん）などにより、低中所得国では提供される保健サービスが50％も減少。母子栄養サービスも著しく減少しています。',
    Progress: 496136,
    donateHistory: [
      {
        date: '2021/10/23 13:59',
        money: 190,
      },
      {
        date: '2021/10/23 13:59',
        money: 190,
      },
      {
        date: '2021/10/23 13:59',
        money: 190,
      },
    ],
    news: [
      {
        title: '進捗状況1',
        body: '本文本文本文~~~',
        date: '2021/09/30',
        img: 'https://3.bp.blogspot.com/-qxetQgSBO1U/XInilu_Z1zI/AAAAAAABR1w/50j_VRxEYqETRHQGDsePI988SWsaLMISACLcBGAs/s400/kafun_tobu_character.png',
      },
      {
        title: '進捗状況2',
        body: '本文本文本文~~~',
        date: '2021/10/03',
        img: 'https://3.bp.blogspot.com/-JNjDiN5yc74/WsiR79sw9cI/AAAAAAABLJg/jM7AFIXRSG4_V2LDEB2jjMNDr8lvuADBgCLcBGAs/s400/ondanka_animal_kuma.png',
      },
      {
        title: '進捗状況3',
        body: '本文本文本文~~~',
        date: '2021/10/20',
        img: 'https://1.bp.blogspot.com/-Pwu92z37txE/X1CLHiIjzAI/AAAAAAABa10/w9jziNrtPgQSRMLtZB-koM9cwafnyTroQCNcBGAsYHQ/s400/saigai_randoseru_mamoru.png',
      },
    ],
    img: project_one,
  },
  {
    id: 4,
    title:
      '音楽業界最大の危機を救え！音楽ライブエンタメ従事者支援「Music Cross Aid」',
    explanation:
      '今こそ音楽業界最大の危機を救う音楽ライブエンタメ従事者支援基金「Music Cross Aid」を創設します！新型コロナウイルス感染症の拡大防止を率先して務めるべく、今年の2月以降、音楽業界は多くのライブ公演の自粛を積み重ねて来ました。その効果もあってか緊急事態宣言は解除されましたが、ライブエンターテインメントに関しては未だ完全な形での再開のめどは立っていません。日本のメディアコンテンツの柱であり、特に2000年代以降、この国のカルチャーをけん引し続けて来たライブエンターテインメントは今、かつてない危機的な状況に立たされています。',
    Progress: 1619665,
    donateHistory: [
      {
        date: '2021/10/23 13:59',
        money: 190,
      },
      {
        date: '2021/10/23 13:59',
        money: 190,
      },
      {
        date: '2021/10/23 13:59',
        money: 190,
      },
    ],
    news: [
      {
        title: '進捗状況1',
        body: '本文本文本文~~~',
        date: '2021/09/30',
        img: 'https://3.bp.blogspot.com/-qxetQgSBO1U/XInilu_Z1zI/AAAAAAABR1w/50j_VRxEYqETRHQGDsePI988SWsaLMISACLcBGAs/s400/kafun_tobu_character.png',
      },
      {
        title: '進捗状況2',
        body: '本文本文本文~~~',
        date: '2021/10/03',
        img: 'https://3.bp.blogspot.com/-JNjDiN5yc74/WsiR79sw9cI/AAAAAAABLJg/jM7AFIXRSG4_V2LDEB2jjMNDr8lvuADBgCLcBGAs/s400/ondanka_animal_kuma.png',
      },
      {
        title: '進捗状況3',
        body: '本文本文本文~~~',
        date: '2021/10/20',
        img: 'https://1.bp.blogspot.com/-Pwu92z37txE/X1CLHiIjzAI/AAAAAAABa10/w9jziNrtPgQSRMLtZB-koM9cwafnyTroQCNcBGAsYHQ/s400/saigai_randoseru_mamoru.png',
      },
    ],
    img: project_four,
  },
  {
    id: 5,
    title: 'a',
    explanation: 'aaaa',
    Progress: 0,
    donateHistory: [
      {
        date: '2021/10/23 13:59',
        money: 190,
      },
      {
        date: '2021/10/23 13:59',
        money: 190,
      },
      {
        date: '2021/10/23 13:59',
        money: 190,
      },
    ],
    news: [
      {
        title: '進捗状況1',
        body: '本文本文本文~~~',
        date: '2021/09/30',
        img: 'https://3.bp.blogspot.com/-qxetQgSBO1U/XInilu_Z1zI/AAAAAAABR1w/50j_VRxEYqETRHQGDsePI988SWsaLMISACLcBGAs/s400/kafun_tobu_character.png',
      },
      {
        title: '進捗状況2',
        body: '本文本文本文~~~',
        date: '2021/10/03',
        img: 'https://3.bp.blogspot.com/-JNjDiN5yc74/WsiR79sw9cI/AAAAAAABLJg/jM7AFIXRSG4_V2LDEB2jjMNDr8lvuADBgCLcBGAs/s400/ondanka_animal_kuma.png',
      },
      {
        title: '進捗状況3',
        body: '本文本文本文~~~',
        date: '2021/10/20',
        img: 'https://1.bp.blogspot.com/-Pwu92z37txE/X1CLHiIjzAI/AAAAAAABa10/w9jziNrtPgQSRMLtZB-koM9cwafnyTroQCNcBGAsYHQ/s400/saigai_randoseru_mamoru.png',
      },
    ],
    img: project_one,
  },
  {
    id: 6,
    title: 'b',
    explanation: 'bbb',
    Progress: 10000000000,
    donateHistory: [
      {
        date: '2021/10/23 13:59',
        money: 190,
      },
      {
        date: '2021/10/23 13:59',
        money: 190,
      },
      {
        date: '2021/10/23 13:59',
        money: 190,
      },
    ],
    news: [
      {
        title: '進捗状況1',
        body: '本文本文本文~~~',
        date: '2021/09/30',
        img: 'https://3.bp.blogspot.com/-qxetQgSBO1U/XInilu_Z1zI/AAAAAAABR1w/50j_VRxEYqETRHQGDsePI988SWsaLMISACLcBGAs/s400/kafun_tobu_character.png',
      },
      {
        title: '進捗状況2',
        body: '本文本文本文~~~',
        date: '2021/10/03',
        img: 'https://3.bp.blogspot.com/-JNjDiN5yc74/WsiR79sw9cI/AAAAAAABLJg/jM7AFIXRSG4_V2LDEB2jjMNDr8lvuADBgCLcBGAs/s400/ondanka_animal_kuma.png',
      },
      {
        title: '進捗状況3',
        body: '本文本文本文~~~',
        date: '2021/10/20',
        img: 'https://1.bp.blogspot.com/-Pwu92z37txE/X1CLHiIjzAI/AAAAAAABa10/w9jziNrtPgQSRMLtZB-koM9cwafnyTroQCNcBGAsYHQ/s400/saigai_randoseru_mamoru.png',
      },
    ],
    img: project_one,
  },
  {
    id: 7,
    title: 'c',
    explanation: 'ccc',
    Progress: 5000,
    donateHistory: [
      {
        date: '2021/10/23 13:59',
        money: 190,
      },
      {
        date: '2021/10/23 13:59',
        money: 190,
      },
      {
        date: '2021/10/23 13:59',
        money: 190,
      },
    ],
    news: [
      {
        title: '進捗状況1',
        body: '本文本文本文~~~',
        date: '2021/09/30',
        img: 'https://3.bp.blogspot.com/-qxetQgSBO1U/XInilu_Z1zI/AAAAAAABR1w/50j_VRxEYqETRHQGDsePI988SWsaLMISACLcBGAs/s400/kafun_tobu_character.png',
      },
      {
        title: '進捗状況2',
        body: '本文本文本文~~~',
        date: '2021/10/03',
        img: 'https://3.bp.blogspot.com/-JNjDiN5yc74/WsiR79sw9cI/AAAAAAABLJg/jM7AFIXRSG4_V2LDEB2jjMNDr8lvuADBgCLcBGAs/s400/ondanka_animal_kuma.png',
      },
      {
        title: '進捗状況3',
        body: '本文本文本文~~~',
        date: '2021/10/20',
        img: 'https://1.bp.blogspot.com/-Pwu92z37txE/X1CLHiIjzAI/AAAAAAABa10/w9jziNrtPgQSRMLtZB-koM9cwafnyTroQCNcBGAsYHQ/s400/saigai_randoseru_mamoru.png',
      },
    ],
    img: project_one,
  },
]
