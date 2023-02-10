import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/utils/db.server';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { productId } = req.query;
  const url = req.url;
  const index = url?.lastIndexOf('/');
  if (index) {
    const test = url?.substring(index + 1);
    console.log('TEST', test);
  }
  console.log('REQ.QUERY', req.query);
  try {
    if (productId) {
      const product = await prisma.product.findUnique({
        where: {
          id: productId as string,
        },
        include: {
          reviews: true,
        },
      });
      const relatedProducts = await prisma.product.findMany({
        take: 4,
        where: {
          categoryId: product?.categoryId,
          id: {
            not: product?.id,
          },
        },
      });
      return res.status(200).json({ product, relatedProducts });
    }
  } catch (e) {
    res.status(404).json({ error: 'No category were provided' });
  }
}
