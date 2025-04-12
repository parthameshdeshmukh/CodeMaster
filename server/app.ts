
import express from 'express';

const app = express();
app.use(express.json());

// Initial product data
let products = [
  { id: 1, name: 'Product 1', price: 100 },
  { id: 2, name: 'Product 2', price: 200 }
];

// GET all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// GET single product
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === Number(req.params.id));
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

// CREATE product
app.post('/api/products', (req, res) => {
  const { name, price } = req.body;
  const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
  const newProduct = { id: newId, name, price };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// UPDATE product
app.put('/api/products/:id', (req, res) => {
  const index = products.findIndex(p => p.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Product not found' });
  
  const { name, price } = req.body;
  products[index] = { 
    ...products[index],
    ...(name !== undefined && { name }),
    ...(price !== undefined && { price })
  };
  res.json(products[index]);
});

// DELETE product
app.delete('/api/products/:id', (req, res) => {
  const index = products.findIndex(p => p.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Product not found' });
  products.splice(index, 1);
  res.status(204).end();
});

export default app;
