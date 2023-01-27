import { withStyles, createStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { COLORS, FONTS, SPACES } from '../../../theme';

export const StyledButton = withStyles(() =>
  createStyles({
    root: {
      fontSize: FONTS.SIZES.s,
      fontFamily: FONTS.FAMILIES.normal,
      fontWeight: FONTS.WEIGHTS.normal,
      border: `2px solid ${COLORS.black}`,
      borderRadius: 'none',
      textTransform: 'none',
      background: COLORS.white,
      boxShadow: 'box-shadow: 7px 7px 0px 19px rgba(0,0,0,1)',
      marginRight: SPACES.s,
      padding: 0
    }
  })
)(Button);
