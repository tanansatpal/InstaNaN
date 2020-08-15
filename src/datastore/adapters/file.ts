import { AdapterSync } from 'lowdb';
import * as lowdb from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';
import { DataStorage } from '../interfaces/data-storage.interface';

export class FileDB implements DataStorage {
  db;

  constructor() {
    const adapter: AdapterSync = new FileSync('db.json', {
      defaultValue: { users: [] },
    });
    this.db = lowdb(adapter);
  }

  get(entity: string, query: any): Promise<any> {
    return this.db.get(entity)
      .value();
  }

  add(entity: string, data: any): Promise<any> {
    return this.db.get(entity)
      .push(data)
      .last()
      .assign({ _id: Date.now().toString() })
      .write();
  }

  update(entity: string, query: any, data: any): Promise<any> {
    return this.db.get(entity)
      .find(query)
      .assign(data)
      .write();
  }

  delete(entity: string, query: any): Promise<any> {
    return this.db.get(entity)
      .remove(query)
      .write();
  }
}
