import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonButton, IonInput, IonItemDivider, IonRow, IonList, IonAvatar, IonDatetime, useIonToast } from '@ionic/react';
import { DataStore } from '@aws-amplify/datastore';
import { Storage } from 'aws-amplify';

import { Report } from '../models';
import { usePhotoGallery } from '../hooks/usePhotoGallery';
import { useAuthenticator } from '@aws-amplify/ui-react';
import axios from 'axios';
import { FaceCompareResponse } from '../interfaces/faces';


const AddReport: React.FC = () => {
  const auth = useAuthenticator((context) => [context.user]);
  const userID = auth.user?.attributes?.email;
  const [present, dismiss] = useIonToast();
  const [image, setImage] = useState<string>();
  const [imageToUpload, setImageToUpload] = useState<Blob>();
  const [name, setName] = useState<string>();
  const [age, setAge] = useState<number>();
  const [NID, setNID] = useState<string>();
  const [height, setHeight] = useState<number>();
  const [weight, setWeight] = useState<number>();
  const [date, setDate] = useState('2012-12-15T13:47:20.789');
  const [location, setLocation] = useState<string>();
  const { takePhoto } = usePhotoGallery();
  const addReport = async (name: string, age: number, nationalID: string, image: string, height: number, weight: number, date: any, location: string) => {
    try {
      var res = await DataStore.save(
        new Report({
          reportedBy: userID as string,
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

  const uploadS3 = async (object: any) => {
    const result = await Storage.put("Image" + Date.now().toString() + ".jpeg", object);
    return result;
  };

  const getReports = async () => {
    try {
      var res = await DataStore.query(Report);
      console.log("Posts retrieved successfully!", JSON.stringify(res, null, 2));
      return res;
    } catch (error) {
      console.log("Error saving post", error);
      return [];
    }
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add report</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRow style={{ height: 20 }}></IonRow>

        <div className="ion-text-center" style={{
        }}>
        </div>

        <IonAvatar onClick={async () => {
          var image = await takePhoto();
          const imageBlob = await fetch(image?.webPath!);
          const blob = await imageBlob.blob();
          setImage(image?.webPath);
          setImageToUpload(blob);
        }} style={{
          "height": "150px",
          "width": "150px",
          "margin": "auto",
          "marginBottom": "20px"
        }}>

          {image != undefined ? <img src={image} alt="" /> : <img src="assets/images/img_avatar.png" alt="" />}
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
            <IonInput value={age} placeholder="Age" onIonChange={e => setAge(Number(e.detail.value!))}></IonInput>
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
          <IonButton expand='block' onClick={async () => {
            if (image != undefined && name != undefined && age != undefined && NID != undefined && height != undefined && weight != undefined && date != undefined && location != undefined) {
              var reports: Report[] = await getReports();
              var s3Key = await uploadS3(imageToUpload);
              var matched: boolean = false;
              for (var i = 0; i < reports.length; i++) {
                var res: FaceCompareResponse = await sendRequest(s3Key.key, reports[i].image);
                if (res.FaceMatches.length > 0) {
                  present("We find match", 3000);
                  matched = true;
                  break;
                }
              }
              if (!matched) {
                addReport(name, age, NID, s3Key.key, height, weight, date, location);
                present("Report added successfully", 3000);
              }
            } else {
              present("Please fill all the fields", 3000);
            }

          }}>Add</IonButton>

          {/* <IonButton expand='block' onClick={() => getReports()}>Get</IonButton> */}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default AddReport;