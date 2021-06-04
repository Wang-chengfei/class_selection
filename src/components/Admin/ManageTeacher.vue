<template>
  <div>
    <div id="search_options">
      <el-divider content-position="left">新增教师信息</el-divider>
      <span>所在院系</span>
      <el-select v-model="depa_name" class="teacher_select" placeholder="请选择">
        <el-option
          v-for="item in depa_names"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>

      <span>专业</span>
      <el-input size="medium" class="teacher_select" v-model="major" clearable>
      </el-input>

      <br />

      <span>教师编号</span>
      <el-input size="medium" class="teacher_select" v-model="lect_id" clearable>
      </el-input>

      <span>教师姓名</span>
      <el-input size="medium" class="teacher_select" v-model="lect_name" clearable>
      </el-input>

      <span>登录密码</span>
      <el-input size="medium" class="teacher_select" v-model="passwd" clearable>
      </el-input>

      <el-button
        type="primary"
        icon="el-icon-upload"
        @click="addCourse"
        class="addButton"
        size="small"
        >添加教师</el-button
      >

      <br />
      <br />
      <el-divider content-position="left">所有教师</el-divider>
    </div>

    <div id="result_list">
      <el-table
        :data="LectData"
        style="width: 100%"
        row-key="id"
        border
        :row-class-name="gray"
      >
        <el-table-column prop="depa_name" label="所在院系"></el-table-column>
        <el-table-column prop="major" label="专业"></el-table-column>
        <el-table-column prop="lect_id" label="教师编号"></el-table-column>
        <el-table-column prop="lect_name" label="教师姓名"></el-table-column>
        <el-table-column prop="passwd" label="登录密码"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template #default="scope">
            <el-button
              class="selectButton"
              @click="deleteLect(scope.row)"
              type="text"
              size="middle"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      depa_names: [
        {
          value: "计算机学院",
          label: "计算机学院",
        },
        {
          value: "化学学院",
          label: "化学学院",
        },
        {
          value: "物理学院",
          label: "物理学院",
        },
      ],
      depa_name: "",
      major: "",
      lect_id: "",
      lect_name: "",
      passwd: "",
      LectData: [],
    };
  },
  methods: {
    addCourse() {
      axios
        .post("http://muzi.fun:4455/class_selection/admin/addCourse", {
          depa_name: this.depa_name,
          major: this.major,
          lect_id: this.lect_id,
          lect_name: this.lect_name,
          passwd: this.passwd,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },

  created() {
    // let that = this;
    axios
      .post("http://muzi.fun:4455/class_selection/class/search", {
        stud_id: this.$root.stud_id,
        year: 2021,
        semester: "spring",
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  setup() {},
};
</script>

<style>
.addButton {
  float: right;
  margin-right: 80px;
  margin-top: 25px;
}

.teacher_select {
  width: 17%;
  margin: 20px;
}
</style>