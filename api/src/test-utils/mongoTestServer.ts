import { connect, connection } from "mongoose";

class MongoTestServer {
  async connect() {
    connect("mongodb://127.0.0.1:27017/medorium-test-server");
  }

  /**
   * Removes all documents from all collections
   */
  async deleteRecords() {
    const collections = Object.keys(connection.collections);

    for (const collectionName of collections) {
      const collection = connection.collections[collectionName];
      await collection.deleteMany({});
    }
  }

  async close() {
    await connection.close();
  }
}

export default MongoTestServer;
