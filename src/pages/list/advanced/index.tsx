import {
  DingdingOutlined,
  DownOutlined,
  EllipsisOutlined,
  PlusOutlined,
  // InfoCircleOutlined,
} from '@ant-design/icons';
import {
  Badge,
  Button,
  Card,
  Statistic,
  Descriptions,
  Divider,
  Dropdown,
  Menu,
  Popover,
  Steps,
  Table,
  Tooltip,
  Empty,
  Avatar,
  Image,
  Tag,
  Space,
} from 'antd';
import { GridContent, PageContainer, RouteContext } from '@ant-design/pro-layout';
import type { FC } from 'react';
import React, { Fragment, useState } from 'react';
import { ProTable } from '@ant-design/pro-table';
// import type { ActionType, ProColumns } from '@ant-design/pro-components';
import classNames from 'classnames';
import { useRequest } from 'umi';
import type { AdvancedProfileData } from './data.d';
import { queryAppProfile } from './service';
import styles from './style.less';
import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
  ProFormSelect,
  ProFormRadio,
} from '@ant-design/pro-form';

const { Step } = Steps;
const ButtonGroup = Button.Group;

const menu = (
  <Menu>
    <Menu.Item key="1">选项一</Menu.Item>
    <Menu.Item key="2">选项二</Menu.Item>
    <Menu.Item key="3">选项三</Menu.Item>
  </Menu>
);

const mobileMenu = (
  <Menu>
    <Menu.Item key="1">操作一</Menu.Item>
    <Menu.Item key="2">操作二</Menu.Item>
    <Menu.Item key="3">选项一</Menu.Item>
    <Menu.Item key="4">选项二</Menu.Item>
    <Menu.Item key="">选项三</Menu.Item>
  </Menu>
);

const action = (
  <RouteContext.Consumer>
    {({ isMobile }) => {
      if (isMobile) {
        return (
          <Dropdown.Button
            type="primary"
            icon={<DownOutlined />}
            overlay={mobileMenu}
            placement="bottomRight"
          >
            主操作
          </Dropdown.Button>
        );
      }
      return (
        <Fragment>
          <ButtonGroup>
            <Button>操作一</Button>
            <Button>操作二</Button>
            <Dropdown overlay={menu} placement="bottomRight">
              <Button>
                <EllipsisOutlined />
              </Button>
            </Dropdown>
          </ButtonGroup>
          <Button type="primary">主操作</Button>
        </Fragment>
      );
    }}
  </RouteContext.Consumer>
);

const extra = (
  <div className={styles.moreInfo}>
    <Statistic title="状态" value="待审批" />
    <Statistic title="订单金额" value={568.08} prefix="¥" />
  </div>
);

const description = (
  <RouteContext.Consumer>
    {({ isMobile }) => (
      <Descriptions className={styles.headerList} size="default" column={isMobile ? 1 : 1}>
        <Descriptions.Item label="创建人员">user</Descriptions.Item>
        {/* <Descriptions.Item label="应用简介">
          支付宝,全球领先的独立第三方支付平台,致力于为广大用户提供安全快速的电子支付/网上支付/安全支付/手机支付体验,及转账收款/水电煤缴费/信用卡还款/AA收款等生活服务应用。
        </Descriptions.Item> */}
        <Descriptions.Item label="成员信息">
          管理者：<Tag color="green">user</Tag>
          <Tag color="green">user01</Tag> | 测试者：
          <Tag color="blue">user02</Tag> | 参与者：<Tag color="">user03</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="创建时间">2022-06-21</Descriptions.Item>
        {/* <Descriptions.Item label="关联单据">
          <a href="">12421</a>
        </Descriptions.Item> */}
        {/* <Descriptions.Item label="生效日期">2017-07-07 ~ 2017-08-08</Descriptions.Item> */}
        {/* <Descriptions.Item label="备注">请于两个工作日内确认</Descriptions.Item> */}
      </Descriptions>
    )}
  </RouteContext.Consumer>
);

