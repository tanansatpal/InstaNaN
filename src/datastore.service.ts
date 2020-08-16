import { Injectable } from '@nestjs/common';
import { DataStorage } from './datastore/interfaces/data-storage.interface';
import { FileDB } from './datastore/adapters/file';

@Injectable()
export class DatastoreService {

  storages;

  constructor() {
    this.storages = {
      file: new FileDB(),
    };
  }

  getStorage(type = 'file'): DataStorage {
    return this.storages[type];
  }
}
