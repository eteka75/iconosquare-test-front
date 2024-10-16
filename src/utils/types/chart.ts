export interface Event {
  index:  number;
  value1:  number;
  value2:  number;
  comment?: string;
}
export interface State {
  events: Event[];
  isPlaying: boolean;
}

export interface LiveChartContextType {
    data: { events: Event[] }; 
    dispatch: React.Dispatch<any>;
}

export interface Action {
  type:  "new_event" | "update_event" |"toggle_play" |  "reset";
  payload?: Event; 
}
 
