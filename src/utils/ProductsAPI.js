export const categories = [
  {
    id: 1,
    name: "Coffee Beans",
    description: "A variety of coffee beans sourced from around the world.",
    image:["https://www.figma.com/design/eYEUzHPZIkn5xPOKPs8L1I/eCommerce-App-UI-Kit---Case-Study-Ecommerce-Mobile-App-UI-kit-(Community)?node-id=1-17068&t=x4BTwgzer6Trndyw-4"],
  },
  {
    id: 2,
    name: "Coffee Equipment",
    description: "Tools and machines to brew the perfect coffee.",
    image:["https://www.figma.com/design/eYEUzHPZIkn5xPOKPs8L1I/eCommerce-App-UI-Kit---Case-Study-Ecommerce-Mobile-App-UI-kit-(Community)?node-id=1-17068&t=x4BTwgzer6Trndyw-4"],

  },
  {
    id: 3,
    name: "Accessories",
    description: "Coffee mugs, tumblers, and creative tools for coffee lovers.",
    image:["https://www.figma.com/design/eYEUzHPZIkn5xPOKPs8L1I/eCommerce-App-UI-Kit---Case-Study-Ecommerce-Mobile-App-UI-kit-(Community)?node-id=1-17068&t=x4BTwgzer6Trndyw-4"],

  },
  {
    id: 4,
    name: "Instant Coffee",
    description: "Quick and easy coffee options for busy mornings.",
    image:["https://www.figma.com/design/eYEUzHPZIkn5xPOKPs8L1I/eCommerce-App-UI-Kit---Case-Study-Ecommerce-Mobile-App-UI-kit-(Community)?node-id=1-17068&t=x4BTwgzer6Trndyw-4"],
  },
  {
    id: 5,
    name: "Specialty Drinks & Snacks",
    description: "Syrups, creamers, and snacks to pair with your coffee.",
    image:["https://www.figma.com/design/eYEUzHPZIkn5xPOKPs8L1I/eCommerce-App-UI-Kit---Case-Study-Ecommerce-Mobile-App-UI-kit-(Community)?node-id=1-17068&t=x4BTwgzer6Trndyw-4"],
  },
  {
    id: 6,
    name: "Subscriptions",
    description: "Monthly coffee delivery straight to your door.",
    image:["https://www.figma.com/design/eYEUzHPZIkn5xPOKPs8L1I/eCommerce-App-UI-Kit---Case-Study-Ecommerce-Mobile-App-UI-kit-(Community)?node-id=1-17068&t=x4BTwgzer6Trndyw-4"],
  },
];

