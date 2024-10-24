import { useLocation } from 'react-router-dom';
import DashBoardSelect from './components/DashBoardSelect/DashBoardSelect';
import { InfDetails } from './pages/Inf/Details/Details';
import { InfGeneral } from './pages/Inf/General/General';
import { InfReferral } from './pages/Inf/Referral/Referral';
import { Layout } from './pages/Inf/shared/Layout';
import { MathDetails } from './pages/Math/Details/Details';
import { MathGeneral } from './pages/Math/General/General';
import { MathReferral } from './pages/Math/Referral/Referral';
import { Home, FileText, Users, NotebookPen } from 'lucide-react';
import { StudentStatistics } from './pages/InfAdmin/StudentStatistics/StudentStatistics';
import DetailedStatistics from './pages/InfAdmin/StudentStatistics/DetailedStatistics';
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
      icon: <Home />,
      label: 'Home',
      link: '?page=inf',
    },
    {
      icon: <FileText />,
      label: 'Details',
      link: '?page=inf&view=details',
      view: 'details',
    },
    {
      icon: <Users />,
      label: 'Referral',
      link: '?page=inf&view=referral',
      view: 'referral',
    },
  ];
  const navigationItemsAdminInf = [
    {
      icon: <Users />,
      label: 'Users Statistics',
      link: '?page=admin_inf',
    },
    {
      icon: <NotebookPen />,
      label: 'Task Statistics',
      link: '?page=admin_inf&view=tasks',
      view: 'tasks',
    },
  ];
  const navigationItemsMath = [
    {
      icon: <Home />,
      label: 'Home',
      link: '?page=math',
    },
    {
      icon: <FileText />,
      label: 'Details',
      link: '?page=math&view=details',
      view: 'details',
    },
    {
      icon: <Users />,
      label: 'Referral',
      link: '?page=math&view=referral',
      view: 'referral',
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

    if (page === 'math') {
      if (view === 'referral') {
        return (
          <Layout navigation={navigationItemsMath}>
            <MathReferral />
          </Layout>
        );
      }
      if (view === 'details') {
        return (
          <Layout navigation={navigationItemsMath}>
            <MathDetails />
          </Layout>
        );
      }
      return (
        <Layout navigation={navigationItemsMath}>
          <MathGeneral />
        </Layout>
      );
    }

    return <DashBoardSelect />;
  };

  return <div>{renderContent()}</div>;
}

export default App;
