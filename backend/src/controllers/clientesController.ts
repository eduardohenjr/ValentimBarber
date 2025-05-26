import { Request, Response } from 'express';
import { Cliente } from '../models/cliente';

export class ClientesController {
    private clientes: Cliente[] = [];

    public getClientes(req: Request, res: Response): void {
        res.json(this.clientes);
    }

    public createCliente(req: Request, res: Response): void {
        const newCliente: Cliente = req.body;
        this.clientes.push(newCliente);
        res.status(201).json(newCliente);
    }

    public updateCliente(req: Request, res: Response): void {
        const { id } = req.params;
        const updatedData: Partial<Cliente> = req.body;
        const clienteIndex = this.clientes.findIndex(cliente => cliente.id === id);

        if (clienteIndex !== -1) {
            this.clientes[clienteIndex] = { ...this.clientes[clienteIndex], ...updatedData };
            res.json(this.clientes[clienteIndex]);
        } else {
            res.status(404).json({ message: 'Cliente not found' });
        }
    }

    public deleteCliente(req: Request, res: Response): void {
        const { id } = req.params;
        const clienteIndex = this.clientes.findIndex(cliente => cliente.id === id);

        if (clienteIndex !== -1) {
            this.clientes.splice(clienteIndex, 1);
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Cliente not found' });
        }
    }
}