import styles from './header.module.scss';
import commonStyles from '../../styles/common.module.scss';

export function Header() {
  return (
    <header className={`${styles.component} ${commonStyles.component}`}>
      <div className={styles.logo}>
        <span className={styles.icon}>{`</> `}</span>
        <span>spacetraveling.</span>
      </div>
      <nav>
        <a href="#">Home</a>
        <a href="#">Posts</a>
      </nav>
    </header>
  );
}
