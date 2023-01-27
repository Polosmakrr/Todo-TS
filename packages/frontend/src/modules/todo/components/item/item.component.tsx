import React from 'react';
import { Container, ListItem, ListItemText, Paper } from '@material-ui/core';
import { ITodo } from '../../types/todo.types';
import { SPACES } from '../../../theme';
import { StyledTypographyTitle, StyledTypography } from './item.styled';
import { ActionButtonComponent } from '../../../common/components/action-buttons';

export const ItemComponent = ({ todo }: { todo: ITodo }) => (
  <ListItem component={Paper} key={todo._id} style={{ marginBottom: SPACES.m }}>
    <ListItemText />
    <Container style={{ paddingTop: SPACES.m, paddingBottom: SPACES.m }}>
      <StyledTypographyTitle>{todo.title}</StyledTypographyTitle>
      <StyledTypography>{todo.description}</StyledTypography>
      <ActionButtonComponent name="compleated" todo={todo} />
    </Container>
  </ListItem>
);
