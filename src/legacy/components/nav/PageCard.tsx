import React from 'react';
import { styled } from '@mui/material/styles';
import { useHistory } from 'react-router-dom';
import {
  Typography,
  Card,
  CardContent,
  CardActionArea,
  CardActions,
  Button,
} from '@mui/material';
import { Page } from '../../types';

const PREFIX = 'PageCard';

const classes = {
  card: `${PREFIX}-card`,
  description: `${PREFIX}-description`
};

const Root = styled('div')((
  {
    theme
  }
) => ({
  [`& .${classes.card}`]: {
    minWidth: 275,
  },

  [`& .${classes.description}`]: {
    minHeight: 60,
  }
}));

export default function PageCard({ page }: { page: Page }) {

  const history = useHistory();

  const handleClick = () => {
    history.push(page.url);
  };

  return (
    <Root>
      <Card className={classes.card}>
        <CardActionArea onClick={handleClick}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              {page.category}
            </Typography>
            <Typography variant="h5" component="h2">
              {page.text}
            </Typography>
            <br />
            <Typography
              className={classes.description}
              variant="body2"
              component="p"
            >
              {page.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" onClick={handleClick}>
            View Page
          </Button>
        </CardActions>
      </Card>
    </Root>
  );
}
