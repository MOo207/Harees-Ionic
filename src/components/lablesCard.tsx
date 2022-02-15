import { IonCard, IonIcon, IonItem, IonLabel, IonList } from "@ionic/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Faces } from "../interfaces/faces";

export const LabelsCard: React.FC = () => {

    const [faces, setFaces] = useState<Faces>();


    const sendRequest = () => {
        return axios
            .post('https://418q8jxfcf.execute-api.us-east-1.amazonaws.com/faceCompare', {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                console.log(response);
                return response.data;
            })
    };

    useEffect(() => {
        sendRequest().then(labels => {
            setFaces(labels);
        });
    }, []);

    return (
        <IonList>

            {faces && faces.FaceMatches.map((face, index) => <IonItem key={index}>
                <IonCard>
                    <IonLabel class="ion-text-wrap">
                        <div>{face.Similarity}</div>
                    </IonLabel>
                </IonCard>
            </IonItem>
            )}
        </IonList>
    );

}