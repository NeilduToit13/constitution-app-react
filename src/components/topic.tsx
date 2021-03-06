import {IonItem, IonLabel, IonThumbnail} from "@ionic/react";
import parse from "html-react-parser";
import React from "react";

interface TopicItemProps {
  topic: any
}

export const TopicItem: React.FC<TopicItemProps> = ({ topic }) => {
  return (
    <IonItem key={topic.id} routerLink={"/guides/" + topic.id}>
      <IonThumbnail slot="start">
        <img src={"../../assets/images/" + topic.id + ".svg"} onError={(e) => {
          e.currentTarget.src = "../../assets/shapes.svg"
        }} alt={topic.title}/>
        </IonThumbnail>
        <IonLabel>
          <h3>{topic.title}</h3>
          <p>{parse(topic.snippet)}</p>
        </IonLabel>
    </IonItem>
  );
};
