import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp/SignUp';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './routes/PrivateRoute';
import Layout from './components/Layout/Layout';
import MyJobs from './pages/MyJobs/MyJobs';
import CreateJob from './pages/CreateJob/CreateJob';
import JobDetail from './pages/JobDetail/JobDetail';

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Layout />} >
                        <Route path="/" element={<PrivateRoute />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/my-jobs" element={<MyJobs />} />
                            <Route path="/create-job" element={<CreateJob />} />
                            <Route path="/job-detail/:id" element={<JobDetail />} />
                        </Route>
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />
                    </Route>
                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default App;
