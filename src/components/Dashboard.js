import React,{useEffect,useState} from 'react'
import '../styles/dashboard.css'
import {useDispatch, useSelector} from 'react-redux'
import{startGetBills} from '../actions/billAction'
import{startGetProducts} from '../actions/productsAction'
import { startGetUsers } from '../actions/usersAction';
import { startGetCustomers } from '../actions/customersAction';

import Card from "react-bootstrap/Card";
import ListGroup  from "react-bootstrap/ListGroup"
import {BarChart,XAxis,YAxis,Tooltip,Legend,Bar,CartesianGrid} from 'recharts'
function Dashboard() {
    const bills=useSelector((state)=>{
        return state.bills
    })
    const d = new Date();
    const n = d.getMonth()+1;
    const r = d.getFullYear();
    const years={1:'Jan',2:'Feb',3:'Mar',4:'Apr',5:'May',6:'Jun',7:'Jul',8:'Aug',9:'Sept',10:'Oct',11:'Nov',12:'Dec'}
    const [monthBill,setMonthBill]=useState('')
    const [monthSum,setMonthSum]=useState('')
    const[month,setMonth]=useState(years[n])
    const[firstYear,setFirstYear]=useState(r)
 
 
    const customers=useSelector((state)=>{
        return state.customers
    })
    const products=useSelector((state)=>{
        return state.products
    })
   
    let a=[]
    let b={}//customer  frequency
    let c={}//product frquency
  //  const topProducts=bills.map()
    let mike=[...bills]
    let draken=[...customers]
    let manjiro=[...products]
   let sortMike= mike.sort((a,b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0))
    let manjiroSort=manjiro.sort((a,b) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0))
    let drakenSort=draken.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
  
    const [currDate,setCurrDate]=useState(n)
    useEffect(()=>{
        let kiwi=mike.filter((ele)=>{
            let t=ele.date.split('-')
           return( (Number(currDate)==Number(t[1]))&&(firstYear==Number(t[0])))
       })
       setMonthBill(kiwi)
       let sum=0//monthly income
       kiwi.forEach((ele)=>{
           sum+=ele.total
       })
       setMonthSum(sum)
       setMonth(years[currDate])
       console.log('kiwi',kiwi)
       console.log('month sum',sum)
    },[currDate,firstYear])
    //overall monthly total
    const goku=mike.filter((ele)=>{
         let t=ele.date.split('-')
        return Number(currDate)==Number(t[1])
    })
    let sum=0//monthly income
goku.forEach((ele)=>{
    sum+=ele.total
})
    //customer frquency
    draken.forEach((ele)=>{
        b[ele.name]=0
        
    })
for( let i=0;i<mike.length;i++){
    let sd=mike[i].name
    // console.log('sd',sd)
    if(Object.keys(b).includes(sd)){
        b[sd]=b[sd]+1
    }

}
// let bus=0
// for (const x in b){
// if(b[x]>bus){
//     bus=x
// }
// }
const lowestCustomer = Object.keys(b).sort(function(a,c){return b[a]-b[c]})
const highestCustomer=lowestCustomer.reverse()
const topCustomers=highestCustomer.slice(0,5)
 const graphCustomer=[]
let idli2={}//graphdata customers
for(const x in b){
    for(let i=0;i< topCustomers.length;i++){
        if(x==topCustomers[i]){
        idli2['Name']=topCustomers[i].toString()
        idli2['Visited']=b[x]
        graphCustomer.push(idli2)
        idli2={}
        }
    }
}
const gc2=graphCustomer.filter((ele)=>ele.hasOwnProperty('Name'))
//products frequency
let egg={}
let dee={}//linking id and product name to connect later
manjiro.forEach((ele)=>{
    dee[ele.name]=ele._id
})
manjiro.forEach((ele)=>{
    c[ele._id]=0
    
})
for( let i=0;i<mike.length;i++){
    for(let j=0;j<mike[i].lineItems.length;j++){
        let elbow=mike[i].lineItems
        if(Object.keys(c).includes(elbow[j].product)){
c[elbow[j].product]+=elbow[j].quantity
        }
    }}
