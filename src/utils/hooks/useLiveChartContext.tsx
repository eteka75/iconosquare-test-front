import React, { useContext, useReducer, createContext, ReactNode } from 'react';
import { createRandomEvent } from "../utils";
import { Action, State } from "../types/chart";

const LiveChartContext = createContext< 
  | {
      data: State;
      dispatch: React.Dispatch<Action>; 
    }
  | undefined
>(undefined);


const initialEvents = Array.from(Array(50)).map((_, ix) =>
  createRandomEvent(ix)
);

const initialData: State = {
  events: initialEvents,
  isPlaying: true,
};

const liveChartReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "new_event":
      return {
        ...state,
        events: [...state.events, action.payload!], 
      };
    case "toggle_play":
      return {
        ...state,
        isPlaying: !state.isPlaying, 
      };
      case 'update_event':
        return {
            ...state,
            events: state.events.map((event, index) =>
                index === action.payload?.index ? { ...event, ...action.payload } : event
            ),
        };
        case "reset":
        return {
          events:initialEvents, 
          isPlaying: state.isPlaying,  
        };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const LiveChartProvider = ({ children }: { children: ReactNode }) => {
  const [data, dispatch] = useReducer(liveChartReducer, initialData);
  
  return (
    <LiveChartContext.Provider value={{ data, dispatch }}>
      {children}
    </LiveChartContext.Provider>
  );
};

const useLiveChartContext = () => {
  const context = useContext(LiveChartContext);
  if (!context) {
    throw new Error("useLiveChartContext must be used within a LiveChartProvider");
  }
  return context;
};

export { LiveChartProvider, useLiveChartContext };
