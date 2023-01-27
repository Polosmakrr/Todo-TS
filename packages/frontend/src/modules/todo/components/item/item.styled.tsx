import styled from 'styled-components';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { FONTS, SPACES } from '../../../theme';

export const StyledTypographyTitle = withStyles(() =>
  createStyles({
    root: {
      fontSize: FONTS.SIZES.l,
      fontFamily: FONTS.FAMILIES.normal,
      fontWeight: FONTS.WEIGHTS.normal,
      paddingBottom: SPACES.m
    }
  })
)(Typography);

export const StyledTypography = styled(StyledTypographyTitle)`
  font-size: ${FONTS.SIZES.s};
`;
