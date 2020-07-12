import { SubjectsEnum } from "./Subjects";
import { BadRequestError } from "../Errors/BadRequestError";

interface BaseTicketData {
  id: string;
  price: number;
  title: string;
  userId: string;
}

export interface TicketCreatedEvent {
  subject: SubjectsEnum.TicketCreated;
  data: BaseTicketData;
}

export interface TicketUpdatedEvent {
  subject: SubjectsEnum.TicketUpdated;
  data: BaseTicketData;
}
