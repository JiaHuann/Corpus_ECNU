import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import { RenderSearchProps } from '@react-pdf-viewer/search';

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

const OutlinedCard = (props) => {
  let { word, trans, Keyword, highlight, next, previous } = props;
  console.log(word, trans)
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  let currentKeyword = {
    keyword: Keyword,
    matchCase: false,
    wholeWords: false,
  }
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
        {/* <Typography variant="body2" component="p">
          DDDDD
          <br />
          {'EEEEEEE'}
        </Typography> */}
      </CardContent>
      {/*    <div>
                <Search>
                    {renderSearchProps => {
                        renderSearchProps.setKeyword(Keyword);
                        renderSearchProps.matchCase = false;
                        renderSearchProps.wholeWords = false;
                        const [readyToSearch, setReadyToSearch] = React.useState(false);
                    return ( */}
      <CardActions>
        <Button size="small" onClick={() => {
          //console.log('click show');
          //console.log(currentKeyword);
          highlight(currentKeyword);
          //setReadyToSearch(true);
          //renderSearchProps.Search();
        }}>Show</Button>
        {/*} {readyToSearch && renderSearchProps.numberOfMatches > 0 && (*/}

        <Button size="small" onClick={() => {
          next();
        }}>Next</Button>
        <Button size="small" onClick={() => {
          previous();
        }}>Previous</Button>
        {/*<Button size='small'>
                                            {renderSearchProps.currentMatch} / {renderSearchProps.numberOfMatches}
                                    </Button>*/}


        {/*{readyToSearch && renderSearchProps.numberOfMatches === 0 && (
                                    <>
                                        <Button size="small">
                                            No matches
                                        </Button>
                                    </>
                                )}*/}

      </CardActions>


    </Card>
  );
}
export default OutlinedCard;