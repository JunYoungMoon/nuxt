<template>
  <div>
    <canvas id="myChart" />
  </div>
</template>

<script>
import Chart from 'chart.js'

export default {
    name: 'IndexPage',
    async asyncData ({ $axios }) {
        const url = 'https://api.stlouisfed.org/fred/series/observations'

        // Start date and end date for the data
        const startDate = '2010-01-01'
        const endDate = new Date().toISOString().slice(0, 10) // Today's date

        // Parameters for the API request
        const params = {
            series_id: 'CPALTT01USM657N',
            api_key: process.env.FRED_API_KEY,
            file_type: 'json',
            observation_start: startDate,
            observation_end: endDate
        }

        try {
        // Fetch data from the FRED API using axios
            const response = await $axios.get(url, { params })
            const data = response.data

            // Extract the data points from the API response
            const series = data.observations.map(observation => ({
                date: new Date(observation.date),
                value: observation.value
            }))

            // Sort the data points by date
            series.sort((a, b) => a.date - b.date)

            // Extract the dates and values as separate arrays
            const dates = series.map(point => point.date)
            const values = series.map(point => point.value)

            // Create a chart using Chart.js library
            const ctx = document.getElementById('myChart')
            const myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: dates,
                    datasets: [{
                        label: 'CPI',
                        data: values,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        xAxes: [{
                            type: 'time',
                            time: {
                                unit: 'year'
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            })
        } catch (error) {
            console.error(error)
        }
    },
    data () {
        return {
            chart: null,
            chartData: null,
            chartOptions: null
        }
    },
    mounted () {
    // Create a new chart using Chart.js library
        const ctx = document.getElementById('myChart')
        this.chart = new Chart(ctx, {
            type: 'line',
            data: this.chartData,
            options: this.chartOptions
        })
    }
}
</script>
