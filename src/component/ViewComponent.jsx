import "./view-component.css";

import { useState } from "react";

import Makesortable from "./MakeSortable";
import DragIcon from "./HandleIcon";

const ViewComponent = ({ componentList, setComponentList }) => {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <>
      <Makesortable
        componentList={componentList}
        setComponentList={setComponentList}
      >
        {componentList?.map((component) => (
          <div
            className="component_card"
            style={{
              backgroundColor: `${component.color}`,
            }}
            key={component?.id}
            id={component.id}
            draggable={isDragging}
          >
            <DragIcon className="drag_handler" setIsDragging={setIsDragging} />
            <div>{component?.text}</div>
          </div>
        ))}
      </Makesortable>
    </>
  );
};

export default ViewComponent;
