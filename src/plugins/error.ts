import { FastifyInstance } from 'fastify';
import { HttpError } from '@fastify/sensible';
import { validatorCompiler, serializerCompiler, hasZodFastifySchemaValidationErrors } from 'fastify-type-provider-zod';

export async function setupValidator(app: FastifyInstance) {
    app.setValidatorCompiler(validatorCompiler);
    app.setSerializerCompiler(serializerCompiler);

    app.setErrorHandler((error, request, reply) => {
        if (hasZodFastifySchemaValidationErrors(error)) {
            return reply.status(400).send({
                success: false,
                message: "Validation failed",
                errors: error.validation.map(err => ({
                    field: err.instancePath.replace('/', ''),
                    message: err.message
                })),
            });
        }

        if (error instanceof HttpError) {
            return reply.status(error.statusCode).send({
                success: false,
                message:  error.statusCode < 500 ? error.message : "Interne server fout"
            });
        }

        request.log.error(error);
        reply.status(500).send({
            success: false,
            message: "Interne server fout",
        });
    });
};
