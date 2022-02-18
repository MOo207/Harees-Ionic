import { Authenticator } from '@aws-amplify/ui-react';
import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFab, IonFabButton, IonIcon, IonGrid, IonRow, IonCol, IonImg, IonActionSheet, IonButton, IonBackButton } from '@ionic/react';
import { camera, trash, close, logOut } from 'ionicons/icons';
import { usePhotoGallery, UserPhoto } from '../hooks/usePhotoGallery';

import { Faces } from '../interfaces/faces';

import { Storage, API } from 'aws-amplify';

const Home: React.FC = () => {
  const { deletePhoto, photos, takePhoto } = usePhotoGallery();
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
                var image = await takePhoto();
                var s3Key = await uploadS3(image);
                const response: Faces = await apiCall(s3Key.key);
                console.log(response);
                alert("Similarity: " + response.FaceMatches[0].Similarity);
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