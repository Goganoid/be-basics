import { PrismaClient } from '@prisma/client';
import express from 'express';
import path from 'path';

const prisma = new PrismaClient();
const app = express();
const port = 4000;

// Set Pug as the view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '..', 'public'));

app.get('/', async (req, res) => {
  return 'Hello world';
});

app.get('/flats', async (req, res) => {
  const flats = await prisma.flat.findMany({
    include: { owner: true }
  });
  res.render('flat', { flats });
});

app.get('/owner/:id', async (req, res) => {
  const { id } = req.params;
  const owner = await prisma.owner.findFirst({
    where: { id: +id }
  });
  res.render('owner', owner);
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
