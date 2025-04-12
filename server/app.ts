
import express from 'express';

const app = express();
app.use(express.json());

let items = [];
let id = 1;

// CREATE
app.post('/items', (req, res) => {
  const item = { id: id++, ...req.body };
  items.push(item);
  res.status(201).json(item);
});

// READ ALL
app.get('/items', (req, res) => {
  res.json(items);
});

// READ ONE
app.get('/items/:id', (req, res) => {
  const item = items.find(i => i.id === Number(req.params.id));
  if (!item) return res.status(404).json({ error: 'Item not found' });
  res.json(item);
});

// UPDATE
app.put('/items/:id', (req, res) => {
  const index = items.findIndex(i => i.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Item not found' });
  items[index] = { id: items[index].id, ...req.body };
  res.json(items[index]);
});

// DELETE
app.delete('/items/:id', (req, res) => {
  const index = items.findIndex(i => i.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Item not found' });
  const deleted = items.splice(index, 1);
  res.json(deleted[0]);
});

export default app;
