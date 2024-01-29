import "./App.css";

import { useState } from "react";
import ViewComponent from "./component/ViewComponent";

function App() {
  const [componentList, setComponentList] = useState([
    { id: 1, text: "Component 1", color: "#a6e5d0" },
    { id: 2, text: "Component 2", color: "#de90f2" },
    { id: 3, text: "Component 3", color: "pink" },
    { id: 4, text: "Component 4", color: "#f1e05e" },
  ]);

  return (
    <div className="App">
      <div className="main_container">
        <ViewComponent
          componentList={componentList}
          setComponentList={setComponentList}
        />
      </div>
    </div>
  );
}

export default App;
