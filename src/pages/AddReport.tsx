import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonButton, IonInput, IonItemDivider, IonRow, IonList, IonAvatar, IonDatetime } from '@ionic/react';
import { DataStore } from '@aws-amplify/datastore';
import { Storage } from 'aws-amplify';

import { Report } from '../models';
import { usePhotoGallery } from '../hooks/usePhotoGallery';


const AddReport: React.FC = () => {

  const [image, setImage] = useState<string>();
  const [name, setName] = useState<string>();
  const [age, setAge] = useState<number>();
  const [NID, setNID] = useState<string>();
  const [height, setHeight] = useState<number>();
  const [weight, setWeight] = useState<number>();
  const [date, setDate] = useState('2012-12-15T13:47:20.789');
  const [location, setLocation] = useState<string>();
  const { deletePhoto, convertBlobToBase64, takePhoto } = usePhotoGallery();
  const addReport = async (name: string, age: number, nationalID: string, image: string, height: number, weight: number, date: any, location: string ) => {
    try {
      var res = await DataStore.save(
        new Report({
          image: image,
          name: name,
          age: age,
          nationalID: nationalID,
          height: height,
          weight: weight,
          dateTime: date,
          location: location,
        })
      );
      console.log(res);
    } catch (error) {
      console.log("Error saving post", error);
    }
  }

  const uploadS3 = async (object: any) => {
    const result = await Storage.put("Image" + Date.now().toString() + ".jpeg", object);
    return result;
  };

  const getReports = async () => {
    try {
      var res = await DataStore.query(Report);
      console.log("Posts retrieved successfully!", JSON.stringify(res, null, 2));
    } catch (error) {
      console.log("Error saving post", error);
    }
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add missing report</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRow style={{ height: 20 }}></IonRow>

        <div className="ion-text-center" style={{
        }}>
          </div>

          <IonAvatar onClick={async ()=>{
  var image = await takePhoto() as Blob;
  const base64 = await convertBlobToBase64(image) as string;
  setImage(base64);
}} style={{
            "height": "150px",
            "width": "150px",
            "margin": "auto",
            "marginBottom": "20px"
          }}>
           
           {image != undefined ? <img src={image} alt=""/> : <img src="https://www.w3schools.com/howto/img_avatar.png" alt=""/>}
          </IonAvatar>

        <IonList style={{
          "marginLeft": "20px",
          "marginRight": "20px",
        }}>

          
          <IonItem>
            <IonInput type='text' value={name} placeholder="Name" onIonChange={e => setName(e.detail.value!)}></IonInput>
          </IonItem>

          <IonItemDivider></IonItemDivider>

          <IonItem>
            <IonInput  value={age} placeholder="Age" onIonChange={e => setAge(Number(e.detail.value!))}></IonInput>
          </IonItem>
          <IonItemDivider></IonItemDivider>

          <IonItem>
            <IonInput type='tel' value={NID} placeholder="National ID" onIonChange={e => setNID(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItemDivider></IonItemDivider>

          <IonItem>
            <IonInput type='tel' value={height} placeholder="Height" onIonChange={e => setHeight(Number(e.detail.value!))}></IonInput>
          </IonItem>
          <IonItemDivider></IonItemDivider>

          <IonItem>
            <IonInput value={weight} placeholder="Weight" onIonChange={e => setWeight(Number(e.detail.value!))}></IonInput>
          </IonItem>
          <IonItemDivider></IonItemDivider>

          <IonItem>
          <IonDatetime value={date} placeholder="DateTime" onIonChange={e => setDate(e.detail.value!)}></IonDatetime>
          </IonItem>
          <IonItemDivider></IonItemDivider>
          <IonItem>
            <IonInput value={location} placeholder="Location" onIonChange={e => setLocation(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItemDivider></IonItemDivider>
          <IonButton expand='block' onClick={async() => {
           var s3Key = await uploadS3(image);
           await addReport(name as string, age as number, NID as string, s3Key.key as string, height as number, weight as number, date as string, location as string);
          }}>Add</IonButton>

          <IonButton expand='block' onClick={() => getReports()}>Get</IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default AddReport;