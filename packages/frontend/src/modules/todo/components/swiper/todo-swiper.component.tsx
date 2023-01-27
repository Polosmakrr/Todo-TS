import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { ITodo } from '../../types/todo.types';
import { ItemComponent } from '../item/item.component';
import { SPACES } from '../../../theme';

export const TodoSwiperComponent = ({ todos }: { todos: ITodo[] }) => (
  <Swiper
    effect="coverflow"
    followFinger
    grabCursor
    centeredSlides
    slidesPerView="auto"
    style={{
      paddingTop: SPACES.xl,
      width: '100%',
      left: 0
    }}
  >
    {todos.map((it) => (
      <SwiperSlide key={it._id} style={{ paddingLeft: SPACES.xxl, paddingRight: SPACES.xxl }}>
        <ItemComponent todo={it} />
      </SwiperSlide>
    ))}
  </Swiper>
);
