import { DataStore } from "@aws-amplify/datastore";
import { IonCard, IonCol, IonGrid, IonIcon, IonImg, IonItem, IonLabel, IonList, IonRow, IonText } from "@ionic/react";
import { useState, useEffect } from "react";
import { Child } from "../models";

const ChildreanCards: React.FC = () => {

    const [childrean, setChildrean] = useState<Child[]>();


   
  const getReports = async () => {
    try {
      var res = await DataStore.query(Child);
      console.log("Posts retrieved successfully!", JSON.stringify(res, null, 2));
      return res;
    } catch (error) {
      console.log("Error saving post", error);
      return [];
    }
  }

    useEffect(() => {
        getReports().then(childrean => {
            setChildrean(childrean);
        });
    }, []);

    return (
        <IonGrid>
        <IonRow>
          {childrean && childrean.map((child, index) => (
            <IonCol size="6" key={index}>
              <IonCard>
                <IonItem>
                    <IonText>{child.name}</IonText>
                </IonItem>
              </IonCard>
            </IonCol>
          ))}
        </IonRow>
      </IonGrid>
    );

}

export default ChildreanCards;