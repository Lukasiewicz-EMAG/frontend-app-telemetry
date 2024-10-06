import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RouteType } from '../App';
import { Layout } from '../modules/Layout';


interface RouterWrapperProps {
  routes: RouteType[];
}

export const RouterWrapper: FC<RouterWrapperProps> = ({ routes }) => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};
