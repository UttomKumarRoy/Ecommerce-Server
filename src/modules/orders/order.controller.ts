import { Request, Response } from 'express';
import { OrderServices } from './order.service';
import orderValidationSchema from './order.validation';

const createOrder = async (req: Request, res: Response) => {
    try {
      const { order: orderData } = req.body;
      const zodParsedData = orderValidationSchema.parse(orderData);
      const result = await OrderServices.createOrderIntoDB(zodParsedData);
  
      res.status(200).json({
        success: true,
        message: 'Order created successfully!',
        data: result,  
      });
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: err.message || 'something went wrong',
        error: err,
      });
    }
  };

  const getAllOrders = async (req: Request, res: Response) => {
    try {
      let result;
      if(req.query){
        const email = req.query.email as string;
        const regex = new RegExp(email, 'i');
        result = await OrderServices.getAllOrdersFromDB(regex);
        res.status(200).json({
            success: true,
            message: 'Orders fetched successfully for user email!',
            data: result,
          });

      }else{
        result = await OrderServices.getAllOrdersFromDB(0);
        res.status(200).json({
            success: true,
            message: 'Orders fetched successfully!',
            data: result,
          });
      }

      
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: err.message || 'something went wrong',
        error: err,
      });
    }
  };


  export const OrderControllers = {
    createOrder,
    getAllOrders,
  };
