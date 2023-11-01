import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import SearchSidebar from './SearchSidebar';
import Grid from '@material-ui/core/Grid';
import MyPDF from './Mypdf';


const useStyles = makeStyles((theme) => ({
  root: {
      height: '100vh',
  },
  image: {
      backgroundImage: 'url(https://source.unsplash.com/random)',
      backgroundRepeat: 'no-repeat',
      backgroundColor:
          theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
  },
  paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
  },
  avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,

  },
  form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
  },
  submit: {
      margin: theme.spacing(3, 0, 2),
  },
}));
const ClassicPage = (props) => {

  const classes = useStyles();
  const {searchPluginInstance} = props;
  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={12} sm={12} md={6}>
          <SearchSidebar searchPluginInstance={searchPluginInstance} />
      </Grid>

      <Grid item xs={12} sm={12} md={5}>
          <MyPDF searchPluginInstance={searchPluginInstance} />
      </Grid>
    </Grid>
  );
};

export default ClassicPage;
