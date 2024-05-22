import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import productValidationSchema from './product.validation';

const createProduct = async (req: Request, res: Response) => {
    try {
      const zodParsedData = productValidationSchema.parse(req.body);
      const result = await ProductServices.createProductIntoDB(zodParsedData);
  
      res.status(200).json({
        success: true,
        message: 'Product created successfully!',
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

  const getAllProducts = async (req: Request, res: Response) => {
    try {
      if(req.query.searchTerm){
        const searchTerm = req.query.searchTerm as string;
        const regex = new RegExp(searchTerm);
        const result = await ProductServices.getAllProductsFromDB(regex);
        res.status(200).json({
          success: true,
          message: `Products matching search term ${regex} fetched successfully!`,
          data: result,
        });

      }else{
        const result = await ProductServices.getAllProductsFromDB(0);
        res.status(200).json({
          success: true,
          message: 'Products fetched successfully!',
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


  const getSingleProduct = async (req: Request, res: Response) => {
    try {
      const id = req.params.productId;

      const result = await ProductServices.getSingleProductFromDB(id);
  
      res.status(200).json({
        success: true,
        message: 'Product fetched successfully!',
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



  const updateProduct = async (req: Request, res: Response) => {
    try {
      const id = req.params.productId;
      const updateData  = req.body;

      const zodParsedData = productValidationSchema.parse(updateData);

      const result = await ProductServices.updateProductFromDB(id, zodParsedData);
  
      res.status(200).json({
        success: true,
        message: 'Product updated successfully!',
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

  
  const deleteProduct = async (req: Request, res: Response) => {
    try {
      const id = req.params.productId;
  
      const result = await ProductServices.deleteProductFromDB(id);
  
      res.status(200).json({
        success: true,
        message: 'Product deleted successfully!',
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

  export const ProductControllers = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
  };