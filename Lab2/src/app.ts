import { PrismaClient } from '@prisma/client';
import express from 'express';
import path from 'path';

const prisma = new PrismaClient();
const app = express();
const port = 4000;

app.use(express.urlencoded({ extended: true }));
// Set Pug as the view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '..', 'public'));

app.get('/', async (req, res) => {
  return 'Hello world';
});



app.get('/flats', async (req, res) => {
  const { sortBy } = req.query;
  let orderBy;
  if (sortBy === 'name') {
    orderBy = { name: 'asc' };
  } else if (sortBy === 'area') {
    orderBy = { area: 'asc' };
  } else if (sortBy === 'rooms') {
    orderBy = { rooms: 'asc' };
  } else if (sortBy === 'price') {
    orderBy = { price: 'asc' };
  } else {
    orderBy = { id: 'asc' }; // Default sorting by ID
  }

  const flats = await prisma.flat.findMany({
    include: { owner: true },
    orderBy
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

app.get('/create', async (req, res) => {
  res.render('add-flat');
});

app.post('/createFlat', async (req, res) => {
  const { area, rooms, price, floor, ownerId } = req.body;

  try {
    const createdFlat = await prisma.flat.create({
      data: {
        area,
        rooms: parseInt(rooms),
        price,
        floor: parseInt(floor),
        owner: {
          connect: { id: parseInt(ownerId) }
        }
      }
    });
    res.redirect('/flats');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error creating flat');
  }
});

app.get('/editFlat/:id', async (req, res) => {
  const { id } = req.params;
  const flat = await prisma.flat.findUnique({
    where: { id: parseInt(id) }
  });
  if (!flat) {
    res.status(404).send('Flat not found');
    return;
  }
  res.render('edit-flat', { flat });
});

// Endpoint to update a flat
app.post('/updateFlat/:id', async (req, res) => {
  const { id } = req.params;
  const { area, rooms, price } = req.body;

  try {
    await prisma.flat.update({
      where: { id: parseInt(id) },
      data: {
        area,
        rooms: parseInt(rooms),
        price
      }
    });
    res.redirect('/flats');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error updating flat');
  }
});

app.delete('/deleteFlat/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.flat.delete({
      where: { id: parseInt(id) }
    });
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send('Error deleting flat');
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
