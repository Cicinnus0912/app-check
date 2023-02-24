import { AdvancedOperation } from './data.d';
import type { Request, Response } from 'express';

const generateRdStr = function () {
  const len = 20;
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < len; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
};

const advancedOperation = [
  {
    status: 'agree',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
    key: 'user06',
    authority: '参与者',
    description: '支付宝,全球领先的独立第三方支付平台。',
    name: '支付宝',
    createdAt: '2022-10-04  09:32:12',
    memo: '开发需要',
    res: '申请权限范围合理，通过审批。',
  },
  {
    status: 'reject',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
    key: 'user07',
    authority: '测试者',
    description: '支付宝,全球领先的独立第三方支付平台。',
    name: '支付宝',
    createdAt: '2022-10-25  15:23:44',
    memo: '开发需要',
    res: '申请权限范围不合理，<参与者>权限即可覆盖需求，予以驳回。',
  }, //reject
];

const advancedOperation1 = [
  {
    key: 'version 10.3.20',
    description: '集五福，过福年！升级至最新版，2022年新春享更多玩法。',
    name: 'user',
    status: 'agree',
    createdAt: '2022-11-29  19:52:36',
    memo: 'alipay_v_10_3_20.apk',
  },
  {
    key: 'version 10.3.10',
    description:
      'iOS14小组件：新增可以添加到手机桌面的小组件「支付宝」「蚂蚁森林」「蚂蚁庄园」「行情看板」，仅iOS14及以上的系统版本可用。',
    name: 'user',
    status: 'reject',
    createdAt: '2022-10-31  18:44:14',
    memo: 'alipay_v_10_3_10.apk',
  },
  {
    key: 'version 10.3.0',
    description: '首页“扫一扫——识物”：对准物体拍照识别，快速获取商品、植物、动物、汽车的相关信息。',
    name: 'user',
    status: 'agree',
    createdAt: '2022-09-19  16:02:06',
    memo: 'alipay_v_10_3_0.apk',
  },
  {
    key: 'version 10.2.96',
    description: '首页“付钱”“收钱”合并，使用更方便。',
    name: 'user',
    status: 'agree',
    createdAt: '2022-08-31  19:11:03',
    memo: 'alipay_v_10_2_96.apk',
  },
  {
    key: 'version 10.2.90',
    description: '花呗金升级，做任务赚花呗金，抵扣花呗还款额，会花能省，持家小能手就是你。',
    name: 'user',
    status: 'agree',
    createdAt: '2022-08-25  20:22:12',
    memo: 'alipay_v_10_2_90.apk',
  },
  {
    key: 'version 10.2.86',
    description: '首页新增“出行”，搭公交、乘地铁、坐火车、骑单车、网约车，出行更便捷。',
    name: 'user',
    status: 'agree',
    createdAt: '2022-08-16  14:11:36',
    memo: 'alipay_v_10_2_82.apk',
  },
  {
    key: 'version 10.2.80',
    description: '支付宝品牌色全新升级，更亲和、更明快。',
    name: 'user',
    status: 'agree',
    createdAt: '2022-08-04  19:53:62',
    memo: 'alipay_v_10_2_80.apk',
  },
  {
    key: 'version 10.2.76',
    description: '“财富”频道更名为“理财”，理财就上支付宝，安全方便又省心。',
    name: 'user',
    status: 'agree',
    createdAt: '2022-07-04  15:23:12',
    memo: 'alipay_v_10_2_76.apk',
  },
];

const advancedOperation2 = [
  {
    key: '图片替代文本测试',
    description: '找出移动应用中的图片控件，测试该控件是否具有替代文本。',
    name: 'user',
    status: 'agree',
    createdAt: '2022-11-20  19:52:36',
    memo: `${generateRdStr()}.jar`,
  },
  {
    key: '应用崩溃测试',
    description: '应用崩溃监控当App运行时，对应用的崩溃捕获和分析。',
    name: 'user01',
    status: 'reject',
    createdAt: '2022-10-31  18:44:14',
    memo: `${generateRdStr()}.jar`,
  },
];

