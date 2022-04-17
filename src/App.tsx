import '@aws-amplify/ui-react/styles.css';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Amplify, { Auth, Storage, API } from 'aws-amplify';
import awsconfig from './aws-exports';
import { Authenticator } from '@aws-amplify/ui-react';
import FAQS from './pages/Faqs';
import About from './pages/About';
import MainTabs from './pages/MainTabs';
import MyReports from './pages/MyReports';
import Safety from './pages/Safety';
import MyAccount from './pages/MyAccount';
import MyMap from './components/SetMapLocation';

Amplify.configure(awsconfig);
// >>New - Configuring Auth Module
Auth.configure(awsconfig);
API.configure(awsconfig);
Storage.configure(awsconfig);

setupIonicReact();

const App: React.FC = () => {
  
  return (
    <Authenticator initialState="signUp" signUpAttributes={["email"]} loginMechanisms={['email']}>
      {({ signOut, user }) => (
       
          <IonApp>
            <IonReactRouter>
              <IonReactRouter>
                <Route exact path="/">
                  <Redirect to="/home" />
                </Route>
                <Route exact path="/tab1" render={() => <Redirect to="/home" />} />
                <Route exact path="/home" >
                  <MainTabs />
                </Route>
                <Route exact path="/about" >
                  <About />
                </Route>
                <Route exact path="/faqs" >
                  <FAQS />
                </Route>
                <Route exact path="/myReports" >
                  <MyReports />
                </Route>
                <Route exact path="/safety" >
                  <Safety />
                </Route>
                <Route exact path="/myAccount" >
                  <MyAccount />
                </Route>
                {/* <Route exact path="/myMap" >
                  <MyMap />
                </Route> */}

              </IonReactRouter>
            </IonReactRouter>
          </IonApp>
      )}
    </Authenticator>
  )
};

export default App;
