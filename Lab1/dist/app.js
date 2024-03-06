"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
const port = 4000;
// Set Pug as the view engine
app.set('view engine', 'pug');
app.set('views', path_1.default.join(__dirname, '..', 'public'));
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
