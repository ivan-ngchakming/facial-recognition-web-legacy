import React from 'react';
import { styled } from '@mui/material/styles';
const PREFIX = 'LinearBarsProgress';

const classes = {
  root: `${PREFIX}-root`,
  bar: `${PREFIX}-bar`
};

const Root = styled('div')((
  {
    theme
  }
) => ({
  [`&.${classes.root}`]: {
    display: 'flex',
    marginTop: theme.spacing(1),
  },

  [`& .${classes.bar}`]: {
    width: '5px',
    marginRight: '2px',
    alignSelf: 'center',
  }
}));

export default function LinearBarsProgress({ value }) {


  const getBars = () => {
    const color = '#4caf50';
    var bars = [];
    for (let i = 0; i < value; i += 10) {
      bars.push(
        <span
          className={classes.bar}
          style={{
            backgroundColor: color,
            height: '20px',
          }}
        />
      );
    }

    // TODO: add bars for 5s

    // bars.push(
    //   <span
    //     className={classes.bar}
    //     style={{
    //       backgroundColor: color,
    //       height: "15px",
    //     }}
    //   />
    // )

    return bars;
  };

  return <Root className={classes.root}>{getBars()}</Root>;
}
