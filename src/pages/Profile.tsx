import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton, IonText, IonRow, IonCol } from '@ionic/react';
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
    const updateImage =async (reportID: string, image: string) => {
        const original = await DataStore.query(Report, reportID);
        const report: Report = original as Report;
        try {

            await DataStore.save(
              Report.copyOf(report, updated => {
                updated.image = image;
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
                    <IonItem href="#" className="ion-activated">
                        <IonIcon icon={wifi} slot="start" />
                        <IonLabel>My Account</IonLabel>
                    </IonItem>

                    <IonItem href="#">
                        <IonIcon icon={wine} slot="start" />
                        <IonLabel>My Reports</IonLabel>
                    </IonItem>

                    <IonItem className="ion-activated">
                        <IonIcon icon={warning} slot="start" />
                        <IonLabel>My Kids</IonLabel>
                    </IonItem>

                    <IonItem>
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

                    <IonItem className="ion-activated"> 
                        <IonIcon icon={wine} slot="start" />
                        <IonLabel>Privacy & Policy</IonLabel>
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
                <IonButton expand="block" style={{
                    "marginTop": "40px",
                    "marginLeft": "10px",
                    "marginRight": "10px",
                    "marginBottom": "20px"
                }} color="danger" onClick={deleteData}>delete</IonButton>
                <IonButton expand="block" style={{
                    "marginTop": "40px",
                    "marginLeft": "10px",
                    "marginRight": "10px",
                    "marginBottom": "20px"
                }} color="danger" onClick={()=>{
                    updateImage("89b6ffdf-a042-41ee-ab31-9ff027fc2824", "e2000.jpg");
                }}>Edit</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default Profile;