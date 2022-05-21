import { Button, List } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useState, useEffect } from 'react';
import ProfileCard from './ProfileCard';
import { graphqlQuery } from '../../../../graphql';
import { ASSIGN_FACE_TO_PROFILE as ASSIGN_FACE_TO_PROFILE_GQL_M } from '../../../../graphql/mutation';
import CreatePortfolio from './CreatePortfolio';
import DetailedProfileCard from './DetailedProfileCard';

const PREFIX = 'ProfileCards';

const classes = {
  btnWrapper: `${PREFIX}-btnWrapper`,
  btn: `${PREFIX}-btn`
};

const Root = styled('div')((
  {
    theme
  }
) => ({
  [`& .${classes.btnWrapper}`]: {
    marginTop: theme.spacing(1),
    display: 'flex',
    justifyContent: 'center',
  },

  [`& .${classes.btn}`]: {
    minWidth: '120px',
    margin: theme.spacing(0, 1),
  }
}));

export default function ProfileCards({ face, matchResults }) {

  const [profile, setProfile] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [openCreatePannel, setOpenCreatePannel] = useState(
    matchResults && matchResults.length === 0 && !profile
  );

  const handleClick = (index) => {
    setSelectedIndex(index);
  };

  const handleSaveFaceToProfile = () => {
    graphqlQuery(ASSIGN_FACE_TO_PROFILE_GQL_M, {
      faceId: face.face.id,
      profileId: matchResults[selectedIndex].id,
    })
      .then((res) => {
        setProfile(res.assignFaceToProfile.profile);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCreatedProfile = (profile) => {
    setProfile(profile);
    setOpenCreatePannel(false);
  };

  useEffect(() => {
    if (face && !profile) {
      setProfile(face.face.profile);
    }
  }, [face, profile]);

  return (
    <Root>
      {matchResults &&
        matchResults.length > 0 &&
        !profile &&
        `${matchResults.length} profile${
          matchResults.length > 1 ? 's' : ''
        } matched`}
      {profile && <DetailedProfileCard profile={profile} />}
      {matchResults && matchResults.length > 0 && !profile && (
        <React.Fragment>
          <List>
            {matchResults.map((result, index) => (
              <ProfileCard
                profileId={result.id}
                score={result.score}
                index={index}
                selected={index === selectedIndex}
                onClick={handleClick}
              />
            ))}
          </List>
          <div className={classes.btnWrapper}>
            <Button
              variant="contained"
              color="primary"
              disabled={selectedIndex === -1}
              onClick={handleSaveFaceToProfile}
              className={classes.btn}
            >
              Save
            </Button>

            <Button
              variant="contained"
              color="primary"
              className={classes.btn}
              onClick={() => {
                setOpenCreatePannel(true);
              }}
            >
              New Profile
            </Button>
          </div>
        </React.Fragment>
      )}

      {openCreatePannel && (
        <CreatePortfolio
          callback={handleCreatedProfile}
          faceId={face.face.id}
        />
      )}
    </Root>
  );
}
