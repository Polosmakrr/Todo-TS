import styled from 'styled-components';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { FONTS } from '../../../theme';
import { StyledTypographyTitle } from '../item/item.styled';

export const StyledContainerSwithers = withStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  })
)(Container);

export const Title = styled(StyledTypographyTitle)``;

export const Text = styled(StyledTypographyTitle)`
  font-size: ${FONTS.SIZES.s};
  padding: 0;
`;
