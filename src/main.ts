import Fastify from 'fastify';

import { initDatabase } from './plugins/database.js';
import { registerRoutes } from './routes/index.js';
import { bootstrapDi } from './plugins/di.js';
import { setupValidator } from './plugins/error.js';

async function start() {
    const app = Fastify({ logger: true });

    try {
        const orm = await initDatabase();

        await bootstrapDi(app, orm);

        await setupValidator(app);

        await app.register(registerRoutes);

        await app.listen({ port: 3000, host: '0.0.0.0' });

        console.log("🚀 Server is ready op http://localhost:3000");
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
}

await start();
