import { PrismaClient, Profile as PrismaProfile } from '@prisma/client';
import {
  SignUpRepositoryInput,
  SignUpRepositoryOutput,
  ISignUpRepository,
} from '@application/ports/repositories';

export class PrismaSignUpRepository implements ISignUpRepository {
  constructor(private prismaClient: PrismaClient) {}

  async execute(input: SignUpRepositoryInput): Promise<SignUpRepositoryOutput> {
    const { username, email, password } = input;

    const ormProfile = await this.prismaClient.profile.create({
      data: { username, password, email },
    });

    return this.mapResult(ormProfile);
  }

  private mapResult(profile: PrismaProfile): SignUpRepositoryOutput {
    return {
      id: profile.id,
      username: profile.username,
      email: profile.email,
      password: profile.password,
    };
  }
}
