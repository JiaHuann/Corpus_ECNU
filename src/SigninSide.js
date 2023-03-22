import React, { useState } from 'react';
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
import { useTransition, animated, useSpring } from 'react-spring'
import OutlinedCard from './card';
import { memo } from 'react'
import './test.css'
import MyPDF from './pdf';


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
    const [show, setShow] = useState(false);
    const [word, setWord] = useState(() => {
        return props.word || undefined
    })
    const classes = useStyles();
    const handleSubmit = (event) => {
        event.preventDefault();//阻止页面默认submit跳转
        const data = new FormData(event.currentTarget);
        const payload = {
            word: data.get('word') //formdata.get webAPI
        };

        let names = window.api.getTrans(payload.word)
        setWord(names);

    };
    // const animProps = useSpring(props.transition)
    return (
        <Grid container component="main" className={classes.root}>
            {/* <button onClick={() => {
                const v = window.api.getTrans('巴');
                // console.log(v);
            }}>notice
            </button> */}
            <CssBaseline />

            <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <PageviewIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        语料库
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={handleSubmit}>
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
                        {word ? (
                            word.map(word => (
                                <Box className="animate-right-to-left" word={word.key} trans={word.value} >
                                    <OutlinedCard word={word.key} trans={word.value} />
                                </Box>
                            ))
                        ) : (null)}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
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
                {/* <Sample/> */}
                <MyPDF />
            </Grid>
        </Grid >
    )
})

export default SignInSide;