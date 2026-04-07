import { v4 } from 'uuid';
import { defineEntity, type InferEntity, p } from '@mikro-orm/core';

export const UserSchema = defineEntity({
    name: 'User',
    properties: {
        id: p.uuid().primary().onCreate(() => v4()),
        fullname: p.string(),
        email: p.string(),
        password: p.string(),
        bio: p.text().default(''),
        createdAt: p.datetime().nullable().onCreate(() => new Date()),
        updatedAt: p.datetime().nullable().onCreate(() => new Date()).onUpdate(() => new Date()),
    },
});

export type IUser = InferEntity<typeof UserSchema>;
