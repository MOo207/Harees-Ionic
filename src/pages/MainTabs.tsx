import '@aws-amplify/ui-react/styles.css';
import { Authenticator } from '@aws-amplify/ui-react';
import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { home, person, add } from 'ionicons/icons';
import { Route, Redirect } from 'react-router';
import AddReport from './AddReport';
import Home from './Home';
import Profile from './Profile';
import ReportDetails from './ReportDetails';
const formFields = {
  signUp: {
    email: {
      order:1
    },
    family_name: {
      order: 2
    },
    preferred_username: {
      order: 4
    },
    birthdate: {
      order: 3
    },
    password: {
      order: 5
    },
    confirm_password: {
      order: 6
    }
  },
 }

const MainTabs: React.FC = () => (
  <Authenticator>
    {({ signOut, user }) => (
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route path="/tab1" component={Home} exact={true} />
              <Route path="/tab2" component={Profile} exact={true} />
              
              <Route path="/tab3" component={AddReport} />
              <Route path="/details" component={ReportDetails}/>
              <Route path="/home" render={() => <Redirect to="/tab1" />} exact={true} />
              <Route path="/" render={() => <Redirect to="/tab1" />} exact={true} />
            </IonRouterOutlet>
            
            <IonTabBar slot="bottom">
              <IonTabButton tab="tab1" href="/tab1">
                <IonIcon icon={home} />
                <IonLabel>Home</IonLabel>
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
    )}
  </Authenticator>
);

export default MainTabs;
