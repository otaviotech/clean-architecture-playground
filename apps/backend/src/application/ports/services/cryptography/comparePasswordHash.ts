import { AsyncCommand } from '@shared/protocols';

export type ComparePasswordHashServiceInput = {
  plain: string;
  hashed: string;
};

export type IComparePasswordHashService = AsyncCommand<
  ComparePasswordHashServiceInput,
  boolean
>;
