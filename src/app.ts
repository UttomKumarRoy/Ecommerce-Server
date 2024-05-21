import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ProductRoutes } from './modules/products/product.route';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/products', ProductRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.use('*', (req: Request, res: Response)=>{
    res.json({
      "success": false,
      "message": "Route not found"
    })
})

export default app;