const desc1 = (
  <div className={classNames(styles.textSecondary, styles.stepDescription)}>
    <Fragment>
      曲丽丽
      <DingdingOutlined style={{ marginLeft: 8 }} />
    </Fragment>
    <div>2016-12-12 12:32</div>
  </div>
);

const desc2 = (
  <div className={styles.stepDescription}>
    <Fragment>
      周毛毛
      <DingdingOutlined style={{ color: '#00A0E9', marginLeft: 8 }} />
    </Fragment>
    <div>
      <a href="">催一下</a>
    </div>
  </div>
);

const popoverContent = (
  <div style={{ width: 160 }}>
    吴加号
    <span className={styles.textSecondary} style={{ float: 'right' }}>
      <Badge status="default" text={<span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>未响应</span>} />
    </span>
    <div className={styles.textSecondary} style={{ marginTop: 4 }}>
      耗时：2小时25分钟
    </div>
  </div>
);

const customDot = (dot: React.ReactNode, { status }: { status: string }) => {
  if (status === 'process') {
    return (
      <Popover placement="topLeft" arrowPointAtCenter content={popoverContent}>
        <span>{dot}</span>
      </Popover>
    );
  }
  return dot;
};

type AdvancedState = {
  operationKey: string;
  tabActiveKey: string;
};

