module.exports = {
  name: 'development',
  type: 'mongodb',
  host: 'localhost',
  port: '27017',
  database: 'instanan',
  useUnifiedTopology: true,
  useNewUrlParser: true,
  'synchronize': true,
  'logging': false,
  entities: [
    'dist/**/*.entity.js',
  ],
  'migrations': [
    'src/migration/*.js',
  ],
};
