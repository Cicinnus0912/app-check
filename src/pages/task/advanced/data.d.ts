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
  page: string;
  kongjian: string;
};

export interface AdvancedProfileData {
  advancedOperation?: AdvancedOperation[];
  advancedOperation1?: AdvancedOperation1[];
  advancedOperation2?: AdvancedOperation2[];
  advancedOperation3?: AdvancedOperation3[];
}
