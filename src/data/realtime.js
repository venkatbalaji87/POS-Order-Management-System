// simple pub/sub using BroadcastChannel (works across browser tabs)
export class Realtime {
    constructor(channel = "pos-sync") {
      this.channel = new BroadcastChannel(channel);
    }
  
    broadcast(event, payload) {
      this.channel.postMessage({ event, payload });
    }
  
    onMessage(handler) {
      this.channel.onmessage = (e) => handler(e.data);
    }
  }
  