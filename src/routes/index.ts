import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { userRoutes } from './user.route.js';

export const registerRoutes: FastifyPluginAsync = async (app: FastifyInstance) => {
    await app.register(userRoutes, { prefix: '/users' });
};
