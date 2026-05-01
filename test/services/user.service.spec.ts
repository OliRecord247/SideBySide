import { describe, it, expect, vi, beforeEach } from 'vitest';
import { UserService } from '../../src/services/user.service.js';

describe('UserService', () => {
    let userService: UserService;
    let userRepositoryMock: any;

    beforeEach(() => {
        userRepositoryMock = {
            findAll: vi.fn(),
            findById: vi.fn(),
            create: vi.fn(),
            update: vi.fn(),
            deleteById: vi.fn(),
        };

        userService = new UserService({
            userRepository: userRepositoryMock,
        });
    });

    it('should return all users', async () => {
        const mockUsers = [{ id: '1', name: 'John Doe' }];
        userRepositoryMock.findAll.mockResolvedValue(mockUsers);

        const result = await userService.findAll();

        expect(result).toEqual(mockUsers);
        expect(userRepositoryMock.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return a user by id', async () => {
        const mockUser = { id: '1', name: 'John Doe' };
        userRepositoryMock.findById.mockResolvedValue(mockUser);

        const result = await userService.findById('1');

        expect(result).toBe(mockUser);
        expect(userRepositoryMock.findById).toHaveBeenCalledWith('1');
    });

    it('should return null when user is not found', async () => {
        userRepositoryMock.findById.mockResolvedValue(null);

        const result = await userService.findById('non-existent');

        expect(result).toBeNull();
    });

    it('update() moet null teruggeven als de gebruiker niet bestaat', async () => {
        userRepositoryMock.findById.mockResolvedValue(null);

        const result = await userService.update('123', { fullname: 'New Name' });

        expect(result).toBeNull();
        expect(userRepositoryMock.update).not.toHaveBeenCalled();
    });

    it('dele', async () => {
        const mockUser = { id: '123', fullname: 'John' };
        userRepositoryMock.findById.mockResolvedValue(mockUser);

        const result = await userService.deleteById('123');

        expect(result).toEqual(mockUser);
        expect(userRepositoryMock.deleteById).toHaveBeenCalledWith('123');
    });
});
