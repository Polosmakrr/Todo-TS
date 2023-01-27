import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { AntSwitch } from './switch.styled';
import { todoService } from '../../../todo/services/todo.service';
import { QUERY_KEYS } from '../../consts/app-keys.const';
import { ITodo } from '../../types/todo';
import { IApiError } from '../../types/api-errors';

export const SwitchComponent = ({
  todo,
  name,
  disabled
}: {
  todo: ITodo;
  name: string;
  disabled?: boolean;
}) => {
  const queryClient = useQueryClient();

  const changeCompleated = useMutation({
    mutationFn: ({ newTodo, id }: { newTodo: ITodo; id: string }) =>
      todoService.updateTodo(newTodo, id),
    onSuccess: () => {
      queryClient.invalidateQueries([`${QUERY_KEYS.TODO}${todo._id}`]);
      queryClient.invalidateQueries([QUERY_KEYS.TODOS]);
      if (!todo.compleated && name === 'compleated') {
        toast.success(`Congrats, "${todo.title}" to do is done!`);
        return;
      }
      if (todo.compleated && name === 'compleated') {
        toast.warning('Hurry up, to complete your to do!');
      }
    },
    onError: (error: IApiError) => {
      toast.error(error.message);
    }
  });

  const onSwitchClick = () => {
    if (name === 'private') {
      changeCompleated.mutate({
        newTodo: {
          title: todo.title,
          description: todo.description,
          compleated: todo.compleated,
          isprivate: !todo.isprivate
        },
        id: todo._id!
      });
      return;
    }
    changeCompleated.mutate({
      newTodo: {
        title: todo.title,
        description: todo.description,
        compleated: !todo.compleated,
        isprivate: todo.isprivate
      },
      id: todo._id!
    });
  };

  return name === 'private' ? (
    <AntSwitch disabled={disabled} checked={todo.isprivate} onClick={onSwitchClick} size="small" />
  ) : (
    <AntSwitch disabled={disabled} checked={todo.compleated} onClick={onSwitchClick} size="small" />
  );
};
