import { useIntl } from 'umi';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

const Footer: React.FC = () => {
  const intl = useIntl();
  // const defaultMessage = intl.formatMessage({
  //   id: 'app.copyright.produced',
  //   defaultMessage: '蚂蚁集团体验技术部出品',
  // });

  const currentYear = new Date().getFullYear();

  return (
    // <DefaultFooter
    //   copyright={`${currentYear} 浙江大学`}
    //   links={[
    //     {
    //       key: 'Android App Check',
    //       title: 'Android App Check',
    //       href: '',
    //       blankTarget: true,
    //     },
    //     {
    //       key: 'github',
    //       title: <GithubOutlined />,
    //       href: 'https://github.com/ant-design/ant-design-pro',
    //       blankTarget: true,
    //     },
    //     {
    //       key: '浙江大学',
    //       title: '浙江大学',
    //       href: 'https://www.zju.edu.cn/',
    //       blankTarget: true,
    //     },
    //   ]}
    // />
    <></>
  );
};

export default Footer;
