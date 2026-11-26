import { Money } from "./money";

export class OrderItem {
  constructor(
    public readonly productId: string,
    public readonly unitPrice: Money,
    public readonly quantity: number
  ) {}

  subtotal(): Money {
    return this.unitPrice.multiply(this.quantity);
  }
}