const advancedOperation3 = [
  // {
  //   avatar: 'https://i.postimg.cc/fbR4n4CG/meituan.png',
  //   key: '美团',
  //   authority: '管理者',
  //   description:
  //     '美食攻略,外卖网上订餐,酒店预订,旅游团购,飞机票火车票,电影票,ktv团购吃喝玩乐全都有!',
  //   name: 'user01',
  //   status: 'agree',
  //   createdAt: '2022-07-04  15:23:12',
  //   memo: '-',
  // },
  // {
  //   avatar: 'https://i.postimg.cc/pdGRTQL1/yidong.png',
  //   key: '中国移动',
  //   authority: '管理者',
  //   description: '中国规模最大的移动通信运营商，主要经营移动话音、数据、IP电话和多媒体业务。',
  //   name: 'user01',
  //   status: 'agree',
  //   createdAt: '2022-07-04  15:23:12',
  //   memo: '-',
  // },
  // {
  //   avatar: 'https://i.postimg.cc/fbR4n4CG/meituan.png',
  //   key: '美团',
  //   authority: '测试者',
  //   description:
  //     '美食攻略,外卖网上订餐,酒店预订,旅游团购,飞机票火车票,电影票,ktv团购吃喝玩乐全都有!',
  //   name: 'user03',
  //   status: 'agree',
  //   createdAt: '2022-08-16  20:13:12',
  //   memo: '-',
  // },
  // {
  //   avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
  //   key: 'user02',
  //   authority: '管理者',
  //   description: '支付宝,全球领先的独立第三方支付平台',
  //   name: '支付宝',
  //   status: 'agree',
  //   createdAt: '2022-11-16  20:13:12',
  //   memo: '开发需要',
  // },
  // {
  //   avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
  //   key: 'user03',
  //   authority: '测试者',
  //   description: '支付宝,全球领先的独立第三方支付平台',
  //   name: '支付宝',
  //   status: 'agree',
  //   createdAt: '2022-11-21  18:22:34',
  //   memo: '开发需要',
  // },
  {
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
    key: 'user04',
    authority: '参与者',
    description: '支付宝,全球领先的独立第三方支付平台',
    name: '支付宝',
    status: 'agree',
    createdAt: '2022-11-25  14:41:12',
    memo: '开发需要',
  },
  {
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
    key: 'user05',
    authority: '参与者',
    description: '支付宝,全球领先的独立第三方支付平台',
    name: '支付宝',
    status: 'agree',
    createdAt: '2022-11-28  10:41:32',
    memo: '开发需要',
  },
  // {
  //   avatar: 'https://i.postimg.cc/28hWZyvx/chinabank.png',
  //   key: '中国银行',
  //   authority: '参与者',
  //   description:
  //     '中国国际化和多元化程度最高的银行,在中国内地及六十多个国家和地区为客户提供全面的金融服务。',
  //   name: 'user04',
  //   status: 'agree',
  //   createdAt: '2022-07-04  15:23:12',
  //   memo: '-',
  // },
];

