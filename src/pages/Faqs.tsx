import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonBackButton, IonButtons, IonCard, IonItem, IonTextarea, IonItemDivider, IonLabel } from '@ionic/react';
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

                <IonCard>
                    <IonItem className="ion-activated">
                        What is Harees?
                        <br />
                        <br />
                        Harees is an application developed in the purpose of helping to find missing children

                    </IonItem>
                    <IonItemDivider></IonItemDivider>
                    <IonItem className="ion-activated">
                        How does finding a missing child work ?
                        <br />
                        <br />
                        In our application we are using a Database with
                        Artificial intelligence
                        Which stores each child information
                        These information will help in finding them
                    </IonItem>

                    <IonItemDivider></IonItemDivider>

                    <IonItem className="ion-activated">
                        How can I report a missing child ?

                        <br />
                        <br />
                        We developed our app to be the simplest so here are the steps :
                        1- sign in to your account
                        2- At the home page by clicking the plus sign ( + ) add report
                        3- Fill the form
                    </IonItem>
                    <IonItemDivider></IonItemDivider>

                    <IonItem className="ion-activated">
                        When I report what happens next?

                        <br />
                        <br />
                        First we run the information on the database to determine if the missing child has been reported before
                        If there wasn’t any previous reports
                        The information will be stored on the database
                        Then it will be uploaded on the app
                    </IonItem>

                </IonCard>

            </IonContent>
        </IonPage>
    );
};

export default FAQS;