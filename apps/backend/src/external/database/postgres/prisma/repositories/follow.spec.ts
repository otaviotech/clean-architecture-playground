import { PrismaClient, Profile as PrismaProfile } from '@prisma/client';
import { PrismaFollowRepository } from './follow';

describe('PrismaFollowRepository', () => {
  let prismaClient: PrismaClient;
  let profile1: PrismaProfile;
  let profile2: PrismaProfile;
  let sut: PrismaFollowRepository;

  beforeEach(async () => {
    prismaClient = new PrismaClient();
    sut = new PrismaFollowRepository(prismaClient);
    profile1 = await prismaClient.profile.create({
      data: {
        email: 'johndoe@email.com',
        password: 'a_hashed_password',
        username: 'johndoe',
      },
    });

    profile2 = await prismaClient.profile.create({
      data: {
        email: 'mary@email.com',
        password: 'a_hashed_password',
        username: 'mary',
      },
    });
  });

  it('should persist a profile following another', async () => {
    await sut.execute({
      followerId: profile1.id,
      followedId: profile2.id,
    });

    const follow = await prismaClient.follow.findFirst({
      where: {
        followerId: profile1.id,
        followedId: profile2.id,
      },
    });

    expect(follow.id).toBeDefined();
    expect(follow.followerId).toBe(profile1.id);
    expect(follow.followedId).toBe(profile2.id);
  });
});
