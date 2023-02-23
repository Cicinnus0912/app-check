// eslint-disable-next-line import/no-extraneous-dependencies
import type { Request, Response } from 'express';
import { parse } from 'url';
import type { TableListItem, TableListParams } from './data.d';

// mock tableListDataSource
const genList = (current: number, pageSize: number) => {
  const tableListDataSource: TableListItem[] = [];
  const authorityMap = {
    0: {
      color: 'blue',
      text: '测试者',
    },
    1: {
      color: 'green',
      text: '管理者',
    },
    2: {
      color: '',
      text: '参与者',
    },
  };
  const appList = [
    // {
    //   name: '遍历测试应用',
    //   description: '遍历测试应用',
    //   avatar: 'https://i.postimg.cc/RZbXszL5/test.png',
    // },
    {
      name: '支付宝',
      description: '支付宝,全球领先的独立第三方支付平台。',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png', // 支付宝
    },
    {
      name: '百度',
      description: '全球领先的中文搜索引擎、致力于让网民更便捷地获取信息，找到所求。',
      avatar: 'https://www.baidu.com/favicon.ico',
    },
    {
      name: '网易云',
      description: '网易云音乐是一款专注于发现与分享的音乐产品',
      avatar: 'https://i.postimg.cc/fbg0Y9bJ/wangyiyun.png',
    },
    {
      name: '腾讯新闻',
      description: '集新闻信息,区域垂直生活服务、社会化媒体资讯和产品为一体的互联网媒体平台',
      avatar: 'https://i.postimg.cc/wBk6D8TM/tengxun.png',
    },
    {
      name: '美团',
      description:
        '美食攻略,外卖网上订餐,酒店预订,旅游团购,飞机票火车票,电影票,ktv团购吃喝玩乐全都有!',
      avatar: 'https://i.postimg.cc/fbR4n4CG/meituan.png',
    },
    {
      name: '携程',
      description: '中国领先的在线旅行服务公司,向超过9000万会员提供酒店预订、酒店点评服务',
      avatar: 'https://i.postimg.cc/mZYGHSP6/xiecheng.png',
    },
    {
      name: '中国移动',
      description: '中国规模最大的移动通信运营商，主要经营移动话音、数据、IP电话和多媒体业务',
      avatar: 'https://i.postimg.cc/pdGRTQL1/yidong.png',
    },
    {
      name: '中国银行',
      description:
        '中国国际化和多元化程度最高的银行,在中国内地及六十多个国家和地区为客户提供全面的金融服务。',
      avatar: 'https://i.postimg.cc/28hWZyvx/chinabank.png',
    },
  ];
  for (let i = 0; i < pageSize; i++) {
    const index = (current - 1) * 8 + i;
    // const num = Math.floor(Math.random() * 10) % 3;
    tableListDataSource.push({
      key: index,
      disabled: i % 6 === 0,
      href: 'https://ant.design',
      avatar: appList[i].avatar,
      name: appList[i].name,
      owner: '曲丽丽',
      desc: appList[i].description,
      callNo: Math.floor(Math.random() * 1000),
      authority: authorityMap[i != 0 ? (Math.floor(Math.random() * 10) % 3).toString() : '1'].text,
      updatedAt: new Date(),
      createdAt: new Date(),
      progress: Math.ceil(Math.random() * 100),
    });
  }
  tableListDataSource.reverse();
  return tableListDataSource;
};

let tableListDataSource = genList(1, 8);

function getRule(req: Request, res: Response, u: string) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }
  const { current = 1, pageSize = 10 } = req.query;
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
          authority: (Math.floor(Math.random() * 10) % 2).toString(),
          updatedAt: new Date(),
          createdAt: new Date(),
          progress: Math.ceil(Math.random() * 100),
        };
        tableListDataSource.unshift(newRule);
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

  res.json(result);
}

export default {
  'GET /api/rule': getRule,
  'POST /api/rule': postRule,
  'DELETE /api/rule': postRule,
  'PUT /api/rule': postRule,
};
