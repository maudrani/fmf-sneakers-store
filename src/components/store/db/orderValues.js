const values = {
  sizes: { list: [35,36,37,38,39, 40, 41, 42, 43, 44, 45], default: 40 },
  quantity: { list: [1, 2, 3, 4, 5], default: 1 },
  qualities: {
    list: [
      { name: "Calidad Original (AAA)" },
      { name: "Originales", price: 18700 },
    ],
  },
};

values.qualities.default = values.qualities.list[0];

export { values };
