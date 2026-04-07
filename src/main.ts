import Fastify from 'fastify';
import { MikroORM } from '@mikro-orm/postgresql';
import { diContainer, fastifyAwilixPlugin } from '@fastify/awilix';
import { asClass, asValue, Lifetime } from 'awilix';

import { UserService } from './services/user.service.js';
import config from './mikro-orm.config.js';

// const orm = await MikroORM.init(config);
const app = Fastify({ logger: true });
const orm = await MikroORM.init(config);

async function run() {
    app.register(fastifyAwilixPlugin, {
        disposeOnClose: true,
        disposeOnResponse: true,
        strictBooleanEnforced: true
    });

    diContainer.register({
        userService: asClass(UserService, { lifetime: Lifetime.SCOPED }),
        orm: asValue(orm),
    });

    app.addHook('onRequest', async (request) => {
        const scopedEm = orm.em.fork();

        request.diScope.register({
            em: asValue(scopedEm),
        });
    });

    app.get('/users', async (request) => {
        const userService = request.diScope.resolve<UserService>('userService');
        const users = await userService.findAll();
        return users;
    });

    app.get('/users/:id', async (request) => {
        const { id } = request.params as { id: string };
        const userService = request.diScope.resolve<UserService>('userService');
        const user = await userService.findById(id);
        return user;
    });

    app.post('/users', async (request) => {
        const userService = request.diScope.resolve<UserService>('userService');
        const user = await userService.create(request.body as any);
        return { success: true, user };
    });

    app.put("/users/:id", async (request) => {
        const { id } = request.params as { id: string };
        const userService = request.diScope.resolve<UserService>('userService');
        const user = await userService.update(id, request.body as any);
        return { success: true, user };
    })

    app.delete("/users/:id", async (request) => {
        const { id } = request.params as { id: string };
        const userService = request.diScope.resolve<UserService>('userService');
        await userService.deleteById(id);
        return { success: true };
    });

    try {
        await app.listen({ port: 3000, host: '0.0.0.0' });
        console.log("🚀 Server is ready op http://localhost:3000");
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
}

await run();
