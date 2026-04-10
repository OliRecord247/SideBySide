import { FastifyInstance } from 'fastify';
import { validatorCompiler, serializerCompiler, ZodTypeProvider } from 'fastify-type-provider-zod';
import { z, ZodError } from 'zod';

export async function setupValidator(app: FastifyInstance) {
    app.setValidatorCompiler(validatorCompiler);
    app.setSerializerCompiler(serializerCompiler);

    app.setErrorHandler((error, request, reply) => {
        if (error instanceof ZodError) {
            return reply.status(400).send({
                success: false,
                message: "Validation failed",
                errors: z.treeifyError(error),
            });
        }

        request.log.error(error);

        // reply.status(error.statusCode || 500).send({
        //     statusCode: error.statusCode || 500,
        //     message: error.message || 'Interne server fout',
        // });
    });
};
