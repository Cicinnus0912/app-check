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
  Col,
  Row,
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
  Drawer,
  message
} from 'antd';
import { GridContent, PageContainer, RouteContext, FooterToolbar } from '@ant-design/pro-layout';
import type { FC } from 'react';
import React, { Fragment, useState, useRef } from 'react';
import { ProTable } from '@ant-design/pro-table';
// import type { ActionType, ProColumns } from '@ant-design/pro-components';
import classNames from 'classnames';
import { useRequest } from 'umi';
import type { AdvancedProfileData, TableListItem, TableListPagination } from './data.d';
import { rule, addRule, updateRule, removeRule } from './service';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import { queryAppProfile } from './service';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import styles from './style.less';
import ProForm, {
  ProFormDigit,
  ModalForm,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
  ProFormSelect,
  ProFormDatePicker,
  ProFormRadio,
} from '@ant-design/pro-form';
// 引入编辑器组件
import BraftEditor from 'braft-editor';
// 引入编辑器样式
import 'braft-editor/dist/index.css';

const description = (
  <RouteContext.Consumer>
    {({ isMobile }) => (
      <Descriptions className={styles.headerList} size="default" column={isMobile ? 1 : 1}>
        <Descriptions.Item label="创建人员">user1</Descriptions.Item>
        {/* <Descriptions.Item label="应用简介">
          支付宝,全球领先的独立第三方支付平台,致力于为广大用户提供安全快速的电子支付/网上支付/安全支付/手机支付体验,及转账收款/水电煤缴费/信用卡还款/AA收款等生活服务应用。
        </Descriptions.Item> */}
        <Descriptions.Item label="成员信息">
          管理者：<Tag color="green">user1</Tag> | 测试者：
          <Tag color="blue">user2</Tag> | 参与者：<Tag color="">user3</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="创建时间">2022-11-21</Descriptions.Item>
        {/* <Descriptions.Item label="关联单据">
          <a href="">12421</a>
        </Descriptions.Item> */}
        {/* <Descriptions.Item label="生效日期">2017-07-07 ~ 2017-08-08</Descriptions.Item> */}
        {/* <Descriptions.Item label="备注">请于两个工作日内确认</Descriptions.Item> */}
      </Descriptions>
    )}
  </RouteContext.Consumer>
);

/**
 * 添加节点
 *
 * @param fields
 */

