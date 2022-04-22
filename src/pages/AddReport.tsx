import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonButton, IonInput, IonItemDivider, IonRow, IonList, IonAvatar, IonDatetime, useIonToast, useIonLoading, IonLabel, IonTextarea, IonSelect, IonSelectOption } from '@ionic/react';
import { DataStore } from '@aws-amplify/datastore';
import { Storage } from 'aws-amplify';

import { Report } from '../models';
import { usePhotoGallery } from '../hooks/usePhotoGallery';
import { useAuthenticator } from '@aws-amplify/ui-react';
import axios from 'axios';
import { FaceCompareResponse } from '../interfaces/faces';
import SetMapLocation from '../components/SetMapLocation';


const AddReport: React.FC = () => {
  const UserContext = React.createContext("");
  const auth = useAuthenticator((context) => [context.user]);
  const userID = auth.user?.attributes?.email;
  const [present, dismiss] = useIonToast();
  const [presentLoading, dismissLoading] = useIonLoading();
  const [image, setImage] = useState<string>();
  const [imageToUpload, setImageToUpload] = useState<Blob>();
  const [name, setName] = useState<string>();
  const [age, setAge] = useState<number>();
  const [NID, setNID] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [healthStatus, setHealthStatus] = useState<string>();
  const [height, setHeight] = useState<number>();
  const [weight, setWeight] = useState<number>();
  const [gender, setGender] = useState<string>();
  const [lat, setLat] = useState<number>();
  const [lng, setLng] = useState<number>();
  const [date, setDate] = useState('2012-12-15T13:47:20.789');
  const { takePhoto } = usePhotoGallery();
  // Datastore library from amplify to save data to the database
  const addReport = async (name: string, age: number, nationalID: string, description: string, healthStatus: string, image: string, height: number, weight: number, gender: string, date: any, lat: number, lng: number) => {
    try {
      var res = await DataStore.save(
        new Report({
          reportedBy: userID as string,
          image: image,
          name: name,
          age: age,
          nationalID: nationalID,
          description: description,
          healthStatus: healthStatus,
          height: height,
          weight: weight,
          gender: gender,
          dateTime: date,
          lat: lat,
          lng: lng,
        })
      );
      console.log(res);
    } catch (error) {
      console.log("Error saving post", error);
    }
  }
  // this function interact with lambda to compare two faces and return the similarity score 
  // with parameters of the two faces source and target
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
  // this function uploads the image to S3 bucket
  const uploadS3 = async (object: any) => {
    const result = await Storage.put("Image" + Date.now().toString() + ".jpeg", object);
    return result;
  };

  // get all reports from 
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

  const updateParent = async (lat: number, lng: number) => {
    console.log(lat);
    setLat(lat);
    setLng(lng);
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

           

          <IonItem>
            <IonInput value={age} placeholder="Age" onIonChange={e => setAge(Number(e.detail.value!))}></IonInput>
          </IonItem>
           

          <IonItem>
            <IonInput type='tel' value={NID} placeholder="National ID" onIonChange={e => setNID(e.detail.value!)}></IonInput>
          </IonItem>
           

          <IonItem>
            <IonInput type='tel' value={height} placeholder="Height" onIonChange={e => setHeight(Number(e.detail.value!))}></IonInput>
          </IonItem>
           

          <IonItem>
            <IonInput value={weight} placeholder="Weight" onIonChange={e => setWeight(Number(e.detail.value!))}></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel>Gender</IonLabel>
            <IonSelect value={gender} placeholder="Select One" onIonChange={e => setGender(e.detail.value)}>
              <IonSelectOption value="female">Female</IonSelectOption>
              <IonSelectOption value="male">Male</IonSelectOption>
            </IonSelect>
          </IonItem>
           
                   
          <IonItem>
          <IonTextarea value={description} placeholder="Description" onIonChange={e => setDescription(e.detail.value!)}></IonTextarea>
          </IonItem>
          <IonItem>
          <IonTextarea value={healthStatus} placeholder="Health Status" onIonChange={e => setHealthStatus(e.detail.value!)}></IonTextarea>
          </IonItem>
           

           <IonRow style={{
             "marginTop": "20px",
             "marginBottom": "120px"
           }} >
            <SetMapLocation updateParent={updateParent} />
           </IonRow>


          <IonItem>
            <IonDatetime value={date} placeholder="DateTime" onIonChange={e => setDate(e.detail.value!)}></IonDatetime>
          </IonItem>
  
           
          <IonButton expand='block' onClick={async () => {
            presentLoading();
            if (image != undefined && name != undefined && age != undefined && NID != undefined && height != undefined && weight != undefined && date != undefined && lat != undefined && lng != undefined) {
              // var reports: Report[] = await getReports();
              var s3Key = await uploadS3(imageToUpload);
              // var matched: boolean = false;
              // for (var i = 0; i < reports.length; i++) {
              //   var res: FaceCompareResponse = await sendRequest(s3Key.key, reports[i].image);
              //   if (res.FaceMatches.length > 0) {
              //     present("The child has already been reported", 3000);
              //     matched = true;
              //     break;
              //   }
              // }
              // if (!matched) {
                addReport(name, age, NID, description!, healthStatus!, s3Key.key, height, weight, gender!, date, lat!, lng!);
                present("Report added successfully", 3000);
              // }
            } else {
              present("Please fill all the fields", 3000);
            }
            dismissLoading();
          }}>Add</IonButton>

          {/* <IonButton expand='block' onClick={() => getReports()}>Get</IonButton> */}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default AddReport;