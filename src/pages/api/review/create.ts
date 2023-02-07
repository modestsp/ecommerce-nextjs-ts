import { sessionOptions } from '@/lib/session';
import { prisma } from '@/utils/db.server';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';

export default withIronSessionApiRoute(createReviewRoute, sessionOptions);

async function createReviewRoute(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log('REQ BODY', req.body);
    console.log('REQ SESSION', req.session);

    const { productId, description, value } = await JSON.parse(req.body);
    console.log('PRODUCTID', productId);
    console.log('DESCRIPTION', description);
    if (req.session.user) {
      const { id } = req.session.user;
      const review = await prisma.review.create({
        data: {
          userId: id,
          productId,
          description,
          value,
        },
      });
      return res.status(201).json({ review });
    } else {
      return res.status(405).json({ error: 'User is required' });
    }
  } catch (e) {
    console.log('ERROR', e);
  }
  // const user = await validatePassword({ username, password });
}
