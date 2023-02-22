import {  Area , AreaChart, CartesianGrid, ResponsiveContainer,Tooltip, XAxis, YAxis } from "recharts"
import { separateIosAndAndroidData ,convertArrtoDateUsersFormat } from "../utils/resuableServices"

const LineChartContainer = ({data}) => {
   let {androidData , iosData} = separateIosAndAndroidData(data)
   let androidDataObject = convertArrtoDateUsersFormat(androidData)
   let iosDataObject = convertArrtoDateUsersFormat(iosData)
   console.log(androidDataObject, "android")
   console.log(iosDataObject, "ios")
    // {
    //     data : "" , 
    //     androidusers : "",           data format for the chart
    //     iosusers : ""
    // }
   let lineChartData = []   
   Object.entries(iosDataObject).forEach(item => {
      let obj = {}     //assuming that android and ios have same number of dates oopsy 
      obj.date = item[0]    
      obj.iosUsers = item[1]  
      obj.androidUsers = androidDataObject.hasOwnProperty(item[0]) ? androidDataObject[item[0]] : 0
      lineChartData.push(obj)
   })

   return  ( 
    <>
            <h3>Android  vs Ios Users overall</h3>
            <ResponsiveContainer width={600} height="80%" debounce={10}>
              <AreaChart data={lineChartData}
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

export default LineChartContainer