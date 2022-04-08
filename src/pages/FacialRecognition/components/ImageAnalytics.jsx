import { Button, Grid, Paper, Typography, Zoom } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';
import ResizeObserver from 'react-resize-observer';
import FaceCards from './faces/FaceCards';
import ImageAnnotator from './ImageAnnotator';
import ProfileCards from './profiles/ProfileCards';

const PREFIX = 'ImageAnalytics';

const classes = {
  root: `${PREFIX}-root`,
  imgWrapperGrid: `${PREFIX}-imgWrapperGrid`,
  imageWrapper: `${PREFIX}-imageWrapper`,
  result: `${PREFIX}-result`,
  scroll: `${PREFIX}-scroll`,
  lowerGrid: `${PREFIX}-lowerGrid`
};

const Root = styled('div')((
  {
    theme
  }
) => ({
  [`& .${classes.root}`]: {
    flexGrow: 1,
    justify: 'center',
  },

  [`& .${classes.imgWrapperGrid}`]: {
    height: '100%',
  },

  [`& .${classes.imageWrapper}`]: {
    padding: theme.spacing(2),
  },

  [`& .${classes.result}`]: {
    padding: theme.spacing(2),
    height: '100%',
  },

  [`& .${classes.scroll}`]: {
    overflowY: 'scroll',
  },

  [`& .${classes.lowerGrid}`]: {
    display: 'flex',
    justifyContent: 'right',
  }
}));

const MIN_GRID_HEIGHT = 400;

export default function ImageAnalytics({ image, data, callback }) {

  const [imgGridHeight, setImgGridHeight] = useState(0);
  const [selectedFace, setSelectedFace] = useState(null);
  const [selectedMatchResults, setSelectedMatchResults] = useState(null);

  const updateImgGridHeight = (gridHeight) => {
    const height =
      window.innerWidth >= 960 ? Math.max(MIN_GRID_HEIGHT, gridHeight) : '100%';
    setImgGridHeight(height);
  };

  const handleFaceClick = (face, matchResults) => {
    setSelectedFace(face);
    setSelectedMatchResults(matchResults);
  };

  const resetImage = () => {
    callback();
  };

  return (
    <Root>
      <Grid container spacing={4} className={classes.root}>
        <Zoom in>
          <Grid item xs={12} lg={4} md={12} className={classes.imgWrapperGrid}>
            <ResizeObserver
              onReflow={(rect) => updateImgGridHeight(rect.height)}
            />
            <Paper className={classes.imageWrapper}>
              <ImageAnnotator
                src={image}
                faceLocations={data.map((face) => face.location)}
              />
            </Paper>
          </Grid>
        </Zoom>
        <Zoom in style={{ transitionDelay: '10ms' }}>
          <Grid item xs={12} lg={4} md={6} style={{ maxHeight: imgGridHeight }}>
            <Paper className={classes.result}>
              {`${data.length} face${data.length > 1 ? 's' : ''} found`}
              <FaceCards img={image} data={data} onClick={handleFaceClick} />
            </Paper>
          </Grid>
        </Zoom>
        <Zoom in style={{ transitionDelay: '20ms' }}>
          <Grid item xs={12} lg={4} md={6}>
            <Paper className={classes.result}>
              <Typography>
                {selectedFace ? (
                  <ProfileCards
                    face={selectedFace}
                    matchResults={selectedMatchResults}
                  />
                ) : (
                  'Select a face'
                )}
              </Typography>
            </Paper>
          </Grid>
        </Zoom>
        <Grid item xs={12} className={classes.lowerGrid}>
          <Button onClick={resetImage}>Analyse New Image</Button>
        </Grid>
      </Grid>
    </Root>
  );
}
