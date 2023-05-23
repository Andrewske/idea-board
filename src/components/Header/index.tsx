import styles from './styles.module.scss';

const Header = ({ createList }: { createList: () => void }) => {
  return (
    <header className={styles.header}>
      <button
        className={styles.button}
        onClick={createList}
      >
        Add List
      </button>
    </header>
  );
};

export default Header;
