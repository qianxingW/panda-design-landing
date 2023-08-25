// 默认首页id
export const homeUrl = 'cf773bf6-9b45-4999-977c-57ea56ff8047'

// 默认页面配置模板
export const defaultPagesConfig = {
  config: {
    header: null,
    footer: null,
    theme: '#1565FF'
  },
  menu: [
    {
      title: '关于我们',
      id: 'aa9fed94 - d352 - 4db3- 9911 - 4340f4435570',
      url: '',
      link: {
        type: 'page',
        data: {
          page: '9c73e6c1- 0c7a- 4ce3 - bad4 - d4fd2bd057e9',
          pageType: 1
        }
      }
    }
  ],
  pages: [{
    name: '首页',
    url: 'cf773bf6-9b45-4999-977c-57ea56ff8047',
    content: [
      {
        componentName: 'Detail',
        id: 'd382f022-8d5b-4917-8bde-f928d7987ae9',
        componentType: 'element',
        type: 'component',
        props: {
          img: {
            url: '/static/images/detail/4.png',
            link: null,
            style: {
              width: 240,
              height: 240,
            },
            size: ['', ''],
            align: '',
            show: true,
          },
          name: {
            text: '刁苑雅',
            link: null,
            style: {},
            show: true,
          },
          describe: {
            text: '投资总监',
            link: null,
            style: {},
            show: true,
          },
          title: {
            text: '基本信息介绍',
            link: null,
            style: {},
            show: true,
          },
          content: {
            text: `
                中欧国际工商管理学院EMBA，清华大学工学硕士，16年证券从业经历。 历任海通证券研究所分析师，
                汇添富基金管理有限公司分析师、基金经理、投资副总监。连续荣获“2012年度股票型金牛基金奖”、
                “2013年度股票型金牛基金奖”、“2014年度股票型金牛基金奖”；“上海证报三年期股票型金基金奖”（2014）；
                “上海证报第九届金阳光三年卓越基金经理奖”（2018），“第五届中国基金业英华奖-基金三年期最佳投资经理奖”
                （2018），“Wind最强公司（五年期）”（2019）。 2014年创办巨杉（上海）资产管理有限公司。
                秉持“正直、谦虚、精进、求真”的价值观，“为持有人服务和创造价值”的使命，力争为客户创造持久稳定的回报。
                力求成长为有责任、有格局，有担当、有坚守，有核心竞争力的资产管理公司。`,
            link: null,
            style: {},
            show: true,
          },
          config: {
            size: ['', ''],
            style: {
              backgroundColor: '',
              backgroundImage: '',
            },
          },
        }
      }
    ]
  }]
}