import { DataStore } from "@aws-amplify/datastore";
import { IonAvatar, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonIcon, IonImg, IonItem, IonLabel, IonList, IonRow, IonText } from "@ionic/react";
import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory, NavLink } from "react-router-dom";
import { Report } from "../models";
import './ReportCards.css';

const ReportCards: React.FC = () => {

  const history = useHistory();

  const navigate = () => {
    history.push("/details");
  };

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
  const getItemData = (report: any) => {
    console.log(report);
  };

  return (
    <IonGrid>

      <IonRow>
        {childrean && childrean.map((report, index) => (

          

            <IonCol size="12" onClick={() => {
              getItemData(report);
            }
            } key={report.id}>
              <NavLink to={{
            pathname: "/details",
            state: {
              report: report
            }
          }} >
              <IonCard>

                <IonItem>
                  <IonAvatar style={{
                    "height": "150px",
                    "width": "150px",
                    "margin": "auto",
                    "marginTop": "10px",
                    "marginBottom": "20px"
                  }}>
                    <img src={"https://harees-images.s3.amazonaws.com/public/" + report.image} />
                  </IonAvatar>
                </IonItem>

                <IonRow class="ion-justify-content-around">
                  <IonItem>
                    <IonText>Name: {report.name}</IonText>
                  </IonItem>

                  <IonItem>
                    <IonText>Age: {report.age}</IonText>
                  </IonItem>
                </IonRow>
                <IonRow class="ion-justify-content-around">
                  <IonItem>
                    <IonText>Height: {report.height}</IonText>
                  </IonItem>

                  <IonItem>
                    <IonText>Weight: {report.weight}</IonText>
                  </IonItem>
                </IonRow>
                <IonRow class="ion-justify-content-around">
                  <IonItem>
                    <IonText>NationalID: {report.nationalID}</IonText>
                  </IonItem>

                  <IonItem>
                    <IonText>Last Seen: {report.location}</IonText>
                  </IonItem>
                </IonRow>

                <IonRow class="ion-justify-content-center">
                  <IonItem text-center>
                    <IonText>Missing at: {report.dateTime}</IonText>
                  </IonItem>
                </IonRow>

              </IonCard>
              </NavLink>

            </IonCol>


        ))}
      </IonRow>
    </IonGrid>
  );

}


{/* <ion-card>
  <ion-item>
    <ion-avatar slot="start">
      <img src="../../assets/user.jpg">
    </ion-avatar>
    <ion-label>
      <h3>John Doe</h3>
      <p>Dec 10, 2019</p>
    </ion-label>
  </ion-item>
  <img src="../../assets/hotel.jpeg" alt="ion">
  <ion-card-header>
    <ion-card-title>Hotel Panama Garden</ion-card-title>
  </ion-card-header>
  <ion-card-content>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus iaculis mollis ligula sed ultrices.
  </ion-card-content>
  <ion-footer>
    <ion-row>
      <ion-col center text-center>
        <button>
          <ion-icon name="thumbs-up"></ion-icon>
          <div>1.5k Likes</div>
        </button>
      </ion-col>
      <ion-col center text-center>
        <button>
          <ion-icon name="text"></ion-icon>
          <div>4 Comments</div>
        </button>
      </ion-col>
      <ion-col center text-center>
        <button>
          <ion-icon name="time"></ion-icon>
          <div>11h ago</div>
        </button>
      </ion-col>
    </ion-row>
  </ion-footer>
</ion-card> */}

export default ReportCards;