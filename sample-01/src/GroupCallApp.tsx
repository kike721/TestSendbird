import {
  Switch,
  Route,
  useRouteMatch, Redirect,
} from 'react-router-dom';

import GroupCallFullScreen from './components/pages/GroupCallFullScreen';

const GroupCallApp = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/full-screen`} component={GroupCallFullScreen} />
      <Redirect to={`${path}/full-screen`} />
    </Switch>
  );

};

export default GroupCallApp;