const tmp = [
  {
    page: 'com.example.testapp.MainActivity',
    kongjian: '<node index="1" text="" resource-id="" class="android.widget.ImageView" package="com.example.testapp" content-desc="" checkable="false" checked="false" clickable="false" enabled="true" focusable="false" focused="false" scrollable="false" long-clickable="false" password="false" selected="false" visible-to-user="true" bounds="[413,250][826,663]" />',
  },
  {
    pages: 'com.example.testapp.Activity2_1',
    kongjian: '<node index="1" text="" resource-id="" class="android.widget.ImageView" package="com.example.testapp" content-desc="" checkable="false" checked="false" clickable="false" enabled="true" focusable="false" focused="false" scrollable="false" long-clickable="false" password="false" selected="false" visible-to-user="true" bounds="[413,250][826,663]" />',
  },
  {
    page: 'com.example.testapp.Activity2_2',
    kongjian: '<node index="1" text="" resource-id="" class="android.widget.ImageView" package="com.example.testapp" content-desc="" checkable="false" checked="false" clickable="false" enabled="true" focusable="false" focused="false" scrollable="false" long-clickable="false" password="false" selected="false" visible-to-user="true" bounds="[413,250][826,663]" />',
  },
  {
    page: 'com.example.testapp.Activity3_1',
    kongjian: '<node index="1" text="" resource-id="" class="android.widget.ImageView" package="com.example.testapp" content-desc="" checkable="false" checked="false" clickable="false" enabled="true" focusable="false" focused="false" scrollable="false" long-clickable="false" password="false" selected="false" visible-to-user="true" bounds="[413,250][826,663]" />',
  },
  {
    page: 'com.example.testapp.Activity3_2',
    kongjian: '<node index="1" text="" resource-id="" class="android.widget.ImageView" package="com.example.testapp" content-desc="" checkable="false" checked="false" clickable="false" enabled="true" focusable="false" focused="false" scrollable="false" long-clickable="false" password="false" selected="false" visible-to-user="true" bounds="[413,250][826,663]" />',
  },
  {
    page: 'com.example.testapp.Activity4_1',
    kongjian: '<node index="1" text="" resource-id="" class="android.widget.ImageView" package="com.example.testapp" content-desc="" checkable="false" checked="false" clickable="false" enabled="true" focusable="false" focused="false" scrollable="false" long-clickable="false" password="false" selected="false" visible-to-user="true" bounds="[413,250][826,663]" />',
  },
  {
    page: 'com.example.testapp.Activity4_2',
    kongjian: '<node index="1" text="" resource-id="" class="android.widget.ImageView" package="com.example.testapp" content-desc="" checkable="false" checked="false" clickable="false" enabled="true" focusable="false" focused="false" scrollable="false" long-clickable="false" password="false" selected="false" visible-to-user="true" bounds="[413,250][826,663]" />',
  },
  {
    page: 'com.example.testapp.Activity5_1',
    kongjian: '<node index="1" text="" resource-id="" class="android.widget.ImageView" package="com.example.testapp" content-desc="" checkable="false" checked="false" clickable="false" enabled="true" focusable="false" focused="false" scrollable="false" long-clickable="false" password="false" selected="false" visible-to-user="true" bounds="[413,250][826,663]" />',
  },
  {
    page: 'com.example.testapp.Activity5_2',
    kongjian: '<node index="1" text="" resource-id="" class="android.widget.ImageView" package="com.example.testapp" content-desc="" checkable="false" checked="false" clickable="false" enabled="true" focusable="false" focused="false" scrollable="false" long-clickable="false" password="false" selected="false" visible-to-user="true" bounds="[413,250][826,663]" />',
  }
];

