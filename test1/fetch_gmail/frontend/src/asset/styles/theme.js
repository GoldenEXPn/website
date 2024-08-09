import { createTheme } from '@mui/material/styles';
import { _bp } from '../../lib/vars';
// TODO: this assumes the rem font is 16px, i should create a global variable for font size

const theme = createTheme({
  breakpoints: {
    values: {
        default: _bp.default * 16,
        xlarge: _bp.xlarge * 16,
        large: _bp.large * 16,
        medium:  _bp.medium * 16,
        small: _bp.small * 16,
        xsmall: _bp.xsmall * 16
    },
  },
});

export default theme;
