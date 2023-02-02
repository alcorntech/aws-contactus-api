'use strict';

export interface IServiceBase <T> {
    getById(databaseName: String, id: Number): Promise<T>;

    getByUuid(databaseName: String, uuid: String): Promise<T>;

    getByQuery(databaseName: String, params: Object): Promise<T[]>;

    getAll(databaseName: String): Promise<T[]>;

    countByQuery(databaseName: String, params: Object): Promise<Number>;

    count(databaseName: String): Promise<Number>;

    add(databaseName: String, data: T): Promise<Number>;

    update(databaseName: String, data: T): Promise<Number>;

    delete(databaseName: String, id: Number): Promise<Boolean>;
}