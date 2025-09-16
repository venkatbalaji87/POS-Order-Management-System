import { openDB } from "idb";

export class OfflineDataStore {
  constructor(name = "pos-db") {
    this.dbPromise = openDB(name, 1, {
      upgrade(db) {
        db.createObjectStore("products", { keyPath: "id" });
        db.createObjectStore("orders", { keyPath: "id" });
        db.createObjectStore("printJobs", { keyPath: "id" });
        db.createObjectStore("changeLog", { keyPath: "opId" });
      },
    });
  }

  async put(store, value) {
    const db = await this.dbPromise;
    return db.put(store, value);
  }

  async getAll(store) {
    const db = await this.dbPromise;
    return db.getAll(store);
  }
}
