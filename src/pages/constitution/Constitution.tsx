import React, { useEffect } from 'react';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonItem, IonList, IonMenu, IonMenuButton, IonMenuToggle, IonPage, IonRouterOutlet, IonTitle, IonToolbar } from '@ionic/react';
import * as data from '../../assets/data/constitution.json';
import './Constitution.css';
import { useParams } from 'react-router-dom';

const Tab1: React.FC = () => {
  const provisionRef: any = React.createRef();
  const { id } = useParams()

  useEffect(() => {
    if (id) {
      setTimeout(() => {
        scroll(id);
      }, 600);
    }
  })

  useEffect(() => {
    if (provisionRef.current) {
      const elements = provisionRef.current.getElementsByTagName('a')
      for (let index = 0; index < elements.length; index++) {
        const element = elements[index];
        if (element.href.includes("#")) {
          element.addEventListener('click', (e: any) => {
            e.preventDefault();

            scroll(e.target.getAttribute('href').slice(1));
          });
        }
      }
    }
  }, provisionRef);

  function scroll(id: any) {
    let el = document.getElementById(id);

    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start"
      });
    }
  }

  function renderItems(item: any) {
    let elements: JSX.Element[] = [];
    if (item.children) {
      item.children.map((child: any, index: any) => {
        return elements.push(<IonItem key={index} onClick={() => { scroll(child.id) }}>&nbsp;&nbsp;&nbsp;{child.title}</IonItem>);
      });
    }

    return elements;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Constitution</IonTitle>
          <IonButtons slot="end">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonMenu side="end" menuId="first" contentId="constitution">
        <IonContent>
          <IonList>
            <IonMenuToggle auto-hide="true">
              {data.toc.map((item, index) => {
                return (
                  <div key={index}>
                    <IonItem onClick={() => { scroll(item.id) }}>{item.title}</IonItem>
                    <IonList>
                      {renderItems(item)}
                    </IonList>
                  </div>)
              })}
            </IonMenuToggle>
          </IonList>
        </IonContent>
      </IonMenu>
      <IonRouterOutlet id="constitution"></IonRouterOutlet>


      <IonContent>
        <div className="ion-padding">
          <div className="akoma-ntoso" ref={provisionRef} dangerouslySetInnerHTML={{ __html: data.body }}></div>
        </div>
      </IonContent>

    </IonPage >
  );
};

export default Tab1;