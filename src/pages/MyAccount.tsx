import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonBackButton, IonButtons, IonCard, IonItem, IonTextarea, IonItemDivider, IonLabel, IonButton } from '@ionic/react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useHistory } from 'react-router';

const MyAccount: React.FC = () => {
    const { user, signOut } = useAuthenticator((context) => [context.user]);

    const history = useHistory();

    const navigate = () => {
      history.push({
        pathname: "/changePassword",
      });
    };
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
                    Email: {user.attributes?.email}
                    </IonItem>
                    <IonItem className="ion-activated">
                    Name: {user.attributes?.name}
                    </IonItem>
                    <IonItem className="ion-activated">
                    Family Name: {user.attributes?.family_name}
                    </IonItem>
                    <IonItem className="ion-activated">
                    Birth Date: {user.attributes?.birthdate}
                    </IonItem>
                    
                    <IonButton expand="block" onClick={navigate}>Change password</IonButton>
                </IonCard>

            </IonContent>
        </IonPage>
    );
};

export default MyAccount;