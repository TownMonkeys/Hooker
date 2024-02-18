import { matchRoutes, useLocation } from "react-router-dom";

const useCurrentPath = () => {
  const currentLocation = useLocation();

  const isRouteExist = (routes, location) => {
    const route = matchRoutes(routes, location);
    const notfoundExist = (element) => element?.route?.path === "*";

    return (
      !!route &&
      !route.some(notfoundExist) &&
      location?.pathname !== currentLocation?.pathname
    );
  };

  return { isRouteExist, currentLocation };
};

export default useCurrentPath;
