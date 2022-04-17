import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonAvatar, IonItem, IonText, RefresherEventDetail, IonRefresher, IonRefresherContent, IonBackButton, IonButtons, IonItemOption, IonItemOptions, IonItemSliding, IonList } from '@ionic/react';

import { API, DataStore, graphqlOperation } from 'aws-amplify';
import { RouteComponentProps, useHistory } from 'react-router';
import { Report } from '../models';
import { chevronDownCircleOutline } from 'ionicons/icons';
import { queries } from '@testing-library/react';
import { Card, useAuthenticator } from '@aws-amplify/ui-react';
import MyMap from '../components/SetMapLocation';

const MyReports: React.FC = () => {
    const auth = useAuthenticator((context) => [context.user]);
    const userID = auth.user?.attributes?.email;
    const [reports, setReports] = useState<Report[]>();

    function doRefresh(event: CustomEvent<RefresherEventDetail>) {
        getReports().then(reports => {
            setReports(reports);
        });
        event.detail.complete();
    }

    useEffect(() => {
        getReports().then(reports => {
            setReports(reports);
        });
    }, []);

    const getReports = async () => {
        try {
            const res = (await DataStore.query(Report)).filter(
                report => report.reportedBy === userID);
            console.log("Posts retrieved successfully!", JSON.stringify(res, null, "\t"));
            return res;
        } catch (error) {
            console.log("Error saving post", error);
            return [];
        }
    }
    const deleteReport = async (reportId: string) => {
        try {
            const original = await DataStore.query(Report, reportId);
            const toDelete = original as Report;
            DataStore.delete(toDelete);
            console.log("Post deleted successfully!");
            return true;
        } catch (error) {
            console.log("Error deleteing post", error);
            return false;
        }
    }

    return (

        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home" />
                    </IonButtons>
                    <IonTitle>MyReports</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
                    <IonRefresherContent pullingIcon={chevronDownCircleOutline}
                        pullingText="Pull to refresh"
                        refreshingSpinner="circles"
                        refreshingText="Refreshing...">
                    </IonRefresherContent>
                </IonRefresher>


                <IonGrid>
                    {reports && reports.map((report, index) => (
                        <IonItemSliding key={report.id} style={{
                            marginBottom: '10px',
                        }}>
                            <IonItemOptions side="start">
                                <IonItemOption onClick={() => console.log('favorite clicked')}> Edit </IonItemOption>
                                <IonItemOption color="danger" onClick={async () => {
                                    await deleteReport(report.id);
                                    getReports().then(reports => {
                                        setReports(reports);
                                    }
                                    );
                                }}>Delete</IonItemOption>
                            </IonItemOptions>

                            <IonItem style={{
                            }}>
                                <IonCol>

                                    <IonAvatar style={{
                                        "height": "150px",
                                        "width": "150px",
                                        "margin": "auto",
                                        "marginTop": "40px",
                                        "marginBottom": "20px"
                                    }}>
                                        <img src={"https://harees-images.s3.amazonaws.com/public/" + report.image} />
                                    </IonAvatar>

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
                                    </IonRow>

                                    <IonRow class="ion-justify-content-center">
         
                                        <IonItem text-center>
                                            <IonText>Missing at: {report.dateTime}</IonText>
                                        </IonItem>
                                    </IonRow>


                                </IonCol>
                            </IonItem>



                        </IonItemSliding>

                    ))}
                </IonGrid>


            </IonContent>
        </IonPage>

    );
};

export default MyReports;