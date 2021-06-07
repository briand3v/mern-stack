import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import useToken from '../../useToken';
import Lottie from 'react-lottie';
import animationData from '../../user-profile.json';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
      '& > *': {
        margin: theme.spacing(1)
      }
  },
  text: {
    color: theme.palette.text.primary
  },
  input: {
    '& > *': {
      color: theme.palette.text.primary
    },
    '& > .Mui-focused': {
      color: theme.palette.text.primary
    }
  }
}));

const formValues = {
  name: '',
  title: '',
  content: '',
  isStopped: false,
  isPaused: false
};

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

const PostCreateWidget = ({ showAddPost, addPost }) => {
  const [state, setState] = useState(formValues);
  const user = useSelector(state => state.user.data);
  const [token] = useToken(user);
  const classes = useStyles();

  const submit = () => {
    if (state.name && state.title && state.content && token) {
      state.token = token;
      addPost(state);
      // refresh form
      setState(formValues);
    }
  };

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
        ...state,
        [evt.target.name]: value
    });
  };

  return (
    <div className={`${classes.root} d-flex flex-column my-4 w-100`}>
      {
        showAddPost ? (
          <>
            <h3>Create new post</h3>
            <TextField className={classes.input} variant="filled" label="Author name" name="name" value={state.name} onChange={handleChange} />
            <TextField className={classes.input} variant="filled" label="Post title" name="title"value={state.title} onChange={handleChange} />
            <TextField className={classes.input} variant="filled" multiline rows="4" label="Post content" name="content" value={state.content} onChange={handleChange} />
            <Button className={`mt-4 ${classes.text}`} variant="contained" color="primary" onClick={() => submit()} disabled={!state.name || !state.title || !state.content || !token}>
                Submit
            </Button>
          </>
        ) : 
        (
          <>
            <Lottie options={defaultOptions}
              height={400}
              width={400}
              isStopped={state.isStopped}
              isPaused={state.isPaused} />
          
            <div className="w-100 d-flex flex-column align-items-center justify-content-center">
              <p>Log into your account to create posts</p>
              <a className="m-1" href="/login">Log in</a>
            </div>
          </>
        )
      }
    </div>
  );
};

PostCreateWidget.propTypes = {
  showAddPost: PropTypes.bool.isRequired,
  addPost: PropTypes.func.isRequired
};

export default PostCreateWidget;
