export interface DataStorage {
  get: (entity: string, query: any) => Promise<void>;
  add: (entity: string, data: any) => Promise<void>;
  update: (entity: string, query: any, data: any) => Promise<void>;
  delete: (entity: string, query: any) => Promise<void>;
}
