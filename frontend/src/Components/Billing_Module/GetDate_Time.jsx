import React from "react";


function getDate(){

    const now = new Date();

   const months = [
      "Jan", "Feb", "Mar", "Apr",
      "May", "Jun", "Jul", "Aug",
      "Sep", "Oct", "Nov", "Dec"
   ];

   const day = now.getDate();
   const month = months[now.getMonth()];
   const year = now.getFullYear();

    return `${day}-${month}-${year}`;
  };


function getTime() {

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

   return `${time}`;
}


export  {getTime,getDate};