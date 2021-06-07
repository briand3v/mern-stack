import { makeStyles } from '@material-ui/core/styles';

const postStyles = (theme) => ({
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
    },
    root: {
        '& > *': {
            margin: theme.spacing(1)
        }
    },
    input: {
        '& > *': {
            color: theme.palette.text.primary
        },
        '& > .Mui-focused': {
            color: theme.palette.text.primary
        }
    }
});

export default postStyles;