import React from "react";


function getTodayDate(){

    const today = new Date();

    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();

    return `${day}-${month}-${year}`;
  };


function getDateTime() {

   const now = new Date();

   const months = [
      "Jan", "Feb", "Mar", "Apr",
      "May", "Jun", "Jul", "Aug",
      "Sep", "Oct", "Nov", "Dec"
   ];

   const day = now.getDate();
   const month = months[now.getMonth()];
   const year = now.getFullYear();

   const time = now.toLocaleTimeString('en-US');

   return `${day}-${month}-${year} / ${time}`;
}


export  {getDateTime,getTodayDate};