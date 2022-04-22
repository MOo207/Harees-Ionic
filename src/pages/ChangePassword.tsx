import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonBackButton, IonButtons, IonCard, IonItem, IonTextarea, IonItemDivider, IonLabel, IonButton, IonInput } from '@ionic/react';
import { useAuthenticator } from '@aws-amplify/ui-react';

const ChangePassword: React.FC = () => {
    const { user, signOut } = useAuthenticator((context) => [context.user]);
    const [oldPassword, setoldPassword] = useState<string>();
    const [newPassword, setNewPassword] = useState<string>();
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
                    <IonInput type='password' value={oldPassword} placeholder="Old Password" onIonChange={e => setoldPassword(e.detail.value!)}></IonInput>
                    </IonItem>
                    <IonItem className="ion-activated">
                    <IonInput type='password' value={newPassword} placeholder="New Password" onIonChange={e => setoldPassword(e.detail.value!)}></IonInput>
                    </IonItem>
                    
                    <IonButton expand="block" onClick={()=>{
                        user.changePassword(oldPassword!, newPassword!, (err, data) => {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log(data);
                            }
                        });
                    }}>Change Password</IonButton>
                </IonCard>

            </IonContent>
        </IonPage>
    );
};

export default ChangePassword;