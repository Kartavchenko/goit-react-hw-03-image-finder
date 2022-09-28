import css from './Button.module.css';

export const LoadMore = ({ onLoadMore }) => {
  return (
    <button className={css.Button} type="button" onClick={onLoadMore}>
      Load More
    </button>
  );
};
