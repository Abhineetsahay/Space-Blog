import { Route, Routes } from 'react-router-dom';
import Authoisation from './pages/Login.Register';
import { Home } from './pages/Home';
import { Dashboard } from './pages/DashBoard';
import WatchNews from './components/DashBoard/News/WatchNews';
import Profile from './components/DashBoard/User/Profile';

function App() {
  return (
    <div className="h-full w-full bg-gray-900">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authenticate" element={<Authoisation />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="watchNews" element={<WatchNews />} />
        <Route path=':username/profile' element={<Profile/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
