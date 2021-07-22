import React,{useState,useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { startGetBills } from '../actions/billAction';
import { startGetUsers } from '../actions/usersAction';

import '../styles/products.css'

export default function FormDialog({bill,popup,setPopup}) {

  const products=useSelector((state)=>{
    return state.products
  })
  const users=useSelector((state)=>{
      return state.users
  })
  const dispatch=useDispatch()
  const a=users[0].businessName
  useEffect(()=>{
    dispatch(startGetBills())
    dispatch(startGetUsers())
  },[])
  let z=[]
    if (bill.lineItems){
      for (let i=0;i<bill.lineItems.length;i++){
        for(let j=0;j<products.length;j++){
          if(bill.lineItems[i].product ==products[j]._id){
            z.push([{"name":products[j].name},
            {"quantity":bill.lineItems[i].quantity},
            {"price":bill.lineItems[i].price},
            {"subTotal":bill.lineItems[i].subTotal}])
      }
    }
  }
 }
  const handleClose = () => {
    setPopup(false);
  };
  return (
   <div>
     {bill&&
     <Dialog open={popup} onClose={handleClose} aria-labelledby="form-dialog-title">
     <DialogTitle id="form-dialog-title">Bill</DialogTitle>
     <DialogContent>
         <p>Bill no - {bill._id.toUpperCase()}</p>
         <p>Date - {bill.date.slice(0,10)}</p>
         <p>Customer name - {bill.name}</p>
         <p>Bill by - {a}</p>
         <p>Bill generated at - {bill.createdAt}</p>
         <p>Bill last updated at - {bill.updatedAt}</p>
         <p>Final Total - {bill.total}</p>
         <table className='table1'  >
           <thead>
             <tr>
               <th className='th1'>Id</th>
               <th className='th1'>Product</th>
               <th className='th1'>Price</th>
               <th className='th1'>Quantity</th>
               <th className='th1'>Total</th>
             </tr>
           </thead>
           <tbody>
             {
               z.map((ele,id)=>{
                 return(
                   <tr>
                      <td>{id+1}</td>
                     {ele.map((e)=>{
                       return (<td>
                         <td>{e.name&&e.name.toString().slice(0,15)}</td>
                         <td>{e.price}</td>
                         <td>{e.quantity}</td>
                         <td>{e.subTotal}</td>
                       </td>
                       )
                     })}
                   </tr>
                 )
               })
             }
           </tbody>
         </table>
     </DialogContent>
     <DialogActions>
     <Button onClick={handleClose} color="primary">ok</Button>
     </DialogActions>
     </Dialog>
     }
    </div>
  );
}
