import { Authenticator } from '@aws-amplify/ui-react';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFab, IonFabButton, IonIcon, IonGrid, IonRow, IonCol, IonImg, IonActionSheet, IonButton, IonBackButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { camera, trash, close, logOut } from 'ionicons/icons';
import { usePhotoGallery, UserPhoto } from '../hooks/usePhotoGallery';

import { Faces } from '../interfaces/faces';

import { Storage, API } from 'aws-amplify';
import ReportCards from '../components/ReportCards';
import axios from 'axios';
import { RouteComponentProps } from 'react-router';
import { report } from 'process';
import { Report } from '../models';

const Home: React.FC<RouteComponentProps> = (props) => {
  const { deletePhoto, takePhoto } = usePhotoGallery();
  const [photoToDelete, setPhotoToDelete] = useState<UserPhoto>();


  const uploadS3 = async (object: any) => {
    const result = await Storage.put("Image" + Date.now().toString() + ".jpeg", object);
    return result;
  };

  async function apiCall(sourceImage: any) {
    const compareFaceResult = await API.post("hareesappapi", "/api/faceCompare", {
      body: {
        sourceImage: sourceImage,
      }
    }).then(response => response).catch(error => console.log(error.response.data));
    console.log(compareFaceResult);
    return compareFaceResult;
  }

  const sendRequest = (s3Key: any) => {
    return axios
      .post('https://418q8jxfcf.execute-api.us-east-1.amazonaws.com/manual/faceCompare', {
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          sourceImage: s3Key
        },
      })
      .then((response) => {
        console.log(response);
        return response.data as Faces;
      })
  };
  const sendReq = () => {
    return axios
      .post('https://418q8jxfcf.execute-api.us-east-1.amazonaws.com/manual/faceCompare', {
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          sourceImage: "Image1646659054522.jpeg"
        },
      })
      .then((response) => {
        console.log(response);
        return response.data as Faces;
      })
  };

  return (

    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Harees</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Photo Gallery</IonTitle>
          </IonToolbar>
        </IonHeader>

        <ReportCards/>


        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton onClick={async () => {
          
            // var image = await takePhoto();
            // const imageBlob = await fetch(image?.webPath!);
            // const blob = await imageBlob.blob();
            // var s3Key = await uploadS3(blob);
            // console.log(s3Key.key);
            // const response: Faces = await sendRequest(s3Key.key);
            // console.log(response);
            // alert("Similarity: " + response.FaceMatches[0].Similarity);
          }
          }>
            <IonIcon icon={camera}></IonIcon>
          </IonFabButton>
        </IonFab>

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

      </IonContent>

    </IonPage>

  );
};

export default Home;