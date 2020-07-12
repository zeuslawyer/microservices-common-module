export enum OrderStatus {
  // order created, ticket not paid/reserved
  Created = "created",
  // order cancels for 3 reasons: ticket already reserved by someone else, user cancels order or order expires before payment
  Canceled = "canceled",
  AwaitingPayment = "awaiting:payment", // order has reserved ticket, and payment is not made
  Complete = "complete" // order reserved ticket + user has paid
}
