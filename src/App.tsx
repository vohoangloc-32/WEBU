import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Notebook from './pages/Notebook';
import Problem from './pages/Problem';
import CreateProblem from './pages/CreateProblem';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/notebook" element={<Notebook />} />
      <Route path="/problem" element={<Problem />} />
      <Route path="/create-problem" element={<CreateProblem />} />
    </Routes>
  );
}

export default App;
