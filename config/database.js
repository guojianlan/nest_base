module.exports = {
    type: 'mysql',
    host: 'localhost',
    port: process.env.DATA_PORT,
    username: 'root',
    password: '123456',
    database: 'prod_blog',
    timezone: '+08:00',
    synchronize: process.env.MYSQL_SYNCHRONIZE,
    logging: true,
    autoLoadEntities: true,
  }