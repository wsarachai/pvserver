import {RectDiv, TooltipDiv, TooltipTableTR} from "../components/EnergyBalance/index.style";
import React from "react";

export const AxisLabel = (label,type) => {
    if (label > 10000 && (type === 'day' || type === 'month' , 'current')) {
        return `${Math.round(label/1000)}k`;
    } else if (label > 1000000 && (type === 'total' || type === 'year')) {
        return `${Math.round(label/1000000)}M`;
    } else if(type === 'total' || type === 'year'){
        if(label === 0){
            return `${label}`;
        } else {
            return `${label}M`;
        }
    }
    return label;
};

export const renderTooltip = (tabName, data, name) => {
    if (data.active) {
        if (data.payload) {
            let renderData = [];
            let sumValue = 0.0;
            let unit = "W";
            let hourUnit = 'h';

            if (tabName === 'current' || tabName === 'day') {
                hourUnit = '';
            }

            for (let item of data.payload) {
                sumValue = sumValue + parseFloat(item.value);
                let dataVale = 0;
                let data = {};
                if (item.name === 'EES') data.name = 'External energy supply';
                if (item.name === 'IPS') data.name = 'Internal power supply';
                if (item.name === 'SC') data.name = 'Self-consumption';
                if (item.name === 'GFI') data.name = 'Grid feed-in';

                if (item.value >= 1000000) {
                    dataVale = parseFloat(item.value)/1000000;
                    unit = "MW" + hourUnit;
                } else if (item.value >= 1000) {
                    dataVale = parseFloat(item.value)/1000;
                    unit = "kW" + hourUnit;
                }

                data.value = `${(dataVale).toFixed(2)}${unit}`;
                data.fill = item.fill;
                renderData.push(data);
            }
            if (sumValue >= 1000000) {
                sumValue = sumValue / 1000000;
                unit = "MW" + hourUnit;
            } else if (sumValue >= 1000) {
                sumValue = sumValue / 1000;
                unit = "kW" + hourUnit;
            }
            sumValue = `${(sumValue).toFixed(2)}${unit}`;

            return (
                <TooltipDiv>
                    <table>
                        <thead>
                            <TooltipTableTR>
                                <td><strong><span style={{ fontSize: 14 }}>{name}</span></strong></td>
                                <td><strong><span style={{ fontSize: 14 }}>{sumValue}</span></strong></td>
                            </TooltipTableTR>
                        </thead>
                        <tbody>
                        {renderData.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <RectDiv className="recharts-surface" width="14" height="14" viewBox="0 0 32 32" version="1.1">
                                        <path stroke="none" fill={item.fill} d="M0,4h32v24h-32z" className="recharts-legend-icon"/>
                                    </RectDiv>
                                    <span style={{ fontSize: 14 }}>{item.name}</span>
                                </td>
                                <td><span style={{ fontSize: 14 }}>{item.value}</span></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </TooltipDiv>
            )
        }
    }
}


export const renderLegend = (name) => {
    let data_name;
    if (name === 'EES') data_name = 'External energy supply';
    if (name === 'IPS') data_name = 'Internal power supply';
    if (name === 'SC') data_name = 'Self-consumption';
    if (name === 'GFI') data_name = 'Grid feed-in';
    return `${data_name}`
}
