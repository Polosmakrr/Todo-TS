import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Paper } from '@material-ui/core';
import { useQueryClient } from 'react-query';
import { SwitchComponent } from '../../../common/components/switch';
import { Title, Text, StyledContainerSwithers } from './info-todo.styled';
import { ButtonComponent } from '../../../common/components/button';
import { ITodo, IUser } from '../../../common/types';
import { ModalComponent } from '../../../common/components/modal';
import { AddTodoComponent } from '../add';
import { SPACES } from '../../../theme/spaces.const';
import { QUERY_KEYS } from '../../../common/consts/app-keys.const';

export const InfoTodoComponent = ({ todo }: { todo: ITodo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useHistory();
  const queryClient = useQueryClient();
  const [user]: IUser[] = queryClient.getQueriesData([QUERY_KEYS.USER]).map((it) => it[1]);

  const goBack = () => {
    navigate.goBack();
  };

  const handleModalClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <Container component={Paper} style={{ padding: SPACES.xl }}>
      <Title variant="h1"> {todo.title}</Title>
      <Text style={{ paddingBottom: SPACES.m }}>{todo.description}</Text>
      <Container style={{ paddingBottom: SPACES.m }}>
        <StyledContainerSwithers>
          <Text>Compleated:</Text>
          {user._id !== todo.owner ? (
            <SwitchComponent disabled todo={todo} name="compleated" />
          ) : (
            <SwitchComponent todo={todo} name="compleated" />
          )}
        </StyledContainerSwithers>
        <StyledContainerSwithers>
          <Text>Private:</Text>
          {user._id !== todo.owner ? (
            <SwitchComponent disabled todo={todo} name="private" />
          ) : (
            <SwitchComponent todo={todo} name="private" />
          )}
        </StyledContainerSwithers>
      </Container>
      <ButtonComponent name="Go back" onClick={goBack} />
      {user._id !== todo.owner ? (
        <ButtonComponent disabled name="Edit" onClick={handleModalClick} />
      ) : (
        <ButtonComponent name="Edit" onClick={handleModalClick} />
      )}
      <ModalComponent open={isModalOpen} handleClose={handleModalClick}>
        <AddTodoComponent onClick={handleModalClick} todo={todo} />
      </ModalComponent>
    </Container>
  );
};
