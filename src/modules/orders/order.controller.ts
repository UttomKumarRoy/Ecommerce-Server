import { Request, Response } from 'express';
import { OrderServices } from './order.service';
import orderValidationSchema from './order.validation';
import ProductModel from '../products/product.model';


const createOrder = async (req: Request, res: Response) => {
  const { productId,  quantity } = req.body;

  try{
      const product = await ProductModel.findById(productId);

      if (!product) {
        return res.status(404).json({ 
          success:false, 
          message: 'Product not found' 
        });
      }

      if (product.inventory.quantity < quantity) {
            return res.status(400).json({
              "success": false,
              "message": "Insufficient quantity available in inventory"
          });
        }

      const zodParsedData = orderValidationSchema.parse(req.body);
      const result = await OrderServices.createOrderIntoDB(zodParsedData);

      product.inventory.quantity -= quantity;
      product.inventory.inStock = product.inventory.quantity > 0;

      await product.save();

      res.status(201).json({
          success: true,
          message: 'Order created successfully!',
          data: result,  
        });
  } catch (err) {
      res.status(500).json({
          success: false,
          message: 'server error',
          error: err,
      });
   }

  };

  const getAllOrders = async (req: Request, res: Response) => {
    try {
      let result;
      if(req.query.email){
        const email = req.query.email as string;
        result = await OrderServices.getAllOrdersFromDB(email);
        res.status(200).json({
            success: true,
            message: 'Orders fetched successfully for user email!',
            data: result,
          });

      }else{
        result = await OrderServices.getAllOrdersFromDB("");
        res.status(200).json({
            success: true,
            message: 'Orders fetched successfully!',
            data: result,
          });
      }

      
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'server error',
        error: err,
      });
    }
  };


  export const OrderControllers = {
    createOrder,
    getAllOrders,
  };
