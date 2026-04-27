import crypto from 'node:crypto';
import { defineEntity, type InferEntity, p } from '@mikro-orm/core';

export const UserSchema = defineEntity({
    name: 'User',
    properties: {
        id: p.uuid().primary().onCreate(() => crypto.randomUUID()),
        fullname: p.string(),
        email: p.string(),
        password: p.string(),
        bio: p.text().default(''),
        createdAt: p.datetime().nullable().onCreate(() => new Date()),
        updatedAt: p.datetime().nullable().onCreate(() => new Date()).onUpdate(() => new Date()),
    },
});

export type IUser = InferEntity<typeof UserSchema>;
