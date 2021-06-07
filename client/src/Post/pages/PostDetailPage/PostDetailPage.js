import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

//components
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
// Import Actions
import { fetchPost } from '../../PostActions';
// Import Selectors
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  contain: {
    color: theme.palette.text.primary
  },
  image: {
    width: 200, 
    height: 200, 
    backgroundColor: theme.palette.primary.main
  },
  gridList: {
    width: 500,
    height: 450,
  }
}));

export function PostDetailPage() {
  const classes = useStyles();
  const { cuid } = useParams();
  const post = useSelector(state => state.posts.data.find(currentPost => (currentPost.cuid === cuid)));
  const dispatch = useDispatch();

  useEffect(() => {
    if (!post) dispatch(fetchPost(cuid));
  }, []);

  return (post
    ?
      (<div className={`${classes.contain} container`}>
        <div className="row">
          <div className="col-12">
            <h1>{post.title}</h1>
            <p>By {post.name}</p>
            <p>{post.content}</p>
          </div>
          <div className="col-12">
            <GridList cellHeight={160} className={classes.gridList} cols={3}>
              {post.images.map((image, index) => (
                <GridListTile key={index} cols={image.cols || 1}>
                  <img src={image.url} alt={image.url} />
                </GridListTile>
              ))}
            </GridList>
          </div>
        </div>
      </div>)
    : (<div>Loading</div>)
  );
}
export default PostDetailPage;
