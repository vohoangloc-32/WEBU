import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Notebook from './pages/Notebook';
import Problem from './pages/Problem';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/notebook" element={<Notebook />} />
      <Route path="/problems" element={<Problem />} />
    </Routes>
  );
}

export default App;
