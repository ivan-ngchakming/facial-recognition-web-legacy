import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { theme } from './theme';

import NavBar from './legacy/components/nav/NavBar';
import Home from './legacy/pages/Home';
import FacialRecognition from './legacy/pages/FacialRecognition';
import Images from './legacy/pages/Images';
import BatchRecTasks from './legacy/pages/tasks/Tasks';
import Profiles from './legacy/pages/profiles/Profiles';
import ProfileDetails from './legacy/pages/ProfileDetails';
import Create from './legacy/pages/tasks/Create';

import Login from './pages/Login';

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <header className="App-header">
          <Router>
            <NavBar>
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" exact component={Login} />
                <Route
                  path="/facial-recognition"
                  exact
                  component={FacialRecognition}
                />
                <Route path="/images" exact component={Images} />
                <Route path="/profiles" exact component={Profiles} />
                <Route path="/profile" exact component={ProfileDetails} />
                <Route path="/tasks" exact component={BatchRecTasks} />
                <Route path="/tasks/create" exact component={Create} />
              </Switch>
            </NavBar>
          </Router>
        </header>
      </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