for(const x in dee){
    for (const y in c){
        if(dee[x]== y){
       
        egg[x]=c[y]
    }
    
}

}
const sortEggs=Object.keys(egg).sort(function(a,c){return egg[a]-egg[c]})//products frequency sorted ascend
const highestProduct=sortEggs.reverse().slice(0,5)    
const graphProduct=[]
let idli={}//graph data products
for(const x in egg){
    for(let i=0;i< highestProduct.length;i++){
        if(x==highestProduct[i]){
        idli['Quantity']=egg[x]
        idli['Product']=highestProduct[i]
        graphProduct.push(idli)
        idli={}
        // let xmen={highestProduct[i]:egg[x]}
        //     graphProduct.push({highestProduct[i]:egg[x]})
        }
    }
}

const idliArray=[]

// mike.forEach((ele)=>{
    //     a.forEach((e)=>{
    //         if(e==ele.name){
    //             [e]=a.e +1
    //         }
    //     })
    // })

    // const frequencyObj={}
    // customers.forEach((customer)=>{
    //     const customerOrders=customers.filter((c)=>{
    //         return c.Phone === customer.Phone
    //     })
    //     if(customerOrders.length >=5){
    //         frequencyObj['5+']++
    //     }
    //     else{
    //         frequencyObj[customerOrders.length]++
    //     }
    // })

    const dispatch=useDispatch()
    useEffect(()=>{

        dispatch(startGetBills())
        dispatch(startGetCustomers())
        dispatch (startGetProducts())
        dispatch(startGetUsers())
        let kiwi=mike.filter((ele)=>{
            let t=ele.date.split('-')
           return( (Number(currDate)==Number(t[1]))&&(firstYear==Number(t[0])))
       })
       setMonthBill(kiwi)
       let sum=0//monthly income
       kiwi.forEach((ele)=>{
           sum+=ele.total
       })
       setMonthSum(sum)
       setMonth(years[currDate])
       console.log('kiwi',kiwi)
       console.log('month sum',sum)
     //   const z=bills[0]&&JSON.parse(bills[0].date)
        console.log('assembly',lowestCustomer )
        console.log('assembly1',highestCustomer )
        console.log('newarray',b)
        console.log('assembly2')
        console.log('ccccc',c)
        console.log('eggs',egg)
        console.log('eggssorted',sortEggs)
        console.log('goku',goku)
        console.log('sum',sum)
        console.log('idli',idli2)
        console.log('firstyear',firstYear)
        console.log('graphproduct',gc2)
        
    },[])
    return (<div>
  
<h1>Dashboard</h1><hr/>
        <div className='cell'>
        
<div className='babycell'><h3>Over-all</h3><hr/>

<Card
    bg='dark'
   
    text='white'
    
    className="mb-2"
  >
    <Card.Header><div>
    <input type='button' value='<<' onClick={()=>{setFirstYear(firstYear-1)}}/>&nbsp;{firstYear}&nbsp;<input type='button' value='>>'onClick={()=>{
    setFirstYear(firstYear+1)
    
    }}/>  
                </div>
                <input type='button' value='<<' onClick={()=>{setCurrDate(currDate-1)}}/>&nbsp;{month}&nbsp;<input type='button' value='>>'onClick={()=>{
    setCurrDate(currDate+1)
    
    }}/></Card.Header>
    <Card.Body>
      <Card.Title>Monthly Income </Card.Title>
      <Card.Text>
       {monthSum    }
      </Card.Text>
    </Card.Body>
  </Card>
</div>            
<div className='babycell'><h3>Customers</h3><hr/>
<BarChart className='graph' width={300} height={350} data={graphCustomer}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="Name" />
  <YAxis />
  <Tooltip />

  <Bar dataKey="Visited" fill="#8884d8" />
 
</BarChart>

<Card style={{ width: '18rem' }}>
  <Card.Header>Customer leaderboard</Card.Header>
  <ListGroup variant="flush">
      {topCustomers.map((ele,id)=>{
          return(<ListGroup.Item>{id+1}. {ele}</ListGroup.Item>)
      })}
  
  </ListGroup>
</Card>
</div>
<div className='babycell'><h3>Products</h3><hr/>
<BarChart className='graph' width={300} height={350} data={graphProduct}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="Product" />
  <YAxis />
  <Tooltip />

  <Bar dataKey="Quantity" fill="#8884d8" />
 
</BarChart>
<Card style={{ width: '18rem' }}>
  <Card.Header> Frequently brought products</Card.Header>
  <ListGroup variant="flush">
      {highestProduct.map((ele,id)=>{
          return(<ListGroup.Item>{id+1}. {ele}</ListGroup.Item>)
      })}
  
  </ListGroup>
</Card>

</div>
        </div>
        </div>
    )
}

export default Dashboard
