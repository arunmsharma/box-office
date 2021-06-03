import React from 'react';
import {Route,Switch} from 'react-router-dom'


function App() {
  return (
   <Switch>
     <Route exact path="/">
      This is home page
     </Route>
     <Route exact path="/starred">
      This is starred page
     </Route>
     <Route>
      Not found.
     </Route>
   </Switch>
  );
}

export default App;
