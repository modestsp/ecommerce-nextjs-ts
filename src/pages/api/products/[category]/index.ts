import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/utils/db.server';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('URL IN API', req.url);
  const category = req.url?.substring(req.url.lastIndexOf('/') + 1);
  try {
    const query = req.query;
    console.log('QUERY', query);
    if (category) {
      const products = await prisma.product.findMany({
        where: {
          category: {
            name: category as string,
          },
        },
      });
      return res.status(200).json(products);
    }
  } catch (e) {
    res.status(404).json({ error: 'No category were provided' });
  }
}
