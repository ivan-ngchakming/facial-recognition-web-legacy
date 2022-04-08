import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
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
import Register from './pages/Register';

function App() {
  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <Router>
      <NavBar>
        <Routes>
          <Route path="/" exact element={<Home/ >} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} />
          <Route
            path="/facial-recognition"
            exact
            element={<FacialRecognition />}
          />
          <Route path="/images" exact element={<Images />} />
          <Route path="/profiles" exact element={<Profiles />} />
          <Route path="/profile" exact element={<ProfileDetails />} />
          <Route path="/tasks" exact element={<BatchRecTasks />} />
          <Route path="/tasks/create" exact element={<Create />} />
        </Routes>
      </NavBar>
    </Router>
    </ThemeProvider>
  );
}

export default App;
