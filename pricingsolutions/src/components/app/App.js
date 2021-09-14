import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "../loginPage/LoginPage";
import UserNotfound from "../../pages/UserNotfound";
import WithCustomMiddleware from "../pricingScreen/Container";

import AdminScreen from "../admin/AdminScreen";
import { Provider } from "react-redux";
import store from "../../store/store";
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route path="/" component={LoginPage} />
        <Route path="/apiConfig" component={AdminScreen} />
        <Route path="/notfound" component={UserNotfound} />
        <Route path="/pricingView" component={WithCustomMiddleware} />
      </Router>
    </Provider>
  );
}


// const mapDispatchToProps = (dispatch) => {

//   return {
//       handleSaveButtonClick : (email , userPreference, isHavingPreference) => {
//         dispatch(setUserPref(
//           {
//             email :email,
//             userPreference : userPreference,
//             isHavingPref : isHavingPreference
//           }
//         ))
//       }
//   }
// }

// export default connect(
//   null,
//   mapDispatchToProps
// )(App);


export default App;

