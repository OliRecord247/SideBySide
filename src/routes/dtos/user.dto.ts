import { z } from 'zod';

import { IUser } from '../../entities/user.entity.js'

const CreateUserSchema = z.object({
  fullname: z.string().min(3, "Naam moet minimaal 3 tekens zijn"),
  email: z.email("Dit is geen geldig e-mailadres"),
  password: z.string().min(6, "Wachtwoord moet minimaal 6 tekens bevatten"),
  bio: z.string().optional(),
});

const UpdateUserSchema = CreateUserSchema.partial();

export type CreateUserRequest = z.infer<typeof CreateUserSchema>;
export type UpdateUserRequest = z.infer<typeof UpdateUserSchema>;

export class UserResponse {
    id: string;
    fullname: string;
    email: string;
    bio: string;

    constructor(entity: IUser) {
        this.id = entity.id;
        this.fullname = entity.fullname;
        this.email = entity.email;
        this.bio = entity.bio;
    }

    static fromList(entities: IUser[]): UserResponse[] {
        return entities.map(entity => new UserResponse(entity));
    }
};

export default {
    schemas: {
        CreateUserSchema,
        UpdateUserSchema,
    },
};
