import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';

import { Switch, Route, Link as RouterLink } from 'react-router-dom';

import * as Components from './components';

const ComponentType = {
  Basic: 'Basic',
};
const BoxGeometry = `/${ComponentType.Basic}_${Components.Basic.BoxGeometry.name}`;
const Triangle = `/${ComponentType.Basic}_${Components.Basic.Triangle.name}`;

const drawerWidth = 240;

const getSwitch = () => {
  return (
    <Switch>
      <Route exact path={Triangle} component={Components.Basic.Triangle} />
      <Route
        exact
        path={BoxGeometry}
        component={Components.Basic.BoxGeometry}
      />
    </Switch>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
  },
  toolbar: theme.mixins.toolbar,
}));

function App() {
  const classes = useStyles();
  const [basicExpand, setBasicExpand] = useState(false);

  const onExpandBasic = (event) => {
    event.preventDefault();
    setBasicExpand(!basicExpand);
  };

  return (
    <div>
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" noWrap>
              WebGPU Example
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />
          <Divider />
          <List
            subheader={
              <ListSubheader>
                {ComponentType.Basic}
                <IconButton onClick={onExpandBasic}>
                  {basicExpand ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              </ListSubheader>
            }
          >
            <Collapse in={basicExpand} timeout="auto" unmountOnExit={false}>
              <ListItem button key={0} component={RouterLink} to={Triangle}>
                {Components.Basic.Triangle.name}
              </ListItem>
              <ListItem button key={1} component={RouterLink} to={BoxGeometry}>
                {Components.Basic.BoxGeometry.name}
              </ListItem>
            </Collapse>
          </List>
        </Drawer>
        <div className={classes.content}>
          <div className={classes.toolbar} />
          {getSwitch()}
        </div>
      </div>
    </div>
  );
}

export default App;
