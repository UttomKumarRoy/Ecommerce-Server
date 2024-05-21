import { Product } from './product.interface';
import  ProductModel  from './product.model';

const createProductIntoDB = async (ProductData: Product) => {
 
  const result = await ProductModel.create(ProductData);
  return result;
};

const getAllProductsFromDB = async (regex : any) => {
  let result;
  if(regex===0){
    result = await ProductModel.find();
    return result;
  }else{
    result = await ProductModel.find({$or:[{description:regex},{ name:regex}, {category:regex}, {tags:regex}]});
    return result;
  }
};

const getSingleProductFromDB = async (id: string) => {
  const result = await ProductModel.find({_id: id});
  return result;
};


const updateProductFromDB=  async (id: string, data:any) => {
  const result= await ProductModel.findByIdAndUpdate(id, data, { new: true });
  return result;
};


const deleteProductFromDB = async (id: string) => {
  const result = await ProductModel.deleteOne({ _id: id });
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductFromDB,
  deleteProductFromDB,
};