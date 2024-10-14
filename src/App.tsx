import { useLocation } from 'react-router-dom';
import DashBoardSelect from './components/DashBoardSelect/DashBoardSelect';
import { InfDetails } from './pages/Inf/Details/Details';
import { InfGeneral } from './pages/Inf/General/General';
import { Layout } from './pages/Inf/shared/Layout';
import { MathDetails } from './pages/Math/Details/Details';
import { MathGeneral } from './pages/Math/General/General';
import { InfReferral } from './pages/Inf/Referral/Referral';

function App() {
  const location = useLocation();

  const getQueryParams = (queryString: string) => {
    return new URLSearchParams(queryString);
  };

  const params = getQueryParams(location.search);
  const page = params.get('page');
  const view = params.get('view');

  const renderContent = () => {
    if (page === 'inf') {
      if (view === 'referral') {
        return (
          <Layout>
            <InfReferral />
          </Layout>
        );
      }
      if (view === 'details') {
        return (
          <Layout>
            <InfDetails />
          </Layout>
        );
      }
      return (
        <Layout>
          <InfGeneral />
        </Layout>
      );
    }

    if (page === 'math') {
      if (view === 'referral') {
        return (
          <Layout>
            <MathDetails />
          </Layout>
        );
      }
      if (view === 'details') {
        return (
          <Layout>
            <MathDetails />
          </Layout>
        );
      }
      return (
        <Layout>
          <MathGeneral />
        </Layout>
      );
    }

    return <DashBoardSelect />;
  };

  return <div>{renderContent()}</div>;
}

export default App;
