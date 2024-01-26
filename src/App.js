import "./App.css";

import { useState } from "react";
import ViewComponent from "./component/ViewComponent";

function App() {
  const [componentList, setComponentList] = useState([
    { id: 1, text: "Component 1", color: "red" },
    { id: 2, text: "Component 2", color: "orange" },
    { id: 3, text: "Component 3", color: "pink" },
  ]);

  return (
    <div className="App">
      <div className="main_container">
        {componentList.map((component) => (
          <ViewComponent
            component={component}
            componentList={componentList}
            setComponentList={setComponentList}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
