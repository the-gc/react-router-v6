import React from "react";
import { useLocation, Navigate, Route } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login";
import { useAuth } from "./auth";

/**
 *
 * 1. 可以提前配置所有的路由，但是根据角色信息，只加载符合权限的路由
 * 2.
 */
const Overview = React.lazy(() => import("../pages/overview"));
const Admin = React.lazy(() => import("../pages/admin"));
const User = React.lazy(() => import("../pages/user"));

function RequireAuth({ children, roles }) {
  let auth = useAuth();
  let location = useLocation();
  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  if (!roles.includes(auth.user)) {
    return <Navigate to="/404" state={{ from: location }} />;
  }
  return children;
}

let routes = [
  {
    path: "/",
    element: <Home />,
    children: [{ index: true, element: <Navigate to="/overview" /> }],
  },
  {
    path: "/login",
    element: <Login />,
  },
];
let authRoutes = [
  {
    path: "/overview",
    element: Overview,
    roles: ["admin", "user"],
  },
  {
    path: "/admin",
    element: Admin,
    roles: ["admin"],
  },
  {
    path: "/user",
    element: User,
    roles: ["admin", "user"],
  },
];

authRoutes = authRoutes.map((route) => {
  let obj = {
    ...route,
    element: (
      <RequireAuth roles={route.roles}>
        <React.Suspense fallback={<>...</>}>
          <route.element />
        </React.Suspense>
      </RequireAuth>
    ),
  };
  routes[0].children.push(obj);
  return obj;
});

export default routes;
