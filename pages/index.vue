<template>
  <div>
    <button style="position: absolute; right: 20px; top: 20px;" @click="resetZoom">
      Reset Zoom
    </button>
    <canvas ref="chart" style="height: 500px" />
  </div>
</template>

<script>
import { Chart } from 'chart.js/auto'

export default {
    name: 'App',
    data () {
        return {
            cpiData: [],
            chart: null
        }
    },
    async mounted () {
        const response = await this.$axios.$post('http://localhost:8085/api/cpi')

        console.log(response)
        this.cpiData = response.map(({ date, cpiValue }) => ({
            x: date,
            y: cpiValue
        }))

        this.renderChart()
    },
    methods: {
        renderChart () {
            const ctx = this.$refs.chart.getContext('2d')
            const dataMax = Math.max(...this.cpiData.map(data => data.y))
            this.chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: this.cpiData.map(data => data.x),
                    datasets: [
                        {
                            label: 'CPI',
                            data: this.cpiData.map(data => data.y),
                            backgroundColor: 'rgba(75,192,192,0.4)',
                            borderColor: 'rgba(75,192,192,1)',
                            borderWidth: 1,
                            pointRadius: 0,
                            pointHitRadius: 10
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            grid: {
                                color: 'rgba(0, 0, 0, 0.05)',
                                borderColor: 'rgba(0, 0, 0, 0)',
                                drawTicks: false,
                                drawBorder: false
                            },
                            ticks: {
                                color: 'rgba(0, 0, 0, 0.5)'
                            }
                        },
                        y: {
                            grid: {
                                color: 'rgba(0, 0, 0, 0.05)',
                                borderColor: 'rgba(0, 0, 0, 0)',
                                drawTicks: false,
                                drawBorder: false
                            },
                            ticks: {
                                min: 0,
                                max: dataMax,
                                color: 'rgba(0, 0, 0, 0.5)'

                            }
                        }
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: 'Consumer Price Index (CPI)',
                            font: {
                                size: 20,
                                weight: 'bold'
                            }
                        },
                        legend: {
                            position: 'top'
                        },
                        zoom: {
                            pan: {
                                enabled: true,
                                mode: 'xy',
                                threshold: 10
                            },
                            zoom: {
                                wheel: {
                                    enabled: true
                                },
                                pinch: {
                                    enabled: true
                                },
                                mode: 'xy'
                            }
                        }
                    }
                }
            })
        },
        resetZoom () {
            if (this.chart) {
                this.chart.resetZoom()
            }
        }
    }
}
</script>
