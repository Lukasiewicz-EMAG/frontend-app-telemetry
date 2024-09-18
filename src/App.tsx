import { Details } from './pages/Details';
import { General } from './pages/General';
import { Referral } from './pages/Referral';
import { RouterWrapper } from './router/RouterWrapper';
export type RouteType = {
  path: string;
  element: JSX.Element;
};

function App() {
  const defaultRoutes: RouteType[] = [
    { path: '/', element: <General /> },
    { path: '/referral', element: <Referral /> },
    { path: '/details', element: <Details /> },
    { path: '*', element: <General /> },
  ];

  return (
    <>

      <RouterWrapper routes={defaultRoutes} />

    </>
  );
}

export default App;

{
  /* <RouterWrapper routes={defaultRoutes} /> */
}
