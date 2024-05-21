import { Order } from './order.interface';
import  OrderModel  from './order.model';

const createOrderIntoDB = async (ProductData: Order) => {
  
  const result = await OrderModel.create(ProductData);
  return result;
};

const getAllOrdersFromDB = async (regex : any) => {
    let result;
    if(regex===0){
      result = await OrderModel.find();
      return result;
    }else{
      result = await OrderModel.find({email:regex});
      return result;
    }
  };

  
export const OrderServices = {
    createOrderIntoDB,
    getAllOrdersFromDB,
  };