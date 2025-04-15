<template>
  <div class='goodsStatistics' ref="goodsStatistics">
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import axios from '@axios';
import * as echarts from 'echarts';
const goodsStatistics = ref(null);
const arr = ["2019-10-01 00:00:00", "2019-10-10 00:00:00"]
const getData = async ()=>{
  const {data:{data}} = await axios.get('/order/ordertotal?date=[]');
  const option = {
    title: {
      text: '数据统计'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['订单金额']
    },
    grid: {
      left: '3%',
      right: '3%',
      bottom: '30%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {
          title: '保存为图片'
        }
      }
    },
    xAxis: {
      type: 'category',
      data: data.map(item=>item.orderTime.slice(0,10)+' '+item.orderTime.slice(11,19))
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '订单金额',
        type: 'bar',
        data: data.map(item=>item.orderAmount),
        label: {
          show: true,
          position: 'top', // 数据值显示在柱子的顶部
          formatter: '{c}' // 显示具体的数值
        }
      },
    ]
  };
  const myChart = echarts.init(goodsStatistics.value,{weigth:'100%'});
  myChart.setOption(option);
  window.addEventListener('resize', () => {
    myChart.resize();
  })
}
getData();
</script>

<style lang='less' scoped>
.goodsStatistics {

}
</style>