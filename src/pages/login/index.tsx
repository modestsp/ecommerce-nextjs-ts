import fetchJson from '@/lib/fetchJson';
import { useShopStore } from '@/lib/store';
import useUser from '@/lib/useUser';
import { useState } from 'react';
import Router from 'next/router';

const Login = () => {
  const [username, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const user = useShopStore((state) => state.user);
  console.log('USER', user);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const login = '/api/auth/login';
    try {
      const response = await fetch(login, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const currentUser = await response.json();
      if (currentUser.isLoggedIn) {
        Router.push('/shop');
      }
    } catch (e) {
      console.log(e);
    }
    // const response = await fetch(login, {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     username,
    //     password,
    //   }),
    // });
    // const final = await response.json();
    // console.log('LOGGED', final);
  };
  return (
    <div>
      <p>HELO LOGIN</p>
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
        <button>submit</button>
      </form>
    </div>
  );
};
export default Login;
