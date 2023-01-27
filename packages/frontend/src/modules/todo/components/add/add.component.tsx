import React from 'react';
import { Container } from '@material-ui/core';
import { Form, Formik, FormikProps } from 'formik';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { StyledContainer, StyledSwitchContainer, Switch, Title, Text } from './add.styled';
import { ButtonComponent } from '../../../common/components/button';
import { SPACES } from '../../../theme/spaces.const';
import { ITodo } from '../../../common/types/todo';
import { InputComponent } from '../../../common/components/input/input.component';
import { todoService } from '../../services/todo.service';
import { QUERY_KEYS } from '../../../common/consts/app-keys.const';
import { IApiError } from '../../../common/types/api-errors';
import { todoValidationSchema } from '../../schema/todo-validation.schema';

interface Props {
  onClick: () => void;
  todo?: ITodo;
}

export const AddTodoComponent = ({ onClick, todo }: Props) => {
  const queryClient = useQueryClient();

  const sendTodo = useMutation({
    mutationFn: (newTodo: ITodo) => todoService.createTodo(newTodo),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.TODOS]);
      toast.success('Todo created!');
    },
    onError: (error: IApiError) => {
      toast.error(error.message);
    }
  });

  const changeTodo = useMutation({
    mutationFn: ({ newTodo, id }: { newTodo: ITodo; id: string }) =>
      todoService.updateTodo(newTodo, id),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.TODOS]);
      queryClient.invalidateQueries([`${QUERY_KEYS.TODO}${todo?._id}`]);
      toast.success('Changing saved!');
    },
    onError: (error: IApiError) => {
      toast.error(error.message);
    }
  });

  return (
    <StyledContainer>
      <Container style={{ paddingBottom: SPACES.m }}>
        <Title>Todo creator</Title>
      </Container>
      <Formik
        initialValues={{
          title: todo?.title || '',
          description: todo?.description || '',
          compleated: todo?.compleated || false,
          isprivate: todo?.isprivate || false
        }}
        validationSchema={todoValidationSchema}
        validateOnChange
        validateOnBlur
        onSubmit={(values) => {
          if (todo) {
            changeTodo.mutate({ newTodo: values, id: todo._id! });
            onClick();
            return;
          }
          sendTodo.mutate(values);
          onClick();
        }}
      >
        {(formik: FormikProps<ITodo>) => (
          <Form>
            <InputComponent name="title" label="Title" />
            <InputComponent name="description" label="Description" fullWidth multiline />
            <Container
              style={{
                paddingTop: SPACES.m,
                display: 'flex',
                alignItems: 'center',
                textAlign: 'end'
              }}
            >
              <ButtonComponent name="Save" onClick={formik.handleSubmit}>
                Save
              </ButtonComponent>
              <Container>
                <StyledSwitchContainer>
                  <Text>Compleated</Text>
                  <Switch
                    size="small"
                    id="compleated"
                    name="compleated"
                    checked={formik.values.compleated}
                    onChange={formik.handleChange}
                  />
                </StyledSwitchContainer>
                <StyledSwitchContainer>
                  <Text>Private</Text>
                  <Switch
                    size="small"
                    id="isprivate"
                    name="isprivate"
                    checked={formik.values.isprivate}
                    onChange={formik.handleChange}
                  />
                </StyledSwitchContainer>
              </Container>
            </Container>
          </Form>
        )}
      </Formik>
    </StyledContainer>
  );
};
