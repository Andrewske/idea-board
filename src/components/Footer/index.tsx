import styles from './styles.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <a
        href="https://github.com/Andrewske/idea-board"
        referrerPolicy="no-referrer"
        target="_blank"
      >
        <img
          className="icon"
          src="/icons/icons8-github-50.png"
          alt="visit-github-repo"
        />
      </a>
    </footer>
  );
};

export default Footer;
