import { withStyles, createStyles } from '@material-ui/core/styles';
import { Modal } from '@material-ui/core';

export const StyledModal = withStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  })
)(Modal);
