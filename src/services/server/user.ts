const getUser = async () => {
  const response = await fetch('/api/auth/user');
  return response.json();
};

export default {
  getUser,
};
