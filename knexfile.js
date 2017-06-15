module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      user: "root",
      database: "findatechos"
    }
  },
  production: {
    client: "mysql",
    connection: {
      host: "production",
      user: "production",
      database: "findatechos_prod"
    }
  }
};
