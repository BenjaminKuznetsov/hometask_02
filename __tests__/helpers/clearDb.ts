import { DB_Collectons } from "../../src/types"
import {db} from "../../src/db/memory";

export const clearDb = async (collections: DB_Collectons[] = ["blogs", "posts"]) => {
  for (const collection of collections) {
    db[collection] = []
  }
}
