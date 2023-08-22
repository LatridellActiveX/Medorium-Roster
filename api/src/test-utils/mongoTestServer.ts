import { MongoMemoryServer } from "mongodb-memory-server";
import { connect, connection } from "mongoose";

class MongoTestServer {
  private mongoServer?: MongoMemoryServer;

  async connect() {
    const server = await MongoMemoryServer.create();
    const uri = server.getUri();
    connect(uri);
    this.mongoServer = server;
  }

  async dropCollections() {
    if (this.mongoServer) {
      const collections = await connection.db.collections();
      for (let collection of collections) {
        await collection.drop();
      }
    }
  }

  async drop() {
    if (this.mongoServer) {
      await connection.dropDatabase();
      await connection.close();
      await this.mongoServer.stop();
    }
  }
}

export default MongoTestServer;
