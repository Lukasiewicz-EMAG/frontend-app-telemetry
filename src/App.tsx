import { useLocation } from 'react-router-dom';
import DashBoardSelect from './components/DashBoardSelect/DashBoardSelect';
import { InfDetails } from './pages/Inf/Details/Details';
import { InfGeneral } from './pages/Inf/General/General';
import { InfReferral } from './pages/Inf/Referral/Referral';
import { Layout } from './pages/Inf/shared/Layout';
import { Users, BarChart2, BookOpen, CheckSquare, ThumbsUp } from 'lucide-react';
import { StudentStatistics } from './pages/InfAdmin/StudentStatistics/StudentStatistics';
import TasksStatistics from './pages/InfAdmin/TasksStatistics/TasksStatistics';

function App() {
  const location = useLocation();

  const getQueryParams = (queryString: string) => {
    return new URLSearchParams(queryString);
  };

  const params = getQueryParams(location.search);
  const page = params.get('page');
  const view = params.get('view');

  const navigationItemsInf = [
    {
      icon: <BarChart2 />, // Updated icon for General Statistics
      label: 'menus.general_statistics',
      link: '?page=inf',
    },
    {
      icon: <BookOpen />, // Updated icon for Course Details
      label: 'menus.course_details',
      link: '?page=inf&view=details',
      view: 'details',
    },
    {
      icon: <ThumbsUp />, // Updated icon for Recommendations
      label: 'menus.recommendations',
      link: '?page=inf&view=referral',
      view: 'referral',
    },
  ];

  const navigationItemsAdminInf = [
    {
      icon: <Users />, // Student Statistics icon remains as Users
      label: 'menus.student_statistics',
      link: '?page=admin_inf',
    },
    {
      icon: <CheckSquare />, // Updated icon for Task Statistics
      label: 'menus.task_statistics',
      link: '?page=admin_inf&view=tasks',
      view: 'tasks',
    },
  ];


  const renderContent = () => {
    if (page === 'inf') {
      if (view === 'referral') {
        return (
          <Layout navigation={navigationItemsInf}>
            <InfReferral />
          </Layout>
        );
      }
      if (view === 'details') {
        return (
          <Layout navigation={navigationItemsInf}>
            <InfDetails />
          </Layout>
        );
      }
      return (
        <Layout navigation={navigationItemsInf}>
          <InfGeneral />
        </Layout>
      );
    }

    if (page === 'admin_inf') {

      if (view === 'tasks') {
        return (
          <Layout navigation={navigationItemsAdminInf}>
            <TasksStatistics />
          </Layout>
        );
      }
      return (
        <Layout navigation={navigationItemsAdminInf}>
          <StudentStatistics />
        </Layout>
      );
    }

    return <DashBoardSelect />;
  };

  return <div>{renderContent()}</div>;
}

export default App;
