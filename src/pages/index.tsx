import { GetStaticProps } from 'next';
import Link from 'next/link';
import { format } from '../helpers/date-fns';
import { useState } from 'react';

import { getPrismicClient, prismicH } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
  page: number;
}

interface HomeProps {
  postsPagination: PostPagination;
}

const formatObj = (obj: PostPagination) => {
  for (let post of obj.results) {
    post.first_publication_date = format(
      new Date(post.first_publication_date),
      'dd MMM yyyy'
    );
    return obj;
  }
};

export default function Home(props: HomeProps) {
  const postsPagination = formatObj(props.postsPagination);

  console.log(postsPagination);

  const [results, setResults] = useState(postsPagination.results);
  const [next_page, setNext_page] = useState(postsPagination.next_page);

  const handleClick = async () => {
    const res = await fetch('/api/prismicgetposts', {
      method: 'POST',
      body: JSON.stringify({ page: postsPagination.page + 1 }),
    });
    const json = formatObj(await res.json());
    setResults([...results, ...json.results]);
    setNext_page(json.next_page);
  };

  return (
    <main className={commonStyles.component}>
      {results?.map(post => {
        return (
          <article className={styles.article} key={post.uid}>
            <Link href={`/post/${post.uid}`}>
              <a>
                <h2 className={styles.articleHead}>{post.data.title}</h2>
              </a>
            </Link>
            <div className={styles.articleContent}>{post.data.subtitle}</div>
            <div className={styles.articleInfo}>
              <span>{post.first_publication_date}</span>
              <span>{post.data.author}</span>
            </div>
          </article>
        );
      })}
      {next_page ? (
        <button onClick={handleClick}>Carregar mais posts</button>
      ) : null}
    </main>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('http://localhost:3000/api/prismicgetposts', {
    method: 'POST',
    body: JSON.stringify({ page: 1 }),
  });

  const postsPagination = await res.json();

  return {
    props: { postsPagination },
  };
};
