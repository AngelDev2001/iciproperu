import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom';
import { useAuthentication } from '../providers';
import { endsWith, flatMap, isUndefined, uniq } from 'lodash';

export const PrivateRoute = () => {
  const { authUser } = useAuthentication();
  const location = useLocation();
  const params = useParams();

  const isLoginPage = location.pathname === '/login';

  const validateAuthorizedRoute = () => {
    let results = false;

    const stringAcls = uniq(
      flatMap(
        flatMap(
          Object.entries(authUser?.acls || {}).map(([key, subCategories = {}]) =>
            Object.entries(subCategories).map(([_key, values]) => values),
          ),
        ),
      ),
    );

    results = stringAcls.find((aclRoute) => endsWith(pathnameTemplate(), aclRoute));

    return results;
  };

  const isEnabledAccess = () => {
    const rules = {
      isAuth: authUser,
      isAuthorizedRoute: validateAuthorizedRoute(),
    };

    return Object.values(rules).every((rule) => !!rule);
  };

  const pathnameTemplate = () => {
    let pathnameTemplate = location.pathname;

    Object.entries(params).forEach(([key, value]) => {
      if (!isUndefined(value) && value !== 'new') {
        pathnameTemplate = pathnameTemplate.replace(value, `:${key}`);
      }
    });

    return pathnameTemplate;
  };

  return isLoginPage || isEnabledAccess() ? <Outlet /> : <Navigate to="login" />;
};
