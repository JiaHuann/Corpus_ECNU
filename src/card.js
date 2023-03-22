import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import { RenderSearchProps } from '@react-pdf-viewer/search';
import { MoonLoader } from 'react-spinners';
import Modal from 'react-modal';

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
  const [loading, setLoading] = useState(false);
  console.log(word, trans)
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  let currentKeyword = {
    keyword: Keyword,
    matchCase: false,
    wholeWords: false,
  }
  const handleShow = async () => {
    setLoading(true); // 设置loading状态
    await highlight(currentKeyword);
    setLoading(false); // 清除loading状态
    console.log(highlight(currentKeyword));
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
        <Button size="small" onClick={handleShow}>Show</Button>
        {/* 在await promise结束pending后结束modal弹窗 */}
        <Modal isOpen={loading} onRequestClose={() => setLoading(false)} style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(20px)' // 添加磨砂效果
          },
          content: {
            width: '50%',
            height: '30%',
            margin: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#fff',
            borderRadius: '15px',
            opacity: 0.8 // 添加半透明
          }
        }}>
          <MoonLoader />
          <h1>&nbsp;&nbsp;正在构建索引！</h1>
        </Modal>


        <Button size="small" onClick={() => {
          next();
        }}>Next</Button>

        <Button size="small" onClick={() => {
          previous();
        }}>Previous</Button>

      </CardActions>


    </Card>
  );
}
export default OutlinedCard;