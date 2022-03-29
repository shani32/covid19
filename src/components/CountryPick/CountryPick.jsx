import React, {useState, useEffect} from "react";
import {NativeSelect, FormControl} from '@material-ui/core';
import styles from './CountryPick.module.css'
import {countries} from '../../api/api'

const CountryPick= ({handleCountryChange})=>{
const [getCountries, setGetCountries]=useState([]);

useEffect(()=>{
    const fetchCountries= async ()=>{
        setGetCountries( await countries())
    }
    fetchCountries()
},[setGetCountries])

    return(
       <FormControl className={styles.formControl}>
           <NativeSelect defaultValue='' onChange={(e)=> handleCountryChange(e.target.value)}>
               <option value="">Global</option>
               {getCountries.map((country, i)=> <option key={i} value={country}>{country}</option>)}
           </NativeSelect>

       </FormControl>
    )
}
export default CountryPick;
