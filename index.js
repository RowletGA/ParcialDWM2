import { Express } from "express";
import 'dotenv/config';
import authRoutes from './routes/authRoutes.mjs';
import verificarToken from "./src/middlewares/authMiddleware.mjs";
import jugadoresRoutes from './routes/jugadoresRoutes.mjs';
import errorHandler from "./src/middlewares/error.Middleware.mjs";

const app = new Express();
app.use(Express.json());

app.use('/auth', authRoutes);
app.use(verificarToken);
app.use('/players', jugadoresRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});