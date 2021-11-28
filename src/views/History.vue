<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>

    <loader v-if="loading"/>
 
    <p class="center" v-else-if="!records.length">категорий пока нет.<router-link to="/records">add new record</router-link></p>

    <section v-else>
     <history-table :records="records"></history-table>
    </section>
  </div>
</template>

<script>
import Loader from '../components/app/Loader.vue'
import HistoryTable from '../components/HistoryTable.vue'
import {Pie} from 'vue-chartjs'

export default {
  data(){
    return{
     loading:true,
     categories:[],
     records:[]
    }
  },
  extends:Pie,
  async mounted(){
  //  this.records = await this.$store.dispatch('fetchRecords')
   const records = await this.$store.dispatch('fetchRecords')
   this.categories = await this.$store.dispatch('fetchCategories')
   this.records = records.map(record =>{
     return{
      ...record,
      categoryName: this.categories.find(c => c.id === record.categoryId).name,
      typeClass: record.type === 'income' ? 'green' : 'red',
      typeText: record.type === 'income' ? 'Доход' : 'Расход'
     }
   })
   this.renderChart({
        labels:this.categories.map(c => c.name),
        datasets: [{
            label: 'Расходы по категориям',
            data: this.categories.map(c => {
              return this.records.reduce((total,r)=>{
                if (r.categoryId === c.id && r.type === 'outcome'){
                  total += +r.amout
                }
                return total
              },0)
            }),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    })

     this.loading = false
  },
  components:{HistoryTable, Loader},
 
}
</script>
