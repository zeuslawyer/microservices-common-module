import { SubjectsEnum } from "./Subjects";
import { OrderStatus } from "./Enums/order-status";

interface BaseTicketData {
  id: string;
  price: number;
  title: string;
  userId: string;
  version: number;
  orderId?: string;
}
interface BaseOrderData {
  id: string;
  userId: string;
  ticket: {
    id: string;
    price: number;
  };
  status: OrderStatus;
  expiresAt: string; // as will be JSON string when serialized
  version: number;
}

export interface TicketCreatedEvent {
  subject: SubjectsEnum.TicketCreated;
  data: BaseTicketData;
}

export interface TicketUpdatedEvent {
  subject: SubjectsEnum.TicketUpdated;
  data: BaseTicketData;
}

export interface OrderCreatedEvent {
  subject: SubjectsEnum.OrderCreated;
  data: BaseOrderData;
}

export interface OrderCanceledEvent {
  subject: SubjectsEnum.OrderCanceled;
  data: BaseOrderData;
}

export interface OrderExpiredEvent {
  subject: SubjectsEnum.OrderExpired;
  data: {
    orderId: string;
  };
}

export interface PaymentCreatedEvent {
  subject: SubjectsEnum.PaymentCreated;
  data: {
    id: string;
    orderId: string;
    stripeId: string;
  };
}
