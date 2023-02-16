import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/utils/db.server';

export default async function getAllProductsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // const query = req.query;
    // console.log('QUERY', query);
    const products = await prisma.product.findMany({
      include: {
        category: true,
      },
    });
    return res.status(200).json(products);
  } catch (e) {
    console.log('ERROR **********', e);
  }
}
