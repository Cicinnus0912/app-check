// eslint-disable-next-line import/no-extraneous-dependencies
import type { Request, Response } from 'express';

const city = require('./geographic/city.json');
const province = require('./geographic/province.json');

function getProvince(_: Request, res: Response) {
  return res.json({
    data: province,
  });
}

function getCity(req: Request, res: Response) {
  return res.json({
    data: city[req.params.province],
  });
}

function getCurrentUse(req: Request, res: Response) {
  return res.json({
    data: {
      name: 'yang',
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      userid: '00000001',
      email: '1234565@qq.com',
      signature: '海纳百川，有容乃大',
      title: '2020级',
      group: '浙江大学－软件学院－软件工程',
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
      notifyCount: 12,
      unreadCount: 11,
      country: 'China',
      access: getAccess(),
      geographic: {
        province: {
          label: '浙江省',
          key: '330000',
        },
        city: {
          label: '杭州市',
          key: '330100',
        },
      },
      address: '西湖区工专路 77 号',
      phone: '0752-268888888',
    },
  });
}
// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  // 支持值为 Object 和 Array
  'GET  /api/accountSettingCurrentUser': getCurrentUse,
  'GET  /api/geographic/province': getProvince,
  'GET  /api/geographic/city/:province': getCity,
};
