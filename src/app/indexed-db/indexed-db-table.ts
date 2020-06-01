import { Injector } from '@angular/core';
import { from } from 'rxjs';
import { IndexedDbService } from './indexed-db.service';
import { uuid } from 'src/app/shared/helpers/uuid';

export class IndexedDbTable<T extends {id?: string}> {

  protected table: Dexie.Table<T, string>;
  protected db: IndexedDbService;

  constructor(
    protected injector: Injector,
    tableName: string
  ) {
    this.db = injector.get(IndexedDbService);
    this.createTable(tableName);
  }

  public add(data: T) {
    const dbData = { id: uuid(), ...data};
    return from(this.table.add(dbData));
  }

  public delete(id: string) {
    return from(this.table.delete(id));
  }

  public clear() {
    return from(this.table.clear());
  }

  public getAll() {
    return from(this.table.toArray());
  }

  private createTable(tableName: string): void {
    this.db.createTable(tableName);
    this.table = this.db.table(tableName);
  }
}
