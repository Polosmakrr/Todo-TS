import { Typography, withStyles, createStyles } from '@material-ui/core';
import styled from 'styled-components';
import { FONTS, SPACES } from '../../theme';

export const StyledTypography = withStyles(() =>
  createStyles({
    root: {
      fontSize: FONTS.SIZES.l,
      fontWeight: FONTS.WEIGHTS.bold,
      paddingBottom: SPACES.xl
    }
  })
)(Typography);

export const StyledTypographyTitle = styled(StyledTypography)`
  font-size: ${FONTS.SIZES.xxl};
  padding-bottom: ${SPACES.xxl};
  @media screen and (min-width: 480px) : {
    font-size: ${FONTS.SIZES.xxl};
  }
`;
