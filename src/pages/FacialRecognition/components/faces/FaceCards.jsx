import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import FaceCard from './FaceCard';
import { Divider, List } from '@mui/material';

const PREFIX = 'FaceCards';

const classes = {
  root: `${PREFIX}-root`,
  faceCard: `${PREFIX}-faceCard`,
  inline: `${PREFIX}-inline`
};

const Root = styled('div')((
  {
    theme
  }
) => ({
  [`&.${classes.root}`]: {
    height: '95%',
    overflowY: 'auto',
  },

  [`& .${classes.faceCard}`]: {
    alignItems: 'flex-start',
  },

  [`& .${classes.inline}`]: {
    display: 'inline',
  }
}));

export default function FaceCards({ img, data, onClick }) {

  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleClick = (face, matchResults, index) => {
    onClick(face, matchResults);
    setSelectedIndex(index);
  };

  return (
    <Root className={classes.root}>
      <List>
        {data.map((face, index) => (
          <div key={index}>
            <FaceCard
              index={index}
              face={face}
              img={img}
              selected={index === selectedIndex}
              onClick={handleClick}
            />
            {index < data.length - 1 && (
              <Divider variant="fullWidth" component="li" />
            )}
          </div>
        ))}
      </List>
    </Root>
  );
}
