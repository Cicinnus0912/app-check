export type AdvancedOperation = {
  key: string;
  type: string;
  name: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  memo: string;
  avatar: string;
  authority: string;
  res: string;
};

export type AdvancedOperation1 = {
  key: string;
  type: string;
  description: string;
  name: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  memo: string;
};

export type AdvancedOperation2 = {
  key: string;
  type: string;
  description: string;
  name: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  memo: string;
};

export type AdvancedOperation3 = {
  key: string;
  type: string;
  name: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  memo: string;
  avatar: string;
  authority: string;
};

export type AdvancedOperation4 = {
  key: number;
  disabled?: boolean;
  href: string;
  avatar: string;
  name: string;
  owner: string;
  desc: string;
  callNo: number;
  status: string;
  updatedAt: number;
  createdAt: string;
  progress: number;
  taskId: string;
  method: string;
  version: string;
  page: Array;
  user1: string;
  user2: string;
  title: string;
  detail: string;
};

export interface AdvancedProfileData {
  advancedOperation?: AdvancedOperation[];
  advancedOperation1?: AdvancedOperation1[];
  advancedOperation2?: AdvancedOperation2[];
  advancedOperation3?: AdvancedOperation3[];
  advancedOperation4?: AdvancedOperation4[];
}

export type TableListItem = {
  key: number;
  disabled?: boolean;
  href: string;
  avatar: string;
  name: string;
  owner: string;
  desc: string;
  callNo: number;
  status: string;
  updatedAt: number;
  createdAt: string;
  progress: number;
  taskId: string;
  method: string;
  version: string;
  page: Array;
};

export type TableListPagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type TableListData = {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
};

export type TableListParams = {
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
};
