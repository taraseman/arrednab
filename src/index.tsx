import { render } from "react-dom";
import App from "./App";
import "./firebase";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const rootElement = document.getElementById("root");
render(<App />, rootElement);

serviceWorkerRegistration.register();
