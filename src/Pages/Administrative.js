import React, { useEffect } from 'react';
import Chart from "chart.js";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const Administrative = (props) => {

    const sortedData = [];
    const states = [];
    const population = [];
    const homes = [];
    const yoruba = [];
    const hausa = [];
    const igbo = [];
    let lowestState, heighestState;
    props.censusData.map(data => {
      population.push(Number.parseInt(data.population));
      homes.push(data.homes);
      yoruba.push(data.yoruba);
      states.push(data.state);
      hausa.push(data.hausa);
      return igbo.push(data.igbo);
    });
    states.sort();
    states.map(state => {
        props.censusData.map(data => {
            if (state === data.state) {
               return sortedData.push(data);
            } return null;
        });
        return sortedData;
    });
    if (population.length > 0){
        const lowest = population.reduce((a,b) => Math.min(a,b));
        const heighest = population.reduce((a,b) => Math.max(a,b));
        props.censusData.map(data => {
            if (Number.parseInt(data.population) === lowest){
            return lowestState = data.state;
            }
            else if (Number.parseInt(data.population) === heighest){
                return heighestState = data.state;
            } else return null;
        });
    };


    useEffect(() => {

        var ctx = document.getElementById("barChart").getContext('2d');
            new Chart(ctx, {
            type: 'bar',
            data: {
              labels: sortedData.map(data => data.state),
              datasets: [{
                label: 'Population',
                data: sortedData.map(data => data.population),
                backgroundColor: "rgba(255,0,0,1)"
              }]
        }
});
        const navList = document.querySelectorAll("li");
        navList.forEach(list => {
            if (list.classList.contains("active")) {
                list.classList.remove("active");
            }
        })
        navList[2].classList.add("active");
    })
    return (
        <>
        <div className="container-xl container-fluid">
        <Header/>
            <h1 data-aos="fade-right" className="text-center">Admin Dashboard</h1>
            <div data-aos="fade-up" className="admin">
            <div className="dashboard">
              <table>
              <colgroup span="6"></colgroup>
                <thead>
                    <tr>
                      <th rowSpan="2">States</th>
                      <th rowSpan="2">Population</th>
                      <th rowSpan="2">Homes</th>
                      <th colSpan="3">Languages</th>
                      </tr>
                      <tr>
                        <th>Hausa</th>
                          <th>Igbo</th>
                          <th>Yoruba</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map(data => {
                        return <tr key={Math.random()}>
                            <td>{data.state}</td>
                            <td>{data.population}</td>
                            <td>{data.homes}</td>
                            <td>{data.hausa}</td>
                            <td>{data.igbo}</td>
                            <td>{data.yoruba}</td>
                        </tr>
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <th>Total</th>
                        <th>{population.reduce((a,b) => a+b, 0)}</th>
                        <th>{homes.reduce((a,b) => a+b, 0)}</th>
                        <th>{hausa.reduce((a,b) => a+b, 0)}</th>
                        <th>{igbo.reduce((a,b) => a+b, 0)}</th>
                        <th>{yoruba.reduce((a,b) => a+b, 0)}</th>
                    </tr>
                </tfoot>
              </table>
            </div>
              <div data-aos="fade-right" className="totals">
                <h5><strong>Stats</strong></h5>
                <p>Population: <span>{population.reduce((a,b) => a+b, 0)}</span></p>
                <p>Most Populated State: <strong>{heighestState}</strong></p>
                <p>Least Populated State: <strong>{lowestState}</strong></p>
                <p>Total Hausa families: <strong>{hausa.reduce((a,b) => a+b, 0)}</strong></p>
                <p>Total Igbo families: <strong>{igbo.reduce((a,b) => a+b, 0)}</strong></p>
                <p>Total Yoruba families: <strong>{yoruba.reduce((a,b) => a+b, 0)}</strong></p>
              </div>
            </div>
            <canvas id="barChart"></canvas>
        <Footer />
        </div>
        </>
    )
}
export default Administrative;