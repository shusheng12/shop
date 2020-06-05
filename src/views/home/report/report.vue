<template>
  <div>
    <user-header>
      <span slot="name1">数据统计</span>
      <span slot="name2">数据报表</span>
    </user-header>

    <el-card>
      <div id="main" style="width: 750px;height:400px;"></div>
    </el-card>
  </div>
</template>
<script>
import userHeader from "../user/userheader";
import { getreportdata } from "@/network/getreportdata";
import echarts from "echarts";
export default {
  components: {
    userHeader
  },
  data() {
    return {
      obj: {},
      
    }
  },
  mounted(){
    getreportdata().then(res => {
      if (res.data.meta.status !== 200) {
        return this.$message.error("获取报表失败！");
      }
      this.obj = res.data.data;
     // console.log(this.obj);

    

   const option={
            title: {
                text: '用户来源'
            },
            tooltip: {},
            legend: {
                data:this.obj.legend.data
            },
            xAxis: {
                 data:this.obj.xAxis[0].data},
            yAxis: {},
            series:this.obj.series
        }
       var myChart = echarts.init(document.getElementById("main"));
     myChart.setOption(option);
    });
   
  }
};
</script>