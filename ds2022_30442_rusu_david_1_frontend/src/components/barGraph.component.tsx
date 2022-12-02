import { XYPlot, XAxis, YAxis, HorizontalGridLines, FlexibleXYPlot , VerticalGridLines, VerticalBarSeries } from 'react-vis';
import '../../node_modules/react-vis/dist/style.css';

interface Props {
    data: {
        x: string,
        y: number
    }[],
}


const BarGraph = (props: Props) => {

    return (
            <FlexibleXYPlot  xType='ordinal' animation>
            <VerticalBarSeries barWidth={0.5} data={props.data} />
                <HorizontalGridLines />
                <VerticalGridLines />
                <XAxis title='Time'/>
                <YAxis title='Consumption'/>
            </FlexibleXYPlot>
    );
}

export default BarGraph;