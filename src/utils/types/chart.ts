export interface Event {
  index:  number;
  value1:  number;
  value2:  number;
  comment?: string;
  isEditable?: "yes"|'no';
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
  type:  "new_event" | "update_event" |"event_pause" |"event_play" |  "reset";
  payload?: Event; 
}
 
