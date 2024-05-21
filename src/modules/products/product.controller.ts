import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import productValidationSchema from './product.validation';

const createProduct = async (req: Request, res: Response) => {
    try {
      const { product: productData } = req.body;
      const zodParsedData = productValidationSchema.parse(productData);
      const result = await ProductServices.createProductIntoDB(zodParsedData);
  
      res.status(200).json({
        success: true,
        message: 'Product created successfully!',
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

  const getAllProducts = async (req: Request, res: Response) => {
    try {
      const result = await ProductServices.getAllProductsFromDB();
  
      res.status(200).json({
        success: true,
        message: 'Products fetched successfully!',
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


  const getSingleProduct = async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;
  
      const result = await ProductServices.getSingleProductFromDB(productId);
  
      res.status(200).json({
        success: true,
        message: 'Product fetched successfully!',
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


  const deleteProduct = async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;
  
      const result = await ProductServices.deleteProductFromDB(productId);
  
      res.status(200).json({
        success: true,
        message: 'Product deleted successfully!',
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

  const updateProduct = async (req: Request, res: Response) => {
    try {
      const {productId}= req.params;
      const updateData  = req.body;

      const zodParsedData = productValidationSchema.parse(updateData);

      const result = await ProductServices.updateProductFromDB(productId, zodParsedData);
  
      res.status(200).json({
        success: true,
        message: 'Product updated successfully!',
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

  export const ProductControllers = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    deleteProduct,
    updateProduct,
  };