import * as MongoDB from "mongodb";
import { errors } from "../error/error.constant";

export class DatabaseService {
  private static instance: DatabaseService;
  private dbClient: MongoDB.MongoClient = new MongoDB.MongoClient(
    process.env.MONGO_URI!,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  private constructor() {}

  public initalize = async (): Promise<void> => {
    try {
      await this.dbClient.connect();
      console.info("Connected to MongoDB");
    } catch (err) {
      console.error("Could not connect to MongoDB");
      console.error("MongoDBError\n%o", { error: err });
      throw errors.MONGODB_CONNECT_ERROR;
    }
  };

  public static getInstance = (): DatabaseService => {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  };

  public getCollection = async (
    collection: string
  ): Promise<MongoDB.Collection> => {
    return this.dbClient.db().collection(collection);
  };
}
