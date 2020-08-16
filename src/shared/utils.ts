import { getConnectionOptions, getConnection } from 'typeorm';
import { ConnectionOptions } from 'typeorm/connection/ConnectionOptions';
import { Connection } from 'typeorm/connection/Connection';
import { Migration } from 'typeorm/migration/Migration';

export const toPromise = <T>(data: T): Promise<T> => {
  return new Promise<T>(resolve => {
    resolve(data);
  });
};

export const getDbConnectionOptions = async (connectionName = 'default'): Promise<ConnectionOptions> => {
  const options = await getConnectionOptions(
    process.env.NODE_ENV || 'development',
  );
  return {
    ...options,
    name: connectionName,
  };
};

export const getDbConnection = async (
  connectionName = 'default'): Promise<Connection> => {
  return await getConnection(connectionName);
};

export const runDbMigrations = async (connectionName = 'default'): Promise<Migration[]> => {
  const conn = await getDbConnection(connectionName);
  return await conn.runMigrations();
};
