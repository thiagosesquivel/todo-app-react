// src/routes.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRouter';
import Login from '@/features/auth/pages/LoginPage';
import TasksPage from '@/features/tasks/pages/TaskPage';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />


        {/* Rotas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route path="/tasks" element={<TasksPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
