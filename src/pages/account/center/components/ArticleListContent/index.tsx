import { Avatar } from 'antd';
import React from 'react';
import moment from 'moment';
import styles from './index.less';

export type ApplicationsProps = {
  data: {
    title?: string;
    content?: string;
    updatedAt?: any;
    avatar?: string;
    owner?: string;
    href?: string;
  };
};
const ArticleListContent: React.FC<ApplicationsProps> = ({
  data: { content, updatedAt, avatar, owner, href, title },
}) => (
  <div className={styles.listContent}>
    <div className={styles.description}>{content}</div>
    <div className={styles.extra}>
      <Avatar src={avatar} size="small" />
      <a href="">{title}</a> // 2022-12-02 23:39
      <em>{moment(updatedAt).format('YYYY-MM-DD HH:mm')}</em>
    </div>
  </div>
);

export default ArticleListContent;
