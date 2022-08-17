import express from 'express';
import { container } from 'tsyringe';
import { PrismaClient } from '@prisma/client';

// External
import {
  JwtAuthTokenGenerator,
  JwtAuthTokenValidator,
} from '@external/authentication/jwt';
import { DotenvConfigRepository } from '@external/config/dotenv/repositories/config';
import {
  BcryptHasher,
  BcryptPasswordHashComparer,
} from '@external/cryptography';
import {
  PrismaFindProfileByUsernameRepository,
  PrismaFollowRepository,
  PrismaGetFollowStatusRepository,
  PrismaProfileExistsByIdRepository,
  PrismaSignUpRepository,
  PrismaUnfollowRepository,
} from '@external/database/postgres/prisma/repositories';

import { PinoLogger } from '@external/logger/pino/adapters';

// External web input builders
import { VanillaFollowInputBuilder } from '@external/web/controllers/follow/inputBuilder';
import { VanillaGetFollowStatusInputBuilder } from '@external/web/controllers/getFollowStatus/inputBuilder';
import { VanillaSignInInputBuilder } from '@external/web/controllers/signin/inputBuilder';
import { VanillaSignUpInputBuilder } from '@external/web/controllers/signup/inputBuilder';

// External web adapters
import { ExpressMiddlewareAdapter } from '@external/web/express/adapters/middleware';
import {
  ExpressRouteAdapter,
  ExpressServer,
} from '@external/web/express/adapters';

// Infra services
import {
  GenerateAuthTokenService,
  ValidateAuthTokenService,
} from '@infra/authentication/services';

// Infra config
import { AppConfigManager } from '@infra/config/configManager';

// Infra crypto
import {
  ComparePasswordHashService,
  HashPasswordService,
} from '@infra/cryptography';

// Controllers
import {
  FollowController,
  GetFollowStatusController,
  SignInController,
  SignUpController,
  UnfollowController,
} from '@infra/web/controllers';

// Presenters
import {
  SignInPresenter,
  GetFollowStatusPresenter,
} from '@infra/web/presenters';

// Middlewares
import { RequireAuthenticationMiddleware } from '@infra/web/middlewares/authentication';

// Routes
import {
  FollowRoute,
  GetFollowStatusRoute,
  SignInRoute,
  SignUpRoute,
  UnfollowRoute,
} from '@infra/web/routes';
import {
  FindProfileByUsernameUseCase,
  FollowUseCase,
  GetFollowStatusUseCase,
  SignInUseCase,
  SignUpUseCase,
  UnfollowUseCase,
} from '@application/usecases';

// External
container.register('PrismaClient', { useValue: new PrismaClient() });

// External.Authentication
container.register('IAuthTokenGenerator', { useClass: JwtAuthTokenGenerator });
container.register('IAuthTokenValidator', { useClass: JwtAuthTokenValidator });

// External.Config
container.register('IConfigRepository', { useClass: DotenvConfigRepository });

// External.Cryptography
container.register('IHashComparer', { useClass: BcryptPasswordHashComparer });
container.register('IHasher', { useClass: BcryptHasher });

// External.Database.Postgres.Prisma.Repositories
container.register('IFindProfileByUsernameRepository', {
  useClass: PrismaFindProfileByUsernameRepository,
});
container.register('IFollowRepository', { useClass: PrismaFollowRepository });
container.register('IGetFollowStatusRepository', {
  useClass: PrismaGetFollowStatusRepository,
});
container.register('IProfileExistsByIdRepository', {
  useClass: PrismaProfileExistsByIdRepository,
});
container.register('ISignUpRepository', { useClass: PrismaSignUpRepository });
container.register('IUnfollowRepository', {
  useClass: PrismaUnfollowRepository,
});

// External.Logger
container.register('ILogger', { useClass: PinoLogger });

// External.Web.Express.Adapters
container.register('ExpressMiddlewareAdapter', {
  useClass: ExpressMiddlewareAdapter,
});
container.register('ExpressRouteAdapter', { useClass: ExpressRouteAdapter });
container.register('ExpressServer', { useClass: ExpressServer });

// Infra

// Infra.Authentication.Services
container.register('IGenerateAuthTokenService', {
  useClass: GenerateAuthTokenService,
});
container.register('IValidateAuthTokenService', {
  useClass: ValidateAuthTokenService,
});

// Infra.Config
container.register('IConfigManager', { useClass: AppConfigManager });

// Infra.Cryptography
container.register('IComparePasswordHashService', {
  useClass: ComparePasswordHashService,
});
container.register('IHashPasswordService', { useClass: HashPasswordService });

// Infra.Web.Controllers
container.register('FollowController', { useClass: FollowController });
container.register('IFollowInputBuilder', {
  useClass: VanillaFollowInputBuilder,
});
container.register('GetFollowStatusController', {
  useClass: GetFollowStatusController,
});
container.register('IGetFollowStatusInputBuilder', {
  useClass: VanillaGetFollowStatusInputBuilder,
});
container.register('IGetFollowStatusPresenter', {
  useClass: GetFollowStatusPresenter,
});
container.register('SignInController', { useClass: SignInController });
container.register('ISignInInputBuilder', {
  useClass: VanillaSignInInputBuilder,
});
container.register('ISignInPresenter', { useClass: SignInPresenter });
container.register('SignUpController', { useClass: SignUpController });
container.register('ISignUpInputBuilder', {
  useClass: VanillaSignUpInputBuilder,
});
container.register('UnfollowController', { useClass: UnfollowController });

// Infra.Web.Middlewares.Authentication
container.register('RequireAuthenticationMiddleware', {
  useClass: RequireAuthenticationMiddleware,
});

container.register('FollowRoute', { useClass: FollowRoute });
container.register('GetFollowStatusRoute', { useClass: GetFollowStatusRoute });
container.register('SignInRoute', { useClass: SignInRoute });
container.register('SignUpRoute', { useClass: SignUpRoute });
container.register('UnfollowRoute', { useClass: UnfollowRoute });

// Application.UseCases
container.register('IFindProfileByUsernameUseCase', {
  useClass: FindProfileByUsernameUseCase,
});
container.register('IFollowUseCase', { useClass: FollowUseCase });
container.register('IGetFollowStatusUseCase', {
  useClass: GetFollowStatusUseCase,
});
container.register('ISignInUseCase', { useClass: SignInUseCase });
container.register('ISignUpUseCase', { useClass: SignUpUseCase });
container.register('IUnfollowUseCase', { useClass: UnfollowUseCase });

container.register('express', { useValue: express() });

container.register('APP_ROUTES', {
  useValue: [
    container.resolve('FollowRoute'),
    container.resolve('GetFollowStatusRoute'),
    container.resolve('SignInRoute'),
    container.resolve('SignUpRoute'),
    container.resolve('UnfollowRoute'),
  ],
});

export { container as appContainer };
