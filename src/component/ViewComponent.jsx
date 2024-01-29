import "./view-component.css";

import { useState } from "react";

import Makesortable from "./MakeSortable";
import DragIcon from "./HandleIcon";

const ViewComponent = ({ componentList, setComponentList }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [targetIndex, setTargetIndex] = useState(null);

  const [isUpperHalf, setIsUpperHalf] = useState(false);
  const [isLowerHalf, setIsLowerHalf] = useState(false);

  return (
    <>
      <Makesortable
        componentList={componentList}
        setComponentList={setComponentList}
        draggedIndex={draggedIndex}
        targetIndex={targetIndex}
        isUpperHalf={isUpperHalf}
        isLowerHalf={isLowerHalf}
        setDraggedIndex={setDraggedIndex}
        setTargetIndex={setTargetIndex}
        setIsUpperHalf={setIsUpperHalf}
        setIsLowerHalf={setIsLowerHalf}
        setIsDragging={setIsDragging}
      >
        {componentList?.map((component, index) => (
          <div
            className={`component_card ${
              draggedIndex === index ? "dragging" : ""
            }`}
            style={{
              //   borderTop:
              //     targetIndex === index && isUpperHalf ? "4px solid red" : "none",

              //   borderBottom:
              //     targetIndex === index && isLowerHalf ? "4px solid red" : "none",

              padding: "10px",
              borderRadius: "5px",
              backgroundColor: `${component.color}`,
              position: "relative",
            }}
            key={component?.id}
            id={component.id}
            draggable={isDragging}
          >
            {targetIndex === index && isUpperHalf && (
              <hr className="indicator upper " />
            )}

            <DragIcon setIsDragging={setIsDragging} />
            {targetIndex === index && isLowerHalf && (
              <hr className="indicator lower" />
            )}

            <div>{component?.text}</div>
          </div>
        ))}
      </Makesortable>
    </>
  );
};

export default ViewComponent;
