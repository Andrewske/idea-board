import './styles.scss';

const Header = ({ createList }: { createList: () => void }) => {
  return (
    <header className="header">
      <img
        className="icon"
        src="/icons/icons8-add-50.png"
        alt="add"
        onClick={createList}
      />
    </header>
  );
};

export default Header;