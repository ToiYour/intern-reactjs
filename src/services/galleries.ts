import instance from "../config/instance";

export const getAllGalleries = () => {
  const uri = `/galleries`;
  return instance.get(uri);
};
