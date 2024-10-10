import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RouteType } from '../App';
import { Layout as InfLayout } from '../pages/Inf/shared/Layout';
import { Outlet } from 'react-router-dom';

interface RouterWrapperProps {
  routes: RouteType[];
}

const InfRoutes: FC = () => (
  <InfLayout>
    <Outlet />
  </InfLayout>
);

const MathRoutes: FC = () => (
  <div>
    <Outlet />
  </div>
);

export const RouterWrapper: FC<RouterWrapperProps> = ({ routes }) => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, index) => {
          if (route.path === '/demo-inf') {
            return (
              <Route key={index} path={route.path} element={<InfRoutes />}>
                {route.children?.map((child, childIndex) => (
                  <Route
                    key={childIndex}
                    path={child.path}
                    element={child.element}
                  />
                ))}
              </Route>
            );
          }

          if (route.path === '/demo-math') {
            return (
              <Route key={index} path={route.path} element={<MathRoutes />}>
                {route.children?.map((child, childIndex) => (
                  <Route
                    key={childIndex}
                    path={child.path}
                    element={child.element}
                  />
                ))}
              </Route>
            );
          }

          return null;
        })}
      </Routes>
    </BrowserRouter>
  );
};
