import { getConfig } from '@edx/frontend-platform';
import { BarChart2, BookOpen, CheckSquare, ThumbsUp, Users } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { InfDetails } from './pages/Inf/Details/Details';
import { InfGeneral } from './pages/Inf/General/General';
import { InfReferral } from './pages/Inf/Referral/Referral';
import { Layout } from './pages/Inf/shared/Layout';
import { StudentStatistics } from './pages/InfAdmin/StudentStatistics/StudentStatistics';
import TasksStatistics from './pages/InfAdmin/TasksStatistics/TasksStatistics';

function App() {
  const location = useLocation();

  const apiBaseUrl = getConfig().TELEMETRY_DASHBOARD_API_BASE_URL;

  console.log(apiBaseUrl, 'apiBaseUrlAPPP');

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
      link: '?page=student&view=general',
    },
    {
      icon: <BookOpen />, // Updated icon for Course Details
      label: 'menus.course_details',
      link: '?page=student&view=details',
      view: 'details',
    },
    {
      icon: <ThumbsUp />, // Updated icon for Recommendations
      label: 'menus.recommendations',
      link: '?page=student&view=referral',
      view: 'referral',
    },
  ];

  const navigationItemsAdminInf = [
    {
      icon: <Users />, // Student Statistics icon remains as Users
      label: 'menus.student_statistics',
      link: '?page=admin&view=general',
    },
    {
      icon: <CheckSquare />, // Updated icon for Task Statistics
      label: 'menus.task_statistics',
      link: '?page=admin&view=tasks',
      view: 'tasks',
    },
  ];
  const renderContent = () => {
    const renderLayout = (
      navigationItems: Array<{
        icon: JSX.Element;
        label: string;
        link: string;
        view?: string;
      }>,
      Component: React.ComponentType,
    ) => (
      <Layout navigation={navigationItems}>
        <Component />
      </Layout>
    );

    if (page === 'student') {
      switch (view) {
        case 'referral':
          return renderLayout(navigationItemsInf, InfReferral);
        case 'details':
          return renderLayout(navigationItemsInf, InfDetails);
        case 'general':
        default:
          return renderLayout(navigationItemsInf, InfGeneral);
      }
    }

    if (page === 'admin') {
      switch (view) {
        case 'tasks':
          return renderLayout(navigationItemsAdminInf, TasksStatistics);
        case 'general':
        default:
          return renderLayout(navigationItemsAdminInf, StudentStatistics);
      }
    }

    window.history.replaceState({}, '', '?page=student&view=general');
    return renderLayout(navigationItemsInf, InfGeneral);
  };

  return <div>{renderContent()}</div>;
}

export default App;
