export type CreateCatDto = {
  name: string;
  age: number;
  breed: string;
  parents: [];
  children: [];
  attributes: Record<string, any>;
};
