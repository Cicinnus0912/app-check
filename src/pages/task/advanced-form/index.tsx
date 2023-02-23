import { CloseCircleOutlined } from '@ant-design/icons';
import { Card, Col, Popover, Row, message } from 'antd';

import type { FC } from 'react';
import { useState } from 'react';
import ProForm, {
  ProFormSelect,
  ProFormText,
  ProFormDatePicker,
  ProFormTextArea,
} from '@ant-design/pro-form';
import type { ProColumnType } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { fakeSubmitForm } from './service';
import styles from './style.less';
import React from 'react';
// 引入编辑器组件
import BraftEditor from 'braft-editor';
// 引入编辑器样式
import 'braft-editor/dist/index.css';

interface TableFormDateType {
  key: string;
  workId?: string;
  name?: string;
  department?: string;
  isNew?: boolean;
  editable?: boolean;
}
type InternalNamePath = (string | number)[];

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

const tableData = [
  {
    key: '1',
    workId: '00001',
    name: 'John Brown',
    department: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    workId: '00002',
    name: 'Jim Green',
    department: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    workId: '00003',
    name: 'Joe Black',
    department: 'Sidney No. 1 Lake Park',
  },
];

interface ErrorField {
  name: InternalNamePath;
  errors: string[];
}

const AdvancedForm: FC<Record<string, any>> = () => {
  const [error, setError] = useState<ErrorField[]>([]);
  const getErrorInfo = (errors: ErrorField[]) => {
    const errorCount = errors.filter((item) => item.errors.length > 0).length;
    if (!errors || errorCount === 0) {
      return null;
    }
    const scrollToField = (fieldKey: string) => {
      const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
      if (labelNode) {
        labelNode.scrollIntoView(true);
      }
    };
    const errorList = errors.map((err) => {
      if (!err || err.errors.length === 0) {
        return null;
      }
      const key = err.name[0] as string;
      return (
        <li key={key} className={styles.errorListItem} onClick={() => scrollToField(key)}>
          <CloseCircleOutlined className={styles.errorIcon} />
          <div className={styles.errorMessage}>{err.errors[0]}</div>
          <div className={styles.errorField}>{fieldLabels[key]}</div>
        </li>
      );
    });
    return (
      <span className={styles.errorIcon}>
        <Popover
          title="表单校验信息"
          content={errorList}
          overlayClassName={styles.errorPopover}
          trigger="click"
          getPopupContainer={(trigger: HTMLElement) => {
            if (trigger && trigger.parentNode) {
              return trigger.parentNode as HTMLElement;
            }
            return trigger;
          }}
        >
          <CloseCircleOutlined />
        </Popover>
        {errorCount}
      </span>
    );
  };

  const onFinish = async (values: Record<string, any>) => {
    setError([]);
    try {
      await fakeSubmitForm(values);
      message.success('提交成功');
    } catch {
      // console.log
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    setError(errorInfo.errorFields);
  };

  const columns: ProColumnType<TableFormDateType>[] = [
    {
      title: '成员姓名',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
    },
    {
      title: '工号',
      dataIndex: 'workId',
      key: 'workId',
      width: '20%',
    },
    {
      title: '所属部门',
      dataIndex: 'department',
      key: 'department',
      width: '40%',
    },
    {
      title: '操作',
      key: 'action',
      valueType: 'option',
      render: (_, record: TableFormDateType, index, action) => {
        return [
          <a
            key="eidit"
            onClick={() => {
              action?.startEditable(record.key);
            }}
          >
            编辑
          </a>,
        ];
      },
    },
  ];

  return (
    <ProForm
      layout="vertical"
      hideRequiredMark
      submitter={{
        render: (props, dom) => {
          return (
            <FooterToolbar>
              {getErrorInfo(error)}
              {dom}
            </FooterToolbar>
          );
        },
      }}
      initialValues={{ members: tableData }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <PageContainer content="高级表单常见于一次性输入和提交大批量数据的场景。">
        <Card title="问题修复表单" className={styles.card} bordered={false}>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              {/* <ProFormText
                label={fieldLabels.app}
                name="app"
                rules={[{ required: true, message: '请输入所属应用' }]}
                placeholder="请输入所属应用"
              /> */}
              <ProFormSelect
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
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
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
              <ProFormSelect
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
            </Col>
          </Row>
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
              {/* <ProFormTextArea
                label={fieldLabels.detail}
                name="detail"
                rules={[{ required: true, message: '请输入任务详情' }]}
                placeholder="请输入任务详情"
              /> */}
              <ProForm.Item
                name="content"
                label="任务详情"
                rules={[{ required: true, message: '请输入详情' }]}
              >
                <BraftEditor value={null} />
              </ProForm.Item>
            </Col>
          </Row>
        </Card>
        {/* <Card title="任务标题" className={styles.card} bordered={false}>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <ProFormText
                label={fieldLabels.title}
                name="name2"
                rules={[{ required: true, message: '请输入任务标题' }]}
              />
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <ProFormText
                label={fieldLabels.url2}
                name="url2"
                rules={[{ required: true, message: '请选择' }]}
              />
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <ProFormSelect
                label={fieldLabels.owner2}
                name="owner2"
                rules={[{ required: true, message: '请选择抄送人' }]}
                options={[
                  {
                    label: 'user01',
                    value: 'user01',
                  },
                  {
                    label: 'user02',
                    value: 'user02',
                  },
                ]}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <ProFormSelect
                label={fieldLabels.approver2}
                name="approver2"
                rules={[{ required: true, message: '请选择审批员' }]}
                options={[
                  {
                    label: '付晓晓',
                    value: 'xiao',
                  },
                  {
                    label: '周毛毛',
                    value: 'mao',
                  },
                ]}
                placeholder="请选择审批员"
              />
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <ProFormTimePicker
                label={fieldLabels.dateRange2}
                name="dateRange2"
                rules={[{ required: true, message: '请输入' }]}
                placeholder="提醒时间"
                fieldProps={{
                  style: {
                    width: '100%',
                  },
                }}
              />
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <ProFormSelect
                label={fieldLabels.type2}
                name="type2"
                rules={[{ required: true, message: '请选择仓库类型' }]}
                options={[
                  {
                    label: '私密',
                    value: 'private',
                  },
                  {
                    label: '公开',
                    value: 'public',
                  },
                ]}
                placeholder="请选择仓库类型"
              />
            </Col>
          </Row>
        </Card> */}
        <Card title="成员管理" bordered={false}>
          <ProForm.Item name="members">
            <EditableProTable<TableFormDateType>
              recordCreatorProps={{
                record: () => {
                  return {
                    key: `0${Date.now()}`,
                  };
                },
              }}
              columns={columns}
              rowKey="key"
            />
          </ProForm.Item>
        </Card>
      </PageContainer>
    </ProForm>
  );
};

export default AdvancedForm;
