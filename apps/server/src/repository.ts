import { ClassType } from '@deepkit/core';
import {
  Database,
  DatabaseQueryModel,
  DeleteResult,
  OrmEntity,
} from '@deepkit/orm';
import { cast, JSONEntity } from '@deepkit/type';

export function Repository<T extends OrmEntity>(entity: ClassType<T>) {
  return class BaseRepository {
    constructor(readonly database: Database) {}

    async findOne(filter: DatabaseQueryModel<T>['filter']): Promise<T> {
      return await this.database.query(entity).filter(filter).findOne();
    }

    async deleteOne(
      filter: DatabaseQueryModel<T>['filter'],
    ): Promise<DeleteResult<T>> {
      return await this.database.query(entity).filter(filter).deleteOne();
    }

    async find(filter: DatabaseQueryModel<T>['filter']): Promise<readonly T[]> {
      return await this.database.query(entity).filter(filter).find();
    }

    async create(data: Partial<JSONEntity<T>>): Promise<T> {
      const entity = cast<T>(data);
      await this.database.persist(entity);
      return entity;
    }
  };
}
