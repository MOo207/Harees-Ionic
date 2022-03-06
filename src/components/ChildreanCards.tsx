import { DataStore } from "@aws-amplify/datastore";
import { IonCard, IonCol, IonGrid, IonIcon, IonImg, IonItem, IonLabel, IonList, IonRow, IonText } from "@ionic/react";
import { useState, useEffect } from "react";
import { Report } from "../models";

const ChildreanCards: React.FC = () => {

    const [childrean, setChildrean] = useState<Report[]>();


   
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

    useEffect(() => {
        getReports().then(childrean => {
            setChildrean(childrean);
        });
    }, []);

    return (
        <IonGrid>
        <IonRow>
          {childrean && childrean.map((report, index) => (
            <IonCol size="12" key={index}>
              <IonCard>
                <IonItem>
                  <IonImg src={"https://harees-images.s3.amazonaws.com/public/Image1646594989586.jpeg"} />
                </IonItem>
                <IonItem>
                    <IonText>{report.name}</IonText>
                </IonItem>
                <IonItem>
                    <IonText>{report.age}</IonText>
                    </IonItem>
                    <IonItem>
                    <IonText>{report.height}</IonText>
                   </IonItem>

                    <IonItem>
                    <IonText>{report.weight}</IonText>
                    
                </IonItem>
              </IonCard>
            </IonCol>
          ))}
        </IonRow>
      </IonGrid>
    );

}

export default ChildreanCards;