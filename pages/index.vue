<template>
  <div>
    <cpi-chart :cpi-data="cpiData" />
  </div>
</template>

<script>
import CpiChart from '@/components/CpiChart.vue'

export default {
    name: 'App',
    components: {
        CpiChart
    },
    data () {
        return {
            cpiData: []
        }
    },
    async mounted () {
        const response = await this.$axios.$post('http://localhost:8085/api/cpi')
        this.cpiData = response.map(({ date, cpiValue }) => ({
            x: date,
            y: cpiValue
        }))
    }
}
</script>
