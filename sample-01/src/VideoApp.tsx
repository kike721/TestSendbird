import { Switch, Route, useRouteMatch } from "react-router-dom";

import VIdeoGNP from "./components/gnp/VIdeoGNP";

const GroupCallApp = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/full-screen`} component={VIdeoGNP} />
    </Switch>
  );
};

export default GroupCallApp;
