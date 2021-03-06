import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Tooltip, IconButton, Switch } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import DataTable from '../../components/DataTable/DataTable';
import Image from '../../components/images/Image';
import Gallery from '../../components/images/Gallery';
import useProfiles from '../../hooks/useProfiles';
import SelectToolbar from '../../components/SelectToolbar';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const headCells = [
  {
    id: 'thumbnail',
    label: '',
    padding: 'checkbox',
    render: (value) => {
      const image = value
        ? {
            source: `${BASE_URL}${value.photo.url}`,
          }
        : null;
      return (
        <Grid style={{ margin: '10px' }}>
          <Image image={image} height={50} />
        </Grid>
      );
    },
  },
  { id: 'id', label: 'id' },
  { id: 'name', label: 'Name' },
  {
    id: 'facesCount',
    label: 'Face Count',
  },
];

const Profiles = () => {
  const navigate = useNavigate();
  const [profiles, refetchProfiles, profilesCount] = useProfiles(1, 10);
  const [isGalleryView, setIsGalleryView] = useState(false);
  const [, setSelected] = useState([]);

  const handleGallerySwitch = (event) => {
    setIsGalleryView(event.target.checked);
  };

  const toolBarButtons = [
    <Switch checked={isGalleryView} onChange={handleGallerySwitch} />,
  ];

  const toolBarSelectedButtons = [
    <Tooltip title="Delete">
      <IconButton aria-label="delete" size="large">
        <DeleteIcon />
      </IconButton>
    </Tooltip>,
  ];

  const ToolBar = ({ selectedItems, onCheckAll }) => {
    return (
      <SelectToolbar
        enableCheckAll={isGalleryView}
        title="Profiles"
        selectedButtons={toolBarSelectedButtons}
        buttons={toolBarButtons}
        numSelected={selectedItems.length}
        checked={selectedItems.length > 0}
        indeterminate={selectedItems.length !== profiles.length}
        onCheckAll={onCheckAll}
      />
    );
  };

  const getImages = (profiles) => {
    return profiles.map((profile) => ({
      source: profile.thumbnail
        ? `${BASE_URL}${profile.thumbnail.photo.url}`
        : null,
      id: profile.id,
    }));
  };

  const images = useMemo(() => getImages(profiles), [profiles]);

  const handleSelect = (selected) => {
    setSelected([...selected]);
  };

  const handleDoubleClick = (row) => {
    navigate(`/profile?id=${row.id}`);
  };

  return (
    <>
      {isGalleryView ? (
        <Gallery
          images={images}
          count={profilesCount}
          onChange={refetchProfiles}
          onSelect={handleSelect}
          defaultRowsPerPage={10}
          ToolBar={ToolBar}
        />
      ) : (
        <DataTable
          title="Profiles"
          data={profiles}
          dataCount={profilesCount}
          refetch={refetchProfiles}
          onSelect={handleSelect}
          onDoubleClick={handleDoubleClick}
          headCells={headCells}
          ToolBar={ToolBar}
        />
      )}
    </>
  );
};

export default Profiles;
