import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton, IonInput, IonItemDivider, IonRow, IonText, IonList } from '@ionic/react';
import { DataStore } from '@aws-amplify/datastore';
import { Child } from '../models';


const AddReport: React.FC = () => {

  const [text, setText] = useState<string>();

  const addReport =async (childName: string) => {
    try {
      var res = await DataStore.save(
        new Child({
          name: childName
        })
      );
      console.log(res);
    } catch (error) {
      console.log("Error saving post", error);
    }
  }

  const getReports = async () => {
    try {
      var res = await DataStore.query(Child);
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
}}>Form</div>
        
        <IonList style={{
          "marginLeft": "20px",
          "marginRight": "20px",
        }}>
        <IonItem>
          <IonInput value={text} placeholder="Child Name" onIonChange={e => setText(e.detail.value!)}></IonInput>
        </IonItem>

        <IonItemDivider></IonItemDivider>

          <IonButton onClick={() => addReport(text as string)}>Add</IonButton>

          <IonButton onClick={() => getReports()}>Get</IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default AddReport;