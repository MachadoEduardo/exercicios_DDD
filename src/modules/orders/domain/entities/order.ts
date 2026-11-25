export type OrderItem = {
  productId: string;
  quantity: number;
};

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
}
