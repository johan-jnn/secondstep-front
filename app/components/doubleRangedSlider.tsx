import {useEffect, useRef, useState, type CSSProperties} from 'react';
import './styles/sliders.scss';

interface value {
  /**
   * The start cursor value
   */
  start: number;
  /**
   * The end cursor value
   */
  end: number;
  /**
   * The [min, max] value a cursor can have
   */
  range: [number, number];
}

interface range {
  min: number;
  max: number;
  value: number;
}
interface state {
  ranges: {
    start: range;
    end: range;
  };
}

export interface doubleRangedSliderProps {
  min: number;
  max: number;
  step?: number;
  default?: {
    start: number;
    end: number;
  };
  onUpdate?: (value: value) => any;
  onChange?: (value: value) => any;

  form?: {
    start_input_name: string;
    end_input_name: string;
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
  step,
  id,
}: doubleRangedSliderProps) {
  step ??= 1;
  const [startValue, setStartValue] = useState(defaultValues?.start || min);
  const [endValue, setEndValue] = useState(defaultValues?.end || max);

  function getStepPrecision(value: number, step: number) {
    if (step <= 0) return 0;
    return step >= 1
      ? Math.floor(value)
      : parseFloat(value.toFixed(step.toString().split('.')[1].length));
  }

  const state = useRef(
    getState({
      range: [min, max],
      start: startValue,
      end: endValue,
    }),
  );

  function fire(f: NonNullable<typeof onChange>) {
    const {start, end} = state.current.ranges;
    f({
      start: getStepPrecision(start.value, step || 1),
      end: getStepPrecision(end.value, step || 1),
      range: [start.min, end.max],
    });
  }

  useEffect(() => {
    state.current = getState({
      range: [min, max],
      start: startValue,
      end: endValue,
    });
  }, [startValue, endValue, min, max]);

  return (
    <div
      className="dbl-slider"
      style={
        {
          gridTemplateColumns: state.current
            ? `${
                (state.current.ranges.start.max /
                  state.current.ranges.end.max) *
                100
              }% ${
                (1 -
                  state.current.ranges.start.max /
                    state.current.ranges.end.max) *
                100
              }%`
            : 'auto auto',
          '--start-range-tx':
            (state.current.ranges.start.value -
              state.current.ranges.start.min) /
            (state.current.ranges.start.max - state.current.ranges.start.min),
          '--end-range-tx':
            (state.current.ranges.end.value - state.current.ranges.end.min) /
            (state.current.ranges.end.max - state.current.ranges.end.min),
        } as CSSProperties
      }
      id={id}
    >
      <input
        type="range"
        name={form?.start_input_name}
        id="slider_range_start"
        min={state.current.ranges.start.min}
        max={state.current.ranges.start.max}
        step={step}
        value={startValue}
        onInput={({currentTarget}) => {
          setStartValue(parseFloat(currentTarget.value));
          onUpdate && fire(onUpdate);
        }}
        onChange={({currentTarget}) => {
          setStartValue(parseFloat(currentTarget.value));
          onChange && fire(onChange);
        }}
        onMouseUp={({currentTarget}) => {
          setStartValue(parseFloat(currentTarget.value));
          onChange && fire(onChange);
        }}
        title={`Start cursor (value: ${state.current.ranges.start.value} / ${state.current.ranges.end.max})`}
      />
      <input
        type="range"
        name={form?.end_input_name}
        id="slider_range_end"
        min={state.current.ranges.end.min}
        max={state.current.ranges.end.max + 1}
        step={step}
        value={endValue}
        onInput={({currentTarget}) => {
          setEndValue(parseFloat(currentTarget.value));
          onUpdate && fire(onUpdate);
        }}
        onChange={({currentTarget}) => {
          setEndValue(parseFloat(currentTarget.value));
          onChange && fire(onChange);
        }}
        onMouseUp={({currentTarget}) => {
          setEndValue(parseFloat(currentTarget.value));
          onChange && fire(onChange);
        }}
        title={`End cursor (value: ${state.current.ranges.end.value} / ${state.current.ranges.end.max})`}
      />
    </div>
  );
}

function getState({start, end, range}: value): state {
  const middleValue = (start + end) / 2;
  return {
    ranges: {
      start: {
        min: range[0],
        max: middleValue,
        value: start,
      },
      end: {
        min: middleValue,
        max: range[1],
        value: end,
      },
    },
  };
}
