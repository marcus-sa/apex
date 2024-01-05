import { ClassType } from '@deepkit/core';
import {
  cast,
  ChangesInterface,
  DeepPartial,
  JSONPartial,
} from '@deepkit/type';
import {
  Database,
  DatabaseQueryModel,
  DeleteResult,
  OrmEntity,
  PatchResult,
} from '@deepkit/orm';

export function Repository<T extends OrmEntity>(entity: ClassType<T>) {
  return class BaseRepository {
    constructor(protected readonly database: Database) {}

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

    async update(
      filter: DatabaseQueryModel<T>['filter'],
      changes: ChangesInterface<T> | DeepPartial<T>,
    ): Promise<PatchResult<T>> {
      return await this.database.query(entity).filter(filter).patchOne(changes);
    }

    async create(data: JSONPartial<T>): Promise<T> {
      const entity = cast<T>(data);
      await this.database.persist(entity);
      return entity;
    }
  };
}