const advancedOperation4 = [
    {
      version: 'version 1.0.0',
      name: '遍历测试应用',
      avatar: 'https://i.postimg.cc/RZbXszL5/test.png', // 支付宝
      status: 'running',
      method: '图片替代文本测试',
      progress: 87,
      createdAt: '2022-11-15 08:38:42',
      page: tmp,
      user1: 'user04',
      user2: 'user01',
      title: 'MainActivity替代文本缺失，组件为Button',
      detail: 'com.example.testapp.MainActivity页面存在图片替代文本缺失，控件为<node index="1" text="" resource-id="" class="android.widget.ImageView" package="com.example.testapp" content-desc="" checkable="false" checked="false" clickable="false" enabled="true" focusable="false" focused="false" scrollable="false" long-clickable="false" password="false" selected="false" visible-to-user="true" bounds="[413,250][826,663]" />',
    },
    {
      version: 'version 1.0.0',
      name: '遍历测试应用',
      avatar: 'https://i.postimg.cc/RZbXszL5/test.png', // 支付宝
      status: 'online',
      method: '应用崩溃测试',
      createdAt: '2022-11-15 10:28:35',
      progress: 100,
      page: tmp,
      user1: 'user04',
      user2: 'user01',
      title: 'MainActivity替代文本缺失，组件为Button',
      detail: 'com.example.testapp.Activity2_2页面存在图片替代文本缺失，请及时修复，控件为<node index="1" text="" resource-id="" class="android.widget.ImageView" package="com.example.testapp" content-desc="" checkable="false" checked="false" clickable="false" enabled="true" focusable="false" focused="false" scrollable="false" long-clickable="false" password="false" selected="false" visible-to-user="true" bounds="[413,250][826,663]" />',
    },
    {
      version: 'version 1.0.0',
      name: '遍历测试应用',
      avatar: 'https://i.postimg.cc/RZbXszL5/test.png', // 支付宝
      status: 'online',
      progress: 100,
      createdAt: '2022-11-13 14:38:42',
      method: '图片替代文本测试',
      page: tmp,
      user1: 'user04',
      user2: 'user01',
      title: 'MainActivity替代文本缺失，组件为Button',
      detail: 'xxx',
    },
    {
      version: 'version 1.0.0',
      name: '遍历测试应用',
      avatar: 'https://i.postimg.cc/RZbXszL5/test.png', // 支付宝
      status: 'online',
      createdAt: '2022-11-13 14:35:02',
      progress: 100,
      method: '应用崩溃测试',
      page: tmp,
      user1: 'user04',
      user2: 'user01',
      title: 'MainActivity替代文本缺失，组件为Button',
      detail: 'xxx',
    },
    {
      version: 'version 1.0.0',
      name: '遍历测试应用',
      avatar: 'https://i.postimg.cc/RZbXszL5/test.png', // 支付宝
      status: 'error',
      createdAt: '2022-11-08 20:14:32',
      progress: 10,
      method: '图片替代文本测试',
      page: tmp,
      user1: 'user04',
      user2: 'user01',
      title: 'MainActivity替代文本缺失，组件为Button',
      detail: 'xxx',
    },
    {
      version: 'version 1.0.0',
      name: '遍历测试应用',
      avatar: 'https://i.postimg.cc/RZbXszL5/test.png', // 支付宝
      status: 'online',
      createdAt: '2022-11-06 11:24:52',
      progress: 100,
      method: '图片替代文本测试',
      page: tmp,
      user1: 'user04',
      user2: 'user01',
      title: 'MainActivity替代文本缺失，组件为Button',
      detail: 'xxx',
    },
  ];

const advancedOperation5 = [
  {
    version: 'version 1.0.0',
    status: 'running',
    method: '图片替代文本测试',
    createdAt: '2022-11-15 08:38:42',
    user1: 'user04',
    user2: 'user01',
    title: 'MainActivity替代文本缺失，组件为Button',
    detail: 'com.example.testapp.MainActivity页面存在图片替代文本缺失，控件为<node index="1" text="" resource-id="" class="android.widget.ImageView" package="com.example.testapp" content-desc="" checkable="false" checked="false" clickable="false" enabled="true" focusable="false" focused="false" scrollable="false" long-clickable="false" password="false" selected="false" visible-to-user="true" bounds="[413,250][826,663]" />',
  },
  {
    version: 'version 1.0.0',
    status: 'online',
    method: '应用崩溃测试',
    createdAt: '2022-11-15 10:28:35',
    user1: 'user04',
    user2: 'user01',
    title: 'MainActivity替代文本缺失，组件为Button',
    detail: 'com.example.testapp.Activity2_2页面存在图片替代文本缺失，请及时修复，控件为<node index="1" text="" resource-id="" class="android.widget.ImageView" package="com.example.testapp" content-desc="" checkable="false" checked="false" clickable="false" enabled="true" focusable="false" focused="false" scrollable="false" long-clickable="false" password="false" selected="false" visible-to-user="true" bounds="[413,250][826,663]" />',
  },
];

function getProfileAppData(req: Request, res: Response) {
  const result = {
    data: {
      advancedOperation,
      advancedOperation1,
      advancedOperation2,
      advancedOperation3,
      advancedOperation4,
      advancedOperation5
    },
  };
  console.log('data', result);
  return res.json(result);
}

export default {
  'GET  /api/profile/app': getProfileAppData,
};
