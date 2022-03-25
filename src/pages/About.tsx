import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonBackButton, IonButtons } from '@ionic/react';
import { useAuthenticator } from '@aws-amplify/ui-react';

const About: React.FC = () => {
    const { user, signOut } = useAuthenticator((context) => [context.user]);
    return (
        // Page
        <IonPage>
            {/* Header */}
            <IonHeader> 
            <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home" />
                    </IonButtons>
                    <IonTitle>About</IonTitle>
                </IonToolbar>
            </IonHeader>

            {/* Body */}
            <IonContent>
               
            </IonContent>
        </IonPage>
    );
};

export default About;