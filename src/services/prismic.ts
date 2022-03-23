import Prismic from '@prismicio/client';
import * as prismicH from '@prismicio/helpers';
import { DefaultClient } from '@prismicio/client/types/client';

export function getPrismicClient(): DefaultClient {
  const prismic = Prismic.client(process.env.PRISMIC_API_ENDPOINT, {
    accessToken: process.env.PRISMIC_API_ACCESS_TOKEN,
  });

  return prismic;
}

export { prismicH };
