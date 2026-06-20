import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Notebook from './pages/Notebook';
import Problem from './pages/Problem';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import ForgetPassword from './pages/ForgetPassword';
import { Survey } from './pages/Survey';
import Ide from './pages/Ide';
import { CreateProblem } from './pages/CreateProblem';
// import CodeDescription from './pages/CodeDescription';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/notebook" element={<Notebook />} />

      <Route path="/problems" element={<Problem />} />
      <Route path="/problems/:problemSlug" element={<Ide />} />
      <Route path="/create-problem" element={<CreateProblem />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/survey" element={<Survey />} />
    </Routes>
  );
}

export default App;
