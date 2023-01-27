import { useState } from 'react';

const Login = () => {
  const [username, setUser] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const login = 'http://localhost:3000/api/login';
    const response = await fetch(login, {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const final = await response.json();
    console.log('LOGGED', final);
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
