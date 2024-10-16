import React, { useState } from 'react';
import { useLiveChartContext } from '../utils/hooks/useLiveChartContext';
import { Pause, Play } from 'lucide-react';

const LiveTable = ({ selectIndex }: { selectIndex: number | null }) => {
    const { data, dispatch } = useLiveChartContext();
    const nbTotalEvents = data?.events?.length
    const eventsFiltered = data.events.slice(nbTotalEvents - 20, nbTotalEvents);

    const [playinState, setPlayinState] = useState<boolean | null>(null);
    const [editingIndex, setEditingIndex] = useState<number | null>();
    const [editedValue1, setEditedValue1] = useState<number | null>(null);
    const [editedValue2, setEditedValue2] = useState<number | null>(null);
    
       const handleCellClick = (index: number) => {
        const event = data.events[index];
        if (event) {

            if (data.isPlaying===true) {
                setPlayinState(true);
                dispatch({ type: 'event_pause' });
            }else{
                setPlayinState(false);
            }

            setEditingIndex(index);
            setEditedValue1(event.value1);
            setEditedValue2(event.value2);
        }
    };
    const handleValueChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedValue1(Number(e.target.value));
    };
    const handleValueChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedValue2(Number(e.target.value));
    };
    const handleValueSubmit = (index: number) => {
        if (editedValue1 !== null && editedValue2 !== null) {
            dispatch({
                type: 'update_event',
                payload: {
                    ...data.events[index],
                    value1: editedValue1,
                    value2: editedValue2,
                },
            });
            if(playinState){
                dispatch({ type: 'event_play' });
            }
        }
        setEditingIndex(null);
    };
    const handlePlayPauseToggle = () => {
        if (data.isPlaying) {
            dispatch({ type: 'event_pause' }); 
        }else{
            dispatch({ type: 'event_play' });
        }
        handleCancelEdition();
    };

    const handleCancelEdition = () => {
        if(playinState){
            dispatch({ type: 'event_play' });
        }
        setEditingIndex(null);
        setEditedValue1(null);
        setEditedValue2(null);
    };

    const handleResetData = () => {
        dispatch({ type: 'reset' });
    };

    return (
        <div>
            <div className="md:justify-end  py-1 text-sm flex gap-2">
                <button onClick={handlePlayPauseToggle}
                    className="btn">
                   {data.isPlaying ? "Pause" : "Play"}
                   {data.isPlaying ?<Pause />  : <Play />}
                   
                </button>
                <button onClick={handleResetData}
                    className="btn">

                    Reset</button>
            </div>
            <div className="flex border border-gray-300 rounded mb-16">
                <div>
                    <div className="p-2 whitespace-nowrap">Index</div>
                    <div className="p-2 border-t whitespace-nowrap border-gray-300">Value 1</div>
                    <div className="p-2 border-t whitespace-nowrap border-gray-300">Value 2</div>
                </div>
                {eventsFiltered.map((event) => (
                    <div key={event.index} className={`border-l border-gray-300 flex-1 ${selectIndex === event.index &&'bg-blue-500 font-bold text-white'}`}>
                        <div className="p-2" onClick={() => handleCellClick(event.index)}>{event.index}</div>
                       <div className="p-2 border-t border-gray-300"
                            onClick={() => handleCellClick(event.index)} >
                          {editingIndex === event.index ? (
                                <input
                                    type="number"
                                    value={editedValue1 !== null ? editedValue1 : ''}
                                    onChange={handleValueChange1}
                                    className="border w-32 px-2 rounded"
                                />
                            ) : (
                                event.value1
                            )}
                        </div>
                        <div className="p-2 border-t border-gray-300" onClick={() => handleCellClick(event.index)}>
                            {editingIndex === event.index ? (
                                <input
                                    type="number"
                                    value={editedValue2 !== null ? editedValue2 : ''}
                                    onChange={handleValueChange2}
                                    className="border w-32 px-2 rounded"
                                />
                            ) : (
                                event.value2
                            )}</div>
                        {editingIndex === event.index && (
                            <div className="flex gap-2 justify-between mx-2 flex-row">
                                <button className="btn-primary" onClick={() => handleValueSubmit(event.index)}>
                                    Save
                                </button>
                                <button className="btn-secondary" onClick={handleCancelEdition}>
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

LiveTable.propTypes = {

};

export default LiveTable;