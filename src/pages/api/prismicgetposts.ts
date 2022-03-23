import type { NextApiRequest, NextApiResponse } from 'next';
import { getPrismicClient } from '../../services/prismic';
import { format } from '../../helpers/date-fns';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' });
    return;
  }

  const { page = 1 } = JSON.parse(req.body);

  const prismic = getPrismicClient();
  const postsPagination = await prismic.query('', {
    pageSize: 2,
    page,
  });

  for (let post of postsPagination.results) {
    post.first_publication_date = format(
      new Date(post.first_publication_date),
      'dd MMM yyyy'
    );
  }

  return res.json(postsPagination);
}
