import callApi from '../util/apiCaller';

// Export Constants
export const ADD_POST = 'ADD_POST';
export const ADD_POSTS = 'ADD_POSTS';
export const DELETE_POST = 'DELETE_POST';
export const UPLOAD_IMAGE = 'UPLOAD_IMAGE';

// Export Actions
export function addPost(post) {
  return {
    type: ADD_POST,
    post,
  };
}

export function addPostRequest(post) {
  return (dispatch) => {
    return callApi('posts', 'post', { 'Authorization': `bearer ${post.token}` }, JSON.stringify({
      post: {
        name: post.name,
        title: post.title,
        content: post.content,
      },
    })).then(res => dispatch(addPost(res.post)));
  };
}

export function addPosts(posts) {
  return {
    type: ADD_POSTS,
    posts,
  };
}

export function fetchPosts() {
  return (dispatch) => {
    return callApi('posts', 'get').then(res => {
      dispatch(addPosts(res.posts));
    });
  };
}

export function fetchPost(cuid) {
  return (dispatch) => {
    return callApi(`posts/${cuid}`).then(res => dispatch(addPost(res.post)));
  };
}

export function uploadImage(post) {
  return {
    type: UPLOAD_IMAGE,
    post
  };
}

export function uploadPostImage(cuid, data, token) {
  return (dispatch) => {
    return callApi(`posts/${cuid}`, 'post', { 'Authorization': `bearer ${token}` }, data, true)
      .then(res => {
        let data = { type: 'info', message: '' }
        if (res.status === 200) {
          data.type = 'success';
          data.message = 'Images uploaded successfully';
          dispatch(uploadImage(res.post));
        } else if (res.status === 400) {
          data.type = 'error';
          data.message = 'You are not the owner of this post';
        }
        return data;
      });
  };
}

export function deletePost(cuid) {
  return {
    type: DELETE_POST,
    cuid,
  };
}

export function deletePostRequest(cuid, token) {
  return (dispatch) => {
    return callApi(`posts/${cuid}`, 'delete', { 'Authorization': `bearer ${token}` })
      .then((res) => {
        let data = { type: 'info', message: '' }
        if (res.status === 200) {
          data.type = 'success';
          data.message = 'Post deleted successfully';
          dispatch(deletePost(cuid))
        } else if (res.status === 400) {
          data.type = 'error';
          data.message = 'You are not the owner of this post';
        }
        return data;
      });
  };
}
