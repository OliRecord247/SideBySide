import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { UserService } from '../services/user.service.js';

export const userRoutes: FastifyPluginAsync = async (app: FastifyInstance) => {
    app.get('/', async (request) => {
        const userService = request.diScope.resolve<UserService>('userService');
        const users = await userService.findAll();
        return users;
    });

    app.get('/:id', async (request) => {
        const { id } = request.params as { id: string };
        const userService = request.diScope.resolve<UserService>('userService');
        const user = await userService.findById(id);
        return user;
    }); 

    app.post('/', async (request, reply) => {
        const userService = request.diScope.resolve<UserService>('userService');
        const user = await userService.create(request.body as any);
        return reply.status(201).send({ success: true, user });
    });

    app.put("/:id", async (request, reply) => {
        const { id } = request.params as { id: string };
        const userService = request.diScope.resolve<UserService>('userService');
        const user = await userService.update(id, request.body as any);
        return reply.send({ success: true, user });
    })

    app.delete("/:id", async (request, reply) => {
        const { id } = request.params as { id: string };
        const userService = request.diScope.resolve<UserService>('userService');
        await userService.deleteById(id);
        return reply.send({ success: true });
    });
};
