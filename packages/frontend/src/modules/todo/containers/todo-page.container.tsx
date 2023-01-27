import React, { useState, useEffect } from 'react';
import { Container, LinearProgress, Typography } from '@material-ui/core';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { Pagination } from '@mui/material';
import { useWindowWidth } from '../hooks/use-width.hook';
import { TableComponent } from '../components/table';
import { HeaderComponent } from '../components/header';
import { ListComponent } from '../components/list/list.component';
import { AddTodoComponent } from '../components/add';
import { ModalComponent } from '../../common/components/modal';
import { todoService } from '../services/todo.service';
import { QUERY_KEYS } from '../../common/consts/app-keys.const';
import { APP_KEYS } from '../../common/consts';
import { IApiError } from '../../common/types/api-errors';
import { SPACES, FONTS } from '../../theme';
import { authService } from '../../Auth/services/auth.service';
import { NavComponent } from '../components/navigation/nav.component';
import { TodoSwiperComponent } from '../components/swiper/todo-swiper.component';

export const TodoPageContainer = () => {
  const width = useWindowWidth();
  const navigate = useHistory();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState('all');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const limit = width > 1280 ? 5 : 0;

  const queryMultiple = () => {
    const { data: user } = useQuery([QUERY_KEYS.USER], () => authService.current(), {
      refetchOnMount: true,
      onError: (error: IApiError) => {
        navigate.push(APP_KEYS.ROUTER_KEYS.HOME);
        toast.error(error.message);
      }
    });
    const {
      isLoading,
      data: resp,
      refetch
    } = useQuery(
      [QUERY_KEYS.TODOS],
      async () => todoService.getAllTodo({ status, search, limit, page: currentPage }),
      {
        refetchOnMount: true,
        onError: (error: IApiError) => {
          if (error.message.includes('401')) {
            toast.error('Not Autorized!');
            return;
          }
          toast.error(error.message);
        }
      }
    );
    return {
      user,
      resp,
      isLoading,
      refetch
    };
  };

  const { isLoading, resp, refetch } = queryMultiple();

  const handleModalClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    const params = new URLSearchParams();

    if (status !== '') {
      params.append('status', status);
    } else {
      params.delete('status');
    }
    if (search !== '') {
      params.append('search', search);
    } else {
      params.delete('search');
    }
    params.append('page', String(currentPage));

    navigate.push({ search: params.toString() });

    refetch();
  }, [status, search, navigate, currentPage]);

  return (
    <Container style={{ paddingTop: SPACES.xl }}>
      <NavComponent />
      <HeaderComponent modalClick={handleModalClick} setStatus={setStatus} setSearch={setSearch} />
      <Typography style={{ textAlign: 'center', fontFamily: FONTS.FAMILIES.normal }}>
        {status.toUpperCase()} todo list
      </Typography>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <>
          {resp?.todos.length !== 0 ? (
            <Container>
              {width > 1280 && (
                <>
                  <TableComponent data={resp?.todos} />
                  <Container style={{ paddingTop: SPACES.m }}>
                    <Pagination
                      count={resp?.totalPages}
                      variant="outlined"
                      shape="rounded"
                      onChange={(e, page) => {
                        setCurrentPage(page);
                      }}
                    />
                  </Container>
                </>
              )}
              {width > 480 && width < 1280 && <TodoSwiperComponent todos={resp?.todos} />}
              {width < 480 && <ListComponent todos={resp?.todos} />}
            </Container>
          ) : (
            <Typography
              style={{
                textAlign: 'center',
                fontSize: FONTS.SIZES.l,
                fontFamily: FONTS.FAMILIES.normal,
                paddingTop: SPACES.m
              }}
            >
              To do list is empty
            </Typography>
          )}
          <ModalComponent open={isModalOpen} handleClose={handleModalClick}>
            <AddTodoComponent onClick={handleModalClick} />
          </ModalComponent>
        </>
      )}
    </Container>
  );
};
