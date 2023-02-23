import { PlusOutlined, PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons';
import { Button, message, Input, Drawer, Avatar, Tag } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
  ProFormSelect,
} from '@ant-design/pro-form';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import { rule, addRule, updateRule, removeRule } from './service';
import type { TableListItem, TableListPagination } from './data';
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

const TableList: React.FC = () => {
  /** 新建窗口的弹窗 */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  /** 分布更新窗口的弹窗 */

  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<TableListItem>();
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);
  /** 国际化配置 */

  const columns: ProColumns<TableListItem>[] = [
    {
      title: 'Logo',
      dataIndex: 'avatar',
      search: false,
      width: 80,
      valueType: (item) => ({
        type: 'image',
        status: item.avatar,
      }),
      // render: (dom, entity) => {
      //   return <Avatar src={dom}></Avatar>;
      // },
    },
    {
      title: '应用名称',
      dataIndex: 'name',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: '应用版本号',
      dataIndex: 'version',
      width: 200,
      render: (dom, entity) => {
        return <Tag>{dom}</Tag>;
      },
    },
    {
      title: '检测方法',
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
        running: { text: '检测中', status: 'Processing' },
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
      title: '检测开始时间',
      sorter: true,
      dataIndex: 'createdAt',
      // valueType: 'dateTime',
      // renderFormItem: (item, { defaultRender, ...rest }, form) => {
      //   const status = form.getFieldValue('status');

      //   if (`${status}` === '0') {
      //     return false;
      //   }

      //   if (`${status}` === '3') {
      //     return <Input {...rest} placeholder="请输入异常原因！" />;
      //   }

      //   return defaultRender(item);
      // },
    },
    // {
    //   title: '操作',
    //   dataIndex: 'option',
    //   valueType: 'option',
    //   render: (_, record) => [
    //     // <PlayCircleOutlined />,
    //     // <PauseCircleOutlined />,
    //     // <Button icon={<PlayCircleOutlined />}></Button>,
    //     // <Button icon={<PauseCircleOutlined />}></Button>,
    //     <Button disabled={record.status !== 'close'}>
    //       <PlayCircleOutlined />
    //       开始
    //     </Button>,
    //     <Button disabled={record.status != 'running'}>
    //       <PauseCircleOutlined />
    //       暂停
    //     </Button>,
    //     // <a
    //     //   key="config"
    //     //   onClick={() => {
    //     //     handleUpdateModalVisible(true);
    //     //     setCurrentRow(record);
    //     //   }}
    //     // >
    //     //   配置
    //     // </a>,
    //     // <a key="subscribeAlert" href="https://procomponents.ant.design/">
    //     //   订阅警报
    //     // </a>,
    //   ],
    // },
  ];

  return (
    <PageContainer>
      <ProTable<TableListItem, TableListPagination>
        headerTitle="检测任务列表"
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
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> 新建检测任务
          </Button>,
        ]}
        request={rule}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
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
              {/* <span>
                服务调用次数总计 {selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)} 万
              </span> */}
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
          {/* <Button type="primary">批量审批</Button> */}
        </FooterToolbar>
      )}
      <ModalForm
        title="新建检测任务"
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value as TableListItem);
          if (success) {
            handleModalVisible(false);
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
          name="name1"
          label="APP应用名称"
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
          <ProDescriptions<TableListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<TableListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
