import "./view-component.css";

import { useState, useRef } from "react";

import handleIcon from "../assets/icons/menu.png";

const ViewComponent = ({ component, componentList, setComponentList }) => {
  const [isDragging, setIsDragging] = useState(false);

  const [draggedId, setDraggedId] = useState("");
  const [hightlightedPosition, setHighlightedPosition] = useState(null);

  const [prevMousePosition, setPrevMousePosition] = useState({ x: "", y: "" });

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("text/plain", id);
    setIsDragging(true);
    setPrevMousePosition({ x: e.clientX, y: e.clientY });
    console.log("start", e.clientX, "and", e.clientY);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrag = (e, id) => {
    e.preventDefault();

    const draggedId = e.dataTransfer.getData("text/plain");
    const draggedComponent = componentList.find(
      (c) => c.id.toString() === draggedId
    );

    const targetIndex = componentList.findIndex((c) => c.id === id);

    const distanceX = e.clientX - prevMousePosition.x;
    const distanceY = e.clientY - prevMousePosition.y;

    // console.log(e.clientX, e.clientY);

    // console.log(prevMousePosition.y);

    if (e.clientY > prevMousePosition.y) {
    }

    // const percentage = (distanceY / window.innerHeight) * 100;

    // Set the highlighted position based on the percentage
    // setHighlightedPosition(percentage > 5 ? targetIndex + 1 : targetIndex);

    // setPrevMousePosition({ x: distanceX, y: distanceY });
  };

  const handleDrop = (e, id) => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData("text/plain");
    const draggedComponent = componentList.find(
      (c) => c.id.toString() === draggedId
    );
    const targetIndex = componentList.findIndex((c) => c.id === id);
    const newComponents = [...componentList];

    setDraggedId(id);
    console.log(id);

    newComponents.splice(newComponents.indexOf(draggedComponent), 1);

    if (targetIndex > newComponents.indexOf(draggedComponent)) {
      newComponents.splice(targetIndex, 0, draggedComponent);
    } else {
      newComponents.splice(targetIndex, 0, draggedComponent);
    }

    // newComponents.splice(targetIndex, 0, draggedComponent);

    console.log("end", hightlightedPosition);

    setComponentList(newComponents);
  };
  return (
    <div
      className={`component_card ${isDragging ? "dragging" : ""} ${
        draggedId === component.id ? "highlighted" : ""
      }`}
      key={component.id}
      draggable="false"
      onDrag={(e) => handleDrag(e, component.id)}
      onDragStart={(e) => handleDragStart(e, component.id.toString())}
      onDragOver={(e) => handleDragOver(e)}
      onDrop={(e) => handleDrop(e, component.id)}
    >
      <img
        draggable
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
          border: "1px solid rgb(182, 190, 215)",
          padding: "10px",
          borderRadius: "5px",
        }}
        draggable="false"
      >
        <div
          className="component_color"
          style={{ backgroundColor: `${component.color}` }}
        ></div>
        <div>{component.text}</div>
      </div>
    </div>
  );
};

export default ViewComponent;
