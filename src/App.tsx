import DashBoardSelect from './components/DashBoardSelect/DashBoardSelect';
import { InfDetails } from './pages/Inf/Details/Details';
import { InfGeneral } from './pages/Inf/General/General';
import { InfReferral } from './pages/Inf/Referral/Referral';
import { MathDetails } from './pages/Math/Details/Details';
import { RouterWrapper } from './router/RouterWrapper';

export type RouteType = {
  path: string;
  element?: JSX.Element;
  children?: RouteType[];
};

function App() {
  const defaultRoutes: RouteType[] = [
    {
      path: '/demo-inf',
      element: undefined,
      children: [
        { path: '', element: <InfGeneral /> },
        { path: 'referral', element: <InfReferral /> },
        { path: 'details', element: <InfDetails /> },
      ],
    },
    {
      path: '/demo-math',
      element: undefined,
      children: [
        { path: '', element: <MathDetails /> },
        { path: 'referral', element: <p>Math referral</p> },
        { path: 'details', element: <p>Math details</p> },
      ],
    },
    {
      path: '*',
      element: <DashBoardSelect />,
    },
  ];

  return <RouterWrapper routes={defaultRoutes} />;
}

export default App;
