import React from "react";
import Cards from "./components/Cards/Cards";
import Charti from "./components/Chart/Chart";
import CountryPick from "./components/CountryPick/CountryPick";
// import {Cards, Chart, CountryPick} from './components'
import styles from './App.module.css';
import {getData} from './api/api';
import corona from './assets/covid.png'

class App extends React.Component{
  state={
    data:{},
    country:'',
  }
 async componentDidMount(){
    const fetchData= await getData();

    this.setState({data:fetchData})
  }

  handleCountryChange=async(country)=>{
    const fetchData= await getData(country);
    this.setState({data:fetchData, country:country})
  }
  render() {
    const {data, country}= this.state;
    return(
    <div className={styles.container}>
      <img className={styles.image} src={corona} alt="corona"/>
   <Cards data={data}/>
   <CountryPick handleCountryChange={this.handleCountryChange}/>
   <Charti data={data} country={country}/>
   
    </div>
   ) 
 } 
}

export default App;
