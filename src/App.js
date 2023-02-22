import { useEffect , useState} from 'react';
import * as d3 from "d3"
import sampledata from "./data/datasample.csv"
import './App.css';
import AreaChartContainer from "./Components/AreaCharContainer"
import LineChartContainer from './Components/LineChartContainer';


function App() {
 
  // const [platformFilter , setPlatformFilter] = useState("all")
  const [isDataAvailable , setIsDataAvailable] = useState(false)
  const [sortedData , setSortedData] = useState(false)
  const [overallUsersandDatesData , setOverallUsersandDatesData] = useState({})
  const [filterTypes , setFilterTypes] = useState({})
  // const [chartData , setChartData] = useState({})
  useEffect(() => {
    d3.csv(sampledata).then(result => {    
      // console.log(result)
      getReducedData(result)
    })
  }, [])

  const getReducedData = (data) => {
      let sortAscendingOrder =  d3.sort( data , (a,b) => d3.ascending(a.Date , b.Date))
      setSortedData(sortAscendingOrder)
      let reducedObject = {} 
      sortAscendingOrder.forEach((item) => {                                         
         if(reducedObject[item.Date] ) { 
            reducedObject[item.Date] = reducedObject[item.Date] + Number(item["Daily Users"])
         }else {
            reducedObject[item.Date] = Number(item["Daily Users"])
         }
      })
      const getPlatformFilterTypes  = ["All"]
      const getCountryFilterTypes = ["All"]
      const getAppFilterTypes = ["All"]
      sortAscendingOrder.forEach(item => {
         if(!getPlatformFilterTypes.includes(item.Platform)){
           getPlatformFilterTypes.push(item.Platform)
         }
         if(!getCountryFilterTypes.includes(item.Country)){
           getCountryFilterTypes.push(item.Country)
         }
         if(!getAppFilterTypes.includes(item.App)){
          getAppFilterTypes.push(item.App)
         }
      })
      setFilterTypes({
        Platform : getAppFilterTypes,
        Country : getCountryFilterTypes, 
        App : getAppFilterTypes
      })
      setOverallUsersandDatesData(reducedObject)
      setIsDataAvailable(true)
  }
  return (
    <div className="App">
      
      {
        isDataAvailable && 
        <div style = {{display : "flex" , justifyContent : "center",  gap : "100px" , flexWrap : "wrap",  marginTop : "100px"}}>
          <div className='areachart-container' style = {{ width : "700px" ,height : "400px"}}>
            <AreaChartContainer  data = {overallUsersandDatesData}/>
          </div>
          <div style = {{ width : "700px" ,height : "400px"}}>
             <LineChartContainer data = {sortedData} filterTypes = {filterTypes}/>
          </div>
        </div>   
      }
    </div>
  );
}

export default App;
