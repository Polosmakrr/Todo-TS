import { withStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Switch } from '@material-ui/core';
import { COLORS } from '../../../theme';

export const AntSwitch = withStyles((theme: Theme) =>
  createStyles({
    switchBase: {
      color: theme.palette.grey[500],
      '&$checked': {
        transform: 'translateX(12px)',
        color: theme.palette.common.white,
        '& + $track': {
          opacity: 1,
          backgroundColor: COLORS.switch
        }
      }
    },
    track: {
      border: `1px solid ${theme.palette.grey[500]}`,
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: theme.palette.common.white
    },
    checked: {}
  })
)(Switch);
