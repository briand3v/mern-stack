import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
//components
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CardMedia from '@material-ui/core/CardMedia';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const useStyles = makeStyles(theme => ({
  card: {
    backgroundColor: theme.palette.secondary.main
  }
}));

function PostListItem({ post, openDeleteModal, onUpload, showPostActions }) {
  const classes = useStyles();
  const [image, setImage] = useState("https://i1.wp.com/angularscript.com/wp-content/uploads/2018/06/Progressively-Loading-Images-With-Blur-Effect-min.png?ssl=1");
  const postContent = post.content.length > 100 ? `${post.content.substring(0, 100)}...` : post.content;

  useEffect(() => {
    if (post.images.length > 0) {
      setImage(post.images[0].url);
    }
  }, [post]);

  return (
    <Card className="w-70 h-300-px my-4 b-radius-25 shadow-lg" style={{ backgroundColor: 'transparent' }}>
      <CardContent className="h-80 p-0">
        <CardMedia className="h-100 position-relative" image={image}>
          <Box className="overlay"></Box>
          <Box className="h-20 p-3 position-relative">
            <Typography gutterBottom variant="h5" component="h2">
              <Link to={`/posts/${post.cuid}/${post.slug}`} className="text-white" >
                {post.title}
              </Link>
            </Typography>
          </Box>

          <Box m={1} className="h-80 d-flex flex-column justify-content-end p-3 position-relative">
            <Typography component="p" className="mt-3 text-white" variant="body2">
              {postContent}
            </Typography>
            <Typography color="textSecondary" variant="body2" component="p" className="mt-3 font-italic font-weight-light text-white">
              From {post.name}
            </Typography>
          </Box>
        </CardMedia>
      </CardContent>
      <CardActions className={`h-20 ${classes.card}`}>
        {
          showPostActions && (
            <>
              <Button size="small" onClick={openDeleteModal}>
                <DeleteOutlineIcon />
              </Button>
              <Button size="small" onClick={onUpload}>
                <CloudUploadIcon />
              </Button>
            </>
          )
        }
      </CardActions>
    </Card>
  );
}

PostListItem.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  openDeleteModal: PropTypes.func.isRequired,
  showPostActions: PropTypes.bool.isRequired
};

export default PostListItem;
