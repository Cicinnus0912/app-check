// eslint-disable-next-line import/no-extraneous-dependencies
import type { Request, Response } from 'express';
import type { ListItemDataType } from './data.d';

const titles = ['支付宝', '百度', '网易云', '腾讯新闻', '美团', '携程', '中国移动', '中国银行'];
const avatars = [
  'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png', // 支付宝
  'https://www.baidu.com/favicon.ico', // 百度
  'https://i.postimg.cc/fbg0Y9bJ/wangyiyun.png', // 网易云
  'https://i.postimg.cc/wBk6D8TM/tengxun.png',
  'https://i.postimg.cc/fbR4n4CG/meituan.png',
  'https://i.postimg.cc/mZYGHSP6/xiecheng.png',
  'https://i.postimg.cc/pdGRTQL1/yidong.png',
  'https://i.postimg.cc/28hWZyvx/chinabank.png',
];

const covers = [
  'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
  'https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png',
  'https://gw.alipayobjects.com/zos/rmsportal/iXjVmWVHbCJAyqvDxdtx.png',
  'https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png',
];

const descriptions = [
  '支付宝,全球领先的独立第三方支付平台,致力于为广大用户提供安全快速的电子支付/网上支付/安全支付/手机支付体验,及转账收款/水电煤缴费/信用卡还款/AA收款等生活服务应用。',
  '全球领先的中文搜索引擎、致力于让网民更便捷地获取信息，找到所求。',
  '网易云音乐是一款专注于发现与分享的音乐产品,依托专业音乐人、DJ、好友推荐及社交功能,为用户打造全新的音乐生活。',
  '腾讯网从2003年创立至今,已经成为集新闻信息,区域垂直生活服务、社会化媒体资讯和产品为一体的互联网媒体平台。',
  '美团网:美食攻略,外卖网上订餐,酒店预订,旅游团购,飞机票火车票,电影票,ktv团购吃喝玩乐全都有!',
  '携程旅行网是中国领先的在线旅行服务公司,向超过9000万会员提供酒店预订、酒店点评服务。',
  '中国移动通信集团公司，是中国规模最大的移动通信运营商，主要经营移动话音、数据、IP电话和多媒体业务',
  '中国银行是中国国际化和多元化程度最高的银行,在中国内地及六十多个国家和地区为客户提供全面的金融服务。',
];

const desc = [
  '那是一种内在的东西， 他们到达不了，也无法触及的',
  '希望是一个好东西，也许是最好的，好东西是不会消亡的',
  '生命就像一盒巧克力，结果往往出人意料',
  '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
  '那时候我只会想自己想要什么，从不想自己拥有什么',
];

const user = [
  '付小小',
  '曲丽丽',
  '林东东',
  '周星星',
  '吴加好',
  '朱偏右',
  '鱼酱',
  '乐哥',
  '谭小仪',
  '仲尼',
];

// 当前用户信息
const currentUseDetail = {
  name: 'user1',
  avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
  userid: '00000001',
  email: '244271172@qq.com',
  signature: '好好学习，天天向上',
  title: '管理员',
  group: '研究生',
  tags: [
    {
      key: '0',
      label: 'Android',
    },
    {
      key: '1',
      label: 'App 遍历',
    },
    {
      key: '2',
      label: '虚拟机',
    },
    {
      key: '3',
      label: '软件测试',
    },
    {
      key: '4',
      label: 'Java',
    },
  ],
  notice: [
    {
      id: 'xxx1',
      title: titles[0],
      logo: avatars[0],
      description: '那是一种内在的东西，他们到达不了，也无法触及的',
      updatedAt: new Date('2022-11-12'),
      member: '科学搬砖组',
      href: '',
      memberLink: '',
    },
    {
      id: 'xxx2',
      title: titles[1],
      logo: avatars[1],
      description: '希望是一个好东西，也许是最好的，好东西是不会消亡的',
      updatedAt: new Date('2017-07-24'),
      member: '全组都是吴彦祖',
      href: '',
      memberLink: '',
    },
    {
      id: 'xxx3',
      title: titles[2],
      logo: avatars[2],
      description: '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
      updatedAt: new Date('2022-11-12'),
      member: '中二少女团',
      href: '',
      memberLink: '',
    },
    {
      id: 'xxx4',
      title: titles[3],
      logo: avatars[3],
      description: '那时候我只会想自己想要什么，从不想自己拥有什么',
      updatedAt: new Date('2017-07-23'),
      member: '程序员日常',
      href: '',
      memberLink: '',
    },
    {
      id: 'xxx5',
      title: titles[4],
      logo: avatars[4],
      description: '凛冬将至',
      updatedAt: new Date('2017-07-23'),
      member: '高逼格设计天团',
      href: '',
      memberLink: '',
    },
    {
      id: 'xxx6',
      title: titles[5],
      logo: avatars[5],
      description: '生命就像一盒巧克力，结果往往出人意料',
      updatedAt: new Date('2017-07-23'),
      member: '骗你来学计算机',
      href: '',
      memberLink: '',
    },
  ],
  notifyCount: 12,
  unreadCount: 11,
  country: 'China',
  geographic: {
    province: {
      label: 'xx省',
      key: '330000',
    },
    city: {
      label: 'xx市',
      key: '330100',
    },
  },
  address: '西湖区工专路 77 号',
  phone: '0752-268888888',
};

function fakeList(count: number): ListItemDataType[] {
  const list = [];
  for (let i = 0; i < count; i += 1) {
    list.push({
      id: `fake-list-${i}`,
      owner: user[i % 10],
      title: titles[i % 8],
      avatar: avatars[i % 8],
      cover: parseInt(`${i / 4}`, 10) % 2 === 0 ? covers[i % 4] : covers[3 - (i % 4)],
      status: ['active', 'exception', 'normal'][i % 3] as
        | 'normal'
        | 'exception'
        | 'active'
        | 'success',
      percent: Math.ceil(Math.random() * 50) + 50,
      logo: avatars[i % 8],
      href: 'https://ant.design',
      // updatedAt: new Date(new Date().getTime() - 6000 * 60 * 60 * 2 * i).getTime(),
      updatedAt: new Date(new Date().getTime() - 6252 * 360 * 45 * 2 * i).getTime(),
      createdAt: new Date(new Date().getTime() - 6000 * 60 * 60 * 2 * i).getTime(),
      subDescription: desc[i % 5],
      description:
        '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。',
      activeUser: Math.ceil(Math.random() * 100000) + 100000,
      newUser: Math.ceil(Math.random() * 1000) + 1000,
      star: Math.ceil(Math.random() * 100) + 100,
      like: Math.ceil(Math.random() * 100) + 100,
      message: Math.ceil(Math.random() * 10) + 10,
      content: descriptions[i % 8],
      members: [
        {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png',
          name: '曲丽丽',
          id: 'member1',
        },
        {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png',
          name: '王昭君',
          id: 'member2',
        },
        {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png',
          name: '董娜娜',
          id: 'member3',
        },
      ],
    });
  }

  return list;
}

function getFakeList(req: Request, res: Response) {
  const params = req.query as any;

  const count = Number(params.count) * 1 || 5;

  const result = fakeList(count);
  return res.json({
    data: {
      list: result,
    },
  });
}

// 获取用户信息
function getCurrentUser(req: Request, res: Response) {
  return res.json({
    data: currentUseDetail,
  });
}

export default {
  'GET  /api/fake_list_Detail': getFakeList,
  // 支持值为 Object 和 Array
  'GET  /api/currentUserDetail': getCurrentUser,
};
