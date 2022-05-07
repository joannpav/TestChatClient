import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Pagination, Container} from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { AuthProvider } from './context/auth';

import MenuBar from "./components/MenuBar"
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import SingleStory from './pages/SingleStory';
import StoryFeed from './pages/StoryFeed';
import EpicFeed from './pages/EpicFeed';
import Profile from './pages/Profile';

function App() {
  

  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
            <Routes>                                 
              <Route index element={<Login/>} />   
              <Route path=":orgName/epics" element={<EpicFeed/>} />   
              <Route path=":orgName/:epicId/stories" element={<StoryFeed/>} />  
              <Route path=":orgName/:userName" element={<Profile/>} />
              <Route path="/home" element={<Home /> } />         
              <Route path="/login" element={<Login/>} />              
              <Route path="/register" element={<Register/>} />
              <Route path="*" element={<NotFound />} /> 
              <Route exact path=":orgName/:epicName/stories/:storyId" element={<SingleStory />} />              
            </Routes>                      
        </Container>
       
      </Router>      
    </AuthProvider>
  );
}

export default App;
