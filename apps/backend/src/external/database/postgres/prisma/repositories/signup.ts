import { PrismaClient } from '@prisma/client';
import {
  SignUpRepositoryInput,
  SignUpRepositoryOutput,
  ISignUpRepository,
} from '@application/ports/repositories';
import { PrismaProfileMapper } from '../mappers/entities/profile';

export class PrismaSignUpRepository implements ISignUpRepository {
  constructor(private prismaClient: PrismaClient) {}

  async execute(input: SignUpRepositoryInput): Promise<SignUpRepositoryOutput> {
    const { username, email, password } = input;

    const ormProfile = await this.prismaClient.profile.create({
      data: {
        username,
        password,
        email,
      },
    });

    return PrismaProfileMapper.toDomain(ormProfile);
  }
}
