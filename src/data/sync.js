export class SyncEngine {
    constructor(store) {
      this.store = store;
    }
  
    async sync() {
      const changes = await this.store.getAll("changeLog");
      if (!changes.length) {
        alert("Nothing to sync");
        return;
      }
      console.log("Syncing changes...", changes);
      // Simulate upload
      setTimeout(() => alert("Synced " + changes.length + " changes!"), 500);
    }
  }
  