import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useToken from '../../../useToken';
import { makeStyles } from '@material-ui/core/styles';
// Import Components
import PostList from '../../components/PostList';
import PostCreateWidget from '../../components/PostCreateWidget';
import AlertMessage from '../../../Alert/components/AlertMessage';
import Modal from '@material-ui/core/Modal';
import ImageUpload from '../../components/ImageUpload';
// Import Actions
import { addPostRequest, deletePostRequest, fetchPosts } from '../../PostActions';
import Logo from '../../../logo.svg';
import { showAlertAction } from '../../../Alert/AlertActions';
import { uploadPostImage } from '../../PostActions';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    height: 150,
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.secondary.main,
    padding: theme.spacing(2, 4, 3),
    borderRadius: 10
  },
  upload: {
    position: 'absolute',
    width: 400,
    height: 180,
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  uploadImageWrapper: {
    color: theme.palette.text.primary
  },
  container: {
    color: theme.palette.text.primary
  },
  text: {
    color: theme.palette.text.primary
  }
}));

const getModalStyle = () =>  {
  const top = 40;
  const left = 35;

  return {
    top: `${top}%`,
    left: `${left}%`
  };
}

const PostListPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.data);
  const user = useSelector(state => state.user.data);
  const [token] = useToken(user);
  const alert = useSelector(state => state.alert);
  const [modalStyle] = React.useState(getModalStyle);

  const [state, setState] = useState({ 
    open: false, 
    modalType: 'upload', 
    currentPost: null, 
    post: null,
    showAddPost: false
  });

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  useEffect(() => {
    if (token) {
      setState({
        ...state,
        showAddPost: true
      })
    } else {
      setState({
        ...state,
        showAddPost: false
      })
    }
  }, [token]);

  const onDrop = (data) => {
    let formData = new FormData();
    for(const image of data) {
      formData.append('file', image.file);
      formData.append('name', image.name);
    }
    if (formData && state.post) {
      dispatch(uploadPostImage(state.post, formData, token))
        .then((res) => {
          let alert = { alertType: res.type, message: res.message };
          dispatch(showAlertAction(alert));
        })
    }
  }

  const uploadContent = (
    <div style={modalStyle} className={classes.upload}>
      <ImageUpload onDrop={onDrop} uploadWrapper={classes.uploadImageWrapper} textClass={classes.text} />
    </div>
  );

  const deletePost = () => {
    if (state.currentPost) { // eslint-disable-line
      dispatch(deletePostRequest(state.currentPost, token))
        .then((res) => {
          dispatch(showAlertAction({
            alertType: res.type,
            message: res.message
          }));
          handleClose();
        });
    }
  };

  const deleteContent = (
    <div style={modalStyle} className={classes.paper}>
      <div className="h-100">
        <div className="h-50 d-flex justify-content-center align-items-center">
          <p id="simple-modal-description m-0">
            Are you sure want to delete this post ?
          </p>
        </div>
        <div className="h-50 d-flex align-items-end">
          <div className="w-100 text-right">
            <a onClick={deletePost} className="text-danger">
                Confirm
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  const body = () => {
    const target = {
      delete: deleteContent,
      upload: uploadContent
    };
    return target[state.modalType];
  };

  const openDeleteModal = post => {
    setState({ ...state, modalType: 'delete', open: true, currentPost: post });
  };

  const handleAddPost = (post) => {
    dispatch(addPostRequest(post));
  };

  const handleOpenModal = (cuid) => setState({ ...state, modalType: 'upload', open: true, post: cuid });
  const handleClose = () => setState({ ...state, open: false });

  return (
    <div className={`container ${classes.container}`}>
      <div className="row">
        <div className="col-12 d-flex align-items-center">
          <img className="mx-3" src={Logo} alt="Logo" style={{ height: '72px'}}/>
          <h1 className="mt-4">
             Alaya Blog
          </h1>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-6 position-fixed">
          <PostCreateWidget addPost={handleAddPost} showAddPost={state.showAddPost} />
        </div>
        <div className="col-6 d-flex justify-content-center offset-md-7">
          <PostList openDeleteModal={openDeleteModal} posts={posts} onUpload={handleOpenModal} showPostActions={state.showAddPost} />
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <AlertMessage data={alert} />
      </div>
      <Modal
        open={state.open}
        onClose={handleClose}
        onChange={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        { 
          body()
        }
      </Modal>
    </div>
  );
};

export default PostListPage;