const handleAdd = async (fields: TableListItem) => {
  const hide = message.loading('正在添加');

  try {
    await addRule({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};
/**
 * 更新节点
 *
 * @param fields
 */

const handleUpdate = async (fields: FormValueType, currentRow?: TableListItem) => {
  const hide = message.loading('正在配置');

  try {
    await updateRule({
      ...currentRow,
      ...fields,
    });
    hide();
    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};
/**
 * 删除节点
 *
 * @param selectedRows
 */

const handleRemove = async (selectedRows: TableListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;

  try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const fieldLabels = {
  app: '所属应用', //
  version: '影响版本', //
  owner: '当前指派', //
  approver: '审批人',
  dateRange: '截止日期', //
  title: '任务标题', //
  name2: '任务名',
  detail: '任务详情', //
  owner2: '抄送给', //
  approver2: '责任人',
  dateRange2: '生效日期',
  type2: '任务类型',
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
  const { advancedOperation, advancedOperation1, advancedOperation2, advancedOperation3, advancedOperation4, advancedOperation5 } = data;
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [createModalVisible1, handleModalVisible1] = useState<boolean>(false);
  const [createModalVisible2, handleModalVisible2] = useState<boolean>(false);
  const [createModalVisible3, handleModalVisible3] = useState<boolean>(false);
  const [createModalVisible4, handleModalVisible4] = useState<boolean>(false);
  /** 分布更新窗口的弹窗 */

  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<TableListItem>();
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);

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
    {
      key: 'tab4',
      tab: '测试任务列表',
    },
    {
      key: 'tab5',
      tab: '问题修复任务列表',
    },
  ];

  const versionList = [
    {
      title: '应用版本号',
      dataIndex: 'version',
      key: 'version',
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
    // {
    //   title: 'apk文件',
    //   dataIndex: 'memo',
    //   key: 'memo',
    //   render: (dom, entity) => {
    //     return <a href="">{dom}</a>;
    //   },
    // },
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
    // {
    //   title: 'jar文件',
    //   dataIndex: 'memo',
    //   key: 'memo',
    //   render: (dom, entity) => {
    //     return <a href="">{dom}</a>;
    //   },
    // },
  ];

  const authorityList = [
    // {
    //   title: '应用Logo',
    //   dataIndex: 'avatar',
    //   key: 'avatar',
    //   // valueType: (item) => ({
    //   //   type: 'image',
    //   //   status: item.avatar,
    //   // }),
    //   render: (dom, entity) => {
    //     return <Avatar src={dom}></Avatar>;
    //   },
    //   width: 100,
    // },
    // {
    //   title: '应用名称',
    //   dataIndex: 'name',
    //   key: 'name',
    //   width: 100,
    //   // render: (dom, entity) => {
    //   //   return <Tag>{dom}</Tag>;
    //   // },
    // },
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

  const reportColumns = [
    // {
    //   title: '应用名称',
    //   dataIndex: 'name',
    //   key: 'name',
    //   width: 100,
    //   // render: (dom, entity) => {
    //   //   return <Tag>{dom}</Tag>;
    //   // },
    // },
    {
      title: '应用版本号',
      dataIndex: 'version',
      width: 200,
      render: (dom, entity) => {
        return <Tag>{dom}</Tag>;
      },
    },
    {
      title: '测试方法',
      dataIndex: 'method',
      width: 200,
      render: (dom, entity) => {
        return <Tag>{dom}</Tag>;
      },
    },
    {
      title: '测试结果',
      dataIndex: 'method',
      width: 200,
      render: (dom, entity) => {
        return '';
      },
    }
    // {
    //   title: '页面',
    //   dataIndex: 'page',
    //   key: 'page',
    //   // valueType: (item) => ({
    //   //   type: 'image',
    //   //   status: item.avatar,
    //   // }),
    //   width: 140,
    // },
    // {
    //   title: '控件',
    //   dataIndex: 'kongjian',
    //   key: 'kongjian',
    //   // render: (dom, entity) => {
    //   //   return <Tag>{dom}</Tag>;
    //   // },
    // },
  ];

  const bugColumns = [
    {
      title: '页面',
      dataIndex: 'page',
      key: 'page',
      // valueType: (item) => ({
      //   type: 'image',
      //   status: item.avatar,
      // }),
      width: 30,
    },
    {
      title: '控件',
      dataIndex: 'kongjian',
      key: 'kongjian',
      // render: (dom, entity) => {
      //   return <Tag>{dom}</Tag>;
      // },
    },
    {
      title: '操作',
      valueType: 'option',
      width: 50,
      render: (dom, entity) => {
        return (
          <a
            key="editable"
            onClick={() => {
              handleModalVisible4(true);
            }}
          >
            生成问题修复任务
          </a>
        );
      },
    }
  ];

  const columns = [
    // {
    //   title: '应用Logo',
    //   dataIndex: 'avatar',
    //   key: 'avatar',
    //   // valueType: (item) => ({
    //   //   type: 'image',
    //   //   status: item.avatar,
    //   // }),
    //   render: (dom, entity) => {
    //     return <Avatar src={dom}></Avatar>;
    //   },
    //   width: 100,
    // },
    // {
    //   title: '应用名称',
    //   dataIndex: 'name',
    //   key: 'name',
    //   width: 100,
    //   // render: (dom, entity) => {
    //   //   return <Tag>{dom}</Tag>;
    //   // },
    // },
    // {
    //   title: '应用版本号',
    //   dataIndex: 'version',
    //   key: 'version',
    //   width: 100,
    //   // render: (dom, entity) => {
    //   //   return <Tag>{dom}</Tag>;
    //   // },
    // },
    // {
    //   title: '页面',
    //   dataIndex: 'page',
    //   key: 'page',
    //   // valueType: (item) => ({
    //   //   type: 'image',
    //   //   status: item.avatar,
    //   // }),
    //   width: 140,
    // },
    // {
    //   title: '控件',
    //   dataIndex: 'kongjian',
    //   key: 'kongjian',
    //   // render: (dom, entity) => {
    //   //   return <Tag>{dom}</Tag>;
    //   // },
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

  const taskColumns: ProColumns<TableListItem>[] = [
    // {
    //   title: 'Logo',
    //   dataIndex: 'avatar',
    //   search: false,
    //   width: 80,
    //   valueType: (item) => ({
    //     type: 'image',
    //     status: item.avatar,
    //   }),
    //   // render: (dom, entity) => {
    //   //   return <Avatar src={dom}></Avatar>;
    //   // },
    // },
    // {
    //   title: '应用名称',
    //   dataIndex: 'name',
    //   render: (dom, entity) => {
    //     return (
    //       // <a
    //       //   onClick={() => {
    //       //     setCurrentRow(entity);
    //       //     setShowDetail(true);
    //       //   }}
    //       // >
    //       //   {dom}
    //       // </a>
    //       <span>{dom}</span>
    //     );
    //   },
    // },
    {
      title: '应用版本号',
      dataIndex: 'version',
      width: 200,
      render: (dom, entity) => {
        return <Tag>{dom}</Tag>;
      },
    },
    {
      title: '测试方法',
      dataIndex: 'method',
      width: 200,
      render: (dom, entity) => {
        return <Tag>{dom}</Tag>;
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      initialValue: 'all',
      filters: true,
      onFilter: true,
      valueEnum: {
        all: { text: '全部', status: 'Default' },
        close: { text: '未开始', status: 'Default' },
        running: { text: '测试中', status: 'Processing' },
        online: { text: '已完成', status: 'Success' },
        error: { text: '异常', status: 'Error' },
      },
    },
    {
      title: '进度',
      key: 'progress',
      dataIndex: 'progress',
      search: false,
      valueType: (item) => ({
        type: 'progress',
        strokeColor: item.status == 'close' ? '#d9d9d9' : '#1b91ff',
        status:
          item.status !== 'error' ? (item.status == 'online' ? 'success' : 'normal') : 'exception',
      }),
    },
    {
      title: '测试开始时间',
      sorter: true,
      dataIndex: 'createdAt',
    },
    {
      title: '测试结果',
      key: 'progress',
      dataIndex: 'progress',
      search: false,
      render: (dom, entity) => {
        return (
          dom === 100 ?
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            测试报告
          </a> :
          <></>
        );
      },
      // valueType: (item) => ({
      //   type: 'progress',
      //   strokeColor: item.status == 'close' ? '#d9d9d9' : '#1b91ff',
      //   status:
      //     item.status !== 'error' ? (item.status == 'online' ? 'success' : 'normal') : 'exception',
      // }),
    },
  ];

  const problemColumns: ProColumns<TableListItem>[] = [
    {
      title: '应用版本号',
      dataIndex: 'version',
      width: 120,
      render: (dom, entity) => {
        return <Tag>{dom}</Tag>;
      },
    },
    {
      title: '测试方法',
      dataIndex: 'method',
      width: 120,
      render: (dom, entity) => {
        return <Tag>{dom}</Tag>;
      },
    },
    {
      title: '当前指派',
      dataIndex: 'user1',
      width: 60,
      render: (dom, entity) => {
        return <Tag>{dom}</Tag>;
      },
    },
    {
      title: '抄送给',
      dataIndex: 'user2',
      width: 60,
      render: (dom, entity) => {
        return <Tag>{dom}</Tag>;
      },
    },
    {
      title: '截止日期',
      sorter: true,
      width: 150,
      dataIndex: 'createdAt',
    },
    {
      title: '状态',
      dataIndex: 'status',
      initialValue: 'all',
      width: 80,
      filters: true,
      onFilter: true,
      valueEnum: {
        all: { text: '全部', status: 'Default' },
        close: { text: '未开始', status: 'Default' },
        running: { text: '修复中', status: 'Processing' },
        online: { text: '已完成', status: 'Success' },
        error: { text: '异常', status: 'Error' },
      },
    },
    {
      title: '任务标题',
      dataIndex: 'title',
      width: 200,
      key: 'memo',
    },
    {
      title: '任务详情',
      dataIndex: 'detail',
      key: 'memo',
    },
    {
      title: '操作',
      dataIndex: 'status',
      width: 120,
      render: (dom, entity) => {
        return (
          <Button
            key="editable"
            type='primary'
            size='small'
            disabled={dom == 'online'}
            onClick={() => {
              // handleModalVisible2(true);
            }}
          >
            置完成
          </Button>
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

  const contentList = {
    tab1: (
      <ProTable
        // pagination={false}
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
        // pagination={false}
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
        // pagination={false}
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
    tab4: (
      <div>
        <ProTable<TableListItem, TableListPagination>
          headerTitle="测试任务列表"
          actionRef={actionRef}
          rowKey="key"
          // search={{
          //   labelWidth: 120,
          // }}
          search={false}
          toolBarRender={() => [
            <Button
              type="primary"
              key="primary"
              onClick={() => {
                handleModalVisible3(true);
              }}
            >
              <PlusOutlined /> 新建测试任务
            </Button>,
          ]}
          // request={rule}
          dataSource={advancedOperation4}
          columns={taskColumns}
          // rowSelection={{
          //   onChange: (_, selectedRows) => {
          //     setSelectedRows(selectedRows);
          //   },
          // }}
        />
        {/* {selectedRowsState?.length > 0 && (
          <FooterToolbar
            extra={
              <div>
                已选择{' '}
                <a
                  style={{
                    fontWeight: 600,
                  }}
                >
                  {selectedRowsState.length}
                </a>{' '}
                项 &nbsp;&nbsp;
                <span>
                  服务调用次数总计 {selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)} 万
                </span>
              </div>
            }
          >
            <Button
              onClick={async () => {
                await handleRemove(selectedRowsState);
                setSelectedRows([]);
                actionRef.current?.reloadAndRest?.();
              }}
            >
              批量删除
            </Button>
            <Button type="primary">批量审批</Button>
          </FooterToolbar>
        )} */}
        <ModalForm
          title="新建测试任务"
          width="400px"
          visible={createModalVisible3}
          onVisibleChange={handleModalVisible3}
          onFinish={async (value) => {
            const success = await handleAdd(value as TableListItem);
            if (success) {
              handleModalVisible3(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
        >
        {/* <ProFormText
          label="APP应用名称"
          rules={[
            {
              required: true,
              message: 'APP应用名称为必填项',
            },
          ]}
          width="md"
          name="name"
        /> */}
        {/* <ProFormSelect
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
          name="name1"
          label="APP应用名称"
        /> */}
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
              message: 'APP应用版本为必填项',
            },
          ]}
          width="sm"
          name="name2"
          label="APP应用版本"
        />
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
              message: 'APP应用测试方法为必填项',
            },
          ]}
          width="sm"
          name="name3"
          label="APP应用测试方法"
        />
        <ProFormDigit label="预期遍历页数" name="pageNum" width="sm" min={1} max={1000} required/>
        <ProFormDigit label="最大深度" name="maxDepth" width="sm" min={1} max={1000} required/>
        {/* <ProFormUploadButton
          label="APP应用Logo"
          name="upload"
          action="upload.do"
          rules={[
            {
              required: true,
              message: 'APP应用Logo为必填项',
            },
          ]}
        /> */}
        {/* <ProFormTextArea
          width="md"
          name="desc"
          label="APP应用描述"
          rules={[
            {
              required: true,
              message: 'APP应用描述为必填项',
            },
          ]}
        /> */}
      </ModalForm>
      <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value, currentRow);

          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);

            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          setCurrentRow(undefined);
        }}
        updateModalVisible={updateModalVisible}
        values={currentRow || {}}
      />

      <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <>
            <ProDescriptions<TableListItem>
              column={2}
              title={currentRow?.name}
              request={async () => ({
                data: currentRow || {},
              })}
              params={{
                id: currentRow?.name,
              }}
              columns={reportColumns as ProDescriptionsItemProps<TableListItem>[]}
            />
            <ProTable<TableListItem>
              pagination={false}
              loading={loading}
              dataSource={currentRow?.page}
              columns={bugColumns}
              search={false}
              options={false}
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
          </>
        )}
      </Drawer>
      </div>
    ),
    tab5: (
      // <Card title="问题修复表单" className={styles.card} bordered={false}>
      // </Card>
      <div>
        <ProTable<TableListItem>
          headerTitle="问题修复列表"
          actionRef={actionRef}
          rowKey="key"
          // search={{
          //   labelWidth: 120,
          // }}
          search={false}
          // toolBarRender={() => [
          //   <Button
          //     type="primary"
          //     key="primary"
          //     onClick={() => {
          //       handleModalVisible3
                
          //       (true);
          //     }}
          //   >
          //     <PlusOutlined /> 新建测试任务
          //   </Button>,
          // ]}
          dataSource={advancedOperation5}
          columns={problemColumns}
          // rowSelection={{
          //   onChange: (_, selectedRows) => {
          //     setSelectedRows(selectedRows);
          //   },
          // }}
        />
        {/* {selectedRowsState?.length > 0 && (
          <FooterToolbar
            extra={
              <div>
                已选择{' '}
                <a
                  style={{
                    fontWeight: 600,
                  }}
                >
                  {selectedRowsState.length}
                </a>{' '}
                项 &nbsp;&nbsp;
                <span>
                  服务调用次数总计 {selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)} 万
                </span>
              </div>
            }
          >
            <Button
              onClick={async () => {
                await handleRemove(selectedRowsState);
                setSelectedRows([]);
                actionRef.current?.reloadAndRest?.();
              }}
            >
              批量删除
            </Button>
            <Button type="primary">批量审批</Button>
          </FooterToolbar>
        )} */}
      </div>
    ),
  };
  const onTabChange = (tabActiveKey: string) => {
    seTabStatus({ ...tabStatus, tabActiveKey });
  };
  const onOperationTabChange = (key: string) => {
    seTabStatus({ ...tabStatus, operationKey: key });
  };

  return (
    <PageContainer
      title={
        <>
          <Avatar
            size="large"
            src={'https://i.postimg.cc/RZbXszL5/test.png'}
          />
          <span>测试应用1</span>
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
                  // pagination={false}
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
        {/* <ProFormSelect
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
        /> */}
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
        {/* <ProFormSelect
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
        /> */}
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
          readonly={true}
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
          readonly={true}
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
          readonly={true}
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
      <ModalForm
        title="生成问题修复任务"
        width="800px"
        visible={createModalVisible4}
        onVisibleChange={handleModalVisible4}
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
        {/* <Row gutter={16}> */}
          {/* <Col lg={6} md={12} sm={24}> */}
            {/* <ProFormText
              label={fieldLabels.app}
              name="app"
              rules={[{ required: true, message: '请输入所属应用' }]}
              placeholder="请输入所属应用"
            /> */}
            {/* <ProFormSelect
              label={fieldLabels.app}
              name="app"
              rules={[{ required: true, message: '请选择所属应用' }]}
              options={[
                {
                  label: '遍历测试应用',
                  value: 'test',
                },
              ]}
              placeholder="请选择所属应用"
            />
          </Col> */}
          {/* <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}> */}
            {/* <ProFormText
              label={fieldLabels.version}
              name="version"
              rules={[{ required: true, message: '请选择影响版本' }]}
              fieldProps={{
                style: { width: '100%' },
                addonBefore: '影响版本',
                addonAfter: '创建发布',
              }}
              placeholder="请选择影响版本"
            /> */}
            {/* <ProFormSelect
              label={fieldLabels.version}
              name="version"
              rules={[{ required: true, message: '请选择影响版本' }]}
              options={[
                {
                  label: 'version 1.0.0',
                  value: '1.0.0',
                },
              ]}
              placeholder="请选择影响版本"
            />
          </Col> */}
        {/* </Row> */}
        <Row gutter={16}>
          <Col lg={6} md={12} sm={24}>
            <ProFormSelect
              label={fieldLabels.owner}
              name="owner"
              rules={[{ required: true, message: '请选择当前指派人' }]}
              fieldProps={{
                mode: 'multiple',
              }}
              options={[
                {
                  label: 'user01',
                  value: 'user01',
                },
                {
                  label: 'user02',
                  value: 'user02',
                },
                {
                  label: 'user03',
                  value: 'user03',
                },
                {
                  label: 'user04',
                  value: 'user04',
                },
                {
                  label: 'user05',
                  value: 'user05',
                },
                {
                  label: 'user06',
                  value: 'user06',
                },
              ]}
              placeholder="请选择当前指派人"
            />
          </Col>
          <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
            <ProFormSelect
              label={fieldLabels.owner2}
              name="owner2"
              fieldProps={{
                mode: 'multiple',
              }}
              rules={[{ required: true, message: '请选择当前抄送人' }]}
              options={[
                {
                  label: 'user01',
                  value: 'user01',
                },
                {
                  label: 'user02',
                  value: 'user02',
                },
                {
                  label: 'user03',
                  value: 'user03',
                },
                {
                  label: 'user04',
                  value: 'user04',
                },
                {
                  label: 'user05',
                  value: 'user05',
                },
                {
                  label: 'user06',
                  value: 'user06',
                },
              ]}
              placeholder="请选择当前抄送人"
            />
          </Col>
          <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
            <ProFormDatePicker
              label={fieldLabels.dateRange}
              name="dateRange"
              fieldProps={{
                style: {
                  width: '100%',
                },
              }}
              rules={[{ required: true, message: '请选择截止日期' }]}
            />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col lg={22} md={12} sm={24}>
            <ProFormText
              label={fieldLabels.title}
              name="title"
              rules={[{ required: true, message: '请输入任务标题' }]}
              placeholder="请输入任务标题"
            />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col lg={22} md={12} sm={24}>
            <ProFormTextArea
              label={fieldLabels.detail}
              name="detail"
              rules={[{ required: true, message: '请输入任务详情' }]}
              placeholder="请输入任务详情"
            />
            {/* <ProForm.Item
              name="content"
              label="任务详情"
              rules={[{ required: true, message: '请输入详情' }]}
            >
              <BraftEditor value={null} style={{ height: "300px" }}/>
            </ProForm.Item> */}
          </Col>
        </Row>
      </ModalForm>
    </PageContainer>
  );
};

export default Advanced;
