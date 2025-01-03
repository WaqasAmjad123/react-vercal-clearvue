import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import MainLayout from '../layouts/MainLayout';
import Login from '../pages/Auth/Login';
import Dashboard from '../pages/Dashboard';
import ProjectList from '../pages/Projects/ProjectList';
import CustomerList from '../pages/Customers/CustomerList';
import ReportsDashboard from '../pages/Reports/ReportsDashboard';
import SupplierList from '../pages/Suppliers/SupplierList';
import NotFound from '../pages/NotFound';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      <Route path="/" element={
        <PrivateRoute>
          <MainLayout>
            <Dashboard />
          </MainLayout>
        </PrivateRoute>
      } />
      
      <Route path="/projects" element={
        <PrivateRoute>
          <MainLayout>
            <ProjectList />
          </MainLayout>
        </PrivateRoute>
      } />
      
      <Route path="/customers" element={
        <PrivateRoute>
          <MainLayout>
            <CustomerList />
          </MainLayout>
        </PrivateRoute>
      } />
      
      <Route path="/reports" element={
        <PrivateRoute>
          <MainLayout>
            <ReportsDashboard />
          </MainLayout>
        </PrivateRoute>
      } />
      <Route path="/suppliers" element={
        <PrivateRoute>
          <MainLayout>
            <SupplierList />
          </MainLayout>
        </PrivateRoute>
      } />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes; 