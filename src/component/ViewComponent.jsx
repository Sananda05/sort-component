import "./view-component.css";

import { useState } from "react";

import handleIcon from "../assets/icons/menu.png";
import Makesortable from "./MakeSortable";

const ViewComponent = ({ componentList, setComponentList }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [targetIndex, setTargetIndex] = useState(null);

  const [isUpperHalf, setIsUpperHalf] = useState(false);
  const [isLowerHalf, setIsLowerHalf] = useState(false);

  const handleMouseDown = (e) => {
    setIsDragging(true);
  };

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
      >
        {componentList?.map((component, index) => (
          <div
            className={`component_card ${
              draggedIndex === index ? "dragging" : ""
            }`}
            style={{
              borderTop:
                targetIndex === index && isUpperHalf
                  ? "2px solid #1e7bae"
                  : "none",

              borderBottom:
                targetIndex === index && isLowerHalf
                  ? "2px solid #1e7bae"
                  : "none",

              padding: "10px",
              borderRadius: "5px",
              backgroundColor: `${component.color}`,
            }}
            key={component?.id}
            id={component.id}
            draggable={false}
          >
            <img
              draggable
              src={handleIcon}
              alt=""
              style={{ height: "16px", width: "16px", cursor: "grab" }}
              className="handleIcon"
              onMouseDown={(e) => handleMouseDown(e)}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              <div>{component?.text}</div>
            </div>
          </div>
        ))}
      </Makesortable>
    </>
  );
};

export default ViewComponent;
