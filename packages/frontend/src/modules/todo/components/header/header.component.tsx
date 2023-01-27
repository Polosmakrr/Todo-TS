import React from 'react';
import { ButtonGroup } from '@material-ui/core';
import { StyledContainer, ActionButton, StyledInput } from './header.styled';

interface Props {
  modalClick: React.MouseEventHandler<HTMLButtonElement>;
  setStatus: (value: string) => void;
  setSearch: (value: string) => void;
}

export const HeaderComponent = ({ modalClick, setStatus, setSearch }: Props) => {
  const setStatusParam = (e: React.MouseEvent<HTMLButtonElement>) => {
    setStatus(e.currentTarget.outerText.toLowerCase());
  };

  const setSearchParam = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <StyledContainer>
      <ButtonGroup size="small">
        <ActionButton onClick={modalClick} size="small">
          Create Todo
        </ActionButton>
        <ActionButton onClick={setStatusParam} size="small">
          All
        </ActionButton>
        <ActionButton onClick={setStatusParam} size="small">
          Private
        </ActionButton>
        <ActionButton onClick={setStatusParam} size="small">
          Public
        </ActionButton>
        <ActionButton onClick={setStatusParam} size="small">
          Compleated
        </ActionButton>
        <ActionButton onClick={setStatusParam} size="small">
          MyTodo
        </ActionButton>
      </ButtonGroup>
      <StyledInput placeholder="&#128270;  Search" onChange={setSearchParam} />
    </StyledContainer>
  );
};
