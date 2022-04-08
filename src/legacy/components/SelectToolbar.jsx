import React from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten } from '@mui/material/styles';
import { Checkbox, Toolbar, Typography } from '@mui/material';

const PREFIX = 'SelectToolbar';

const classes = {
  root: `${PREFIX}-root`,
  highlight: `${PREFIX}-highlight`,
  title: `${PREFIX}-title`
};

const StyledToolbar = styled(Toolbar)((
  {
    theme
  }
) => ({
  [`&.${classes.root}`]: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },

  [`&.${classes.highlight}`]: theme.palette.mode === 'light'
    ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
    : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },

  [`& .${classes.title}`]: {
    flex: '1 1 100%',
  }
}));

const SelectToolbar = ({
  numSelected,
  title,
  enableCheckAll,
  checked,
  indeterminate,
  onCheckAll,
  buttons,
  selectedButtons,
}) => {


  return (
    <StyledToolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <>
          {enableCheckAll && (
            <Checkbox
              checked={checked}
              onChange={onCheckAll}
              indeterminate={indeterminate}
              color="primary"
              inputProps={{ 'aria-label': 'select image checkbox' }}
            />
          )}
          <Typography
            className={classes.title}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        </>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {title}
        </Typography>
      )}

      {numSelected > 0 ? selectedButtons : buttons}
    </StyledToolbar>
  );
};

SelectToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export default SelectToolbar;
