import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton, IonText, IonRow, IonCol, IonAvatar } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import { Report } from '../models';

interface DetailsPageProps extends RouteComponentProps<{report: any}> {

}

const ReportDetails: React.FC<DetailsPageProps> = (prop) => {
  const report = prop.history.location.state as Report;
    return (
        // Page
        <IonPage>
            {/* Header */}
            <IonHeader>
                <IonToolbar>
                    <IonTitle>ReportDetails Page</IonTitle>
                </IonToolbar>
            </IonHeader>

            {/* Body */}
            <IonContent>
            <IonCol size="12">
            <IonCard>
              <IonItem>
                <IonAvatar style={{
                  "height": "150px",
                  "width": "150px",
                  "margin": "auto",
                  "marginTop": "10px",
                  "marginBottom": "20px"
                }}>
                  {/* <img src={"https://harees-images.s3.amazonaws.com/public/" + report.image} /> */}
                </IonAvatar>
              </IonItem>

              <IonRow class="ion-justify-content-around">
                <IonItem>
                  <IonText>Name: {report.name}</IonText>
                </IonItem>

                <IonItem>
                  <IonText>Age: {report.age}</IonText>
                </IonItem>
              </IonRow>
              <IonRow class="ion-justify-content-around">
                <IonItem>
                  <IonText>Height: {report.height}</IonText>
                </IonItem>

                <IonItem>
                  <IonText>Weight: {report.weight}</IonText>
                </IonItem>
              </IonRow>
              <IonRow class="ion-justify-content-around">
                <IonItem>
                  <IonText>NationalID: {report.nationalID}</IonText>
                </IonItem>

                <IonItem>
                  <IonText>Last Seen: {report.location}</IonText>
                </IonItem>
              </IonRow>

              <IonRow class="ion-justify-content-center">
                <IonItem text-center>
                  <IonText>Missing at: {report.dateTime}</IonText>
                </IonItem>
              </IonRow>

            </IonCard>
          </IonCol>
            </IonContent>
        </IonPage>
    );
};

export default ReportDetails;