import React, { useCallback, useState } from 'react';
import { styled } from '@mui/material/styles';
import { useResizeDetector } from 'react-resize-detector';

const PREFIX = 'ImageAnnotator';

const classes = {
  container: `${PREFIX}-container`,
  box: `${PREFIX}-box`,
  image: `${PREFIX}-image`,
  rect: `${PREFIX}-rect`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')((
  {
    theme
  }
) => ({
  [`& .${classes.container}`]: {
    flex: 1,
    justifyContent: 'center',
    position: 'relative',
    height: '100%',
  },

  [`& .${classes.box}`]: {
    position: 'absolute,',
  },

  [`& .${classes.image}`]: {
    alignSelf: 'center',
    maxWidth: '100%',
    borderRadius: '1%',
  },

  [`& .${classes.rect}`]: {
    border: `1px solid ${theme.palette.warning.light}`,
    position: 'absolute',
    zIndex: 99,
  }
}));

export default function ImageAnnotator({ src, faceLocations }) {

  const [imgWidth, setImgWidth] = useState(0);
  const [imgHeight, setImgHeight] = useState(0);

  const onResize = useCallback((width, height) => {
    setImgHeight(height);
    setImgWidth(width);
  }, []);

  const { ref } = useResizeDetector({
    handleHeight: false,
    // refreshMode: 'throttle',
    refreshRate: 1000,
    onResize,
  });

  const drawReac = (
    top_x,
    top_y,
    bottom_x,
    bottom_y,
    oImgWidth,
    oImgHeight,
    index = 0
  ) => {
    const _width = (Math.abs(top_x - bottom_x) / oImgWidth) * imgWidth;
    const _height = (Math.abs(top_y - bottom_y) / oImgHeight) * imgHeight;
    const _left = (top_x * imgWidth) / oImgWidth;
    const _top = (top_y * imgHeight) / oImgHeight;

    return (
      <div
        className={classes.rect}
        style={{
          width: _width,
          height: _height,
          top: _top,
          left: _left,
        }}
      />
    );
  };

  return (
    <Root>
      <div className={classes.container}>
        {/* <ResizeObserver
          onResize={(rect) => this.handleImageLoaded(rect)}
        /> */}
        <img
          src={src}
          ref={ref}
          alt=""
          className={[classes.image, classes.box].join(' ')}
        />
        {faceLocations.map((data, index) => drawReac(...data, index))}
      </div>
    </Root>
  );
}
