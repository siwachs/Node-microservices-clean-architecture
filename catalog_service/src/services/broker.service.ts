import { Consumer, Producer } from "kafkajs";

import { CatalogService } from "./catalog.service";
import { MessageBroker } from "../utils/broker";

export class BrokerService {
  private producer: Producer | null = null;
  private consumer: Consumer | null = null;
  private catalogService: CatalogService;

  constructor(catalogService: CatalogService) {
    this.catalogService = catalogService;
  }

  public async initlizeBroker() {
    const producer = await MessageBroker.connectProducer<Producer>();
    producer.on("producer.connect", async () => {
      console.log("Producer connected successfully");
    });

    const consumer = await MessageBroker.connectConsumer<Consumer>();
    consumer.on("consumer.connect", async () => {
      console.log("Consumer connected successfully");
    });

    await MessageBroker.subscribe(
      this.catalogService.handleBrokerMessage,
      "CatalogEvents"
    );
  }

  public async sendDeleteProductMessage(data: any) {}
}
