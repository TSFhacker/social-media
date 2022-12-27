// import "./bootstrap";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);
import App from "./src/App";
// import "../css/app.css";

ReactDOM.createRoot(document.getElementById("app")).render(
    <Router>
        <App />
    </Router>
);
