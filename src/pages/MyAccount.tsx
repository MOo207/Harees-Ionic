import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonBackButton, IonButtons, IonCard, IonItem, IonTextarea, IonItemDivider, IonLabel } from '@ionic/react';
import { useAuthenticator } from '@aws-amplify/ui-react';

const MyAccount: React.FC = () => {
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
                    <IonTitle>MyAccount</IonTitle>
                </IonToolbar>
            </IonHeader>

            {/* Body */}
            <IonContent>

                <IonCard>
                    <IonItem className="ion-activated">
                    Wlecome {user.attributes?.email}
                    </IonItem>
                </IonCard>

            </IonContent>
        </IonPage>
    );
};

export default MyAccount;