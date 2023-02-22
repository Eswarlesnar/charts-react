import {  Area, CartesianGrid, ResponsiveContainer, AreaChart,Tooltip, XAxis, YAxis } from "recharts"

const AreaChartContainer = ({data}) => {
    // console.log(data)
    let modifiedDataforChart = []
    Object.entries(data).forEach(item => {
        let obj = {}
        obj["time"] = item[0]
        obj["users"] = item[1]
        modifiedDataforChart.push(obj)
    })
    // console.log(modifiedDataforChart)

          return <>
            <h3>Overall Data</h3>
            <ResponsiveContainer width={700} height="80%" debounce={10}>
              <AreaChart data={modifiedDataforChart}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <XAxis dataKey="time" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area type="monotone" dataKey="users" stroke="#8884d8" fill="#8884d8" />
              </AreaChart>
            </ResponsiveContainer>
          </>
    
}

export default AreaChartContainer