export const products = [
  // Coffee Beans
  {
    id: 1,
    title: "Ethiopian Yirgacheffe",
    description: "Premium light roast with floral and citrus notes.",
    price: 14.99,
    stock: 50,
    category_id: 1,
    images: ["https://example.com/images/ethiopian-yirgacheffe.jpg"],
  },
  {
    id: 2,
    title: "Colombian Supremo",
    description: "Medium roast with caramel and chocolate undertones.",
    price: 16.99,
    stock: 25,
    category_id: 1,
    images: ["https://example.com/images/colombian-supremo.jpg"],
  },
  {
    id: 3,
    title: "Brazilian Santos",
    description: "Smooth, mild coffee with nutty flavors.",
    price: 12.99,
    stock: 60,
    category_id: 1,
    images: ["https://example.com/images/brazilian-santos.jpg"],
  },
  {
    id: 4,
    title: "Kenyan AA",
    description: "Bold dark roast with notes of berry and wine.",
    price: 18.99,
    stock: 12,
    category_id: 1,
    images: ["https://example.com/images/kenyan-aa.jpg"],
  },

  // Coffee Equipment
  {
    id: 5,
    title: "French Press",
    description: "Classic 1L French press for rich, flavorful coffee.",
    price: 29.99,
    stock: 30,
    category_id: 2,
    images: ["https://example.com/images/french-press.jpg"],
  },
  {
    id: 6,
    title: "Espresso Machine",
    description: "Compact espresso machine with frother.",
    price: 199.99,
    stock: 20,
    category_id: 2,
    images: ["https://example.com/images/espresso-machine.jpg"],
  },
  {
    id: 7,
    title: "AeroPress",
    description: "Portable coffee maker for quick and easy brews.",
    price: 39.99,
    stock: 15,
    category_id: 2,
    images: ["https://example.com/images/aeropress.jpg"],
  },
  {
    id: 8,
    title: "Cold Brew Kit",
    description: "Complete kit for making cold brew coffee at home.",
    price: 49.99,
    stock: 20,
    category_id: 2,
    images: ["https://example.com/images/cold-brew-kit.jpg"],
  },

  // Accessories
  {
    id: 9,
    title: "Reusable Coffee Mug",
    description: "Insulated stainless steel mug for hot or cold drinks.",
    price: 19.99,
    stock: 40,
    category_id: 3,
    images: ["https://example.com/images/reusable-coffee-mug.jpg"],
  },
  {
    id: 10,
    title: "Latte Art Stencils",
    description: "Set of 12 designs for creative coffee art.",
    price: 9.99,
    stock: 35,
    category_id: 3,
    images: ["https://example.com/images/latte-art-stencils.jpg"],
  },
  {
    id: 11,
    title: "Barista Apron",
    description: "Durable apron with multiple pockets.",
    price: 24.99,
    stock: 18,
    category_id: 3,
    images: ["https://example.com/images/barista-apron.jpg"],
  },
  {
    id: 12,
    title: "Coffee Lover's Gift Set",
    description: "Includes a mug, beans, and a French press.",
    price: 79.99,
    stock: 10,
    category_id: 3,
    images: ["https://example.com/images/coffee-gift-set.jpg"],
  },

  // Instant Coffee
  {
    id: 13,
    title: "Instant Cappuccino Mix",
    description: "Creamy cappuccino in an instant.",
    price: 7.99,
    stock: 50,
    category_id: 4,
    images: ["https://example.com/images/instant-cappuccino.jpg"],
  },
  {
    id: 14,
    title: "3-in-1 Coffee Mix",
    description: "Instant coffee with sugar and creamer included.",
    price: 5.99,
    stock: 75,
    category_id: 4,
    images: ["https://example.com/images/3-in-1-coffee.jpg"],
  },

  // Specialty Drinks & Snacks
  {
    id: 15,
    title: "Vanilla Syrup",
    description: "Sweet vanilla syrup for lattes and iced coffee.",
    price: 12.99,
    stock: 40,
    category_id: 5,
    images: ["https://example.com/images/vanilla-syrup.jpg"],
  },
  {
    id: 16,
    title: "Hazelnut Creamer",
    description: "Rich hazelnut creamer for a smooth taste.",
    price: 4.99,
    stock: 60,
    category_id: 5,
    images: ["https://example.com/images/hazelnut-creamer.jpg"],
  },
  {
    id: 17,
    title: "Biscotti",
    description: "Crunchy biscotti that pairs perfectly with coffee.",
    price: 6.99,
    stock: 30,
    category_id: 5,
    images: ["https://example.com/images/biscotti.jpg"],
  },

  // Subscriptions
  {
    id: 18,
    title: "Monthly Coffee Subscription",
    description: "Fresh coffee beans delivered to your door every month.",
    price: 19.99,
    stock: 100,
    category_id: 6,
    images: ["https://example.com/images/monthly-coffee-subscription.jpg"],
  },
  {
    id: 19,
    title: "Barista Starter Kit Subscription",
    description: "Everything a budding barista needs, delivered monthly.",
    price: 49.99,
    stock: 50,
    category_id: 6,
    images: ["https://example.com/images/barista-starter-kit.jpg"],
  },
];
