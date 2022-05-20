import React, { Component } from 'react';
import { Box, Container, CircularProgress, Typography } from '@mui/material';
import { useSearchParams  } from 'react-router-dom';

import { graphqlQuery } from '../../graphql';
import { PHOTO as PHOTO_GQL_M } from '../../graphql/mutation';
import { PHOTO as PHOTO_GQL_Q } from '../../graphql/query';
import { getFaceLocations } from '../../utils';
import ImageAnalytics from './components/ImageAnalytics';
import UploadImage from './components/UploadImage';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';


export const withRouter = (Component) => {
  const Wrapper = (props) => {
    const [searchParams] = useSearchParams();
    
    const location = {
      search: searchParams,
    }

    return (
      <Component
      location={location}
        {...props}
        />
    );
  };
  
  return Wrapper;
};

class FacialRecognition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      faces: null,
      imgId: null,
      isUploading: false,
      photo: null,
    };
  }

  componentDidMount = () => {
    const search = this.props.location.search;
    const imgId = new URLSearchParams(search).get('id');
    if (imgId) {
      this.setState({ imgId: imgId }, () => {
        this.fetchImage(this.state.imgId);
      });
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.location.search !== this.props.location.search) {
      const search = this.props.location.search;
      const imgId = new URLSearchParams(search).get('id');
      if (imgId) {
        this.setState({ imgId: imgId }, () => {
          this.fetchImage(this.state.imgId);
        });
      }
    }
  }

  updateFaceState = (faces, faceLocations) => {
    // TODO: Rewrite this into a utils function
    const newFaces = faces.map((face, index) => ({
      face: face,
      location: faceLocations[index],
    }));
    this.setState({ faces: newFaces });
  };

  uploadImage = (file) => {
    console.debug('Uploading image file');
    this.setState({ isUploading: true }, () => {
      const reader = new FileReader();
      reader.onload = () => {
        console.debug('Reader loaded', reader);
        var binaryStr = reader.result;
        binaryStr = binaryStr.replace('data:image/jpeg;base64,', '');

        graphqlQuery(PHOTO_GQL_M, { rbytes: binaryStr }).then((res) => {
          console.debug(res);
          const faceLocations = getFaceLocations(res.photo);
          this.updateFaceState(res.photo.faces, faceLocations);
          this.setState({
            isUploading: false,
            imgId: res.photo.id,
          });
        });
      };
      reader.readAsDataURL(file);
    });
  };

  fetchImage = (id) => {
    this.setState({ isUploading: true, imgId: id }, () => {
      graphqlQuery(PHOTO_GQL_Q, { photoId: id }).then((res) => {
        const faceLocations = getFaceLocations(res.photo);
        this.updateFaceState(res.photo.faces, faceLocations);
        this.setState({ photo: res.photo })
        this.setState({
          isUploading: false,
        });
      });
    });
  };

  imageAnalyticsCallBack = () => {
    this.setState({
      faces: null,
      imgId: null,
      isUploading: false,
    });
  };

  render() {
    const { isUploading, faces } = this.state;

    return (
      <React.Fragment>
        <Container>
          <h1>Facial Recognition</h1>

          {!faces && !isUploading && (
            <UploadImage uploadImage={this.uploadImage} />
          )}

          {isUploading && (
            <div style={{ marginTop: '10vh' }}>
              <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                my: 2, 
              }}>
                <Typography variant="body1">Creating new Image</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <CircularProgress />
              </Box>
            </div>
          )}

          {faces && !isUploading && (
            <ImageAnalytics
              image={`${BASE_URL}${this.state.photo.url}`}
              data={faces}
              callback={this.imageAnalyticsCallBack}
            />
          )}
        </Container>
      </React.Fragment>
    );
  }
}

export default withRouter(FacialRecognition);
