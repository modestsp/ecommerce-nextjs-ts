const getProducts = async () => {
  const response = await fetch('/api/products');
  return response.json();
};

export default {
  getProducts,
};
