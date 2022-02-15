import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFab, IonFabButton, IonGrid, IonRow, IonCol, IonBackButton, IonButtons, IonText } from '@ionic/react';
import { LabelsCard } from '../components/lablesCard';


const Result: React.FC = () => {



    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home" />
                    </IonButtons>
                    <IonTitle>Back To Camera</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>



                <LabelsCard />






            </IonContent>
        </IonPage>
    );
};

export default Result;