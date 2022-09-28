import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const overlay = document.getElementById('modal-root');
export const Modal = ({ closeModal, children }) => {
  return createPortal(
    <div className={css.overlay} onClick={closeModal}>
      <div className={css.modal}>
        <img src={children} alt="" />
      </div>
    </div>,
    overlay
  );
};
