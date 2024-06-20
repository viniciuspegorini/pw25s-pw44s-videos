export interface IUserSigup {
  displayName: string;
  username: string;
  password: string;
}

export interface IUserLogin {
  username: string;
  password: string;
}

export interface ICategory {
  id?: number;
  name: string;
}

export interface IProduct {
  id?: number;
  name: string;
  price: number;
  description: string;
  category: ICategory;
}
