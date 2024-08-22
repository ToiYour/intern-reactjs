/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from "../config/instance";

export const getAllTag = () => {
  const uri = `/posts/tags`;
  return instance.get(uri);
};
export const addNewPosts = (payload: any) => {
  const uri = `/posts`;
  return instance.post(uri, payload);
};
export const updatePosts = (id: string, payload: any) => {
  const uri = `/posts/${id}`;
  return instance.patch(uri, payload);
};
export const getAllPosts = (query?: string) => {
  const uri = `/posts${query}`;
  return instance.get(uri);
};
export const deletePostById = (id: string) => {
  const uri = `/posts/${id}`;
  return instance.delete(uri);
};
