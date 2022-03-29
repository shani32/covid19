import axios from 'axios';

const url='https://covid19.mathdro.id/api';

export const getData= async(country)=>{
    let changeUrl=url;
    if(country){
        changeUrl=`${url}/countries/${country}`
    }
    try{
       const {data}= await axios.get(changeUrl)
       const neededData={
           confirmed: data.confirmed,
           recovered: data.recovered,
           deaths: data.deaths,
           lastUpdate:data.lastUpdate
       }
        return neededData;
    }catch(error){
        console.log(error)

    }
    
}
export const getDailyData=async()=>{
    try{
    const {data}= await axios.get(`${url}/daily`)
    const modifiedData= data.map((dailyData)=> ({
        confirmed:dailyData.confirmed.total,
        deaths: dailyData.deaths.total,
        date: dailyData.reportDate,
    }))    
    return modifiedData
    }catch(error){
        console.log(error)
    }
    

}

export const countries= async ()=>{
    try{
        const {data: {countries}}= await axios.get(`${url}/countries`)
        return countries.map((country)=>country.name)
    }catch(error){
        console.log(error)

    }
}