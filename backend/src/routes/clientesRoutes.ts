import { Router } from 'express';
import { ClientesController } from '../controllers/clientesController';

const router = Router();
const clientesController = new ClientesController();

export const setClientesRoutes = (app: Router) => {
    app.get('/clientes', clientesController.getClientes.bind(clientesController));
    app.post('/clientes', clientesController.createCliente.bind(clientesController));
    app.put('/clientes/:id', clientesController.updateCliente.bind(clientesController));
    app.delete('/clientes/:id', clientesController.deleteCliente.bind(clientesController));
};