const Advanced: FC = () => {
  const [tabStatus, seTabStatus] = useState<AdvancedState>({
    operationKey: 'tab1',
    tabActiveKey: 'detail',
  });
  const { data = {}, loading } = useRequest<{ data: AdvancedProfileData }>(queryAppProfile);
  const { advancedOperation, advancedOperation1, advancedOperation2, advancedOperation3 } = data;
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [createModalVisible1, handleModalVisible1] = useState<boolean>(false);
  const [createModalVisible2, handleModalVisible2] = useState<boolean>(false);

  const operationTabList = [
    {
      key: 'tab1',
      tab: '应用版本管理',
    },
    {
      key: 'tab2',
      tab: '应用测试方法管理',
    },
    {
      key: 'tab3',
      tab: '权限申请记录',
    },
  ];

  const versionList = [
    {
      title: '应用版本号',
      dataIndex: 'key',
      key: 'key',
      render: (dom, entity) => {
        return <Tag>{dom}</Tag>;
      },
    },
    {
      title: '应用版本信息',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '创建人',
      dataIndex: 'name',
      key: 'name',
      render: (dom, entity) => {
        return <Tag color="green">{dom}</Tag>;
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'apk文件',
      dataIndex: 'memo',
      key: 'memo',
      render: (dom, entity) => {
        return <a href="">{dom}</a>;
      },
    },
  ];

  const methodList = [
    {
      title: '测试方法名称',
      dataIndex: 'key',
      key: 'key',
      render: (dom, entity) => {
        return <Tag>{dom}</Tag>;
      },
    },
    {
      title: '测试方法描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '创建人',
      dataIndex: 'name',
      key: 'name',
      render: (dom, entity) => {
        return <Tag color={dom == 'user' ? 'green' : 'blue'}>{dom}</Tag>;
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'jar文件',
      dataIndex: 'memo',
      key: 'memo',
      render: (dom, entity) => {
        return <a href="">{dom}</a>;
      },
    },
  ];

  const authorityList = [
    {
      title: '应用Logo',
      dataIndex: 'avatar',
      key: 'avatar',
      // valueType: (item) => ({
      //   type: 'image',
      //   status: item.avatar,
      // }),
      render: (dom, entity) => {
        return <Avatar src={dom}></Avatar>;
      },
      width: 100,
    },
    {
      title: '应用名称',
      dataIndex: 'name',
      key: 'name',
      width: 100,
      // render: (dom, entity) => {
      //   return <Tag>{dom}</Tag>;
      // },
    },
    // {
    //   title: '应用描述',
    //   dataIndex: 'description',
    //   key: 'description',
    // },
    {
      title: '申请权限',
      dataIndex: 'authority',
      key: 'authority',
      width: 100,
      render: (dom, entity) => {
        return <Tag color={dom != '管理者' ? (dom == '测试者' ? 'blue' : '') : 'green'}>{dom}</Tag>;
      },
    },
    {
      title: '申请人',
      dataIndex: 'key',
      key: 'key',
      width: 100,
    },
    {
      title: '申请时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 160,
    },
    {
      title: '申请原因',
      dataIndex: 'memo',
      key: 'memo',
    },
    {
      title: '操作',
      valueType: 'option',
      width: 120,
      render: (dom, entity) => {
        return (
          <a
            key="editable"
            onClick={() => {
              handleModalVisible2(true);
            }}
          >
            审批
          </a>
        );
      },
      // render: (text, record, _, action) => [
      //   <a
      //     key="editable"
      //     onClick={() => {
      //       // action?.startEditable?.(record.key);
      //     }}
      //   >
      //     审批
      //   </a>,
      // ],
    },
  ];

  const columns = [
    {
      title: '应用Logo',
      dataIndex: 'avatar',
      key: 'avatar',
      // valueType: (item) => ({
      //   type: 'image',
      //   status: item.avatar,
      // }),
      render: (dom, entity) => {
        return <Avatar src={dom}></Avatar>;
      },
      width: 100,
    },
    {
      title: '应用名称',
      dataIndex: 'name',
      key: 'name',
      width: 100,
      // render: (dom, entity) => {
      //   return <Tag>{dom}</Tag>;
      // },
    },
    // {
    //   title: '应用描述',
    //   dataIndex: 'description',
    //   key: 'description',
    // },
    {
      title: '申请权限',
      dataIndex: 'authority',
      key: 'authority',
      width: 100,
      render: (dom, entity) => {
        return <Tag color={dom != '管理者' ? (dom == '测试者' ? 'blue' : '') : 'green'}>{dom}</Tag>;
      },
    },
    {
      title: '申请人',
      dataIndex: 'key',
      key: 'key',
      width: 100,
    },
    {
      title: '申请时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 160,
    },
    {
      title: '申请原因',
      dataIndex: 'memo',
      key: 'memo',
    },
    {
      title: '审批结果',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (text: string) => {
        if (text === 'agree') {
          return <Badge status="success" text="通过" />;
        }
        return <Badge status="error" text="驳回" />;
      },
    },
    {
      title: '审批意见',
      dataIndex: 'res',
      key: 'res',
    },
  ];

  const contentList = {
    tab1: (
      <ProTable
        pagination={false}
        loading={loading}
        dataSource={advancedOperation1}
        columns={versionList}
        search={false}
        headerTitle="应用版本列表"
        toolBarRender={() => [
          // <Button key="show">查看日志</Button>,
          // <Button key="out">
          //   导出数据
          //   <DownOutlined />
          // </Button>,
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined />
            添加应用版本
          </Button>,
        ]}
      />
    ),
    tab2: (
      <ProTable
        pagination={false}
        loading={loading}
        dataSource={advancedOperation2}
        columns={methodList}
        search={false}
        headerTitle="测试方法列表"
        toolBarRender={() => [
          // <Button key="show">查看日志</Button>,
          // <Button key="out">
          //   导出数据
          //   <DownOutlined />
          // </Button>,
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible1(true);
            }}
          >
            <PlusOutlined />
            添加测试方法
          </Button>,
        ]}
      />
    ),
    tab3: (
      <ProTable
        pagination={false}
        loading={loading}
        dataSource={advancedOperation3}
        columns={authorityList}
        search={false}
        headerTitle="权限申请记录"
        toolBarRender={() => [
          // <Button key="show">查看日志</Button>,
          // <Button key="out">
          //   导出数据
          //   <DownOutlined />
          // </Button>,
          // <Button type="primary" key="primary">
          //   <PlusOutlined />
          //   添加测试方法
          // </Button>,
        ]}
      />
    ),
  };
  const onTabChange = (tabActiveKey: string) => {
    seTabStatus({ ...tabStatus, tabActiveKey });
  };
  const onOperationTabChange = (key: string) => {
    console.log(tabStatus, key);
    seTabStatus({ ...tabStatus, operationKey: key });
  };

  return (
    <PageContainer
      title={
        <>
          <Avatar
            size="large"
            src={'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png'}
          />
          <span>支付宝</span>
        </>
      } // <Avatar size="small" src={item.avatar} />
      // extra={action}
      className={styles.pageHeader}
      content={description}
      // extraContent={extra}
      tabActiveKey={tabStatus.tabActiveKey}
      onTabChange={onTabChange}
      // tabList={[
      //   {
      //     key: 'detail',
      //     tab: '详情',
      //   },
      //   {
      //     key: 'rule',
      //     tab: '规则',
      //   },
      // ]}
    >
      <div className={styles.main}>
        <GridContent>
          {/* <Card title="流程进度" style={{ marginBottom: 24 }}>
            <RouteContext.Consumer>
              {({ isMobile }) => (
                <Steps
                  direction={isMobile ? 'vertical' : 'horizontal'}
                  progressDot={customDot}
                  current={1}
                >
                  <Step title="创建项目" description={desc1} />
                  <Step title="部门初审" description={desc2} />
                  <Step title="财务复核" />
                  <Step title="完成" />
                </Steps>
              )}
            </RouteContext.Consumer>
          </Card> */}
          {/* <Card title="用户信息" style={{ marginBottom: 24 }} bordered={false}>
            <Descriptions style={{ marginBottom: 24 }}>
              <Descriptions.Item label="用户姓名">付小小</Descriptions.Item>
              <Descriptions.Item label="会员卡号">32943898021309809423</Descriptions.Item>
              <Descriptions.Item label="身份证">3321944288191034921</Descriptions.Item>
              <Descriptions.Item label="联系方式">18112345678</Descriptions.Item>
              <Descriptions.Item label="联系地址">
                曲丽丽 18100000000 浙江省杭州市西湖区黄姑山路工专路交叉路口
              </Descriptions.Item>
            </Descriptions>
            <Descriptions style={{ marginBottom: 24 }} title="信息组">
              <Descriptions.Item label="某某数据">725</Descriptions.Item>
              <Descriptions.Item label="该数据更新时间">2017-08-08</Descriptions.Item>
              <Descriptions.Item
                label={
                  <span>
                    某某数据
                    <Tooltip title="数据说明">
                      <InfoCircleOutlined style={{ color: 'rgba(0, 0, 0, 0.43)', marginLeft: 4 }} />
                    </Tooltip>
                  </span>
                }
              >
                725
              </Descriptions.Item>
              <Descriptions.Item label="该数据更新时间">2017-08-08</Descriptions.Item>
            </Descriptions>
            <h4 style={{ marginBottom: 16 }}>信息组</h4>
            <Card type="inner" title="多层级信息组">
              <Descriptions style={{ marginBottom: 16 }} title="组名称">
                <Descriptions.Item label="负责人">林东东</Descriptions.Item>
                <Descriptions.Item label="角色码">1234567</Descriptions.Item>
                <Descriptions.Item label="所属部门">XX公司 - YY部</Descriptions.Item>
                <Descriptions.Item label="过期时间">2017-08-08</Descriptions.Item>
                <Descriptions.Item label="描述">
                  这段描述很长很长很长很长很长很长很长很长很长很长很长很长很长很长...
                </Descriptions.Item>
              </Descriptions>
              <Divider style={{ margin: '16px 0' }} />
              <Descriptions style={{ marginBottom: 16 }} title="组名称" column={1}>
                <Descriptions.Item label="学名">
                  Citrullus lanatus (Thunb.) Matsum. et
                  Nakai一年生蔓生藤本；茎、枝粗壮，具明显的棱。卷须较粗..
                </Descriptions.Item>
              </Descriptions>
              <Divider style={{ margin: '16px 0' }} />
              <Descriptions title="组名称">
                <Descriptions.Item label="负责人">付小小</Descriptions.Item>
                <Descriptions.Item label="角色码">1234568</Descriptions.Item>
              </Descriptions>
            </Card>
          </Card> */}
          {/* <Card title="用户近半年来电记录" style={{ marginBottom: 24 }} bordered={false}>
            <Empty />
          </Card> */}
          <Card
            className={styles.tabsCard}
            bordered={false}
            tabList={operationTabList}
            onTabChange={onOperationTabChange}
          >
            {contentList[tabStatus.operationKey]}
          </Card>
          {tabStatus.operationKey == 'tab3' && (
            <>
              <Card className={styles.tabsCard} bordered={false}>
                <ProTable
                  pagination={false}
                  loading={loading}
                  dataSource={advancedOperation}
                  columns={columns}
                  search={false}
                  headerTitle="审批历史记录"
                  toolBarRender={() => [
                    // <Button key="show">查看日志</Button>,
                    // <Button key="out">
                    //   导出数据
                    //   <DownOutlined />
                    // </Button>,
                    // <Button type="primary" key="primary">
                    //   创建应用
                    // </Button>,
                  ]}
                />
              </Card>
            </>
          )}
        </GridContent>
      </div>
      <ModalForm
        title="添加应用版本"
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          // const success = await handleAdd(value as TableListItem);
          // if (success) {
          //   handleModalVisible(false);
          //   if (actionRef.current) {
          //     actionRef.current.reload();
          //   }
          // }
        }}
      >
        <ProFormSelect
          showSearch={true}
          options={[
            {
              value: 'alipay',
              label: '支付宝',
            },
            {
              value: 'baidu',
              label: '百度',
            },
            {
              value: 'wangyiyun',
              label: '网易云',
            },
            {
              value: 'tx',
              label: '腾讯新闻',
            },
            {
              value: 'meituan',
              label: '美团',
            },
            {
              value: 'xiecheng',
              label: '携程',
            },
            {
              value: 'yidong',
              label: '中国移动',
            },
            {
              value: 'chinaBank',
              label: '中国银行',
            },
            {
              value: 'test',
              label: '遍历测试应用',
            },
          ]}
          rules={[
            {
              required: true,
              message: 'APP应用名称为必填项',
            },
          ]}
          width="sm"
          name="name"
          label="APP应用名称"
        />
        <ProFormText
          label="APP应用版本"
          rules={[
            {
              required: true,
              message: 'APP应用版本为必填项',
            },
          ]}
          placeholder="请输入版本号，格式要求为x.y.z"
          fieldProps={{
            addonBefore: 'version',
            // addonAfter: '.com',
          }}
          width="md"
          name="name"
        />
        <ProFormUploadButton
          label="APP应用安装包"
          name="upload"
          action="upload.do"
          extra="支持扩展名：.apk"
          rules={[
            {
              required: true,
              message: 'APP应用安装包为必填项',
            },
          ]}
        />
        <ProFormTextArea
          width="md"
          name="desc"
          label="应用版本信息"
          rules={[
            {
              required: true,
              message: '应用版本信息为必填项',
            },
          ]}
        />
      </ModalForm>
      <ModalForm
        title="添加测试方法"
        width="400px"
        visible={createModalVisible1}
        onVisibleChange={handleModalVisible1}
        onFinish={async (value) => {
          // const success = await handleAdd(value as TableListItem);
          // if (success) {
          //   handleModalVisible(false);
          //   if (actionRef.current) {
          //     actionRef.current.reload();
          //   }
          // }
        }}
      >
        <ProFormSelect
          showSearch={true}
          options={[
            {
              value: 'alipay',
              label: '支付宝',
            },
            {
              value: 'baidu',
              label: '百度',
            },
            {
              value: 'wangyiyun',
              label: '网易云',
            },
            {
              value: 'tx',
              label: '腾讯新闻',
            },
            {
              value: 'meituan',
              label: '美团',
            },
            {
              value: 'xiecheng',
              label: '携程',
            },
            {
              value: 'yidong',
              label: '中国移动',
            },
            {
              value: 'chinaBank',
              label: '中国银行',
            },
          ]}
          rules={[
            {
              required: true,
              message: 'APP应用名称为必填项',
            },
          ]}
          width="sm"
          name="name"
          label="APP应用名称"
        />
        <ProFormText
          label="APP应用测试方法名称"
          rules={[
            {
              required: true,
              message: 'APP应用测试方法名称为必填项',
            },
          ]}
          // placeholder="请输入版本号，格式要求为x.y.z"
          // fieldProps={{
          //   addonBefore: 'version',
          //   // addonAfter: '.com',
          // }}
          width="md"
          name="name"
        />
        <ProFormUploadButton
          label="APP应用测试方法jar包"
          name="upload"
          action="upload.do"
          extra="支持扩展名：.jar"
          rules={[
            {
              required: true,
              message: '测试方法jar包为必填项',
            },
          ]}
        />
        <ProFormTextArea
          width="md"
          name="desc"
          label="APP应用测试方法简介"
          rules={[
            {
              required: true,
              message: '测试方法描述信息为必填项',
            },
          ]}
        />
      </ModalForm>
      <ModalForm
        title="申请权限审批"
        width="400px"
        visible={createModalVisible2}
        onVisibleChange={handleModalVisible2}
        onFinish={async (value) => {
          // const success = await handleAdd(value as TableListItem);
          // if (success) {
          //   handleModalVisible(false);
          //   if (actionRef.current) {
          //     actionRef.current.reload();
          //   }
          // }
        }}
      >
        <ProFormText
          label="APP应用名称"
          // readonly={true}
          initialValue="遍历测试应用"
          // placeholder="请输入版本号，格式要求为x.y.z"
          // fieldProps={{
          //   addonBefore: 'version',
          //   // addonAfter: '.com',
          // }}
          width="md"
          name="name1"
          rules={[
            {
              required: true,
              message: 'APP应用名称为必填项',
            },
          ]}
        />
        <ProFormText
          label="申请权限"
          // readonly={true}
          initialValue="管理者"
          // placeholder="请输入版本号，格式要求为x.y.z"
          // fieldProps={{
          //   addonBefore: 'version',
          //   // addonAfter: '.com',
          // }}
          width="md"
          name="name2"
          rules={[
            {
              required: true,
              message: '申请权限为必填项',
            },
          ]}
        />
        <ProFormTextArea
          label="申请理由"
          // readonly={true}
          initialValue="-"
          rules={[
            {
              required: true,
              message: '申请理由为必填项',
            },
          ]}
          // placeholder="请输入版本号，格式要求为x.y.z"
          // fieldProps={{
          //   addonBefore: 'version',
          //   // addonAfter: '.com',
          // }}
          width="md"
          name="name3"
        />
        <ProFormRadio.Group
          name="radio"
          label="审批结果"
          rules={[
            {
              required: true,
              message: '审批结果为必填项',
            },
          ]}
          options={[
            {
              label: '通过',
              value: 'success',
            },
            {
              label: '驳回',
              value: 'fail',
            },
          ]}
        />
        <ProFormTextArea
          width="md"
          name="desc"
          label="审批意见"
          rules={[
            {
              required: true,
              message: '审批意见为必填项',
            },
          ]}
        />
      </ModalForm>
    </PageContainer>
  );
};

export default Advanced;
