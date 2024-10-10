import { Details as CudMathDetails } from './pages/cud-math/Details/Details';
import { Details } from './pages/Details/Details';
import { General } from './pages/General/General';
import Referral from './pages/Referral/Referral';
import { RouterWrapper } from './router/RouterWrapper';
export type RouteType = {
  path: string;
  element: JSX.Element;
};

function App() {
  const defaultRoutes: RouteType[] = [
    { path: '/demo/cud-inf', element: <General /> },
    { path: '/demo/cud-inf/referral', element: <Referral /> },
    { path: '/demo/cud-inf/details', element: <Details /> },
    { path: '/demo/cud-math', element: <General /> },
    { path: '/demo/cud-math/referral', element: <Referral /> },
    { path: '/demo/cud-math/details', element: <CudMathDetails /> },
  ];
  return <RouterWrapper routes={defaultRoutes} />;
}

export default App;
