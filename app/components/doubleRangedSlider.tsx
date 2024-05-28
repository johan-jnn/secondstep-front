import {useEffect, type CSSProperties} from 'react';

export interface doubleRangedSliderProps {
  min: number;
  max: number;
  default?: {
    start: number;
    end: number;
  };
  onUpdate?: (start: number, end: number) => any;
  onChange?: (start: number, end: number) => any;

  form?: {
    start_input_name: string;
    end_input_name: string;
  };

  styles?: {
    track?: {
      left?: CSSProperties;
      inner?: CSSProperties;
      right?: CSSProperties;
    };
    balls?: CSSProperties;
  };

  id?: string;
}

export default function DoubleRangedSlider({
  form,
  min,
  max,
  default: defaultValues,
  onChange,
  onUpdate,
  styles,
  id,
}: doubleRangedSliderProps) {
  let state;

  useEffect(() => {});

  return (
    <div className="dbl-slider" id={id}>
      {form && (
        <>
          <input type="hidden" name={form.start_input_name} value={''} />
          <input type="hidden" name={form.end_input_name} value={''} />
        </>
      )}

      <div className="track">
        <div
          className="left"
          style={{
            ...styles?.track?.left,
          }}
        >
          <span
            className="ball"
            style={{
              ...styles?.balls,
            }}
          ></span>
        </div>
        <div
          className="inner"
          style={{
            ...styles?.track?.inner,
          }}
        ></div>
        <div
          className="right"
          style={{
            ...styles?.track?.right,
          }}
        >
          <span
            className="ball"
            style={{
              ...styles?.balls,
            }}
          ></span>
        </div>
      </div>
    </div>
  );
}
