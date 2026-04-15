import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { UserService } from '../services/user.service.js';

import { UserResponse, default as dto } from './dtos/user.dto.js';

export const userRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
    fastify.register(async (instance) => {
        const app = instance.withTypeProvider<ZodTypeProvider>();

        app.get('/', async (request) => {
            const userService = request.diScope.resolve<UserService>('userService');
            const users = await userService.findAll();
            return UserResponse.fromList(users);
        });

        app.get('/:id', async (request) => {
            const { id } = request.params as { id: string };
            const userService = request.diScope.resolve<UserService>('userService');
            const user = await userService.findById(id);
            return new UserResponse(user!);
        }); 

        app.post('/', { schema: { body: dto.schemas.CreateUserSchema } }, async (request, reply) => {
            const userService = request.diScope.resolve<UserService>('userService');
            const user = await userService.create(request.body);
            return reply.status(201).send(new UserResponse(user));
        });

        app.put("/:id", { schema: { body: dto.schemas.UpdateUserSchema } }, async (request, reply) => {
            const { id } = request.params as { id: string };
            const userService = request.diScope.resolve<UserService>('userService');
            const user = await userService.update(id, request.body);
            return reply.send(new UserResponse(user));
        })

        app.delete("/:id", async (request, reply) => {
            const { id } = request.params as { id: string };
            const userService = request.diScope.resolve<UserService>('userService');
            await userService.deleteById(id);
            return reply.send({ success: true });
        });
    }, { prefix: '/users' });
};
