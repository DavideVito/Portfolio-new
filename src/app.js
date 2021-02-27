import React, { Suspense } from "react";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import myself from "./pages/myself"
import IndexPage from "./pages/index";
import ContactPage from "./pages/contact";
import Card from "./pages/card"
import { FirebaseAppProvider } from "reactfire"
import "firebase/firestore"
import "firebase/storage"


const App = () => {
  const [isFirstMount, setIsFirstMount] = React.useState(true);
  const location = useLocation();
  const history = useHistory();


  const firebaseConfig = {
    apiKey: "AIzaSyBYD561ewO8v2jDqWVubPhHjwT1njlwHWY",
    authDomain: "myportfolio-ca2bd.firebaseapp.com",
    databaseURL: "https://myportfolio-ca2bd.firebaseio.com",
    projectId: "myportfolio-ca2bd",
    storageBucket: "myportfolio-ca2bd.appspot.com",
    messagingSenderId: "557491071481",
    appId: "1:557491071481:web:6fcb1063c362cebd8cb528",
    measurementId: "G-0GYFG192M0"
  };






  React.useEffect(() => {
    const unlisten = history.listen(() => {
      isFirstMount && setIsFirstMount(false);
    });

    return unlisten;
  }, [history, isFirstMount]);

  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.pathname}>

          <Route
            path="/"
            exact
            component={(props) => (
              <IndexPage isFirstMount={isFirstMount} {...props} />
            )}
          />
          <Route path="/contact" component={ContactPage} />
          <Route path="/myself" component={myself} />
          <Route path="/card/:id" component={Card} />
        </Switch>
      </AnimatePresence>
    </FirebaseAppProvider>
  );
};

export default App;
