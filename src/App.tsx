import React from 'react';
import { useLocation } from 'react-router-dom';
import { InfDetails } from './pages/Inf/Details/Details';
import { InfGeneral } from './pages/Inf/General/General';
import { InfReferral } from './pages/Inf/Referral/Referral';
import { MathDetails } from './pages/Math/Details/Details';
import DashBoardSelect from './components/DashBoardSelect/DashBoardSelect';
import { Layout } from './pages/Inf/shared/Layout';

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
        return <Layout><InfReferral /></Layout>;
      }
      if (view === 'details') {
        return <Layout><InfDetails /></Layout>;
      }
      return <Layout><InfGeneral /></Layout >;
    }

    if (page === 'math') {
      if (view === 'referral') {
        return <p>Math referral</p>;
      }
      if (view === 'details') {
        return <MathDetails />;
      }
      return <p>Math general information</p>;
    }

    return <DashBoardSelect />;
  };

  return (
    <div>
      {renderContent()}
    </div>
  );
}

export default App;
