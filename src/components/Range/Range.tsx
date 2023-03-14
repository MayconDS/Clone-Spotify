import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Range, getTrackBackground } from "react-range";

const RangeSlider = ({ setVolume }: any) => {
  const STEP = 0.000001;
  const MIN = 0;
  const MAX = 1;

  const [state, setState] = useState<number[]>([0.5]);
  setVolume(state[0]);

  return (
    <div>
      <Range
        values={state}
        step={STEP}
        min={MIN}
        max={MAX}
        onChange={(values) => setState(values)}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: "36px",
              display: "flex",
              width: "93px",
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: "4px",
                width: "100%",
                borderRadius: "4px",
                background: getTrackBackground({
                  values: state,
                  colors: ["white", "#5e5e5e"],
                  min: MIN,
                  max: MAX,
                }),

                alignSelf: "center",
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props, isDragged }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "11px",
              width: "11px",
              borderRadius: "50%",
              backgroundColor: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              outline: 0,
            }}
          ></div>
        )}
      />
    </div>
  );
};

export default RangeSlider;
