import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { validatorCompiler, serializerCompiler, hasZodFastifySchemaValidationErrors } from 'fastify-type-provider-zod';

export async function setupValidator(app: FastifyInstance) {
    app.setValidatorCompiler(validatorCompiler);
    app.setSerializerCompiler(serializerCompiler);

    app.setErrorHandler((error, request, reply) => {
        if (hasZodFastifySchemaValidationErrors(error)) {
            console.log(error);
            return reply.status(400).send({
                success: false,
                message: "Validation failed",
                errors: error.validation.map(err => ({
                    field: err.instancePath.replace('/', ''),
                    message: err.message
                })),
            });
        }

        request.log.error(error);

        // reply.status(error.statusCode || 500).send({
        //     statusCode: error.statusCode || 500,
        //     message: error.message || 'Interne server fout',
        // });

        reply.status(500).send({
            success: false,
            message: "Interne server fout",
        });
    });
};
