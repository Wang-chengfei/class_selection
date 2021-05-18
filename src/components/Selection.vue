<template>
  <div>
    <div id='header'>
      <span>上课校区 </span>
      <el-select v-model="campus">
        <el-option
          v-for="item in campuses"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      
      <span>上课星期 </span>
      <el-select v-model="day">
        <el-option
          v-for="item in days"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

      <span>开课院系 </span>
      <el-select v-model="department">
        <el-option
          v-for="item in departments"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

      <span>课程号</span>
      <el-input
        v-model="cour_id"
        clearable>
      </el-input>

      <span>课序号</span>
      <el-input
        v-model="curr_id"
        clearable>
      </el-input>

      <span>教师名</span>
      <el-input
        v-model="lect_id"
        clearable>
      </el-input>

      <span>只看有课余量的课程</span>
      <el-switch v-model="redundantOnly">
      </el-switch>

      <el-button type="primary" icon="el-icon-search">搜索</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      campuses: [{
        value: '*',
        label: '全部'
      }, {
        value: 'jiangan',
        label: '江安'
      }, {
        value: 'wangjiang',
        label: '望江'
      }, {
        value: 'huaxi',
        label: '华西'
      }],
      campus: '*',

      days: [{
        value: "*",
        label: "全部"
      },{
        value: "星期一",
        label: "星期一"
      },{
        value: "星期二",
        label: "星期二"
      },{
        value: "星期三",
        label: "星期三"
      },{
        value: "星期四",
        label: "星期四"
      },{
        value: "星期五",
        label: "星期五"
      },{
        value: "星期六",
        label: "星期六"
      },{
        value: "星期七",
        label: "星期七"
      }],
      day: "*",

      departments:[{
        value: "*",
        label: "全部"
      },{
        value: "计算机学院",
        label: "计算机学院"
      },{
        value: "化学学院",
        label: "化学学院"
      },{
        value: "物理学院",
        label: "物理学院"
      },],
      department: "*",

      cour_id: "",
      curr_id: "",
      lect_id: "",
      redundantOnly : true,
      loading: true
    }
  },
  setup() {
    const upload = (()=>{
      console.log(this.cour_id);
    }) 
    return{
      upload,
    }
  }
}

</script>

<style>

</style>