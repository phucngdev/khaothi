import HomePage from '#/features/admin/pages/HomePage/HomePage';
import ChangePass from '#/features/authentication/pages/ChangePass';
import ForgotPass from '#/features/authentication/pages/ForgotPass';
import Login from '#/features/authentication/pages/Login';
import Register from '#/features/authentication/pages/Register';
import ClassManager from '#/features/class/pages/ClassManager';
import Dashboard from '#/features/dashboard/pages/Dashboard';
import NotFound_404 from '#/features/errors/404NotFound';
import ExamGenerate from '#/features/exam-generate/pages/ExamGenerate';
import ImportQuestions from '#/features/questions/pages/ImportQuestions';
import Questions from '#/features/questions/pages/Questions';
import CreateTest from '#/features/test-manager/create-test/pages/CreateTest';
import TestList from '#/features/test-manager/test-list/pages/TestList';
import TextOutline from '#/features/test-outline/pages/TextOutline';
import TextOutlineDetail from '#/features/test-outline/pages/TextOutlineDetail';

import { AdminLayout } from '../features/admin/components/Layout/AdminLayout';
import PublicLayout from './PublicRouter';

const routesConfig: any[] = [
  {
    path: '/auth',
    element: <PublicLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'forgotpass', element: <ForgotPass /> },
      { path: 'changepass', element: <ChangePass /> },
      { path: '*', element: <NotFound_404 /> },
    ],
  },

  {
    path: '/',
    element: <AdminLayout />,
    children: [
      { path: '', element: <Dashboard /> },
      { path: '*', element: <NotFound_404 /> },
      { path: 'questions', element: <Questions /> },
      { path: 'test-generate', element: <ExamGenerate /> },
      { path: 'import-questions', element: <ImportQuestions /> },
      { path: 'test-outline', element: <TextOutline /> },
      { path: 'test-outline/:id', element: <TextOutlineDetail /> },
      { path: 'class-manager', element: <ClassManager /> },
      { path: 'test-manage/test-list', element: <TestList /> },
      { path: 'test-manage/create-test', element: <CreateTest /> },
    ],
  },
];

export default routesConfig;
