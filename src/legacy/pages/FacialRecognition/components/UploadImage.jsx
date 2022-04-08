import React, { useCallback, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Button, IconButton, Paper, TextField } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import ClearIcon from '@mui/icons-material/Clear';

const PREFIX = 'UploadImage';

const classes = {
  root: `${PREFIX}-root`,
  inputBox: `${PREFIX}-inputBox`,
  input: `${PREFIX}-input`,
  btn: `${PREFIX}-btn`,
  imgPreviewWrapper: `${PREFIX}-imgPreviewWrapper`,
  imgPreviewDiv: `${PREFIX}-imgPreviewDiv`,
  imgPreview: `${PREFIX}-imgPreview`,
  closeImgBtn: `${PREFIX}-closeImgBtn`,
  fileBrowser: `${PREFIX}-fileBrowser`
};

const Root = styled('div')((
  {
    theme
  }
) => ({
  [`&.${classes.root}`]: {},

  [`& .${classes.inputBox}`]: {
    display: 'flex',
  },

  [`& .${classes.input}`]: {
    marginRight: theme.spacing(2),
  },

  [`& .${classes.btn}`]: {
    margin: theme.spacing(2, 1, 2, 1),
    minWidth: '100px',
  },

  [`& .${classes.imgPreviewWrapper}`]: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '5%',
  },

  [`& .${classes.imgPreviewDiv}`]: {
    display: 'inline-block',
    position: 'relative',
  },

  [`& .${classes.imgPreview}`]: {
    maxHeight: '50vh',
    borderRadius: '1%',
  },

  [`& .${classes.closeImgBtn}`]: {
    position: 'absolute',
    top: '-3%',
    right: '-5%',
    background: theme.palette.white,
    '&:hover': {
      background: theme.palette.white,
      color: '#f00',
    },
  },

  [`& .${classes.fileBrowser}`]: {
    borderStyle: 'dashed',
    borderWidth: '2px',
    borderRadius: '2px',
    backgroundColor: theme.palette.white,
    margin: theme.spacing(0, 2, 0, 2),
    padding: theme.spacing(20, 0, 20, 0),
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    color: theme.palette.text.secondary,
    '&:hover': {
      cursor: 'pointer',
    },
  }
}));

export default function UploadImage({ uploadImage }) {

  const [imgFile, setImgFile] = useState(null);
  const [image, setImage] = useState(null);

  const uploadNewImage = () => {
    // callback
    uploadImage(imgFile);
  };

  const onDrop = useCallback((acceptedFiles) => {
    console.log('File received', acceptedFiles);
    const file = acceptedFiles[0];
    setImgFile(file);
    const imgURLObj = URL.createObjectURL(file);
    setImage(imgURLObj);
  }, []);

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
  });

  const clearImgFile = () => {
    setImgFile(null);
    setImage(null);
  };

  return (
    <Root className={classes.root}>
      <div className={classes.inputBox}>
        <TextField
          id="standard-full-width"
          placeholder="Enter Image file's full local path or URL"
          fullWidth
          margin="normal"
          variant='standard'
          className={classes.input}
        />

        <Button
          onClick={uploadNewImage}
          variant="contained"
          disabled={!imgFile}
          className={classes.btn}
        >
          Run
        </Button>

        {image ? (
          <Button
            onClick={clearImgFile}
            variant="contained"
            className={classes.btn}
          >
            Clear
          </Button>
        ) : (
          <Button onClick={open} variant="contained" className={classes.btn}>
            Browse
          </Button>
        )}
      </div>
      {image ? (
        <div className={classes.imgPreviewWrapper}>
          <div className={classes.imgPreviewDiv}>
            <img
              alt="Preview of user uploaded file"
              className={classes.imgPreview}
              src={image}
            />
            <IconButton
              onClick={clearImgFile}
              size="small"
              className={classes.closeImgBtn}
            >
              <ClearIcon />
            </IconButton>
          </div>
        </div>
      ) : (
        <Paper
          className={classes.fileBrowser}
          variant="outlined"
          square
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <p>Or UPLOAD files by dropping the files here</p>
        </Paper>
      )}
    </Root>
  );
}
