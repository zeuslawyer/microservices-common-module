import { SubjectsEnum } from "./Subjects";
import { Message, Stan } from "node-nats-streaming";

interface Event {
  subject: SubjectsEnum;
  data: any;
}
export abstract class Publisher<T extends Event> {
  abstract subject: T["subject"];

  private client: Stan;
  protected ackWait = 5 * 1000; // protected so subclasses can access and modify

  constructor(client: Stan) {
    this.client = client;
  }

  async publish(data: T["data"]): Promise<void> {
    data = JSON.stringify(data); // stringify for nats

    return new Promise((res, rej) => {
      this.client.publish(this.subject, data, err => {
        if (err) return rej(err);

        console.log(
          `***>> Base Publisher Data published in channel ${this.subject}***`
        );
        res();
      });
    });
  }
}
