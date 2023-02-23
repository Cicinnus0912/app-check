import type { FC } from 'react';
import {
  ModalForm,
  ProFormSelect,
  ProFormDateTimePicker,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
} from '@ant-design/pro-form';
import type { TableListItem } from '../data.d';
import styles from '../style.less';
import { Button, Result } from 'antd';

type OperationModalProps = {
  done: boolean;
  visible: boolean;
  onDone: () => void;
  onSubmit: (values: TableListItem) => void;
};

const OperationModal: FC<OperationModalProps> = (props) => {
  const { done, visible, onDone, onSubmit, children } = props;
  if (!visible) {
    return null;
  }
  return (
    <ModalForm<TableListItem>
      visible={visible}
      title={done ? null : '注册应用'}
      className={styles.standardListForm}
      width={640}
      onFinish={async (values) => {
        onSubmit(values);
      }}
      submitter={{
        render: (_, dom) => (done ? null : dom),
      }}
      trigger={<>{children}</>}
      modalProps={{
        onCancel: () => onDone(),
        destroyOnClose: true,
        bodyStyle: done ? { padding: '72px 0' } : {},
      }}
    >
      {!done ? (
        <>
          <ProFormText
            name="title"
            label="应用名称"
            rules={[{ required: true, message: '请输入应用名称' }]}
            placeholder="请输入"
          />
          {/* <ProFormDateTimePicker
            name="createdAt"
            label="开始时间"
            rules={[{ required: true, message: '请选择开始时间' }]}
            fieldProps={{
              style: {
                width: '100%',
              },
            }}
            placeholder="请选择"
          />
          <ProFormSelect
            name="owner"
            label="任务负责人"
            rules={[{ required: true, message: '请选择任务负责人' }]}
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
            placeholder="请选择管理员"
          /> */}
          <ProFormUploadButton
            extra="支持扩展名：.jpg .png .ico .svg"
            label="应用Logo"
            name="file"
            title="上传应用Logo"
          />
          <ProFormTextArea
            name="subDescription"
            label="应用描述"
            rules={[{ message: '请输入至少五个字符的应用描述！', min: 5 }]}
            placeholder="请输入至少五个字符"
          />
        </>
      ) : (
        <Result
          status="success"
          title="操作成功"
          subTitle="一系列的信息描述，很短同样也可以带标点。"
          extra={
            <Button type="primary" onClick={onDone}>
              知道了
            </Button>
          }
          className={styles.formResult}
        />
      )}
    </ModalForm>
  );
};

export default OperationModal;
