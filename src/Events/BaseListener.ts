import { Message, Stan } from "node-nats-streaming";
import { SubjectsEnum } from "./Subjects";

interface Event {
  subject: SubjectsEnum;
  data: any;
}
export abstract class Listener<T extends Event> {
  abstract subject: T["subject"];
  abstract qGroupName: string;
  abstract async handleMessage(
    messageData: T["data"],
    msg: Message
  ): Promise<void>;

  protected client: Stan;
  protected ackWait = 5 * 1000; // protected so subclasses can access and modify

  constructor(client: Stan) {
    this.client = client;
  }

  subscriptionOptions() {
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(this.ackWait)
      .setDurableName(this.qGroupName);
  }

  listen() {
    // set up subscription with options and queue group
    const subscription = this.client.subscribe(
      this.subject,
      this.qGroupName,
      this.subscriptionOptions()
    );

    // listen
    subscription.on("message", (msg: Message) => {
      console.log(
        `*** Base Listener Message received: ${this.subject} / ${this.qGroupName}`
      );

      const data = this.parseMessage(msg);
      this.handleMessage(data, msg);
    });
  }

  parseMessage(msg: Message): string {
    const data = msg.getData();

    // handle string and buffer data types
    return typeof data === "string"
      ? JSON.parse(data)
      : JSON.parse(data.toString("utf8"));
  }
}
