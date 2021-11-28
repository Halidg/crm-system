<template>
 <table>
  <thead>
   <tr>
    <th>#</th>
    <th>Сумма</th>
    <th>Дата</th>
    <th>Категория</th>
    <th>Тип</th>
    <th>Открыть</th>
    </tr>
  </thead>

    <tbody>
     <tr v-for="(r, idx) in records"
     :key="r.id">
      <td>{{idx}}</td>
      <td>{{r.amout}}</td>
      <td>{{r.date}}</td>
      <td>{{r. categoryName}}</td>
      <td>
      <span class="white-text badge"
      :class="[r.typeClass]"
      >{{r.typeText}}</span>
      </td>
      <td>
      <button 
      v-tooltip="'Посмотреть запись'"
      class="btn-small btn" 
      @click="$router.push('/detail/' + r.id)">
        <i class="material-icons">open_in_new</i>
      </button>
      </td>
    </tr>
   </tbody>
</table>  
</template>

<script>
import tooltipDirective from '../directives/tooltip.directive'


export default {
  props:['records'],
  directives:{
    tooltip: tooltipDirective
  }
}
</script>

<style>

</style>