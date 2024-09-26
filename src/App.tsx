import { Details } from './pages/Details/Details';
import { General } from './pages/General/General';
import { Referral } from './pages/Referral/Referral';
import { RouterWrapper } from './router/RouterWrapper';
export type RouteType = {
  path: string;
  element: JSX.Element;
};

function App() {
  const defaultRoutes: RouteType[] = [
    { path: '/demo', element: <General /> },
    { path: '/referral', element: <Referral /> },
    { path: '/details', element: <Details /> },
    // { path: '*', element: <General /> },
  ];
  return (<RouterWrapper routes={defaultRoutes} />);
}

export default App;