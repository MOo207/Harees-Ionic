import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFab, IonFabButton, IonIcon, IonGrid, IonRow, IonCol, IonImg, IonActionSheet, IonBackButton, IonButtons, IonList, IonText } from '@ionic/react';
import axios from 'axios';

const Result: React.FC = () => {

    const [labels, setLabels] = useState<any>();


    const sendRequest = () => {
        return axios
            .get('https://jsonplaceholder.typicode.com/todos/1', {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                console.log(response);
                return response.data;
            })
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/" />
                    </IonButtons>
                    <IonTitle>Back To Camera</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonGrid>
                <IonRow>
                    <IonCol>
                        <IonText>
                            {labels?.userId}
                        </IonText>
                    </IonCol>
                </IonRow>
            </IonGrid>
            <IonContent>



                <IonFab vertical="bottom" horizontal="center" slot="fixed">

                    <IonFabButton onClick={async () => {
                        var labels = await sendRequest();
                        setLabels(labels);
                    }
                    }>
                        CLick
                    </IonFabButton>
                </IonFab>






            </IonContent>
        </IonPage>
    );
};

export default Result;