import React, { useState } from "react";
import handleIcon from "../assets/icons/menu.png";
import "./view-component.css";

const Test = ({ componentList, setComponentList }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [targetIndex, setTargetIndex] = useState(null);
  const [isUpperHalf, setIsUpperHalf] = useState(false);
  const [isLowerHalf, setIsLowerHalf] = useState(false);
  const [startY, setStartY] = useState(0);

  const handleMouseDown = (e, index) => {
    setIsDragging(true);
    setDraggedIndex(index);
    setStartY(e.clientY);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const mouseY = e.clientY;
    const distanceFromTop = mouseY - startY;
    const distanceFromBottom = window.innerHeight - mouseY;
    const percentageFromTop = (distanceFromTop / window.innerHeight) * 100;
    const percentageFromBottom =
      (distanceFromBottom / window.innerHeight) * 100;

    setIsUpperHalf(percentageFromTop < 50);
    setIsLowerHalf(percentageFromBottom < 50);
  };

  const handleMouseUp = () => {
    setIsDragging(false);

    if (
      draggedIndex !== null &&
      targetIndex !== null &&
      draggedIndex !== targetIndex
    ) {
      const updatedComponents = [...componentList];
      const [draggedComponent] = updatedComponents.splice(draggedIndex, 1);
      updatedComponents.splice(targetIndex, 0, draggedComponent);
      setComponentList(updatedComponents);
    }

    setDraggedIndex(null);
    setTargetIndex(null);
    setIsLowerHalf(false);
    setIsUpperHalf(false);
  };

  const handleDragOver = (index) => {
    if (isDragging) {
      setTargetIndex(index);
    }
  };

  return (
    <>
      {componentList?.map((component, index) => (
        <div
          key={component?.id}
          className={`component_card ${
            isDragging && draggedIndex === index ? "dragging" : ""
          }`}
          style={{
            borderTop: isUpperHalf ? "2px solid #1e7bae" : "none",
            borderBottom: isLowerHalf ? "2px solid #1e7bae" : "none",
            padding: "10px",
            borderRadius: "5px",
            backgroundColor: `${component.color}`,
          }}
          onMouseDown={(e) => handleMouseDown(e, index)}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseOver={() => handleDragOver(index)}
        >
          <img
            draggable="false"
            src={handleIcon}
            alt=""
            style={{ height: "16px", width: "16px", cursor: "grab" }}
            className="handleIcon"
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
    </>
  );
};

export default Test;
