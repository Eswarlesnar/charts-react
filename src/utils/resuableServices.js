import * as d3 from "d3"

export const separateIosAndAndroidData = (data) => {
    let androidData = d3.filter(data , (val) => val.Platform !== "ios")
    let iosData = d3.filter(data , val => val.Platform === "ios")
    return {androidData , iosData}
}


export const convertArrtoDateUsersFormat = (data) => {
    let reducedObject = {}
    data.forEach((item) => { 
        if(reducedObject[item.Date] ) { 
           reducedObject[item.Date] = reducedObject[item.Date] + Number(item["Daily Users"])
        }else {
           reducedObject[item.Date] = Number(item["Daily Users"])
        }
    })
    return reducedObject
}