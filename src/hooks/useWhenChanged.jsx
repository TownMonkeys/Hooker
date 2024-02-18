import { useEffect, useRef, useCallback } from "react";

const useWhenChanged = (values, ...callbacks) => {
  const previousValuesRef = useRef();

  useEffect(() => {
    previousValuesRef.current = values;
  }, []);

  const memoizedCallbacks = useCallback(() => {
    callbacks.forEach((callback) => {
      if (callback.length === 0) {
        callback();
      } else {
        callback();
      }
    });
  }, [callbacks]);

  useEffect(() => {
    const hasChanged = Array.isArray(values)
      ? values.some(
          (value, index) =>
            previousValuesRef.current &&
            value !== previousValuesRef.current[index]
        )
      : previousValuesRef.current && values !== previousValuesRef.current;

    if (hasChanged) {
      memoizedCallbacks();
    }

    previousValuesRef.current = values;
  }, [values, memoizedCallbacks]);
};

export default useWhenChanged;
