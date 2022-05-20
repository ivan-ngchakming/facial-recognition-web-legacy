import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { graphqlQuery } from '../../../../graphql';
import { PROFILE as PROFILE_GQL_Q } from '../../../../graphql/query';
import { roundOff } from '../../../../utils';
import CroppedImage from '../../../../components/images/CroppedImage';
import LinearBarsProgress from '../../../../components/progress/LinearBarsProgress';

const PREFIX = 'ProfileCard';

const classes = {
  faceCard: `${PREFIX}-faceCard`,
  inline: `${PREFIX}-inline`,
  tagWrapper: `${PREFIX}-tagWrapper`,
  tag: `${PREFIX}-tag`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')((
  {
    theme
  }
) => ({
  [`& .${classes.faceCard}`]: {
    alignItems: 'flex-start',
  },

  [`& .${classes.inline}`]: {
    display: 'inline',
  },

  [`& .${classes.tagWrapper}`]: {
    marginTop: theme.spacing(1),
  },

  [`& .${classes.tag}`]: {
    marginRight: theme.spacing(1),
  }
}));

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';

export default function ProfileCard({
  profileId,
  score,
  index,
  selected,
  onClick,
}) {

  const [profile, setProfile] = useState({});

  const fetchProfile = (profileId) => {
    graphqlQuery(PROFILE_GQL_Q, { profileId: profileId })
      .then((res) => {
        setProfile(res.profile);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (Object.keys(profile).length === 0) {
      fetchProfile(profileId);
    }
  });

  return (
    <Root>
      <ListItem
        key={`selected-face-${index}`}
        button
        onClick={() => {
          onClick(index);
        }}
        className={classes.faceCard}
        selected={selected}
      >
        {profile && (
          <React.Fragment>
            <ListItemAvatar>
              {profile.thumbnail ? (
                <CroppedImage
                  img={`${BASE_URL}/${profile.thumbnail.photo.url}`}
                  faceLocation={[
                    ...profile.thumbnail.location,
                    profile.thumbnail.photo.width,
                    profile.thumbnail.photo.height,
                  ]}
                />
              ) : (
                <Avatar />
              )}
            </ListItemAvatar>

            <ListItemText
              style={{ marginLeft: '10%' }}
              primary={
                <Typography variant="h6" color="textPrimary">
                  {profile.name}
                </Typography>
              }
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body1"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {`${roundOff(score * 100, 2)}% Match`}
                  </Typography>

                  <LinearBarsProgress value={roundOff(score * 100, 2)} />
                </React.Fragment>
              }
            />
          </React.Fragment>
        )}
      </ListItem>
    </Root>
  );
}
