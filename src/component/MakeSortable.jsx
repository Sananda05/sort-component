import { useState } from "react";

import "./makesortable.css";

const Makesortable = ({ componentList, setComponentList, children }) => {
  let [isUpperHalf, setIsUpperHalf] = useState(false);
  let [isLowerHalf, setIsLowerHalf] = useState(false);

  const [draggedIndex, setDraggedIndex] = useState(null);
  const [targetIndex, setTargetIndex] = useState(null);

  const handleDragStart = (e, id, index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e, id, index) => {
    e.preventDefault();

    setTargetIndex(index);

    const mouseY = e.clientY;
    const targetElement = e.currentTarget;
    const targetRect = targetElement.getBoundingClientRect();
    const targetTop = targetRect.top + window.scrollY; // Consider the scroll offset
    const targetHeight = targetRect.height;

    const distanceFromTop = mouseY - targetTop;
    const percentageFromTop = (distanceFromTop / targetHeight) * 100;

    // console.log(percentageFromTop);

    const threshold = 50;

    const isUpperHalf = percentageFromTop < threshold;
    const isLowerHalf = percentageFromTop >= threshold;

    setIsUpperHalf(isUpperHalf);
    setIsLowerHalf(isLowerHalf);
  };

  const handleDrop = (e, id) => {
    e.preventDefault();
    let dropIndex = targetIndex;

    if (isLowerHalf) {
      const updatedComponents = [...componentList];
      if (draggedIndex > targetIndex) {
        dropIndex += 1;
      }
      if (draggedIndex < targetIndex) {
        [updatedComponents[dropIndex], updatedComponents[dropIndex - 1]] = [
          updatedComponents[dropIndex - 1],
          updatedComponents[dropIndex],
        ];
      }
    }

    if (isUpperHalf) {
      const updatedComponents = [...componentList];
      if (draggedIndex > targetIndex) {
        [updatedComponents[dropIndex + 1], updatedComponents[dropIndex]] = [
          updatedComponents[dropIndex],
          updatedComponents[dropIndex + 1],
        ];
      }
      if (draggedIndex < targetIndex) {
        dropIndex -= 1;
      }
    }

    if (
      draggedIndex !== null &&
      targetIndex !== null &&
      draggedIndex !== targetIndex
    ) {
      const updatedComponents = [...componentList];
      const [draggedComponent] = updatedComponents.splice(draggedIndex, 1);
      updatedComponents.splice(dropIndex, 0, draggedComponent);
      setComponentList(updatedComponents);

      //   console.log(updatedComponents);

      handleDragEnd();
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setTargetIndex(null);
    setIsLowerHalf(false);
    setIsUpperHalf(false);
  };
  return (
    <>
      {children.map((item, index) => (
        <div
          key={index}
          onDragStart={(e) => handleDragStart(e, item.key, index)}
          onDragOver={(e) => handleDragOver(e, item.key, index)}
          onDragEnd={handleDragEnd}
          onDrop={(e) => handleDrop(e, item.key)}
        >
          {targetIndex === index &&
            isUpperHalf &&
            targetIndex !== draggedIndex &&
            !isLowerHalf && <hr className="hr-tag-top" />}
          {item}
          {targetIndex === index &&
            isLowerHalf &&
            targetIndex !== draggedIndex &&
            !isUpperHalf && <hr className="hr-tag-bottom" />}
        </div>
      ))}
      {/* {console.log(children)} */}
    </>
  );
};

export default Makesortable;
