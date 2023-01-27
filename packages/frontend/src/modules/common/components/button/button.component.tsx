import React from 'react';
import { StyledButton } from './button.styled';

interface Props {
  name: string;
  onClick: () => void;
  styles?: object;
  disabled?: boolean;
}
export const ButtonComponent = ({ name, onClick, styles, disabled }: Props) => (
  <StyledButton disabled={disabled} style={styles} variant="contained" onClick={onClick}>
    {name}
  </StyledButton>
);
