import { SubjectsEnum } from "./Subjects";
import { BadRequestError } from "../Errors/BadRequestError";
import { OrderStatus } from "./Enums/order-status";

interface BaseTicketData {
  id: string;
  price: number;
  title: string;
  userId: string;
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
}

export interface TicketCreatedEvent {
  subject: SubjectsEnum.TicketCreated;
  data: BaseTicketData;
}

export interface TicketUpdatedEvent {
  subject: SubjectsEnum.TicketCreated;
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
