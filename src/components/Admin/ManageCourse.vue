<template>
  <div>
    <div id="search_options">
      <el-divider content-position="left">新增课程信息</el-divider>
      <span>开课院系</span>
      <el-select v-model="depa_name" class="course_select" placeholder="请选择">
        <el-option
          v-for="item in depa_names"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>

      <span>课程名</span>
      <el-input size="medium" class="course_select" v-model="cour_name" clearable>
      </el-input>

      <span>课程号</span>
      <el-input v-model="cour_id" class="course_select" size="medium" clearable>
      </el-input>

      <span>课程类型</span>
      <el-select v-model="type" class="course_select" placeholder="请选择">
        <el-option
          v-for="item in types"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>

      <br />

      <span>考试类型</span>
      <el-select v-model="exam_type" class="course_select" placeholder="请选择">
        <el-option
          v-for="item in exam_types"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>

      <span>学分</span>
      <el-input size="medium" class="course_select" v-model="credit" clearable>
      </el-input>

      <span>选课限制</span>
      <el-input size="medium" class="course_select" v-model="requirement" clearable>
      </el-input>

      <span>先修课程</span>
      <el-input size="medium" class="course_select" v-model="prerequisite" clearable>
      </el-input>

      <el-button
        type="primary"
        icon="el-icon-upload"
        @click="addCourse"
        class="addButton"
        size="small"
        >添加课程</el-button
      >

      <br />
      <br />
      <br />
      <br />
      <el-divider content-position="left">所有课程</el-divider>
    </div>

    <div id="result_list">
      <el-table
        :data="courseData"
        style="width: 100%"
        row-key="id"
        border
        :row-class-name="gray"
      >
        <el-table-column prop="depa_name" label="开课院系"></el-table-column>
        <el-table-column prop="cour_name" label="课程名"></el-table-column>
        <el-table-column prop="cour_id" label="课程号"></el-table-column>
        <el-table-column prop="type" label="课程类型"></el-table-column>
        <el-table-column prop="exam_type" label="考查类型"></el-table-column>
        <el-table-column prop="credit" label="学分"></el-table-column>
        <el-table-column prop="requirement" label="选课限制"></el-table-column>
        <el-table-column prop="prerequisite" label="先修课程"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template #default="scope">
            <el-button
              class="selectButton"
              @click="deleteCourse(scope.row)"
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
      types: [
        {
          value: "必修",
          label: "必修",
        },
        {
          value: "选修",
          label: "选修",
        },
        {
          value: "任选",
          label: "任选",
        },
      ],
      type: "",
      exam_types: [
        {
          value: "考试",
          label: "考试",
        },
        {
          value: "考查",
          label: "考查",
        },
      ],
      exam_type: "",
      cour_name: "",
      cour_id: "",
      credit: "",
      requirement: "",
      prerequisite: "",
      courseData: [],
    };
  },
  methods: {
    addCourse() {
      axios
        .post("http://muzi.fun:4455/class_selection/admin/addCourse", {
          depa_name: this.depa_name,
          cour_name: this.cour_name,
          cour_id: this.cour_id,
          type: this.type,
          exam_type: this.exam_type,
          credit: this.credit,
          requirement: this.requirement,
          prerequisite: this.prerequisite,
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
  margin-top: 20px;
}

.course_select {
  width: 16%;
  margin: 20px;
}
</style>