import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton, IonText, IonRow, IonCol } from '@ionic/react';
import { wifi, wine, warning, walk } from 'ionicons/icons';
import { useAuthenticator } from '@aws-amplify/ui-react';

const Profile: React.FC = () => {
    const { user, signOut } = useAuthenticator((context) => [context.user]);
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
                    "font-size": 20
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
                    "font-size": 20
                }}>About App</IonText>
                
                <IonCard>
                    <IonItem href="#" className="ion-activated">
                        <IonIcon icon={wifi} slot="start" />
                        <IonLabel>FAQS</IonLabel>
                    </IonItem>

                    <IonItem href="#">
                        <IonIcon icon={wine} slot="start" />
                        <IonLabel>Privacy & Policy</IonLabel>
                    </IonItem>

                    <IonItem className="ion-activated">
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