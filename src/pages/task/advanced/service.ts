import { request } from 'umi';

export async function queryAppTest() {
  return request('/api/test/app');
}
