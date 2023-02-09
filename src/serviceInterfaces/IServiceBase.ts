'use strict';

export interface IServiceBase<T> {
  getById(databaseName: string, id: number): Promise<T>;

  getByUuid(databaseName: string, uuid: string): Promise<T>;

  getByQuery(databaseName: string, params: unknown): Promise<T[]>;

  getAll(databaseName: string): Promise<T[]>;

  countByQuery(databaseName: string, params: unknown): Promise<number>;

  count(databaseName: string): Promise<number>;

  add(databaseName: string, data: T): Promise<number>;

  update(databaseName: string, data: T): Promise<number>;

  delete(databaseName: string, id: number): Promise<boolean>;
}
