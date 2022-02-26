import '@aws-amplify/ui-react/styles.css';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonBadge, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact } from '@ionic/react';
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
import { Auth, Storage, API } from 'aws-amplify';
import awsconfig from './aws-exports';
import { home, person, add } from 'ionicons/icons';
import AddReport from './pages/AddReport';
import Home from './pages/Home';
import Profile from './pages/Profile';
import { Authenticator } from '@aws-amplify/ui-react';

// >>New - Configuring Auth Module
Auth.configure(awsconfig);
API.configure(awsconfig);
Storage.configure(awsconfig);


setupIonicReact();

const App: React.FC = () => (
  <Authenticator initialState="signUp" signUpAttributes={["email"]} loginMechanisms={['email']}>
    {({ signOut, user }) => (
      <IonApp>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route path="/tab1" component={Home} exact={true} />
              <Route path="/tab2" component={Profile} exact={true} />
              <Route path="/tab3" component={AddReport} />
              <Route path="/tabs" render={() => <Redirect to="/tab1" />} exact={true} />
              <Route path="/" render={() => <Redirect to="/tab1" />} exact={true} />
            </IonRouterOutlet>
            
            <IonTabBar slot="bottom">
              <IonTabButton tab="tab1" href="/tab1">
                <IonIcon icon={home} />
                <IonLabel>Home</IonLabel>
                <IonBadge>6</IonBadge>
              </IonTabButton>

              <IonTabButton tab="tab2" href="/tab2">
                <IonIcon icon={person} />
                <IonLabel>Profile</IonLabel>
              </IonTabButton>

              <IonTabButton tab="tab3" href="/tab3">
                <IonIcon icon={add} />
                <IonLabel>Add Report</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonApp>
    )}
  </Authenticator>
);

export default App;
