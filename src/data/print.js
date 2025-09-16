export class PrintJobManager {
    constructor(store) {
      this.store = store;
    }
  
    async enqueue({ destination, template, payload }) {
      const job = {
        id: crypto.randomUUID(),
        destination,
        template,
        payload,
        status: "pending",
        createdAt: Date.now(),
      };
      await this.store.put("printJobs", job);
      console.log("Queued print job:", this.render(job));
    }
  
    render(job) {
      const { template, payload } = job;
      if (template === "receipt") {
        return `
  *** CUSTOMER RECEIPT ***
  Order: ${payload.id}
  Items:
  ${payload.items.map(i => `- ${i.name} x${i.qty} = ₹${i.price * i.qty}`).join("\n")}
  Total: ₹${payload.total}
  Thank you!`;
      }
  
      if (template === "kitchen") {
        return `
  *** KITCHEN SLIP ***
  Order: ${payload.id}
  ${payload.items.map(i => `- ${i.name} x${i.qty}`).join("\n")}
  ---------------------`;
      }
  
      return JSON.stringify(payload);
    }
  }
  