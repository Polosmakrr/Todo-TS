import React, { useRef } from 'react';
import { Backdrop, Container } from '@material-ui/core';
import { StyledModal } from './modal.styled';

interface Props {
  open: boolean;
  handleClose: () => void;
  children: JSX.Element;
}

export const ModalComponent: React.FC<Props> = ({ open, handleClose, children }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  return (
    <StyledModal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
      container={() => rootRef.current}
    >
      <Container style={{ position: 'absolute', top: '25%' }}>{children}</Container>
    </StyledModal>
  );
};
