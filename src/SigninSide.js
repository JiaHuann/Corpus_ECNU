import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import PageviewIcon from '@material-ui/icons/PageviewOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import OutlinedCard from './card';
import { memo } from 'react'
import { Scrollbar } from 'react-scrollbars-custom';
import { Worker, Viewer } from '@react-pdf-viewer/core';

import {searchPlugin} from '@react-pdf-viewer/search';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/search/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

// Import styles
import '@react-pdf-viewer/default-layout/lib/styles/index.css';


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/JiaHuann">
                语料库
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

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

const SignInSide = memo((props) => {
    //const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const searchPluginInstance = searchPlugin();
    //const {Search} = searchPluginInstance;
    const { highlight, jumpToNextMatch, jumpToPreviousMatch } = searchPluginInstance;
    //const sreachtoolsins = RenderSearchProps;
    //const {highlight, jumpToNextMatch,jumpToPreviousMatch,currentMatch,numberOfMatches} = sreachtoolsins;

    const [word, setWord] = useState(() => {
        return props.word || undefined
    })
    const [height_window, setHeight_window] = useState(() => {
        return props.height_window || undefined
    })
    const [currentKeyword, setCurrentKeyword] = useState({
        keyword: '',
        matchCase: false,
        wholeWords: false,
    });

    const classes = useStyles();
    const handleSubmit = (event) => {
        event.preventDefault();//阻止页面默认submit跳转
        const data = new FormData(event.currentTarget);
        const payload = {
            word: data.get('word') //formdata.get webAPI
        };
        console.log(payload.word);
        let names = window.api.getTrans(payload.word);
        setWord(names);
        //setCurrentKeyword({
        //    keyword: payload.word,
        //    matchCase: false,
        //    wholeWords: false,
        //});
        //highlight(currentKeyword);
    };
    return (
        <Grid container component="main" className={classes.root} >
            {/* <button onClick={() => {
                const v = window.api.getTrans('巴');
                // console.log(v);
            }}>notice
            </button> */}
            <CssBaseline />

            <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
                <div className={classes.paper} >
                    <Avatar className={classes.avatar}>
                        <PageviewIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        语料库
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={handleSubmit} style={{ height: '700px' }}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="word"
                            label="专业词汇:"
                            type="word"
                            id="word"
                            autoComplete="current-password"
                        />
                        <Box sx={{
                            overflow: 'auto',
                            height: 400,
                        }}>
                            <Scrollbar>
                                {word ? (

                                    word.map(word => (
                                        <Box word={word.key} trans={word.value} key={word.key}>
                                            <OutlinedCard word={word.key} trans={word.value}
                                                Keyword={word.key}
                                                highlight = {highlight}
                                                next = {jumpToNextMatch}
                                                previous = {jumpToPreviousMatch}
                                                />
                                        </Box>
                                    )
                                    )
                                ) : (null)}
                            </Scrollbar>
                        </Box>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        //onClick={() => {
                        //    word?(() => {
                        //        setCurrentKeyword({
                        //            keyword: word[0].key,
                        //            matchCase: false,
                        //            wholeWords: false,
                        //        })
                        //        console.log(currentKeyword);
                        //        highlight(currentKeyword);
                        //        console.log('highlight should be ok');
                        //    }):(() => {})
                        //}}
                        >
                            查 找
                        </Button>

                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    了解更多
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"添加更多的词语"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                    <Box mt={5}>
                        <Copyright />
                    </Box>
                </div>
            </Grid>
            <Grid item xs={false} sm={4} md={8} >
                <div>
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.3.122/build/pdf.worker.min.js">

                        <div style={{ height: '1000px' }}>
                            <Viewer fileUrl="./part222.pdf" defaultScale={2} plugins={[searchPluginInstance]} />
                        </div>
                    </Worker>
                </div>
            </Grid>
        </Grid>
    )
})

export default SignInSide;