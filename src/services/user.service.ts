import { UserRepository } from "../repo/user.repository.js";
import { type IUser } from '../entities/user.entity.js';

export class UserService {
    private readonly repo: UserRepository;

    constructor({ repo }: { repo: UserRepository }) {
        this.repo = repo;
    }

    async findAll() {
        return this.repo.findAll();
    }

    async findById(id: string) {
        return this.repo.findById(id);
    }

    async create(data: Partial<IUser>) {
        return this.repo.create(data);
    }

    async update(id: string, data: Partial<IUser>) {
        const user = await this.repo.findById(id);
        if (!user) return null;

        return this.repo.update(id, data);
    }

    async deleteById(id: string) {
        const user = await this.repo.findById(id);
        if (!user) return null;
        
        await this.repo.deleteById(id);
        return user;        
    }   
}
