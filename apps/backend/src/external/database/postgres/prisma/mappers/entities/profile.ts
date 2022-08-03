import { Profile as PrismaProfile } from '@prisma/client';
import { Profile } from '../../../../../../domain/entities';

export class PrismaProfileMapper {
  public static toDomain(profile: PrismaProfile): Profile {
    return {
      id: profile.id,
      username: profile.username,
      email: profile.email,
      password: profile.password,
      followers: [],
      following: [],
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt,
    };
  }
}
