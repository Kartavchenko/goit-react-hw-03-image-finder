import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const overlay = document.getElementById('modal-root');
export const Modal = ({ objectHits }) => {
  return objectHits.map(({ largeImageURL, tags }) => {
    return createPortal(
      <div className={css.overlay}>
        <div className={css.modal}>
          {/* <img src={largeImageURL} alt={tags} /> */}
        </div>
      </div>,
      overlay
    );
  });
};
