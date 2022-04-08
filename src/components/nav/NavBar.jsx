import {
  AppBar,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useHistory } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { SITEMAP } from '../../constants';
import clsx from 'clsx';
import React from 'react';

const PREFIX = 'NavBar';

const classes = {
  root: `${PREFIX}-root`,
  appBar: `${PREFIX}-appBar`,
  appBarShift: `${PREFIX}-appBarShift`,
  menuBtn: `${PREFIX}-menuBtn`,
  hide: `${PREFIX}-hide`,
  drawer: `${PREFIX}-drawer`,
  drawerHeader: `${PREFIX}-drawerHeader`,
  drawerCloseBtn: `${PREFIX}-drawerCloseBtn`,
  drawerPaper: `${PREFIX}-drawerPaper`,
  content: `${PREFIX}-content`,
  contentShift: `${PREFIX}-contentShift`
};

const Root = styled('div')((
  {
    theme
  }
) => ({
  [`&.${classes.root}`]: {
    display: 'flex',
    position: 'initial',
  },

  [`& .${classes.appBar}`]: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },

  [`& .${classes.appBarShift}`]: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  [`& .${classes.menuBtn}`]: {},

  [`& .${classes.hide}`]: {
    display: 'none',
  },

  [`& .${classes.drawer}`]: {
    width: drawerWidth,
    flexShrink: 0,
  },

  [`& .${classes.drawerHeader}`]: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'right',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },

  [`& .${classes.drawerCloseBtn}`]: {
    float: 'right',
  },

  [`& .${classes.drawerPaper}`]: {
    width: drawerWidth,
  },

  [`& .${classes.content}`]: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginLeft: -drawerWidth,
    width: '100%',
    height: '100vh',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },

  [`& .${classes.contentShift}`]: {
    marginLeft: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }
}));

const drawerWidth = 240;

export default function NavBar({ children }) {

  const [open, setOpen] = React.useState(false);
  const history = useHistory();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleNavClick = (page) => {
    handleDrawerClose();
    history.push(page.url);
  };

  return (
    <Root className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, { [classes.appBarShift]: open })}
      >
        <Toolbar>
          <IconButton
            edge="start"
            className={clsx(classes.menuBtn, { [classes.hide]: open })}
            color="inherit"
            aria-label="open-drawer"
            onClick={handleDrawerOpen}
            size="large">
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton
            className={classes.drawerCloseBtn}
            onClick={handleDrawerClose}
            size="large">
            <ChevronLeftIcon />
          </IconButton>
        </div>

        <List>
          {SITEMAP.map((page, index) => (
            <ListItem
              button
              onClick={() => {
                handleNavClick(page);
              }}
              key={page.url}
            >
              <ListItemText key={'nav-text-' & page.text} primary={page.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={clsx(classes.content, { [classes.contentShift]: open })}>
        <div className={classes.drawerHeader} />
        {children}
      </main>
    </Root>
  );
}
