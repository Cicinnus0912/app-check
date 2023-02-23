import { request } from 'umi';

export async function queryAppProfile() {
  return request('/api/profile/app');
}
