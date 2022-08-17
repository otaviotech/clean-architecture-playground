import { PrismaClient, Profile as PrismaProfile } from '@prisma/client';
import { PrismaFindProfileByUsernameRepository } from './findProfileByUsername';

describe('PrismaFindProfileByUsernameRepository', () => {
  let prismaClient: PrismaClient;
  let profile: PrismaProfile;
  let sut: PrismaFindProfileByUsernameRepository;

  beforeEach(async () => {
    prismaClient = new PrismaClient();
    sut = new PrismaFindProfileByUsernameRepository(prismaClient);
    profile = await prismaClient.profile.create({
      data: {
        email: 'johndoe@email.com',
        password: 'a_hashed_password',
        username: 'johndoe',
      },
    });
  });

  it('should find a profile by its username', async () => {
    const username = 'johndoe';
    const result = await sut.execute(username);

    expect(result).toBeDefined();
    expect(result.id).toBe(profile.id);
    expect(result.username).toBe(username);
    expect(result.email).toBe(profile.email);
    expect(result.password).toBe(profile.password);
  });

  it('should return null if no profile is found', async () => {
    const username = 'not_existing_username';
    const result = await sut.execute(username);
    expect(result).toBeNull();
  });
});
