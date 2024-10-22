import { db } from "../../src/db"
import { DB_Collectons } from "../../src/types"

export const clearDb = async (collections: DB_Collectons[] = ["blogs", "posts"]) => {
  for (const collection of collections) {
    db[collection] = []
  }
}
