import { Injectable } from '@nestjs/common';
import { DataStorage } from './interfaces/data-storage.interface';
import { FileDB } from './adapters/file';

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
