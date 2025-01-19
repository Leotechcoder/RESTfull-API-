// orders.js
export const orders = [
    {
      orderId: 1,
      userId: 101,
      items: [
        { productId: 1, quantity: 2 }, // Margarita
        { productId: 4, quantity: 1 }  // Completa
      ],
      totalAmount: 3400, // En centavos (EUR: €34.00)
      status: "completed",
      orderDate: "2024-12-28T12:30:00Z"
    },
    {
      orderId: 2,
      userId: 102,
      items: [
        { productId: 2, quantity: 1 }, // Pepperoni
        { productId: 6, quantity: 3 }  // Roquefort
      ],
      totalAmount: 4800, // En centavos (EUR: €48.00)
      status: "processing",
      orderDate: "2024-12-28T15:45:00Z"
    },
    {
      orderId: 3,
      userId: 103,
      items: [
        { productId: 3, quantity: 1 }, 
        { productId: 5, quantity: 2 } 
      ],
      totalAmount: 3200,
      status: "cancelled",
      orderDate: "2024-12-27T19:15:00Z"
    }
];

  