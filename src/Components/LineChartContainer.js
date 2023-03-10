import {  Area , AreaChart, CartesianGrid, ResponsiveContainer,Tooltip, XAxis, YAxis } from "recharts"
import { useState , useEffect} from "react"
import { separateIosAndAndroidData ,convertArrtoDateUsersFormat } from "../utils/resuableServices"

const LineChartContainer = ({data , filterTypes}) => {


  
// //    let androidDataObject = convertArrtoDateUsersFormat(androidData)      
// //    let iosDataObject = convertArrtoDateUsersFormat(iosData)
   let [appFilter  , setAppFilter] = useState("All")
   let [chartData ,setChartData] = useState([])
  
   const getAndroidandIosData = async (filter) => {
      
      let {androidData , iosData} = await separateIosAndAndroidData(data , filter)
      let androidDataObject = convertArrtoDateUsersFormat(androidData)      
      let iosDataObject = convertArrtoDateUsersFormat(iosData)
      let lineChartData = []   
      Object.entries(iosDataObject).forEach(item => {
         let obj = {}     //assuming that android and ios have same number of dates oopsy 
         obj.date = item[0]    
         obj.iosUsers = item[1]  
         obj.androidUsers = androidDataObject.hasOwnProperty(item[0]) ? androidDataObject[item[0]] : 0
         lineChartData.push(obj)
      })
      setChartData(lineChartData)
   }
   const handleFilterChange = (e) => {
        
        getAndroidandIosData({
            type : "App",
            value : e.target.value,
        })
        setAppFilter(e.target.value)
   }
   
   useEffect( () => {
        getAndroidandIosData({
            type : "App",
            value : appFilter,
          })
   }, [])
 
    // {
    //     data : "" , 
    //     androidusers : "",           data format for the chart
    //     iosusers : ""
    // }

   return  ( 
    <>
            <h3>Android  vs Ios Users </h3>
            {
                !chartData.length >1  ? "Loading" : (
            <>
            
                <select value= {appFilter} onChange= {handleFilterChange}>
                    {
                        filterTypes.App.map(item  =>  {
                            return <option value = {item} key={item}>{item}</option>
                        })
                    }
                </select>
                <ResponsiveContainer width={600} height="80%" debounce={10}>
                <AreaChart data={chartData}
                    margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area type="monotone" dataKey="iosUsers" stroke="#8884d8" fill="#8884d8" />
                    <Area type ="monotoneX" dataKey= "androidUsers" fill = "red" stroke = "red" />
                </AreaChart>
                </ResponsiveContainer>
            </>)
           } 
          </>)
}

export default LineChartContainer