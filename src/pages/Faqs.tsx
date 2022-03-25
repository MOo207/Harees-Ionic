import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonBackButton, IonButtons } from '@ionic/react';
import { useAuthenticator } from '@aws-amplify/ui-react';

const FAQS: React.FC = () => {
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
                    <IonTitle>FAQS</IonTitle>
                </IonToolbar>
            </IonHeader>

            {/* Body */}
            <IonContent>
               
            </IonContent>
        </IonPage>
    );
};

export default FAQS;