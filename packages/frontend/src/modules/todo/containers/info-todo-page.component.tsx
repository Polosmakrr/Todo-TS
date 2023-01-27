import React from 'react';
import { Container, LinearProgress } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { todoService } from '../services/todo.service';
import { QUERY_KEYS } from '../../common/consts/app-keys.const';
import { APP_KEYS } from '../../common/consts';
import { InfoTodoComponent } from '../components/todo-info';
import { IApiError } from '../../common/types/api-errors';
import { SPACES } from '../../theme';
import { authService } from '../../Auth/services/auth.service';
import { NavComponent } from '../components/navigation/nav.component';

export const InfoTodoPageContainer = () => {
  const param = useParams();
  const navigate = useHistory();

  const queryMultiple = () => {
    const { data: user } = useQuery([QUERY_KEYS.USER], () => authService.current(), {
      refetchOnMount: true,
      onError: (error: IApiError) => {
        navigate.push(APP_KEYS.ROUTER_KEYS.HOME);
        if (error.message.includes('401')) {
          toast.error('Not Autorized!');
          return;
        }
        toast.error(error.message);
      }
    });
    const { isLoading, data: todo } = useQuery(
      [`${QUERY_KEYS.TODO}${param.id}`],
      () => todoService.getTodoById(param.id),
      {
        refetchOnMount: true,
        onError: (error: IApiError) => {
          toast.error(error.message);
        }
      }
    );
    return { user, todo, isLoading };
  };

  const { isLoading, todo } = queryMultiple();
  return (
    <Container style={{ paddingTop: SPACES.xl }}>
      <NavComponent />
      {isLoading ? <LinearProgress /> : <InfoTodoComponent todo={todo!} />}
    </Container>
  );
};
