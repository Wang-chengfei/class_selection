<template>
  <div>
    <div id='search_options'>
      <span>上课校区 </span>
      <el-select v-model="campus" class="in">
        <el-option
          v-for="item in campuses"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      
      <span>上课星期 </span>
      <el-select v-model="day" class="in">
        <el-option
          v-for="item in days"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

      <span>开课院系 </span>
      <el-select v-model="department" class="in">
        <el-option
          v-for="item in departments"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <br/>

      <span>课程号</span>
      <el-input
        v-model="cour_id"
        class="in"
        size="medium"
        clearable>
      </el-input>

      <span>课序号</span>
      <el-input
        v-model="curr_id"
        class="in"
        size="medium"
        clearable>
      </el-input>

      <span>教师名</span>
      <el-input
        size="medium"
        class="in"
        v-model="lect_id"
        clearable>
      </el-input>

      <br/>
      <span>只看有课余量的课程</span>
      <el-switch v-model="redundantOnly">
      </el-switch>

      <el-button type="primary" icon="el-icon-search" @click="upload">搜索</el-button>
    </div>

    <div id='result_list'>
      <el-table :data="departmentTable" style="width: 100%" row-key="id">
                <!-- <el-table-column prop="id" label="ID" ></el-table-column> -->
                <el-table-column prop="name" label="名称" ></el-table-column>
                <el-table-column fixed="right" label="操作" >
                    <template #default="scope">
                        <el-button @click="edit(scope.row)" type="text" size="small">修改</el-button>
                        <el-button @click="deleteDepartment(scope.row)" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                background
                layout="prev, pager, next"
                class="pagination"
                :page-size="pageSize"
                :total="total"
                @current-change="pageChange"
            ></el-pagination>
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

      cour_id: '',
      curr_id: '',
      lect_id: '',
      redundantOnly : true,
      loading: true
    }
  },
  methods:{
    upload :function(){
      console.log(this.cour_id);
      console.log(this.curr_id);
      console.log(this.redundantOnly);
    }
  },
  setup() {
  }
}

</script>

<style>
.in{
    width: 20%;
    margin: 20px;
}
</style>