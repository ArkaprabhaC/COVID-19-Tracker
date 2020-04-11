import React, {useEffect, useState} from 'react';
import {fetchDailyData} from '../../api/index';
import  {Line,Bar} from 'react-chartjs-2';

const Charts = ({data: {confirmed, deaths, recovered}, country}) => {

    const [dailyData,setDailyData] = useState([]);

    useEffect(()=>{
        const fetchAPI = async () =>{
            setDailyData(await fetchDailyData());  //sets the array here
        }
        fetchAPI();
    }, [])

    const lineChart = (
        dailyData.length !== 0 ? 
            <Line
                data={{
                    labels: dailyData.map(({date}) =>  date),  //indicates data in x direction! //label accepts array
                    datasets: [{
                        data: dailyData.map(({confirmed}) => confirmed),
                        label: "Infected",
                        borderColor: '#3333ff',
                        fill:true
                    }, {
                        data: dailyData.map(({deaths}) => deaths),
                        label: "Deaths",
                        borderColor: 'red',
                        backgroundColor: 'rgba(255,0,0,0.7)',
                        fill:true
                    }]
                }}
            /> : null
    );

    const barChart = (
        confirmed ? 
            (
                <Bar
                    data={{
                        labels:['Infected','Recovered','Deaths'],
                        datasets: [{
                            label: 'People',
                            backgroundColor: ['rgba(0,0,255,0.7)','rgba(0,255,0,0.7)','rgba(255,0,0,0.7)'],
                            data:[confirmed.value, deaths.value, recovered.value]
                        }]
                    }}
                    
                    options={{
                        legend: {display: false},
                        title: {display: true, text: `Current State in ${country}`}
                    }}
                />
            
            ) : null
    );

    return(
        <div>
            {country ? barChart : lineChart}
        </div>
    )
}

export default Charts;