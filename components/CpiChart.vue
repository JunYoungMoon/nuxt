<template>
  <div>
    <canvas ref="myChart" />
  </div>
</template>

<script>
import { Chart } from 'chart.js'

export default {
    name: 'CpiChart',
    props: {
        cpiData: {
            type: Array,
            required: true
        }
    },
    mounted () {
        this.renderChart()
    },
    methods: {
        renderChart () {
            const ctx = this.$refs.myChart.getContext('2d')
            // eslint-disable-next-line no-unused-vars
            const myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    datasets: [{
                        label: 'CPI',
                        data: this.cpiData,
                        backgroundColor: 'rgba(0, 119, 204, 0.3)',
                        borderColor: 'rgba(0, 119, 204, 0.8)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        xAxes: [{
                            type: 'time',
                            time: {
                                unit: 'month',
                                tooltipFormat: 'MMM YYYY'
                            },
                            ticks: {
                                autoSkip: true,
                                maxTicksLimit: 12
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                callback: function (value, index, values) {
                                    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
                                }
                            }
                        }]
                    }
                }
            })
        }
    }
}
</script>
