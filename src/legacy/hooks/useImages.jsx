import { useState, useEffect, useCallback } from 'react';
import { graphqlQuery } from '../graphql';
import { PHOTOS as PHOTOS_GQL_Q } from '../graphql/query';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';

export default function useImages(
  defaultPage,
  defaultPhotosPerPage,
  profileId = null
) {
  const [images, setImages] = useState([]);
  const [imgCount, setImgCount] = useState(0);
  const [options, setOptions] = useState({
    page: defaultPage,
    photosPerPage: defaultPhotosPerPage,
    profileId: profileId,
  });

  const refetch = useCallback((page, photosPerPage, profileId = null) => {
    setOptions({ page, photosPerPage, profileId });
  }, []);

  const fetch = useCallback(() => {
    console.log('Fetching photos', options);
    graphqlQuery(PHOTOS_GQL_Q, options)
      .then((res) => {
        const data = res.photos;
        setImages(
          data.photos.map((photo) => ({
            id: photo.id,
            source: `${BASE_URL}/${photo.url}`,
          }))
        );
        setImgCount(data.count);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [options]);

  useEffect(() => {
    fetch(options);
  }, [options, fetch]);

  return [images, refetch, imgCount];
}
