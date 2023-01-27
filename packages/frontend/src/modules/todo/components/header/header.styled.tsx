import styled from 'styled-components';
import { Container, createStyles, withStyles, InputBase } from '@material-ui/core';
import { FONTS, SPACES } from '../../../theme';
import { StyledButton } from '../../../common/components/button/button.styled';

export const StyledContainer = withStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column-reverse',
      paddingTop: SPACES.m,
      paddingBottom: SPACES.m,
      '@media screen and (min-width: 768px)': {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: SPACES.l
      }
    }
  })
)(Container);

export const ActionButton = styled(StyledButton)`
  margin: 0;
  padding-left: ${SPACES.s};
  padding-right: ${SPACES.s};
`;

export const StyledInput = withStyles(() =>
  createStyles({
    root: {
      paddingLeft: SPACES.m,
      paddingRight: SPACES.m,
      fontSize: FONTS.SIZES.s,
      fontFamily: FONTS.FAMILIES.normal,
      fontWeight: FONTS.WEIGHTS.normal,
      border: '2px solid black',
      '@media screen and (max-width: 767px)': {
        width: '40%',
        marginBottom: SPACES.m
      }
    }
  })
)(InputBase);
