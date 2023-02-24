import { version } from '@antv/data-set';
// eslint-disable-next-line import/no-extraneous-dependencies
import type { Request, Response } from 'express';
import { parse } from 'url';
import type { TableListItem, TableListParams } from './data.d';

// mock tableListDataSource
const genList = (current: number, pageSize: number) => {
  const tableListDataSource: TableListItem[] = [];
  const generateRdStr = function () {
    const len = 20;
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < len; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  };

  const valueEnum = {
    // 0: 'close',
    // 1: 'running',
    // 2: 'online',
    // 3: 'error',
    0: 'running',
    1: 'online',
    2: 'error',
    3: 'close',
  };
  const pages = [
    'com.example.testapp.MainActivity',
    'com.example.testapp.Activity2_1',
    'com.example.testapp.Activity2_2',
    'com.example.testapp.Activity3_1',
    'com.example.testapp.Activity3_2',
    'com.example.testapp.Activity4_1',
    'com.example.testapp.Activity4_2',
    'com.example.testapp.Activity5_1',
    'com.example.testapp.Activity5_2',
  ];
  const kongjians = [
    '<node index="1" text="" resource-id="" class="android.widget.ImageView" package="com.example.testapp" content-desc="" checkable="false" checked="false" clickable="false" enabled="true" focusable="false" focused="false" scrollable="false" long-clickable="false" password="false" selected="false" visible-to-user="true" bounds="[413,250][826,663]" />',
    '<node index="1" text="" resource-id="" class="android.widget.ImageView" package="com.example.testapp" content-desc="" checkable="false" checked="false" clickable="false" enabled="true" focusable="false" focused="false" scrollable="false" long-clickable="false" password="false" selected="false" visible-to-user="true" bounds="[413,250][826,663]" />',
    '<node index="1" text="" resource-id="" class="android.widget.ImageView" package="com.example.testapp" content-desc="" checkable="false" checked="false" clickable="false" enabled="true" focusable="false" focused="false" scrollable="false" long-clickable="false" password="false" selected="false" visible-to-user="true" bounds="[413,250][826,663]" />',
    '<node index="1" text="" resource-id="" class="android.widget.ImageView" package="com.example.testapp" content-desc="" checkable="false" checked="false" clickable="false" enabled="true" focusable="false" focused="false" scrollable="false" long-clickable="false" password="false" selected="false" visible-to-user="true" bounds="[413,250][826,663]" />',
    '<node index="1" text="" resource-id="" class="android.widget.ImageView" package="com.example.testapp" content-desc="" checkable="false" checked="false" clickable="false" enabled="true" focusable="false" focused="false" scrollable="false" long-clickable="false" password="false" selected="false" visible-to-user="true" bounds="[413,250][826,663]" />',
    '<node index="1" text="" resource-id="" class="android.widget.ImageView" package="com.example.testapp" content-desc="" checkable="false" checked="false" clickable="false" enabled="true" focusable="false" focused="false" scrollable="false" long-clickable="false" password="false" selected="false" visible-to-user="true" bounds="[413,250][826,663]" />',
    '<node index="1" text="" resource-id="" class="android.widget.ImageView" package="com.example.testapp" content-desc="" checkable="false" checked="false" clickable="false" enabled="true" focusable="false" focused="false" scrollable="false" long-clickable="false" password="false" selected="false" visible-to-user="true" bounds="[413,250][826,663]" />',
    '<node index="1" text="" resource-id="" class="android.widget.ImageView" package="com.example.testapp" content-desc="" checkable="false" checked="false" clickable="false" enabled="true" focusable="false" focused="false" scrollable="false" long-clickable="false" password="false" selected="false" visible-to-user="true" bounds="[413,250][826,663]" />',
    '<node index="1" text="" resource-id="" class="android.widget.ImageView" package="com.example.testapp" content-desc="" checkable="false" checked="false" clickable="false" enabled="true" focusable="false" focused="false" scrollable="false" long-clickable="false" password="false" selected="false" visible-to-user="true" bounds="[413,250][826,663]" />',
  ]
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
  ]
  const taskList = [
    {
      version: 'version 1.0.0',
      name: '遍历测试应用',
      avatar: 'https://i.postimg.cc/RZbXszL5/test.png', // 支付宝
      status: 'running',
      method: '图片替代文本检测',
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
      method: '应用崩溃检测',
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
      method: '图片替代文本检测',
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
      method: '应用崩溃检测',
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
      method: '图片替代文本检测',
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
      method: '图片替代文本检测',
      page: tmp,
      user1: 'user04',
      user2: 'user01',
      title: 'MainActivity替代文本缺失，组件为Button',
      detail: 'xxx',
    },
  ];
  const appList = [
    {
      name: '支付宝',
      description: '支付宝,全球领先的独立第三方支付平台',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png', // 支付宝
      status: 1,
    },
    {
      name: '百度',
      description: '全球领先的中文搜索引擎、致力于让网民更便捷地获取信息，找到所求。',
      avatar: 'https://www.baidu.com/favicon.ico',
      status: 1,
    },
    {
      name: '网易云',
      description: '网易云音乐是一款专注于发现与分享的音乐产品',
      avatar: 'https://i.postimg.cc/fbg0Y9bJ/wangyiyun.png',
      status: 3,
    },
    {
      name: '腾讯新闻',
      description: '集新闻信息,区域垂直生活服务、社会化媒体资讯和产品为一体的互联网媒体平台',
      avatar: 'https://i.postimg.cc/wBk6D8TM/tengxun.png',
      status: 2,
    },
    {
      name: '美团',
      description:
        '美食攻略,外卖网上订餐,酒店预订,旅游团购,飞机票火车票,电影票,ktv团购吃喝玩乐全都有!',
      avatar: 'https://i.postimg.cc/fbR4n4CG/meituan.png',
      status: 2,
    },
    {
      name: '携程',
      description: '中国领先的在线旅行服务公司,向超过9000万会员提供酒店预订、酒店点评服务',
      avatar: 'https://i.postimg.cc/mZYGHSP6/xiecheng.png',
      status: 1,
    },
    {
      name: '中国移动',
      description: '中国规模最大的移动通信运营商，主要经营移动话音、数据、IP电话和多媒体业务',
      avatar: 'https://i.postimg.cc/pdGRTQL1/yidong.png',
      status: 2,
    },
    {
      name: '中国银行',
      description:
        '中国国际化和多元化程度最高的银行,在中国内地及六十多个国家和地区为客户提供全面的金融服务。',
      avatar: 'https://i.postimg.cc/28hWZyvx/chinabank.png',
      status: 3,
    },
  ];
  for (let i = 0; i < pageSize; i++) {
    // const index = (current - 1) * 10 + i;
    // const num = Math.floor(Math.random() * 10) % 8;
    // const id = Math.floor(Math.random() * 10) % 3;
    tableListDataSource.push({
      avatar: taskList[i].avatar,
      status: taskList[i].status,
      createdAt: taskList[i].createdAt,
      name: taskList[i].name,
      progress: taskList[i].progress,
      method: taskList[i].method,
      version: taskList[i].version,
      // avatar: taskList[i].avatar,
      page: taskList[i].page,
      user1: taskList[i].user1,
      user2: taskList[i].user2,
      title: taskList[i].title,
      detail: taskList[i].detail,
      key: i,
      // disabled: i % 6 === 0,
      href: 'https://ant.design',
      // avatar: appList[num].avatar,
      // name: appList[num].name,
      owner: '曲丽丽',
      desc: appList[i].description,
      callNo: Math.floor(Math.random() * 1000),
      // status: valueEnum[id],
      updatedAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i).getTime(),
      // createdAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i).getTime(),
      // progress: id !== 2 ? Math.ceil(Math.random() * 100) : 100,
      taskId: generateRdStr() + '.jar',
      // method: ['图片替代文本检测', '应用崩溃检测'][Math.floor(Math.random() * 100) % 2],
    });
  }
  // tableListDataSource.reverse();
  return tableListDataSource;
};

