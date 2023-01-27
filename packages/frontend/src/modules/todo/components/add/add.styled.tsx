import styled from 'styled-components';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { FONTS, COLORS, SPACES } from '../../../theme';
import { AntSwitch } from '../../../common/components/switch/switch.styled';
import { StyledTypographyTitle } from '../item/item.styled';

export const StyledContainer = withStyles(() =>
  createStyles({
    root: {
      padding: SPACES.l,
      maxWidth: '600px',
      background: COLORS.white
    }
  })
)(Container);

export const Title = styled(StyledTypographyTitle)``;
export const Text = styled(StyledTypographyTitle)`
  font-size: ${FONTS.SIZES.s};
`;

export const StyledSwitchContainer = withStyles(() =>
  createStyles({
    root: {
      displat: 'flex',
      flexDirection: 'column',
      padding: '0'
    }
  })
)(Container);

export const Switch = styled(AntSwitch)``;
