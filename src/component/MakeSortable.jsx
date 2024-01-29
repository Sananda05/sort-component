const Makesortable = ({
  componentList,
  setComponentList,
  draggedIndex,
  targetIndex,
  isUpperHalf,
  isLowerHalf,
  setDraggedIndex,
  setTargetIndex,
  setIsUpperHalf,
  setIsLowerHalf,
  setIsDragging,
  children,
}) => {
  const handleDragStart = (e, id, index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e, id, index) => {
    e.preventDefault();

    setTargetIndex(index);

    const mouseY = e.clientY;
    const componentRect = e.target.getBoundingClientRect();
    const componentHeight = componentRect.height;
    const componentTop = componentRect.top;
    const componentBottom = componentTop + componentHeight;

    const distanceFromTop = mouseY - componentTop;
    const distanceFromBottom = componentBottom - mouseY;

    const percentageFromTop = (distanceFromTop / componentHeight) * 100;
    const percentageFromBottom = (distanceFromBottom / componentHeight) * 100;

    isUpperHalf = percentageFromTop < 50;
    isLowerHalf = percentageFromBottom < 50;

    setIsUpperHalf(isUpperHalf);
    setIsLowerHalf(isLowerHalf);
  };

  const handleDrop = (e, id) => {
    e.preventDefault();
    if (
      draggedIndex !== null &&
      targetIndex !== null &&
      draggedIndex !== targetIndex
    ) {
      const updatedComponents = [...componentList];
      const [draggedComponent] = updatedComponents.splice(draggedIndex, 1);
      updatedComponents.splice(targetIndex, 0, draggedComponent);
      setComponentList(updatedComponents);

      console.log(updatedComponents);

      setDraggedIndex(null);
      setTargetIndex(null);
      setIsLowerHalf(false);
      setIsUpperHalf(false);
      setIsDragging(false);
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setTargetIndex(null);
    setIsLowerHalf(false);
    setIsUpperHalf(false);
    setIsDragging(false);
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
          {item}
        </div>
      ))}
    </>
  );
};

export default Makesortable;
