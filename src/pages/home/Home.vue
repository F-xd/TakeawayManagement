<template>
  <div class='home'>
    <Menu></Menu>
    <div class="content">
      <div class="header">
        <Breadcrumb></Breadcrumb>
        <Welcome></Welcome>
      </div>
      <div class="router-view" v-if="isHome&&getData()">
        
        <el-row class="statistics"> 
          <el-col :span="3">
            <el-statistic title="今日销售额" :formatter="value=>`${value}￥`" :value-style="{fontWeight: 'bold'}" :value="totalData.totayAmount" />
          </el-col>
          <el-col :span="3">
            <el-statistic title="累计销售额" :formatter="value=>`${value}￥`" :value-style="{fontWeight: 'bold'}" :value="totalData.totalAmount" />
          </el-col>
          <el-col :span="3">
            <el-statistic title="今日订单数" :value-style="{fontWeight: 'bold'}" :value="totalData.todayOrder" />
          </el-col>
          <el-col :span="3">
            <el-statistic title="累计订单数" :value-style="{fontWeight: 'bold'}" :value="totalData.totalOrder" />
          </el-col>
        </el-row>




        <div class=" router-view echarts-container" ref="echartsContainer" ></div>
      </div>
      <router-view class="router-view"></router-view>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAccountInfoStore } from '../../stores/accountinfo';
import Menu from '../../components/Menu.vue';
import Breadcrumb from '../../components/Breadcrumb.vue';
import Welcome from '../../components/Welcome.vue';
import axios from '@axios';
import * as echarts from 'echarts';
const echartsContainer = ref(null);
const totalData = reactive({});
const isHome = computed(() => {
  return useRoute().path === '/home';
})
const getData = async () => {
  const { data } = await axios.get('/order/totaldata');
  totalData.totalOrder=data.totalOrder;
  totalData.totalAmount=data.totalAmount;
  totalData.todayOrder=data.todayOrder;
  totalData.totayAmount=data.totayAmount;
  const option = {
    title: {
      text: '数据统计'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['订单数据', '金额数据']
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
      data: data.xData
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '订单数据',
        type: 'line',
        data: data.orderData
      },
      {
        name: '金额数据',
        type: 'line',
        data: data.amountData
      },
    ]
  };
  const myChart = echarts.init(echartsContainer.value,{weigth:'100%'});
  myChart.setOption(option);
  window.addEventListener('resize', () => {
    myChart.resize();
  })
}
</script>

<style lang='less' scoped>
.home {
  width: 100%;
  height: 100%;
  display: flex;
  background-color: #f0f2f5;
}

.content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.statistics{
  display: flex;
  justify-content: space-evenly;
  margin-top: 20px;
  >div>div{
    padding: 10px 0;
    background-color: rgba(160, 160, 160, 0.144);
    border: 2px solid #ffffff;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
.header {
  flex: 0 0 auto;
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  padding: 0 20px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.router-view {
  width: auto;
  height: 100%;
  margin: 20px;
  background-color: #ffffff;
  border-radius: 5px;
  overflow-y: scroll;

  //滚动条隐藏
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>