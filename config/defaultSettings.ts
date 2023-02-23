import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  primaryColor: '#1890ff',
  layout: 'side',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  pwa: false,
  headerHeight: 48,
  splitMenus: false,
  footerRender: false,
  title: 'Android App Check',
  logo: '/appcheck.svg',
}

export default Settings;
