import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { SettingDrawer } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import type { RunTimeLayoutConfig } from 'umi';
import { history, Link } from 'umi';
import RightContent from '@/components/RightContent';
// import Footer from '@/components/Footer';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
import { rule } from './../src/pages/list/table-list/service'
import { queryAppProfile } from './../src/pages/list/advanced/service'
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import defaultSettings from '../config/defaultSettings';

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  appList?: any;
  historyList?: any;
  versionList?: any;
  methodList?: any;
  authorityList?: any;
  taskList?: any;
  problemList?: any;
  loading?: boolean;
  mMember?: Array<string>;
  tMember?: Array<string>;
  pMember?: Array<string>;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
  fetchAppList?: () => Promise<any>;
  fetchAppData?: () => Promise<any>;
}> {
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser();
      return msg.data;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  const fetchAppList = async () => {
    try {
      const msg = await rule(1, 10);
      return msg.data;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  }
  const fetchAppData = async () => {
    try {
      const msg = await queryAppProfile();
      console.log('msg', msg)
      return msg.data;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  }
  // 如果不是登录页面，执行
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    const appList = await fetchAppList();
    const { advancedOperation: historyList, advancedOperation1: versionList, advancedOperation2: methodList, advancedOperation3: authorityList, advancedOperation4: taskList, advancedOperation5: problemList } = await fetchAppData();
    // const data = await fetchAppData();
    // console.log('data', data);
    const mMember = ['user1'];
    const tMember = ['user2'];
    const pMember = ['user3'];
    return {
      fetchUserInfo,
      currentUser,
      appList,
      historyList,
      versionList,
      methodList,
      authorityList,
      taskList,
      problemList,
      mMember,
      tMember,
      pMember,
      settings: defaultSettings,
    };
  }
  return {
    fetchUserInfo,
    fetchAppList,
    fetchAppData,
    settings: defaultSettings,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    // footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    links: isDev
      ? [
          // <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
          //   <LinkOutlined />
          //   <span>OpenAPI 文档</span>
          // </Link>,
          // <Link to="/~docs" key="docs">
          //   <BookOutlined />
          //   <span>业务组件文档</span>
          // </Link>,
        ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    // childrenRender: (children, props) => {
    //   // if (initialState?.loading) return <PageLoading />;
    //   return (
    //     <>
    //       {children}
    //       {!props.location?.pathname?.includes('/login') && (
    //         <SettingDrawer
    //           disableUrlParams
    //           enableDarkTheme
    //           settings={initialState?.settings}
    //           onSettingChange={(settings) => {
    //             setInitialState((preInitialState) => ({
    //               ...preInitialState,
    //               settings,
    //             }));
    //           }}
    //         />
    //       )}
    //     </>
    //   );
    // },
    ...initialState?.settings,
  };
};
