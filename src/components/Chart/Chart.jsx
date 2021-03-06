import React, {useState, useEffect} from "react";
import { getDailyData } from "../../api/api";
import {Line, Bar} from 'react-chartjs-2';
import styles from './Chart.module.css';
import Chart from 'chart.js/auto'

const Charti= ({data: {confirmed, deaths, recovered}, country})=>{
    const [dailyData, setDailyData]= useState([]);

    useEffect(()=>{
        const fetch= async()=>{
            setDailyData(await getDailyData())
        }
        console.log(dailyData)
        fetch()
    },[])

    const lineChart=(
        dailyData.length 
        ?(
            <Line
            data={{
                labels:dailyData.map(({date})=>date),
                datasets:[{
                    data: dailyData.map(({confirmed})=> confirmed),
                    label:'Infected',
                    borderColor: '#33333ff',
                    fill:true,
                },{
                    data: dailyData.map(({deaths})=> deaths),
                    label:'Deaths',
                    borderColor: 'red',
                    backgroundColor:'rgba(255,0,0,0.5)',
                    fill:true,
                }],
            }}
            />):null
        )
        const barChart=(
            confirmed
            ? (
                <Bar
                data={{
                    labels:['Infected', 'Recovered', 'Deaths'],
                    datasets:[{
                        label: 'People',
                        backgroundColor:[
                            'purple',
                            'rgba(0,255,0,0.5)',
                            'green',
                        ],
                        data: [confirmed.value, recovered.value, deaths.value]
                    }]
                }}
                options={{
                    legend:{display:false},
                    title: {display:true, text: `Current state in ${country}`}
                }}
                />
            ): null
        )
    
    return(
        <div className={styles.container}>
            {country? barChart: lineChart}

        </div>
    )
}
export default Charti;