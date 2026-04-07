import { EntityManager } from "@mikro-orm/postgresql";
import { UserSchema, type IUser } from '../entities/user.js';

export class UserService {
    private readonly em: EntityManager;

    constructor({ em }: { em: EntityManager }) {
        this.em = em;
    }

    async create(data: Partial<IUser>) {
        const user = this.em.create(UserSchema, {
            fullname: data.fullname!,
            email: data.email!,
            password: data.password!,
            bio: data.bio ?? '',
        });

        await this.em.flush();
        return user;
    }

    async findAll() {
        return this.em.find(UserSchema, {});
    }

    async findById(id: string) {
        return this.em.findOne(UserSchema, { id });
    }

    async deleteById(id: string) {
        const user = await this.em.findOne(UserSchema, { id });
        if (!user) {
            throw new Error('User not found');
        }

        this.em.remove(user);

        await this.em.flush();
        return true;
    }   
}
