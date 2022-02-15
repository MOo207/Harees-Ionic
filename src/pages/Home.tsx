import { Authenticator } from '@aws-amplify/ui-react';
import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFab, IonFabButton, IonIcon, IonGrid, IonRow, IonCol, IonImg, IonActionSheet, IonButton, IonBackButton } from '@ionic/react';
import { camera, trash, close } from 'ionicons/icons';
import { usePhotoGallery, UserPhoto } from '../hooks/usePhotoGallery';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const { deletePhoto, photos, takePhoto } = usePhotoGallery();
  const [photoToDelete, setPhotoToDelete] = useState<UserPhoto>();

  return (
    <Authenticator initialState="signUp" signUpAttributes={["email"]} loginMechanisms={['email']}>
      {({ signOut, user }) => (
        <IonPage>
          <IonHeader>
            <IonToolbar>
               <IonButton onClick={signOut} color='white' slot='start'>
                 <IonIcon slot="icon-only" icon={close}></IonIcon>
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
              <IonFabButton onClick={() => takePhoto()}>
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

          <Link to="/Result">
            <IonButton> Result </IonButton>
          </Link>
        </IonPage>
      )}
    </Authenticator>
  );
};

export default Home;