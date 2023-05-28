
import styles from "@/styles/PieChart.module.css";
import {useEffect, useRef, useState} from "react";
import {Chart} from "primereact/chart";
import {element, string} from "prop-types";
import {Toast} from "primereact/toast";
import {Simulate} from "react-dom/test-utils";
import load = Simulate.load;

const PieChart = () => {

    const toastRef = useRef<Toast>();

    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});



    function getBackgroundColor(colorName : string) : string {
        const documentStyle = getComputedStyle(document.documentElement);

        switch (colorName) {
            case "blue":
                return documentStyle.getPropertyValue('--blue-500');

            case "yellow":
                return documentStyle.getPropertyValue('--yellow-500');

            case "green":
                return documentStyle.getPropertyValue('--green-500');

            case "white":
                return "#F9F6EE"

            default:
                return "#F9F6EE"
        }
    }

    function getHoverColor(colorName : string) : string {
        const documentStyle = getComputedStyle(document.documentElement);

        switch (colorName) {
            case "blue":
                return documentStyle.getPropertyValue('--blue-400');

            case "yellow":
                return documentStyle.getPropertyValue('--yellow-400');

            case "green":
                return documentStyle.getPropertyValue('--green-400');

            case "white":
                return "#FAF9F6"

            default:
                return "#FAF9F6"
        }
    }



    function setData(){

    }

    useEffect(() => {
        fetch("/api/chart/").then((val) => {
            if(!val.ok){
                toastRef.current?.show({sticky: false, severity: "error", summary: "Failed", detail: "Failed to fetch data"});
                return;
            }

            val.json().then((jsonValue) => {
                try {
                    const values = [jsonValue["blue"], jsonValue["yellow"], jsonValue["green"], jsonValue["white"]];
                    const data = {
                        labels: ['Blue', 'Yellow', 'Green', 'White'],
                        datasets: [
                            {
                                data: values,
                                backgroundColor: [getBackgroundColor('blue'), getBackgroundColor('yellow'), getBackgroundColor('green'), getBackgroundColor('white')],
                                hoverBackgroundColor: [getHoverColor('blue'), getHoverColor('yellow'), getHoverColor('green'), getHoverColor('white')],
                            }
                        ]
                    }
                    const options = {
                        plugins: {
                            legend: {
                                labels: {
                                    usePointStyle: true
                                }
                            }
                        }
                    };

                    setChartData(data);
                }catch (err){
                    console.log(err);
                    toastRef.current?.show({sticky: false, severity: "error", summary: "Error occurred", detail: "Please hold on while we currently fix this issue"});

                }
            })

        }).catch((err) => {
            toastRef.current?.show({sticky: false, severity: "error", summary: "Failed", detail: "Failed to fetch data"});
            console.log(err)
        })

        setChartOptions(options);
    }, []);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <>
            <Toast ref={toastRef} />
            <div className={styles.chart}>
                {<Chart type="pie" data={chartData} options={chartOptions}  className="w-full md:w-30rem" />}
            </div>
        </>
    );
};

export default PieChart;
