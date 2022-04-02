import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonBackButton, IonButtons, IonCard, IonItem, IonTextarea, IonItemDivider, IonLabel } from '@ionic/react';

const Safety: React.FC = () => {
    return (
        // Page
        <IonPage>
            {/* Header */}
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home" />
                    </IonButtons>
                    <IonTitle>Safety</IonTitle>
                </IonToolbar>
            </IonHeader>

            {/* Body */}
            <IonContent>

                <IonCard>
                    
                    <IonItem>
                    Safety


‏When your child disappears, do not panic. Our application can help you communicate with the competent authorities as soon as possible and file a report

Parents should tell there child how to behave when talking to strangers, and that he or she should shout your name or father's name when a stranger tries to approach him, talk to him or take him by force.

Parents should tell there child that if he gets away from you, then he has to act quietly and go to the security personnel.

‏Put a paper with the child's name and his parents' phone number in his clothes in case he loses it, others can contact his parents
                    </IonItem>

                </IonCard>

            </IonContent>
        </IonPage>
    );
};

export default Safety;