import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/utils/db.server';

export default async function getAllProductsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const search = req.query.search;
    if (search) {
      const products = await prisma.product.findMany({
        where: {
          OR: [
            {
              name: {
                contains: search as string,
              },
            },
            {
              tags: {
                hasSome: search,
              },
            },
          ],
        },
      });
      return res.status(200).json(products);
    }
  } catch (e) {
    console.log('ERROR **********', e);
  }
}
