import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Plot from 'react-plotly.js';
import Loader from '../Loader';
import Head from 'next/head';

const Accounting = () => {

    const { isLoggedIn } = useSelector((state) => state.user);

    const [todayOrders, setTodayOrders] = useState();
    const [yesterdayOrders, setYesterdayOrders] = useState();
    const [theDayBeforYesterdayOrders, setTheDayBeforYesterdayOrders] = useState();
    const [threeDaysAgoOrders, setThreeDaysAgoOrders] = useState();
    const [fourDaysAgoOrders, setFourDaysAgoOrders] = useState();
    const [fiveDaysAgoOrders, setFiveDaysAgoOrders] = useState();
    const [sixDaysAgoOrders, setSixDaysAgoOrders] = useState();
    const [sevenDaysAgoOrders, setSevenDaysAgoOrders] = useState();

    useEffect(() => {
        if (isLoggedIn) {
          axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/orders`).then((response) => {
            setTodayOrders(response.data.filter(item => item.paid = true && item.date == new Date().toLocaleDateString("fa-IR-u-nu-latn", { year: "numeric", month: "2-digit", day: "2-digit",})));
            setYesterdayOrders(response.data.filter(item => item.paid = true && item.date == new Date(Date.now() - (24 * 60 * 60 * 1000)).toLocaleDateString("fa-IR-u-nu-latn", { year: "numeric", month: "2-digit", day: "2-digit",})));
            setTheDayBeforYesterdayOrders(response.data.filter(item => item.paid = true && item.date == new Date(Date.now() - (2 * 24 * 60 * 60 * 1000)).toLocaleDateString("fa-IR-u-nu-latn", { year: "numeric", month: "2-digit", day: "2-digit",})));
            setThreeDaysAgoOrders(response.data.filter(item => item.paid = true && item.date == new Date(Date.now() - (3 * 24 * 60 * 60 * 1000)).toLocaleDateString("fa-IR-u-nu-latn", { year: "numeric", month: "2-digit", day: "2-digit",})));
            setFourDaysAgoOrders(response.data.filter(item => item.paid = true && item.date == new Date(Date.now() - (4 * 24 * 60 * 60 * 1000)).toLocaleDateString("fa-IR-u-nu-latn", { year: "numeric", month: "2-digit", day: "2-digit",})));
            setFiveDaysAgoOrders(response.data.filter(item => item.paid = true && item.date == new Date(Date.now() - (5 * 24 * 60 * 60 * 1000)).toLocaleDateString("fa-IR-u-nu-latn", { year: "numeric", month: "2-digit", day: "2-digit",})));
            setSixDaysAgoOrders(response.data.filter(item => item.paid = true && item.date == new Date(Date.now() - (6 * 24 * 60 * 60 * 1000)).toLocaleDateString("fa-IR-u-nu-latn", { year: "numeric", month: "2-digit", day: "2-digit",})));
            setSevenDaysAgoOrders(response.data.filter(item => item.paid = true && item.date == new Date(Date.now() - (7 * 24 * 60 * 60 * 1000)).toLocaleDateString("fa-IR-u-nu-latn", { year: "numeric", month: "2-digit", day: "2-digit",})));


          });
        }
      }, [isLoggedIn]);

      const todayTotal = todayOrders && todayOrders.map(item => Number(item.total)).reduce(function(a, b) { return a + b; }, 0).toFixed(2)
      const yesterdatTotal = yesterdayOrders && yesterdayOrders.map(item => Number(item.total)).reduce(function(a, b) { return a + b; }, 0).toFixed(2)
      const theDayBeforYesterdayTotal = theDayBeforYesterdayOrders && theDayBeforYesterdayOrders.map(item => Number(item.total)).reduce(function(a, b) { return a + b; }, 0).toFixed(2)
      const threeDaysAgoTotal = threeDaysAgoOrders && threeDaysAgoOrders.map(item => Number(item.total)).reduce(function(a, b) { return a + b; }, 0).toFixed(2)
      const fourDaysAgoTotal = fourDaysAgoOrders && fourDaysAgoOrders.map(item => Number(item.total)).reduce(function(a, b) { return a + b; }, 0).toFixed(2)
      const fiveDaysAgoTotal = fiveDaysAgoOrders && fiveDaysAgoOrders.map(item => Number(item.total)).reduce(function(a, b) { return a + b; }, 0).toFixed(2)
      const sixDaysAgoTotal = sixDaysAgoOrders && sixDaysAgoOrders.map(item => Number(item.total)).reduce(function(a, b) { return a + b; }, 0).toFixed(2)
      const sevenDaysAgoTotal = sevenDaysAgoOrders && sevenDaysAgoOrders.map(item => Number(item.total)).reduce(function(a, b) { return a + b; }, 0).toFixed(2)
      const pastSevenDaysAgoTotal = (Number(yesterdatTotal) + Number(theDayBeforYesterdayTotal) + Number(threeDaysAgoTotal) + Number(fourDaysAgoTotal) + Number(fiveDaysAgoTotal) + Number(sixDaysAgoTotal) + Number(sevenDaysAgoTotal)).toFixed(2)




    return (
      <>

      <Head>
      <title>Dashboard | Accounting</title>
    </Head>

        <div>
            <p><b>Today Total Sales: </b>${todayTotal ? todayTotal : <Loader />} (No. of Orders: {todayOrders ? todayOrders.length : <Loader />})</p>
            <p><b>Yesterday Total Sales: </b>${yesterdatTotal ? yesterdatTotal : <Loader />} (No. of Orders: {yesterdayOrders ? yesterdayOrders.length : <Loader />})</p>
            <p><b>Past Seven Days Total Sales: </b>${pastSevenDaysAgoTotal ? pastSevenDaysAgoTotal : <Loader />} ({new Date(Date.now() - (7 * 24 * 60 * 60 * 1000)).toLocaleDateString("fa-IR-u-nu-latn", { year: "numeric", month: "2-digit", day: "2-digit",})} to {new Date(Date.now() - (24 * 60 * 60 * 1000)).toLocaleDateString("fa-IR-u-nu-latn", { year: "numeric", month: "2-digit", day: "2-digit",})})</p>
            <p><b></b></p>


            <Plot
        data={[
          {
            x: [

              new Date(Date.now() - (7 * 24 * 60 * 60 * 1000)).toLocaleDateString("fa-IR-u-nu-latn", { year: "numeric", month: "2-digit", day: "2-digit",}),
              new Date(Date.now() - (6 * 24 * 60 * 60 * 1000)).toLocaleDateString("fa-IR-u-nu-latn", { year: "numeric", month: "2-digit", day: "2-digit",}),
              new Date(Date.now() - (5 * 24 * 60 * 60 * 1000)).toLocaleDateString("fa-IR-u-nu-latn", { year: "numeric", month: "2-digit", day: "2-digit",}),
              new Date(Date.now() - (4 * 24 * 60 * 60 * 1000)).toLocaleDateString("fa-IR-u-nu-latn", { year: "numeric", month: "2-digit", day: "2-digit",}),
              new Date(Date.now() - (3 * 24 * 60 * 60 * 1000)).toLocaleDateString("fa-IR-u-nu-latn", { year: "numeric", month: "2-digit", day: "2-digit",}),
              new Date(Date.now() - (2 * 24 * 60 * 60 * 1000)).toLocaleDateString("fa-IR-u-nu-latn", { year: "numeric", month: "2-digit", day: "2-digit",}),
             new Date(Date.now() - (24 * 60 * 60 * 1000)).toLocaleDateString("fa-IR-u-nu-latn", { year: "numeric", month: "2-digit", day: "2-digit",}),

            
            ],
              
            y: [sevenDaysAgoTotal, sixDaysAgoTotal, fiveDaysAgoTotal, fourDaysAgoTotal, threeDaysAgoTotal, theDayBeforYesterdayTotal, yesterdatTotal],


            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: '#4e0e2e'},

            
          },
        ]}

        layout={ { width: 520, height: 440, title: 'Past Seven Days Sales', xaxis: {title: 'Date', showgrid: true, zeroline: true}, yaxis: {title: 'Total Sales ($)', showline: true}}}
      />


            
        </div>
        </>
    );
};

export default Accounting;