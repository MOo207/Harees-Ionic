import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonBackButton, IonButtons, IonCard, IonIcon, IonItem, IonLabel, IonTextarea } from '@ionic/react';
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

            <IonCard>
                    <IonItem href="#" className="ion-activated">
                        <IonTextarea>we are a graduation project team
The idea of our application help to find missing children BASED on their images
the app includes an artificial intelligence system that matches children’s photos and determines the percentage of similarity between photos of found and missing children.The concept arose from a graduation project in which we developed a project to better discovering methods.
Our vision is to find the most effective technique to locate and protect children and we aspire to see the impact of the application on society</IonTextarea>
                    </IonItem>
                </IonCard>
               
            </IonContent>
        </IonPage>
    );
};

export default About;