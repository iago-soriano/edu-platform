export interface IPaginatedParams {
  page: number;
  pageSize?: number;
}

export interface IBaseCollection<P> {
  getOneById: (id: string) => Promise<P | undefined>;
  getFirstWhere: (args: {
    conditions: { [field: string]: any };
  }) => Promise<P | undefined>;
  getManyWhere?: (
    args: { conditions: { [field: string]: any } } & IPaginatedParams
  ) => Promise<P[] | undefined>;
  getManyByIds?: (ids: string[]) => Promise<P[]>;
  insertOne: (entity: any) => Promise<P>;
  partiallyUpdateOne: (id: string, entity: Partial<P>) => Promise<boolean>;
  insertMany: (entities: P[]) => Promise<boolean>;
}
