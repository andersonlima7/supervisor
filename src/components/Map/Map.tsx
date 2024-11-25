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
  console.log(obstacles);
  const handleMapClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const rect = (event.target as HTMLDivElement).getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const newObstacle = { x, y };

    // Adiciona o novo objeto à lista
    setObstacles((prevObjects: ObstaclesPosition[]) => [
      ...prevObjects,
      newObstacle,
    ]);
  };
  return (
    <MapContainer onClick={handleMapClick}>
      {obstacles.map((object, index) => (
        <Obstacle
          key={index}
          style={{
            position: "absolute",
            left: `${object.x}px`,
            top: `${object.y}px`,
          }}
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
