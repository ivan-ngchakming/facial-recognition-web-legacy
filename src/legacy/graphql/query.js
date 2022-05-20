export const PHOTO = `
  query myQuery ($photoId: ID!){
    photo (photoId: $photoId){
      id
      width
      height
      url
      faces {
        id
        location
        profile {
          id
          name
          thumbnail {
            id
            location
            photo {
              id
              width
              height
              url
            }
          }
        }
      }
    }
  }
`;

export const PHOTOS = `
  query photos($page: Int, $profileId: ID, $photosPerPage: Int) {
    photos(page: $page, profileId: $profileId, photosPerPage: $photosPerPage) {
      pages
      count
      photos {
        id
        url
      }
    }
  }
`;

export const IDENTIFYFACE = `
  query identifyFace($faceId: ID!){
    identifyFace(faceId: $faceId) {
      id
      score
    }
  }
`;

export const PROFILE = `
  query profile($profileId: ID!) {
    profile (profileId: $profileId) {
      id
      name
      facesCount
      thumbnail {
        location
        photo {
          id
          width
          height
          url
        }
      }
    }
  }
`;

export const PROFILES = `
  query profiles($page: Int, $perPage: Int) {
    profiles(page: $page, perPage: $perPage) {
      pages
      count
      profiles {
        id
        name
        facesCount
        thumbnail {
          id
          photo {
            id
            url
          }
        }
      }
    }
  }
`;

export const TASKS = `
  query tasks {
    tasks {
      taskCollectionId
      status
      progress
    }
  }
`;
