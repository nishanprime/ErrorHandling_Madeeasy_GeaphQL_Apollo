import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import CompanyPage from './pages/CompanyPage';
import CreateJobPage from './pages/CreateJobPage';
import HomePage from './pages/HomePage';
import JobPage from './pages/JobPage';
import LoginPage from './pages/LoginPage';
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <div>
      <ToastContainer />
      <NavBar />
      <main className="section">
        <Routes>
          <Route index path="/" element={<HomePage />} />
          <Route path="/companies/:companyId" element={<CompanyPage />} />
          <Route path="/jobs/new" element={<CreateJobPage />} />
          <Route path="/jobs/:jobId" element={<JobPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
