import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Input, Drawer, Avatar, Tag } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { ProTable, EditableProTable } from '@ant-design/pro-table';
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
import OperationModal from './components/OperationModal';
import { history, useModel } from 'umi';

const TableList: React.FC = () => {
  /** 新建窗口的弹窗 */
  const { initialState, setInitialState } = useModel('@@initialState');
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [createAppVisible, handleAppVisible] = useState<boolean>(false);
  /** 分布更新窗口的弹窗 */

  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<TableListItem>();
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);
  // const [tableList, setTableList] = useState<TableListItem[]>([]);
  const [tableList, setTableList] = useState<TableListItem[]>(initialState?.appList);
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [done, setDone] = useState<boolean>(false);
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

  const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };

  /** 国际化配置 */

  const handleDone = () => {
    setDone(false);
    handleAppVisible(false);
  };

  const handleSubmit = (values: TableListItem) => {
    setDone(true);
    const tmp = tableList.slice();
    console.log('testvalues', values)
    tmp.push(values);
    console.log('testtmp', tmp)
    setTableList(tmp);
    console.log('testtableList', tableList);
    setInitialState((s) => ({ ...s, appList: tmp }));
    console.log(initialState)
    // message.success('注册应用成功');
  };

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '应用Logo',
      dataIndex: 'avatar',
      search: false,
      readonly: true,
      valueType: (item) => ({
        type: 'image',
        status: item.avatar,
      }),
      width: 80,
    },
    {
      title: '应用名称',
      dataIndex: 'name',
      width: 120,
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
      title: '应用描述',
      dataIndex: 'desc',
      valueType: 'textarea',
    },
    {
      title: '权限',
      width: 120,
      dataIndex: 'authority',
      readonly: true,
      // render: (_, record) => <Tag color={record.authority.color}>{}</Tag>,
      render: (dom, entity) => {
        return <Tag color={dom != '管理者' ? (dom == '测试者' ? 'blue' : '') : 'green'}>{dom}</Tag>;
      },
    },
    // {
    //   title: '规则名称',
    //   dataIndex: 'callNo',
    //   sorter: true,
    //   hideInForm: true,
    //   renderText: (val: string) => `${val}万`,
    // },
    // {
    //   title: '状态',
    //   dataIndex: 'status',
    //   hideInForm: true,
    //   valueEnum: {
    //     0: {
    //       text: '关闭',
    //       status: 'Default',
    //     },
    //     1: {
    //       text: '运行中',
    //       status: 'Processing',
    //     },
    //     2: {
    //       text: '已完成',
    //       status: 'Success',
    //     },
    //     3: {
    //       text: '异常',
    //       status: 'Error',
    //     },
    //   },
    // },
    // {
    //   title: '测试开始时间',
    //   sorter: true,
    //   dataIndex: 'updatedAt',
    //   valueType: 'dateTime',
    //   renderFormItem: (item, { defaultRender, ...rest }, form) => {
    //     const status = form.getFieldValue('status');

    //     if (`${status}` === '0') {
    //       return false;
    //     }

    //     if (`${status}` === '3') {
    //       return <Input {...rest} placeholder="请输入异常原因！" />;
    //     }

    //     return defaultRender(item);
    //   },
    // },
    // {
    //   title: '操作',
    //   dataIndex: 'option',
    //   valueType: 'option',
    //   render: (_, record) => [
    //     <a
    //       key="config"
    //       onClick={() => {
    //         handleUpdateModalVisible(true);
    //         setCurrentRow(record);
    //       }}
    //     >
    //       配置
    //     </a>,
    //     <a key="subscribeAlert" href="https://procomponents.ant.design/">
    //       订阅警报
    //     </a>,
    //   ],
    // },
    {
      title: '操作',
      valueType: 'option',
      width: 120,
      render: (text, record, _, action) => [
        // record.authority == '管理者' ? (
        //   <Button
        //     key="editable"
        //     onClick={() => {
        //       action?.startEditable?.(record.key);
        //     }}
        //     disabled={record.authority !== '管理者'}
        //   >
        //     编辑
        //   </Button>
        // ) : (
        //   <></>
        // ), //(record.authority == '管理者')
        // <a
        //   key="delete"
        //   onClick={() => {
        //     setTableList(tableList.filter((item) => item.key !== record.key));
        //   }}
        // >
        //   删除
        // </a>,
        <Button
          key="editable"
          type="primary"
          onClick={() => {
            // action?.startEditable?.(record.key);
            history.push('/list/advanced')
          }}
          disabled={record.authority !== '管理者'}
        >
          管理应用
        </Button>,
      ],
    },
  ];

  return (
    <PageContainer>
      <EditableProTable<TableListItem, TableListPagination>
        rowKey="key"
        headerTitle="应用列表"
        loading={false}
        columns={columns}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> 权限申请
          </Button>,

          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleAppVisible(true);
            }}
          >
            <PlusOutlined /> 注册应用
          </Button>,
        ]}
        // dataSource={initialState?.appList}
        // request={rule}
        value={tableList}
        onChange={setTableList}
        recordCreatorProps={false}
      />
      <ModalForm
        title="权限申请"
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
        <ProFormSelect
          showSearch={true}
          options={tableList.map((item) => { return item.name})}
          // options={[
          //   {
          //     value: 'test1',
          //     label: '测试应用1',
          //   },
          //   {
          //     value: 'test2',
          //     label: '测试应用2',
          //   },
          // ]}
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
        <ProFormSelect
          options={[
            {
              value: '0',
              label: '测试者',
            },
            {
              value: '1',
              label: '管理者',
            },
            {
              value: '2',
              label: '参与者',
            },
          ]}
          rules={[
            {
              required: true,
              message: '申请权限为必填项',
            },
          ]}
          width="sm"
          name="authority"
          label="申请权限"
        />
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
        <ProFormTextArea
          width="md"
          name="desc"
          label="申请理由描述"
          rules={[
            {
              required: true,
              message: '申请理由描述为必填项',
            },
          ]}
        />
      </ModalForm>
      <OperationModal
        done={done}
        visible={createAppVisible}
        onDone={handleDone}
        onSubmit={handleSubmit}
      />
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
