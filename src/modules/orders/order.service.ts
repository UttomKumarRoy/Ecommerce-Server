import { Order } from './order.interface';
import  OrderModel  from './order.model';

const createOrderIntoDB = async (ProductData: Order) => {
  
  const result = await OrderModel.create(ProductData);
  return result;
};

const getAllOrdersFromDB = async (email : string) => {
    let result;
    if(email===""){
      result = await OrderModel.find();
      return result;
    }else{
      result = await OrderModel.find({email:email});
      return result;
    }
  };

  
export const OrderServices = {
    createOrderIntoDB,
    getAllOrdersFromDB,
  };