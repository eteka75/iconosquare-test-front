import React, { useEffect, useRef } from "react";

import { createRandomEvent } from "../utils/utils";
import Content from "./Content";
import { LiveChartProvider, useLiveChartContext } from "../utils/hooks/useLiveChartContext";

const ContainerContent = () => {
  const currentIndex = useRef(50);
  const { data,dispatch } = useLiveChartContext();

  const {isPlaying,events}=data;
  useEffect(() => {
    if (isPlaying){
    const intervalId = setInterval(() => {
      dispatch({
        type: "new_event",
        payload: createRandomEvent(++currentIndex.current),
      });
    }, 2000);
    return () => clearInterval(intervalId);
  }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, events.length]);

  return <Content />;
};

const Container = () => {
  return (
    <LiveChartProvider>
      <ContainerContent />
    </LiveChartProvider>
  );
};

export default Container;
