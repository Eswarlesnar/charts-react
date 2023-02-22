import * as d3 from "d3"

export const separateIosAndAndroidData = (data , filterDetails) => {
    let androidData = d3.filter(data , (val) => val.Platform !== "ios")
    let iosData = d3.filter(data , val => val.Platform === "ios")
    if(filterDetails.value == "All"){
        //we are sending all the data
    }else{
        androidData = d3.filter(androidData , val => val[filterDetails.type] === filterDetails.value)
        iosData = d3.filter(iosData , val => val[filterDetails.type] === filterDetails.value)
    }
    return new Promise((resolve , reject) => {
       setTimeout(() => {
        resolve({androidData , iosData})
       }, 1000);
    })
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
    return reducedObject     //[{Date : "" , Users : ""}]
} 