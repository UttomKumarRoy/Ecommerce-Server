"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const router = express_1.default.Router();
router.post('/', product_controller_1.ProductControllers.createProduct);
router.get('/:ProductId', product_controller_1.ProductControllers.getSingleProduct);
router.delete('/:ProductId', product_controller_1.ProductControllers.deleteProduct);
router.put('/:ProductId', product_controller_1.ProductControllers.updateProduct);
router.get('/', product_controller_1.ProductControllers.getAllProducts);
exports.ProductRoutes = router;
