import { Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import CroppedImage from '../../../../components/images/CroppedImage';

const PREFIX = 'DetailedProfileCard';

const classes = {
  imgWrapper: `${PREFIX}-imgWrapper`,
  btnWrapper: `${PREFIX}-btnWrapper`
};

const Root = styled('div')((
  {
    theme
  }
) => ({
  [`& .${classes.imgWrapper}`]: {
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(10),
  },

  [`& .${classes.btnWrapper}`]: {
    marginTop: theme.spacing(1),
    display: 'flex',
    justifyContent: 'center',
  }
}));


export default function DetailedProfileCard({ profile }) {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate(`/profile?id=${profile.id}`);
  };

  return (
    <Root>
      <Typography variant="h6" align="center">
        {profile.name}
      </Typography>

      {profile.thumbnail && profile.thumbnail.photo && (
        <div className={classes.imgWrapper}>
          <CroppedImage
            img={`/api/image/${profile.thumbnail.photo.id}`}
            faceLocation={[
              ...profile.thumbnail.location,
              profile.thumbnail.photo.width,
              profile.thumbnail.photo.height,
            ]}
          />
        </div>
      )}
      <div className={classes.btnWrapper}>
        <Button
          variant="contained"
          color="primary"
          className={classes.btn}
          onClick={handleViewProfile}
          // disabled={isSubmitting}
        >
          View Profile
        </Button>
      </div>

      <Typography variant="body2" align="right">
        Profile ID: {profile.id}
      </Typography>
    </Root>
  );
}
