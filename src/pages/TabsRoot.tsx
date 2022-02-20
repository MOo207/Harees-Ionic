import React from 'react';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonBadge, IonRouterOutlet } from '@ionic/react';
import { home, person, add } from 'ionicons/icons';
import { Route, Redirect } from 'react-router';
import Home from './Home';
import AddReport from './AddReport';
import Profile from './Profile';


export const TabsRoot: React.FC = () => (
  <IonTabs>
    <IonRouterOutlet>
      <Route path="/tabs/tab1" component={Home} exact={true} />
      <Route path="/tabs/tab2" component={Profile} exact={true} />
      <Route path="/tabs/tab3" component={AddReport} />
      <Route path="/tabs" render={() => <Redirect to="/tabs/tab1" />} exact={true} />
      <Route path="/" render={() => <Redirect to="/tabs/tab1" />} exact={true} />
    </IonRouterOutlet>
    <IonTabBar slot="bottom">
      <IonTabButton tab="tab1" href="/tab1">
        <IonIcon icon={home} />
        <IonLabel>Home</IonLabel>
        <IonBadge>6</IonBadge>
      </IonTabButton>

      <IonTabButton tab="tab2" href="/tabs/tab2">
        <IonIcon icon={person} />
        <IonLabel>Profile</IonLabel>
      </IonTabButton>

      <IonTabButton tab="tab3" href="/tabs/tab3">
        <IonIcon icon={add} />
        <IonLabel>Add Report</IonLabel>
      </IonTabButton>
    </IonTabBar>
  </IonTabs>
);