let tableListDataSource = genList(1, 6);

function getRule(req: Request, res: Response, u: string) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }
  const { current = 1, pageSize = 6 } = req.query;
  const params = parse(realUrl, true).query as unknown as TableListParams;

  let dataSource = [...tableListDataSource].slice(
    ((current as number) - 1) * (pageSize as number),
    (current as number) * (pageSize as number),
  );
  if (params.sorter) {
    const sorter = JSON.parse(params.sorter as any);
    dataSource = dataSource.sort((prev, next) => {
      let sortNumber = 0;
      Object.keys(sorter).forEach((key) => {
        if (sorter[key] === 'descend') {
          if (prev[key] - next[key] > 0) {
            sortNumber += -1;
          } else {
            sortNumber += 1;
          }
          return;
        }
        if (prev[key] - next[key] > 0) {
          sortNumber += 1;
        } else {
          sortNumber += -1;
        }
      });
      return sortNumber;
    });
  }
  if (params.filter) {
    const filter = JSON.parse(params.filter as any) as Record<string, string[]>;
    if (Object.keys(filter).length > 0) {
      dataSource = dataSource.filter((item) => {
        return Object.keys(filter).some((key) => {
          if (!filter[key]) {
            return true;
          }
          if (filter[key].includes(`${item[key]}`)) {
            return true;
          }
          return false;
        });
      });
    }
  }

  if (params.name) {
    dataSource = dataSource.filter((data) => data.name.includes(params.name || ''));
  }

  let finalPageSize = 10;
  if (params.pageSize) {
    finalPageSize = parseInt(`${params.pageSize}`, 10);
  }

  const result = {
    data: dataSource,
    total: tableListDataSource.length,
    success: true,
    pageSize: finalPageSize,
    current: parseInt(`${params.currentPage}`, 10) || 1,
  };

  return res.json(result);
}

function postRule(req: Request, res: Response, u: string, b: Request) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }

  const body = (b && b.body) || req.body;
  const { name, desc, key } = body;

  switch (req.method) {
    /* eslint no-case-declarations:0 */
    case 'DELETE':
      tableListDataSource = tableListDataSource.filter((item) => key.indexOf(item.key) === -1);
      break;
    case 'POST':
      (() => {
        const i = Math.ceil(Math.random() * 10000);
        const newRule = {
          key: tableListDataSource.length,
          href: 'https://ant.design',
          avatar: [
            'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
            'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
          ][i % 2],
          name,
          owner: '曲丽丽',
          desc,
          callNo: Math.floor(Math.random() * 1000),
          status: (Math.floor(Math.random() * 10) % 2).toString(),
          updatedAt: new Date(),
          createdAt: new Date(),
          progress: Math.ceil(Math.random() * 100),
        };
        // tableListDataSource.unshift(newRule);
        return res.json(newRule);
      })();
      return;

    case 'PUT':
      (() => {
        let newRule = {};
        tableListDataSource = tableListDataSource.map((item) => {
          if (item.key === key) {
            newRule = { ...item, desc, name };
            return { ...item, desc, name };
          }
          return item;
        });
        return res.json(newRule);
      })();
      return;
    default:
      break;
  }

  const result = {
    list: tableListDataSource,
    pagination: {
      total: tableListDataSource.length,
    },
  };
  console.log('result', result)
  res.json(result);
}

export default {
  'GET /api/task': getRule,
  'POST /api/task': postRule,
  'DELETE /api/task': postRule,
  'PUT /api/task': postRule,
};
