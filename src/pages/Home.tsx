import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonAvatar, IonItem, IonText, RefresherEventDetail, IonRefresher, IonRefresherContent, IonSearchbar } from '@ionic/react';

import { DataStore } from 'aws-amplify';
import { RouteComponentProps, useHistory } from 'react-router';
import { Report } from '../models';
import { chevronDownCircleOutline } from 'ionicons/icons';

const Home: React.FC<RouteComponentProps> = () => {
  const [searchText, setSearchText] = useState('');
  const [reports, setReports] = useState<Report[]>();

  function doRefresh(event: CustomEvent<RefresherEventDetail>) {
    getReports().then(reports => {
      setReports(reports);
    });
    event.detail.complete();
  }

  const history = useHistory();

  const navigate = (report: Report) => {
    history.push({
      pathname: "/details",
      state: {
        report: report
      }
    });
  };

  useEffect(() => {
    getReports().then(reports => {
      setReports(reports);
    });
  }, []);


  const getItemData = (report: any) => {
    console.log(report);
  };

  const getReports = async () => {
    try {
      var res = await DataStore.query(Report);
      console.log("Posts retrieved successfully!", JSON.stringify(res, null, "\t"));
      return res;
    } catch (error) {
      console.log("Error saving post", error);
      return [];
    }
  }
  const searchReport = async (searchText: string) => {
    try {
      var res = await DataStore.query(Report,  r => r.name("contains", searchText));
      console.log("Posts retrieved successfully!", JSON.stringify(res, null, "\t"));
      if (res.length > 0) {
        setReports(res);
      }
    } catch (error) {
      console.log("Error saving post", error);
      return reports;
    }
  }

  return (

    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
          <IonSearchbar value={searchText} onIonChange={e => {
            setSearchText(e.detail.value!);
            searchReport(searchText);
          }
          } showCancelButton="focus"></IonSearchbar>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
          <IonRefresherContent pullingIcon={chevronDownCircleOutline}
            pullingText="Pull to refresh"
            refreshingSpinner="circles"
            refreshingText="Refreshing...">
          </IonRefresherContent>
        </IonRefresher>

        <IonHeader collapse="condense">
              <IonToolbar>
                <IonTitle size="large">Photo Gallery</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonGrid>

              <IonRow>
                {reports && reports.map((report, index) => (
                  <IonCol size="12" onClick={() => {
                    getItemData(report);
                    navigate(report);
                  }
                  } key={report.id}>

                    <IonCard>

                      <IonItem>
                        <IonAvatar style={{
                          "height": "150px",
                          "width": "150px",
                          "margin": "auto",
                          "marginTop": "40px",
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

                  </IonCol>

                ))}
              </IonRow>
            </IonGrid>


      </IonContent>
    </IonPage>

  );
};

export default Home;