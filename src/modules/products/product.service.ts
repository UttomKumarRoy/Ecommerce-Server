import { Product } from './product.interface';
import  ProductModel  from './product.model';

const createProductIntoDB = async (ProductData: Product) => {
 
  const result = await ProductModel.create(ProductData);
  return result;
};

const getAllProductsFromDB = async () => {
  const result = await ProductModel.find();
  return result;
};

const getSingleProductFromDB = async (id: string) => {
  const result = await ProductModel.aggregate([{ $match: { id } }]);
  return result;
};

const deleteProductFromDB = async (id: string) => {
  const result = await ProductModel.deleteOne({ id });
  return result;
};

const updateProductFromDB=  async (id: string, data:any) => {
  const result= await ProductModel.findByIdAndUpdate(id, data, { new: true });
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  deleteProductFromDB,
  updateProductFromDB,
};