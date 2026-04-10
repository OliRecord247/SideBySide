import { z } from 'zod';
import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { UserService } from '../services/user.service.js';

const UserSchema = z.object({
  fullname: z.string().min(3, "Naam moet minimaal 3 tekens zijn"),
  email: z.email("Dit is geen geldig e-mailadres"),
  password: z.string().min(6, "Wachtwoord moet minimaal 6 tekens bevatten"),
  bio: z.string().optional(),
});

export const userRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
    const app = fastify.withTypeProvider<ZodTypeProvider>();

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

    app.post('/', { schema: { body: UserSchema } }, async (request, reply) => {
        const userService = request.diScope.resolve<UserService>('userService');
        const user = await userService.create(request.body);
        return reply.status(201).send({ success: true, user });
    });

    app.put("/:id", { schema: { body: UserSchema } }, async (request, reply) => {
        const { id } = request.params as { id: string };
        const userService = request.diScope.resolve<UserService>('userService');
        const user = await userService.update(id, request.body);
        return reply.send({ success: true, user });
    })

    app.delete("/:id", async (request, reply) => {
        const { id } = request.params as { id: string };
        const userService = request.diScope.resolve<UserService>('userService');
        await userService.deleteById(id);
        return reply.send({ success: true });
    });
};
