import { useState } from 'react';
import {
    Area,
    AreaChart,
    CartesianGrid,
    Tooltip,
    XAxis,
    YAxis,
    ResponsiveContainer
} from 'recharts';
import { useLiveChartContext } from '../utils/hooks/useLiveChartContext';
import LiveTable from './LiveTable';
import { ChevronLeft, ChevronRight } from 'lucide-react';


const LiveChart = () => {
    const { data } = useLiveChartContext();
    const nbTotalEvents = data?.events?.length;
    const eventsFiltered = data.events.slice(nbTotalEvents - 20, nbTotalEvents);
    const [editIndex, setEditIndex] = useState<number | null>(null);

    const handleChartClick = (e: { activeTooltipIndex?: number }) => {
        const clickedIndex = e.activeTooltipIndex;
        if (clickedIndex !== undefined) {
            const realIndexInData = nbTotalEvents - 20 + clickedIndex;
            setEditIndex(realIndexInData);
        }
    };

    const handlePrevious = () => {
        if (editIndex !== null && editIndex > 0) {
            setEditIndex(editIndex - 1);
        }
    };

    const handleNext = () => {
        if (editIndex !== null && editIndex < nbTotalEvents - 1) {
            setEditIndex(editIndex + 1);
        }
    };

    return (
        <>
           { editIndex !== null && editIndex !== 0 && <div className="mb-4 flex justify-between items-center">
                <button
                    onClick={handlePrevious}
                    disabled={editIndex === null || editIndex === 0}
                    className="btn"
                >
                    <ChevronLeft />
                    Prev
                </button>
                <div className="text-center">
                    {editIndex !== null ? `Index sélectionné: ${editIndex}` : 'Sélectionnez un événement'}
                </div>
                <button
                    onClick={handleNext}
                    disabled={editIndex === null || editIndex >= nbTotalEvents - 1}
                    className="btn"
                >
                    Next <ChevronRight />
                </button>
            </div>}
            <div className="mb-8">
                <ResponsiveContainer height={250}>
                    <AreaChart onClick={handleChartClick} data={eventsFiltered} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="index" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Area
                            isAnimationActive={false}
                            type="monotone"
                            dataKey="value1"
                            stroke="#8884d8"
                            fillOpacity={1}
                            fill="url(#colorUv)"
                        />
                        <Area
                            isAnimationActive={false}
                            type="monotone"
                            dataKey="value2"
                            stroke="#82ca9d"
                            fillOpacity={1}
                            fill="url(#colorPv)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            <LiveTable selectIndex={editIndex} />
        </>
    );
};

export default LiveChart;
