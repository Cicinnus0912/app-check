import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Input, Upload, message } from 'antd';
import ProForm, {
  ProFormDependency,
  ProFormFieldSet,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { useModel, useRequest } from 'umi';
import { queryCurrent } from '../service';
import { queryProvince, queryCity } from '../service';
import localStorage from "localStorage";
import styles from './BaseView.less';
import { values } from 'lodash';

const validatorPhone = (rule: any, value: string[], callback: (message?: string) => void) => {
  if (!value[0]) {
    callback('Please input your area code!');
  }
  if (!value[1]) {
    callback('Please input your phone number!');
  }
  callback();
};
// 头像组件 方便以后独立，增加裁剪之类的功能
const AvatarView = ({ avatar }: { avatar: string }) => (
  <>
    <div className={styles.avatar_title}>头像</div>
    <div className={styles.avatar}>
      <img src={avatar} alt="avatar" />
    </div>
    <Upload showUploadList={false}>
      <div className={styles.button_view}>
        <Button>
          <UploadOutlined />
          更换头像
        </Button>
      </div>
    </Upload>
  </>
);

const BaseView: React.FC = () => {
  // const { data: currentUser, loading } = useRequest(() => {
  //   return queryCurrent();
  // });
  const { initialState, setInitialState } = useModel('@@initialState');
  const { loading } = useRequest(() => {
    return queryCurrent();
  });
  console.log(222, initialState);
  const currentUser = initialState?.currentUser;

  const getAvatarURL = () => {
    if (currentUser) {
      if (currentUser.avatar) {
        return currentUser.avatar;
      }
      const url = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
      return url;
    }
    return '';
  };

  const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };

  const handleFinish = async (values) => {
    await waitTime(500);
    setInitialState((s) => ({ ...s, currentUser: values }));
    message.success('更新基本信息成功');
  };
  
  return (
    <div className={styles.baseView}>
      {loading ? null : (
        <>
          <div className={styles.left}>
            <ProForm
              layout="vertical"
              onFinish={handleFinish}
              submitter={{
                searchConfig: {
                  submitText: '更新基本信息',
                },
                render: (_, dom) => dom[1],
              }}
              initialValues={{
                ...currentUser,
                // phone: currentUser?.phone.split('-'),
              }}
              hideRequiredMark
              onValuesChange={(changeValues) => console.log(1, changeValues, localStorage.getItem('account'))}
            >
              <ProFormText
                width="md"
                name="email"
                label="邮箱"
                disabled={true}
                rules={[
                  {
                    required: true,
                    message: '请输入您的邮箱!',
                  },
                ]}

              />
              <ProFormText
                width="md"
                name="name"
                label="昵称"
                rules={[
                  {
                    required: true,
                    message: '请输入您的昵称!',
                  },
                ]}
              />
              <ProFormTextArea
                name="signature"
                label="个人简介"
                rules={[
                  {
                    required: true,
                    message: '请输入个人简介!',
                  },
                ]}
                placeholder="个人简介"
              />
              {/* <ProFormSelect
                width="sm"
                name="country"
                label="国家/地区"
                rules={[
                  {
                    required: true,
                    message: '请输入您的国家或地区!',
                  },
                ]}
                options={[
                  {
                    label: '中国',
                    value: 'China',
                  },
                ]}
              />

              <ProForm.Group title="所在省市" size={8}>
                <ProFormSelect
                  rules={[
                    {
                      required: true,
                      message: '请输入您的所在省!',
                    },
                  ]}
                  width="sm"
                  fieldProps={{
                    labelInValue: true,
                  }}
                  name="province"
                  className={styles.item}
                  request={async () => {
                    return queryProvince().then(({ data }) => {
                      return data.map((item) => {
                        return {
                          label: item.name,
                          value: item.id,
                        };
                      });
                    });
                  }}
                />
                <ProFormDependency name={['province']}>
                  {({ province }) => {
                    return (
                      <ProFormSelect
                        params={{
                          key: province?.value,
                        }}
                        name="city"
                        width="sm"
                        rules={[
                          {
                            required: true,
                            message: '请输入您的所在城市!',
                          },
                        ]}
                        disabled={!province}
                        className={styles.item}
                        request={async () => {
                          if (!province?.key) {
                            return [];
                          }
                          return queryCity(province.key || '').then(({ data }) => {
                            return data.map((item) => {
                              return {
                                label: item.name,
                                value: item.id,
                              };
                            });
                          });
                        }}
                      />
                    );
                  }}
                </ProFormDependency>
              </ProForm.Group>
              <ProFormText
                width="md"
                name="address"
                label="街道地址"
                rules={[
                  {
                    required: true,
                    message: '请输入您的街道地址!',
                  },
                ]}
              />
              <ProFormFieldSet
                name="phone"
                label="联系电话"
                rules={[
                  {
                    required: true,
                    message: '请输入您的联系电话!',
                  },
                  { validator: validatorPhone },
                ]}
              >
                <Input className={styles.area_code} />
                <Input className={styles.phone_number} />
              </ProFormFieldSet> */}
            </ProForm>
          </div>
          <div className={styles.right}>
            <AvatarView avatar={getAvatarURL()} />
          </div>
        </>
      )}
    </div>
  );
};

export default BaseView;
