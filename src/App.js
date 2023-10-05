import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './routes/register/register';
import Profile from './routes/profile/profile';
import Message from './routes/message/message';
import Feed from './routes/feed/feed';
import Home from './routes/home/home';
import CreatePost from './routes/create-post/create-post';
import './App.css';
import { AuthProvider } from './utilities/authContext';



function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/profile/:username" element={<Profile/>} />
        <Route path="/message/:username" element={<Message/>}/>
        <Route path="/feed/:username" element={<Feed/>}/>
        <Route path='/post/:username' element={<CreatePost/>}/>

      </Routes>
    </Router>
    </AuthProvider>
    );
}

export default App;
