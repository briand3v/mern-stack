import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Lottie from 'react-lottie';
import animationData from '../../empty-posts.json';

// Import Components
import PostListItem from './PostListItem';

function PostList(props) {
  const [state] = useState({
    isStopped: false,
    isPaused: false
  });

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div className="d-flex flex-column align-items-center w-100">
      <h3 className="mt-4">Posts</h3>
      {
        props.posts.length > 0 ? (
          <>
            {
              props.posts.map(post => (
                <PostListItem
                  post={post}
                  key={post.cuid}
                  onUpload={() => props.onUpload(post.cuid)}
                  openDeleteModal={() => props.openDeleteModal(post.cuid)}
                  showPostActions={props.showPostActions}
                />
              ))
            }
          </>
        ) : (
          <>
              <Lottie options={defaultOptions}
                height={400}
                width={400}
                isStopped={state.isStopped}
                isPaused={state.isPaused} />
          </>
        )
      }
    </div>
  );
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  })).isRequired,
  onUpload: PropTypes.func.isRequired,
  openDeleteModal: PropTypes.func.isRequired,
  showPostActions: PropTypes.bool.isRequired
};

export default PostList;
