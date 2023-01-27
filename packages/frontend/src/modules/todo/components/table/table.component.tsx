import React from 'react';
import { TableBody, TableRow, TableHead, Container } from '@material-ui/core';
import { StyledTableCell, StyledTableRow, StyledTable, StyledTableContainer } from './table.styled';
import { ActionButtonComponent } from '../../../common/components/action-buttons';
import { ITodo } from '../../../common/types/todo';

export const TableComponent = ({ data }: { data?: ITodo[] }) => (
  <Container>
    <StyledTableContainer>
      <StyledTable size="small">
        <TableHead>
          <TableRow>
            <StyledTableCell style={{ width: '15%' }}>Todo Title</StyledTableCell>
            <StyledTableCell align="left" style={{ maxWidth: '50%' }}>
              Description
            </StyledTableCell>
            <StyledTableCell align="center" style={{ width: '20%' }}>
              Actions
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((it) => (
            <StyledTableRow key={it._id}>
              <StyledTableCell align="left">{it.title}</StyledTableCell>
              <StyledTableCell align="left">{it.description}</StyledTableCell>
              <StyledTableCell align="center">
                <ActionButtonComponent name="compleated" todo={it} />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </StyledTable>
    </StyledTableContainer>
  </Container>
);
