import { ICategory } from "@/commons/interfaces";
import { api } from "@/lib/axios";

const CATEGORIES_URL = "/categories";

const findAll = async (): Promise<any> => {
  let response;
  try {
    response = await api.get(`${CATEGORIES_URL}`);
  } catch (error: any) {
    response = error.response;
  }
  return response;
};

const remove = async (id: number): Promise<any> => {
  let response;
  try {
    response = await api.delete(`${CATEGORIES_URL}/${id}`);
  } catch (error: any) {
    response = error.response;
  }
  return response;
};

const save = async (category: ICategory): Promise<any> => {
  let response;
  try {
    response = await api.post(`${CATEGORIES_URL}`, category);
  } catch (error: any) {
    response = error.response;
  }
  return response;
};

const findById = async (id: number): Promise<any> => {
  let response;
  try {
    response = await api.get(`${CATEGORIES_URL}/${id}`);
  } catch (error: any) {
    response = error.response;
  }
  return response;
};

const CategoryService = {
  findAll,
  remove,
  save,
  findById,
};

export default CategoryService;
