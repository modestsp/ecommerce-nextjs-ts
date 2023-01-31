import { prisma } from '@/utils/db.server';
import { useState } from 'react';

const SignUp = () => {
  const [name, setName] = useState('');
  const [username, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const login = 'http://localhost:3000/api/auth/signup';
    const response = await fetch(login, {
      method: 'POST',
      body: JSON.stringify({
        name,
        username,
        password,
        email,
      }),
    });
    const final = await response.json();
    console.log('finaliziam', final);
  };
  return (
    <div>
      <p>HELO SIGN</p>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUser(e.target.value)}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button>submit</button>
      </form>
    </div>
  );
};

// export const getServerSideProps = async ({
//   req,
//   res,
// }: {
//   req: NextApiRequest;
//   res: NextApiResponse;
// }) => {

//   const products = await prisma.product.findMany();
//   return {
//     props: {
//       products: JSON.stringify(products),
//     },
//   };
// };

export default SignUp;

// const validatePassword = async ({
//   username,
//   password,
// }: {
//   username: string;
//   password: string;
// }) => {
//   const user = await prisma.user.findUnique({
//     where: {
//       username,
//     },
//   });

//   if (!user) {
//     return false;
//   }
//   // Bcrypt compare
//   const passwordCorrect = await bcrypt.compare(password, user.password);

//   if (!passwordCorrect) {
//     return false;
//   }

//   return user;
// };
