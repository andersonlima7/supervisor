import { useState } from "react";
import {
  MapContainer,
  Obstacle,
  Robot,
  StationDown,
  StationUp,
} from "./styles";

type ObstaclesPosition = {
  x: number;
  y: number;
};

/**
 * Map component.
 */
function Map() {
  const [obstacles, setObstacles] = useState<ObstaclesPosition[]>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false); // Controla se estamos arrastando

  function handleMapClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (isDragging) return;

    const rect = (event.target as HTMLDivElement).getBoundingClientRect();
    const x = Number((event.clientX - rect.left).toFixed(2));
    const y = Number((event.clientY - rect.top).toFixed(2));
    const newObstacle = { x, y };

    setObstacles((prevObjects: ObstaclesPosition[]) => [
      ...prevObjects,
      newObstacle,
    ]);
  }

  function handleMouseDown(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) {
    event.stopPropagation();
    setDraggedIndex(index);
    setIsDragging(true);
  }

  function handleMouseMove(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    if (draggedIndex !== null) {
      const rect = (event.target as HTMLDivElement).getBoundingClientRect();
      const x = Number((event.clientX - rect.left).toFixed(2));
      const y = Number((event.clientY - rect.top).toFixed(2));

      setObstacles((prevObstacles) =>
        prevObstacles.map((obstacle, index) =>
          index === draggedIndex ? { x, y } : obstacle
        )
      );
    }
  }

  function handleMouseUp() {
    setDraggedIndex(null);
    setTimeout(() => setIsDragging(false), 0);
  }

  console.log(obstacles);

  return (
    <MapContainer
      onClick={handleMapClick}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {obstacles.map((object, index) => (
        <Obstacle
          key={index}
          style={{
            position: "absolute",
            left: `${object.x}px`,
            top: `${object.y}px`,
          }}
          onMouseDown={(event) => handleMouseDown(event, index)}
        />
      ))}
      <StationUp
        style={{
          top: "20px",
          left: "200px",
        }}
      />
      <StationUp
        style={{
          top: "20px",
          right: "200px",
        }}
      />
      <StationDown
        style={{
          bottom: "20px",
          left: "200px",
        }}
      />
      <StationDown
        style={{
          bottom: "20px",
          right: "200px",
        }}
      />
      <Robot />
    </MapContainer>
  );
}

export default Map;
