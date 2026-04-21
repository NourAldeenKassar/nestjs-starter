import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';

describe('AuthService', () => {
  let service: AuthService;
  let prisma: { user: { findUnique: jest.Mock; create: jest.Mock } };
  let jwt: { sign: jest.Mock };

  beforeEach(async () => {
    prisma = { user: { findUnique: jest.fn(), create: jest.fn() } };
    jwt = { sign: jest.fn().mockReturnValue('mock-token') };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: prisma },
        { provide: JwtService, useValue: jwt },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  describe('register', () => {
    it('should create a user and return a token', async () => {
      prisma.user.findUnique.mockResolvedValue(null);
      prisma.user.create.mockResolvedValue({ id: '1', email: 'test@test.com' });

      const result = await service.register({
        email: 'test@test.com',
        password: 'password123',
      });

      expect(result).toEqual({ access_token: 'mock-token' });
      expect(prisma.user.create).toHaveBeenCalled();
    });

    it('should throw ConflictException if email exists', async () => {
      prisma.user.findUnique.mockResolvedValue({ id: '1' });

      await expect(
        service.register({ email: 'test@test.com', password: 'password123' }),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('login', () => {
    it('should return a token for valid credentials', async () => {
      const hashed = await bcrypt.hash('password123', 10);
      prisma.user.findUnique.mockResolvedValue({
        id: '1',
        email: 'test@test.com',
        password: hashed,
      });

      const result = await service.login({
        email: 'test@test.com',
        password: 'password123',
      });

      expect(result).toEqual({ access_token: 'mock-token' });
    });

    it('should throw UnauthorizedException for invalid password', async () => {
      const hashed = await bcrypt.hash('password123', 10);
      prisma.user.findUnique.mockResolvedValue({
        id: '1',
        email: 'test@test.com',
        password: hashed,
      });

      await expect(
        service.login({ email: 'test@test.com', password: 'wrong' }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException for unknown email', async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      await expect(
        service.login({ email: 'no@test.com', password: 'password123' }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});
