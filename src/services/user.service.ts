import { EntityManager } from "@mikro-orm/postgresql";
import { UserSchema, type IUser } from '../entities/user.entity.js';

export class UserService {
    private readonly em: EntityManager;

    constructor({ em }: { em: EntityManager }) {
        this.em = em;
    }

    async findAll() {
        return this.em.find(UserSchema, {});
    }

    async findById(id: string) {
        return this.em.findOne(UserSchema, { id });
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

    async update(id: string, data: Partial<IUser>) {
        const user = await this.em.findOne(UserSchema, { id });
        if (!user) {
            throw new Error('User not found');
        }

        this.em.assign(user, data);

        await this.em.flush();
        return user;
    }

    async deleteById(id: string) {
        const user = await this.em.findOne(UserSchema, { id });
        if (!user) {
            throw new Error('User not found');
        }

        this.em.remove(user);

        await this.em.flush();
    }   
}
