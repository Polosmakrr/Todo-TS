import React from 'react';
import { Container } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { SwitchComponent } from '../switch';
import { ButtonComponent } from '../button';
import { todoService } from '../../../todo/services/todo.service';
import { QUERY_KEYS } from '../../consts/app-keys.const';
import { ITodo, IUser } from '../../types';
import { IApiError } from '../../types/api-errors';

export const ActionButtonComponent = ({ todo, name }: { todo: ITodo; name: string }) => {
  const navigate = useHistory();
  const queryClient = useQueryClient();
  const [user]: IUser[] = queryClient.getQueriesData([QUERY_KEYS.USER]).map((it) => it[1]);

  const deleteTodo = useMutation({
    mutationFn: (id: string) => todoService.deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.TODOS]);
      toast.success('Deleted successfully!');
    },
    onError: (error: IApiError) => {
      toast.error(error.message);
    }
  });
  const onDeleteClick = () => {
    deleteTodo.mutate(todo._id!);
  };

  const onViewClick = () => {
    navigate.push(`/todo/${todo._id}`);
  };

  return (
    <Container style={{ padding: '0' }}>
      <ButtonComponent onClick={onViewClick} name="View" />
      {user._id !== todo.owner ? (
        <>
          <ButtonComponent disabled onClick={onDeleteClick} name="Delete" />
          <SwitchComponent disabled todo={todo} name={name} />
        </>
      ) : (
        <>
          <ButtonComponent onClick={onDeleteClick} name="Delete" />
          <SwitchComponent todo={todo} name={name} />
        </>
      )}
    </Container>
  );
};
