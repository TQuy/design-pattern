interface DBClient {
  connect(): void;
}

class PostgresClient implements DBClient {
  connect() {
    console.log('Connected to PostgreSQL');
  }
}

class MySQLClient implements DBClient {
  connect() {
    console.log('Connected to MySQL');
  }
}

class DBFactory {
  static createClient(type: string): DBClient {
    switch (type) {
      case "postgres": return new PostgresClient();
      case "mysql": return new MySQLClient();
      default: throw new Error("Unknown database type");
    }
  }
}

const db = DBFactory.createClient("postgres");
db.connect();