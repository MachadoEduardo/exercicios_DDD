import { Money } from "../value-objects/money";
import { OrderItem } from "../value-objects/order-item";

export type OrderStatus = "PENDING" | "SHIPPED" | "CANCELED";

export class Order {
  private status: OrderStatus = "PENDING";

  constructor(
    public readonly id: string,
    public readonly customerId: string,
    public readonly items: OrderItem[]
  ) {
    if (items.length === 0) {
      throw new Error("O pedido precisa ter pelo menos um item");
    }
  }

  cancel(): void {
    if (this.status === "SHIPPED") {
      throw new Error("Não é possível cancelar um pedido já enviado");
    }
    this.status = "CANCELED";
  }

  getStatus(): OrderStatus {
    return this.status;
  }

  total(): Money {
    let total = new Money(0);
    for (const item of this.items) {
      total = total.add(item.subtotal());
    }
    return total;
  }
}
