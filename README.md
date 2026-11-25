# Exercícios DDD com Node.js

Resolução dos exercícios do módulo "Estruturando Projetos Node.js com DDD" (enunciados em `Ementa_DDD_Nodejs.md`).

## Como rodar

```bash
npm install
npx tsc --noEmit
```

## Exercício 1: Linguagem ubíqua

Descrição da LionsShop: "clientes fazem pedidos de produtos do catálogo; um pedido pode ser cancelado enquanto não for enviado; clientes VIP ganham 5% de desconto".

### Glossário

| Termo do negócio | Nome no código | Tipo |
|---|---|---|
| Cliente | `Customer` | Entidade |
| Pedido | `Order` | Entidade |
| Produto | `Product` | Entidade |
| Catálogo | `Catalog` | Contexto (módulo `catalog`) |
| Item do pedido | `OrderItem` | Objeto de valor |
| Preço / valor | `Money` | Objeto de valor |
| E-mail do cliente | `Email` | Objeto de valor |
| Situação do pedido | `OrderStatus` (`PENDING`, `SHIPPED`, `CANCELED`) | Objeto de valor |
| Fazer pedido | `CreateOrder` | Caso de uso |
| Cancelar pedido | `order.cancel()` | Regra (na entidade `Order`) |
| Enviado | `SHIPPED` | Status |
| Cliente VIP | `customer.isVip` | Atributo de `Customer` |
| Desconto de 5% para VIP | `DiscountService` | Regra (serviço de domínio) |

### Classificação

- **Entidades** (têm identidade própria, mudam ao longo do tempo): `Customer`, `Order`, `Product`.
- **Objetos de valor** (definidos só pelo valor, sem id): `OrderItem`, `Money`, `Email`, `OrderStatus`.
- **Regras**:
  - um pedido só pode ser cancelado enquanto não for enviado → fica na entidade `Order`;
  - clientes VIP ganham 5% de desconto → envolve pedido e cliente, então fica em um serviço de domínio (`DiscountService`).

## Exercício 2: Primeira entidade

Arquivo: `src/modules/orders/domain/entities/order.ts`

A classe `Order` recebe `id`, `customerId` e `items` no construtor e lança um erro se a lista de itens estiver vazia, impedindo que exista um pedido inválido.

## Exercício 3: Protegendo regras na entidade

No mesmo arquivo, `Order` ganhou:

- `status` privado, começando em `PENDING`;
- `cancel()`, que lança erro se o status for `SHIPPED` e, caso contrário, muda para `CANCELED`;
- `getStatus()`, que só permite ler o status (não existe setter público).
