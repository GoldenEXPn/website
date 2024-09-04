//TODO: this is not finished
//ideas, 
// this will report as useStyles.root as a class for active rendering 

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {

    backgroundColor: 'blue',

    [theme.breakpoints.down('large')]: {
      backgroundColor: 'red',
    },

    [theme.breakpoints.down('small')]: {
        backgroundColor: 'red',
      },
  },

//   #main: {

//   }
}));

export default useStyles;