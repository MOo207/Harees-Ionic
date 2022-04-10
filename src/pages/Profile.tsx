import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonItem, IonIcon, IonLabel, IonButton, IonText, IonRow } from '@ionic/react';
import { wifi, wine, warning, walk } from 'ionicons/icons';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Report } from '../models';
import { DataStore } from '@aws-amplify/datastore';

const Profile: React.FC = () => {
    const { user, signOut } = useAuthenticator((context) => [context.user]);

    const deleteData =async () => {
        try {
          var res = await DataStore.delete(Report, "ff4d5855-154e-4222-8578-b7998584329d");
          console.log(res);
        } catch (error) {
          console.log("Error", error);
        }
      }
    const updateReportedBy =async (reportId: string, reportedBy: string) => {
        const original = await DataStore.query(Report, reportId);
        const report: Report = original as Report;
        try {

            await DataStore.save(
              Report.copyOf(report, updated => {
                updated.reportedBy = reportedBy;
              })
            );
        } catch (error) {
          console.log("Error", error);
        }
      }
      
    return (
        // Page
        <IonPage>
            {/* Header */}
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Profile Page</IonTitle>
                </IonToolbar>
            </IonHeader>

            {/* Body */}
            <IonContent>
                <IonRow style={{ height: 20 }}></IonRow>

                <IonText style={{
                    "marginLeft": "10px",
                    "fontSize": 20
                }}>Account Settings</IonText>

                <IonCard>
                    <IonItem href="/myAccount" className="ion-activated">
                        <IonIcon icon={wifi} slot="start" />
                        <IonLabel>My Account</IonLabel>
                    </IonItem>

                    <IonItem href="/myReports">
                        <IonIcon icon={wine} slot="start" />
                        <IonLabel>My Reports</IonLabel>
                    </IonItem>

                    {/* <IonItem className="ion-activated">
                        <IonIcon icon={warning} slot="start" />
                        <IonLabel>My Kids</IonLabel>
                    </IonItem> */}

                    <IonItem href='/myMap'>
                        <IonIcon icon={walk} slot="start" />
                        <IonLabel>Change Password</IonLabel>
                    </IonItem>
                </IonCard>

                <IonRow style={{ height: 20 }}></IonRow>

                <IonText style={{
                    "marginLeft": "10px",
                    "fontSize": 20
                }}>About App</IonText>
                
                <IonCard>

                    <IonItem href="/faqs" className="ion-activated">
                        <IonIcon icon={wifi} slot="start" />
                        <IonLabel>FAQS</IonLabel>
                    </IonItem>

                    <IonItem href='/safety' className="ion-activated"> 
                        <IonIcon icon={wine} slot="start" />
                        <IonLabel>Safety</IonLabel>
                    </IonItem>

                    <IonItem href="/about" className="ion-activated">
                        <IonIcon icon={warning} slot="start" />
                        <IonLabel>About us</IonLabel>
                    </IonItem>

                </IonCard>

                <IonButton expand="block" style={{
                    "marginTop": "40px",
                    "marginLeft": "10px",
                    "marginRight": "10px",
                    "marginBottom": "20px"
                }} color="danger" onClick={signOut}>Logout</IonButton>
            
            
            </IonContent>
        </IonPage>
    );
};

export default Profile;