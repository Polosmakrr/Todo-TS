import { withStyles, createStyles, Theme } from '@material-ui/core/styles';
import { TableContainer, Table, TableRow, TableCell } from '@material-ui/core';
import { COLORS, FONTS, SPACES } from '../../../theme';

export const StyledTableContainer = withStyles(() =>
  createStyles({
    root: {
      paddingTop: SPACES.m
    }
  })
)(TableContainer);

export const StyledTable = withStyles(() =>
  createStyles({
    root: {
      border: `2px solid ${COLORS.black}`
    }
  })
)(Table);

export const StyledTableCell = withStyles(() =>
  createStyles({
    head: {
      backgroundColor: COLORS.secondary,
      color: COLORS.black,
      fontSize: FONTS.SIZES.s,
      fontFamily: FONTS.FAMILIES.normal,
      fontWeight: `${FONTS.WEIGHTS.bold}`,
      borderLeft: `2px solid ${COLORS.black}`,
      borderRight: `2px solid ${COLORS.black}`,
      paddingLeft: SPACES.s,
      paddingRight: SPACES.s,
      paddingTop: SPACES.s,
      paddingBottom: SPACES.s
    },
    body: {
      fontSize: FONTS.SIZES.s,
      fontFamily: FONTS.FAMILIES.normal,
      fontWeight: `${FONTS.WEIGHTS.normal}`,
      borderLeft: `2px solid ${COLORS.black}`,
      borderRight: `2px solid ${COLORS.black}`,
      paddingLeft: SPACES.s,
      paddingRight: SPACES.s
    }
  })
)(TableCell);

export const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover
      }
    }
  })
)(TableRow);
