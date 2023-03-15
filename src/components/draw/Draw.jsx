import { useRef, useEffect } from "react";
import { DrawCanvas } from "./DrawCanvas";
import { DrawControl } from "./DrawControl";

const DEFAULT_COLOR = "#000000";
const DEFAULT_SIZE = 4;

export const Draw = () => {
  const canvas = useRef(null);

  useEffect(() => {
    const context = canvas.current?.getContext("2d");

    if (!context) return;

    context.fillStyle = DEFAULT_COLOR;
    context.strokeStyle = DEFAULT_COLOR;
    context.lineWidth = DEFAULT_SIZE;
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <DrawCanvas canvas={canvas} />
      <DrawControl
        defaultColor={DEFAULT_COLOR}
        defaultSize={DEFAULT_SIZE}
        onColorChange={(color) => {
          canvas.current.getContext("2d").strokeStyle = color;
        }}
        onSizeChange={(size) => {
          canvas.current.getContext("2d").lineWidth = size;
        }}
      />
      <div className="m-auto flex gap-4">
        <button
          className="rounded-md bg-red-500 text-white p-2"
          onClick={() => {
            const context = canvas.current?.getContext("2d");
            context.clearRect(
              0,
              0,
              canvas.current.width,
              canvas.current.height
            );
          }}
        >
          Reset
        </button>
        <button
          className="rounded-md bg-green-500 text-white p-2"
          onClick={() => {
            const data = canvas.current.toDataURL();
            const link = document.createElement("a");
            link.download = "drawing.png";
            link.href = data;
            link.click();
          }}
        >
          Save my drawing
        </button>
      </div>
    </div>
  );
};
