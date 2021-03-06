import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonText, IonRow, IonCol, IonAvatar, IonBackButton, IonButtons, IonActionSheet, IonFab, IonFabButton, useIonLoading } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import { Report } from '../models';
import { usePhotoGallery, UserPhoto } from '../hooks/usePhotoGallery';
import { trash, close, camera } from 'ionicons/icons';
import { API, Storage } from 'aws-amplify';
import axios from 'axios';
import { FaceCompareResponse } from '../interfaces/faces';

interface DetailsPageProps extends RouteComponentProps<{ report?: any }> {

}

const ReportDetails: React.FC<DetailsPageProps> = ({ history }) => {
  const prop: any = history.location.state;
  const report = prop.report as Report;
  const { deletePhoto, takePhoto } = usePhotoGallery();
  const [chosenImage, setChosenImage] = useState<any>();
  const [photoToDelete, setPhotoToDelete] = useState<UserPhoto>();
  const [results, setResults] = useState<FaceCompareResponse>();
  const [present, dismiss] = useIonLoading();

  const uploadS3 = async (object: any) => {
    const result = await Storage.put("Image" + Date.now().toString() + ".jpeg", object);
    return result;
  };

  async function apiCall(targetImage: any, sourceImage: any) {
    const compareFaceResult = await API.post("hareesappapi", "/api/faceCompare", {
      body: {
        targetImage: targetImage,
        sourceImage: sourceImage,
      }
    }).then(response => response).catch(error => console.log(error.response.data));
    console.log(compareFaceResult);
    return compareFaceResult;
  }

  const sendRequest = (s3KeySI: any, s3KeyTI: any) => {
    return axios
      .post('https://418q8jxfcf.execute-api.us-east-1.amazonaws.com/manual/faceCompare', {
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          sourceImage: s3KeySI,
          targetImage: s3KeyTI
        },
      })
      .then((response) => {
        console.log(response);
        return response.data as FaceCompareResponse;
      })
  };

  return (
    // Page
    <IonPage>
      {/* Header */}
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>ReportDetails Page</IonTitle>
        </IonToolbar>

      </IonHeader>

      {/* Body */}
      {report && ( // if report is not null}

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
                  <img src={"https://harees-images.s3.amazonaws.com/public/" + report.image} />
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


          {results && results.FaceMatches.length != 0 && results.FaceMatches.map((face, index) => (
            <IonCol size="12" key={index}>
              <IonCard>
                <IonCardHeader>
                  <IonCardSubtitle>Surprise!, Missing Person's has matched</IonCardSubtitle>
                  <IonCardTitle>
                    <IonText>{report.name}</IonText>
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonRow>

                    <IonCol size="6">
                      <IonCard>
                        <IonItem>
                          <img src={"https://harees-images.s3.amazonaws.com/public/" + report.image} />
                        </IonItem>
                      </IonCard>
                    </IonCol>


                    <IonCol size="6">
                      <IonCard>
                        <IonItem>
                          <img src={chosenImage} />
                        </IonItem>
                      </IonCard>
                    </IonCol>
                  </IonRow>
                </IonCardContent>
                <IonCardSubtitle>
                  <IonItem>Similarity percentage: {face.Similarity}</IonItem>
                </IonCardSubtitle>
              </IonCard>
            </IonCol>
          ))}

          <IonFab vertical="bottom" horizontal="center" slot="fixed">
            <IonFabButton onClick={async () => {

              var image = await takePhoto();
              present();
              const imageBlob = await fetch(image?.webPath!);
              const blob = await imageBlob.blob();
              var s3Key = await uploadS3(blob);
              setChosenImage("https://harees-images.s3.amazonaws.com/public/" + s3Key.key);
              console.log(s3Key.key);
              const response: FaceCompareResponse = await sendRequest(report.image, s3Key.key);
              setResults(response);
              console.log(response);
              // alert("Similarity: " + response.FaceMatches);
              dismiss();
            }
            }>
              <IonActionSheet
                isOpen={!!photoToDelete}
                buttons={[{
                  text: 'Delete',
                  role: 'destructive',
                  icon: trash,
                  handler: () => {
                    if (photoToDelete) {
                      deletePhoto(photoToDelete);
                      setPhotoToDelete(undefined);
                    }
                  }
                }, {
                  text: 'Cancel',
                  icon: close,
                  role: 'cancel'
                }]}
                onDidDismiss={() => setPhotoToDelete(undefined)}
              />
              <IonIcon icon={camera}></IonIcon>
            </IonFabButton>
          </IonFab>
        </IonContent>
      )}
    </IonPage>
  );
};

export default ReportDetails;