export const PHOTO = `
  mutation photo($rbytes: String) {
    photo(rbytes: $rbytes) {
      id
      url
      width
      height
      faces {
        id
        location
        landmarks {
          chin
          left_eyebrow
          right_eyebrow
          nose_bridge
          nose_tip
          left_eye
          right_eye
          top_lip
          bottom_lip
        }
        encoding
        profile {
          id
          name
        }
      }
    }
  }
`;

export const DELETE_PHOTOS = `
  mutation deletePhotos ($ids: [String]) {
    deletePhoto(ids: $ids)
  }
`;

export const IDENTIFYFACE = `
  mutation identifyFace($faceId: String!){
    identifyFace(faceId: $faceId) {
      id
      status
      current
      total
      result {
        id
        score
      }
    }
  }
`;

export const ASSIGN_FACE_TO_PROFILE = `
  mutation assignFaceToProfile($faceId: String!, $profileId: String!) {
    assignFaceToProfile(faceId: $faceId, profileId: $profileId) {
      id
      profile {
        id
        name
        facesCount
        thumbnail {
          id
          location
          photo {
            id
            width
            height
          }
        }
      }
    }
  }
`;

export const PROFILE = `
  mutation profile($id: String, $name: String, $faceIds: [String], $thumbnailId: String) {
    profile(_id: $id, name: $name, faceIds: $faceIds, thumbnailId: $thumbnailId) {
      id
      name
      facesCount
      thumbnail {
        id
        location
        photo {
          id
          width
          height
        }
      }
      faces {
        id
      }
    }
  }
`;

export const BATCH_FACE_REC = `
  mutation batchFaceRec ($dirpath: String, $priority: Float) {
    batchFaceRec(dirpath: $dirpath, priority: $priority) {
      taskCollectionId
      status
      progress
    }
  }
`;
