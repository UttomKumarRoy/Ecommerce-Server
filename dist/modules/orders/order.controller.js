"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderControllers = void 0;
const order_service_1 = require("./order.service");
const order_validation_1 = __importDefault(require("./order.validation"));
const product_model_1 = __importDefault(require("../products/product.model"));
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, productId, price, quantity } = req.body;
    try {
        const product = yield product_model_1.default.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }
        if (product.inventory.quantity < quantity) {
            return res.status(400).json({
                "success": false,
                "message": "Insufficient quantity available in inventory"
            });
        }
        const zodParsedData = order_validation_1.default.parse(req.body);
        const result = yield order_service_1.OrderServices.createOrderIntoDB(zodParsedData);
        product.inventory.quantity -= quantity;
        product.inventory.inStock = product.inventory.quantity > 0;
        yield product.save();
        res.status(201).json({
            success: true,
            message: 'Order created successfully!',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'something went wrong',
            error: err,
        });
    }
});
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let result;
        if (req.query.email) {
            const email = req.query.email;
            const regex = new RegExp(email, 'i');
            result = yield order_service_1.OrderServices.getAllOrdersFromDB(regex);
            res.status(200).json({
                success: true,
                message: 'Orders fetched successfully for user email!',
                data: result,
            });
        }
        else {
            result = yield order_service_1.OrderServices.getAllOrdersFromDB(0);
            res.status(200).json({
                success: true,
                message: 'Orders fetched successfully!',
                data: result,
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'something went wrong',
            error: err,
        });
    }
});
exports.OrderControllers = {
    createOrder,
    getAllOrders,
};
