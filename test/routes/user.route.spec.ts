import { describe, it, expect, vi, beforeEach } from 'vitest';
import Fastify, { type FastifyInstance } from 'fastify';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { userRoutes } from '../../src/routes/user.route.js';

describe('User Routes API', () => {
    let app: FastifyInstance;

    beforeEach(async () => {
        app = Fastify();
        app.setValidatorCompiler(validatorCompiler);
        app.setSerializerCompiler(serializerCompiler);
        app.decorateRequest('diScope', {
            getter() {
                return {
                    resolve: vi.fn().mockReturnValue({
                        create: vi.fn().mockImplementation((data) => ({
                            id: 'mocker-uuid-1234',
                            ...data,
                        })),
                        findAll: vi.fn().mockResolvedValue([]),
                        findById: vi.fn().mockResolvedValue(null),
                        update: vi.fn().mockRejectedValue(null),
                        deleteById: vi.fn().mockRejectedValue(null),
                    })
                };
            }
        });
        await app.register(userRoutes);
    })

    it('POST /users moet 201 teruggeven bij geldige data', async () => {
        const reponse = await app.inject({ method: 'POST', url: '/users/', payload: { 
            fullname: 'John Doe',
            email: "john@test.be",
            password: "abcdefghij",
            bio: "Dit is a test bio",
        }});

        expect(reponse.statusCode).toBe(201);
        expect(reponse.json()).toEqual({
            id: expect.any(String),
            fullname: 'John Doe',
            email: "john@test.be",
            bio: "Dit is a test bio",
        });
    });

    it('POST /users moet 400 teruggeven bij ongeldige data', async () => {
        const response = await app.inject({
            method: 'POST',
            url: '/users/',
            payload: {}
        });

        expect(response.statusCode).toBe(400);
    });
});