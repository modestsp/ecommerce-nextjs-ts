import { sessionOptions } from '@/lib/session';
import { withIronSessionSsr } from 'iron-session/next';

const Login = ({ user }: { user: any }) => {
  console.log('user', user);
  return <div>{user.id}</div>;
};
export default Login;

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;

    return {
      props: {
        user,
      },
    };
  },
  sessionOptions
);
