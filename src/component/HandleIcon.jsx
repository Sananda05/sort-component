const DragIcon = ({ setIsDragging }) => {
  const handleMouseDown = () => {
    setIsDragging(true);
  };
  return (
    <div
      style={{
        height: "20px",
        width: "20px",
        cursor: "grab",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "2px",
      }}
      className="handleIcon"
      onMouseDown={handleMouseDown}
    >
      <div
        style={{
          height: "2px",
          width: "16px",
          backgroundColor: "#1d1d1d",
        }}
      ></div>
      <div
        style={{
          height: "2px",
          width: "16px",
          backgroundColor: "#1d1d1d",
        }}
      ></div>
      <div
        style={{
          height: "2px",
          width: "16px",
          backgroundColor: "#1d1d1d",
        }}
      ></div>
    </div>
  );
};

export default DragIcon;
