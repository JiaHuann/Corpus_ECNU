import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const OutlinedCardmini = (props) => {
  let { word, trans, Keyword} = props;
  console.log(word, trans)
  const classes = useStyles();
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          查询结果
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          原词：{word}
        </Typography>
        <Typography variant="h5" component="h1">
          {trans}
        </Typography>

      </CardContent>

    </Card>
  );
}
export default OutlinedCardmini;