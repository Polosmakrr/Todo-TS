import React from 'react';
import { Container, List } from '@material-ui/core';
import { ITodo } from '../../../common/types/todo';
import { SPACES } from '../../../theme/spaces.const';
import { ItemComponent } from '../item/item.component';

export const ListComponent = ({ todos }: { todos: ITodo[] }) => (
  <Container style={{ paddingBottom: SPACES.xl }}>
    <List>
      {todos.map((it) => (
        <ItemComponent key={it._id} todo={it} />
      ))}
    </List>
  </Container>
);
