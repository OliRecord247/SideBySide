import { FastifyInstance } from 'fastify';
import { fastifyAwilixPlugin, diContainer } from '@fastify/awilix';
import { asClass, asValue, Lifetime } from 'awilix';
import { MikroORM } from '@mikro-orm/postgresql';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { UserService } from '../services/user.service.js';

export async function bootstrapDi(app: FastifyInstance, orm: MikroORM) {
    await app.register(fastifyAwilixPlugin, { disposeOnResponse: true });

    diContainer.register({
        orm: asValue(orm),
        userService: asClass(UserService, { lifetime: Lifetime.SINGLETON }),
    });

    app.setValidatorCompiler(validatorCompiler);
    app.setSerializerCompiler(serializerCompiler);

    app.addHook('onRequest', async (request) => {
        request.diScope.register({
            em: asValue(orm.em.fork()),
        });
    });
};
