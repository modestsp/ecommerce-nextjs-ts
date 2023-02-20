const getUser = async () => {
  const response = await fetch('/api/auth/user');
  return response.json();
};

const login = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  // const response = await fetch(login, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({
  //     username,
  //     password,
  //   }),
  // });
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  console.log('RESPONSE IN LOGIN', response);
  return response.json();
};
// const response = await fetch(createReviewUrl, {
//   method: 'POST',
//   body: JSON.stringify({
//     productId,
//     description: review,
//     value: reviewValue,
//   }),
// const signUp = async () => {
//   const response = await
// }

const signUp = async ({
  name,
  username,
  password,
  email,
}: {
  name: string;
  username: string;
  password: string;
  email: string;
}) => {
  const login = 'http://localhost:3000/api/auth/signup';
  const response = await fetch('http://localhost:3000/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({
      name,
      username,
      password,
      email,
    }),
  });
  return response.json();
};

export default {
  getUser,
  login,
  signUp,
};
