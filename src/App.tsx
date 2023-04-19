import { useJsApiLoader } from "@react-google-maps/api";
import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonContent,
  IonIcon,
  IonLabel,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { ellipse, square, triangle } from "ionicons/icons";
import Tab1 from "./pages/Tab1";
import Tab2 from "./pages/Tab2";
import Tab3 from "./pages/Tab3";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./App.scss";
import { InsuranceOnboarding } from "./pages/InsuranceOnboarding";
import { QuotePage } from "./pages/QuotePage";

setupIonicReact();

const libraries = ["places"];

const App: React.FC = () => {
  const { isLoaded } = useJsApiLoader({
    // @ts-ignore
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
    // @ts-ignore
    libraries: libraries,
  });

  if (!isLoaded) {
    return null;
  }
  console.log(process.env.REACT_APP_GOOGLE_MAP_API_KEY)
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/tab1">
            <Tab1 />
          </Route>
          <Route exact path="/tab2">
            <Tab2 />
          </Route>
          <Route path="/tab3">
            <Tab3 />
          </Route>
          <Route exact path="/">
            <InsuranceOnboarding />
          </Route>
          <Route exact path="/pet/quote">
            <IonPage>
              <IonContent fullscreen>
                <QuotePage />
              </IonContent>
            </IonPage>
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
