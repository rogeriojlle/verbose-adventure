import styles from './header.module.scss';
import commonStyles from '../../styles/common.module.scss';
import Link from 'next/link';
import Image from 'next/image';

export function Header() {
  return (
    <header className={`${styles.component} ${commonStyles.component}`}>
      <Link href="/">
        <a className={styles.logo}>
          <Image width={600} height={100} alt={'logo'} src="/logo.svg" />
        </a>
      </Link>
      <nav>
        <a href="#">Home</a>
        <a href="#">Posts</a>
      </nav>
    </header>
  );
}
