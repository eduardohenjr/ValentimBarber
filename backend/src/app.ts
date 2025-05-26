import express from 'express';
import bodyParser from 'body-parser';
import { setClientesRoutes } from './routes/clientesRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

setClientesRoutes(app);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});