export class Money {
  constructor(private readonly cents: number) {
    if (!Number.isInteger(cents)) {
      throw new Error("O valor em centavos deve ser um número inteiro");
    }
  }

  getCents(): number {
    return this.cents;
  }

  add(other: Money): Money {
    return new Money(this.cents + other.cents);
  }

  multiply(quantity: number): Money {
    return new Money(this.cents * quantity);
  }

  percent(value: number): Money {
    return new Money(Math.round((this.cents * value) / 100));
  }
}
