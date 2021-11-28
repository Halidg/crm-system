<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{info.bills}}</h4>
    </div>
     
    <loader v-if="loading" />
    
    <p class="center" v-else-if="!categories.length">категорий пока нет.<router-link to="/categories">add new category</router-link></p>

    <section v-else>
      <div v-for="cat in categories" :key="cat.id">
        <p>
          <strong>{{cat.name}}:</strong>
          {{cat.spend}} из {{cat.limit}}
        </p>
        <div class="progress" v-tooltip="cat.tooltip">
          <div
              class="determinate"
              :class="[cat.progressColor]"
              :style="{width: cat.progressPercent + '%'}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Loader from '../components/app/Loader.vue'
import tooltipDirective from '../directives/tooltip.directive'

export default {
  components: { Loader },
  data(){
    return{
      loading:true,
      categories:[]
    }
  },
  computed:{
    ...mapGetters(['info'])
  },
  async mounted(){
    const records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')
    this.categories = categories.map(cat => {
      const spend = records
      .filter(r => r.categoryId === cat.id)
      .filter(r =>r.type === 'outcome')
      .reduce((total,record) => {
        return total += +record.amout
      },0)

      const percent = 100 * spend / cat.limit
      const progressPercent = percent > 100 ? 100 : percent
      const progressColor = percent < 60 
      ? 'green'
      : percent < 100
        ? 'yellow'
        : 'red'
      
      const tooltipValue = cat.limit - spend
      const tooltip = `${tooltipValue < 0 ? 'превышение на' : 'Осталось'} ${Math.abs()}`

      return {
        ...cat,
        progressPercent,
        progressColor,
        spend,
        tooltip
      }  
    })

   this.loading = false
  },
  directives:{
    tooltip: tooltipDirective
  }
}
</script>