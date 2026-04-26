import { FastifyInstance } from 'fastify';
import { fastifyAwilixPlugin, diContainer } from '@fastify/awilix';
import { asClass, asValue, Lifetime } from 'awilix';
import { MikroORM } from '@mikro-orm/postgresql';

export async function bootstrapDi(app: FastifyInstance, orm: MikroORM) {
    await app.register(fastifyAwilixPlugin, { disposeOnResponse: true });

    diContainer.register({
        orm: asValue(orm),
    });

    await diContainer.loadModules([
        'src/services/**/*.service.ts',
        'src/repo/**/*.repository.ts',
    ], {
        // cwd: srcPath, By default: process.cwd()
        formatName: 'camelCase',
        resolverOptions: {
            lifetime: Lifetime.SCOPED,
            register: asClass,
        },
        esModules: true,
    });

    app.addHook('onRequest', async (request) => {
        request.diScope.register({
            em: asValue(orm.em.fork()),
        });
    });
};
