// import type { NextApiRequest, NextApiResponse } from 'next';
// import { withIronSessionApiRoute } from 'iron-session/next';
// import { sessionOptions, UserWithSession } from '@/utils/session';

// // export default async function getCurrentUser(
// //   req: NextApiRequest,
// //   res: NextApiResponse
// // ) {
// //   try {
// //     const user = req.session.get('user')

// //   } catch (e) {
// //     console.log('2222222222222222222222222');
// //     console.log('ERROR', e);
// //   }
// // }

// // export default withIronSessionApiRoute(getUserRoute, sessionOptions);

// // async function getUserRoute(req: NextApiRequest, res: NextApiResponse) {
// //   const user = req.session.user;
// //   console.log('req', req.body);
// //   if (!user) {
// //     console.log('No Hay User');
// //     return res.send({ msg: 'No user logged in' });
// //   }
// //   console.log('ENTRADO');
// //   return res.send({ user });
// // }
// export default withIronSessionApiRoute(async function userRoute(
//   req: NextApiRequest,
//   res: NextApiResponse<UserWithSession | null>
// ) {
//   console.log('req.method', req.method);
//   console.log('req', req);
//   if (req.session.user) {
//     console.log('HAYYYYYYY', req.session.user);
//     // in a real world application you might read the user id from the session and then do a database request
//     // to get more information on the user if needed
//     res.json({
//       ...req.session.user,
//       isLoggedIn: true,
//     });
//   } else {
//     res.json(null);
//   }
// },
// sessionOptions);
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { sessionOptions, UserWithSession } from '@/lib/session';

export type User = {
  isLoggedIn: boolean;
  login: string;
  avatarUrl: string;
};

export default withIronSessionApiRoute(userRoute, sessionOptions);

async function userRoute(req: NextApiRequest, res: NextApiResponse) {
  if (req.session.user) {
    // in a real world application you might read the user id from the session and then do a database request
    // to get more information on the user if needed
    return res.json({
      ...req.session.user,
      isLoggedIn: true,
    });
  } else {
    res.send(null);
  }
}
