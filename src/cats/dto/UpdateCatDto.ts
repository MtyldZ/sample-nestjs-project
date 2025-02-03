import { Cat } from '../schemas/cat.schema';

export type UpdateCatDto = {
  name?: string;
  age?: number;
  breed?: string;
  parents?: Cat[];
  children?: Cat[];
  attributes?: Record<string, any>;
};
