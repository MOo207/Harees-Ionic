import { Authenticator } from '@aws-amplify/ui-react';
import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFab, IonFabButton, IonIcon, IonGrid, IonRow, IonCol, IonImg, IonActionSheet, IonButton, IonBackButton } from '@ionic/react';
import { camera, trash, close, logOut } from 'ionicons/icons';
import { usePhotoGallery, UserPhoto } from '../hooks/usePhotoGallery';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Faces } from '../interfaces/faces';

const Home: React.FC = () => {
  const { deletePhoto, photos, takePhoto } = usePhotoGallery();
  const [photoToDelete, setPhotoToDelete] = useState<UserPhoto>();

  const sendRequest = (imgBase64: any) => {
    return axios
      .post('https://418q8jxfcf.execute-api.us-east-1.amazonaws.com/faceCompare', {
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          sourceImage: imgBase64
        },
      })
      .then((response) => {
        console.log(response);
        return response.data as Faces;
      })
  };
  return (
    <Authenticator initialState="signUp" signUpAttributes={["email"]} loginMechanisms={['email']}>
      {({ signOut, user }) => (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonButton onClick={signOut} color='white' slot='end'>
                <IonIcon slot="icon-only" icon={logOut}></IonIcon>
              </IonButton>
              <IonTitle>Harees</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonHeader collapse="condense">
              <IonToolbar>
                <IonTitle size="large">Photo Gallery</IonTitle>
              </IonToolbar>
            </IonHeader>


            <IonGrid>
              <IonRow>
                {photos.map((photo, index) => (
                  <IonCol size="6" key={index}>
                    <IonImg onClick={() => setPhotoToDelete(photo)} src={photo.webviewPath} />
                  </IonCol>
                ))}
              </IonRow>
            </IonGrid>


            <IonFab vertical="bottom" horizontal="center" slot="fixed">
              <IonFabButton onClick={async () => {
                var base64Image = await takePhoto();
                console.log(base64Image);
                var response = await sendRequest(base64Image);
                alert(response.FaceMatches.map(face => face.Similarity));
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
      )}
    </Authenticator>
  );
};

export default Home;