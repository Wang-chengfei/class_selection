<template>
  <div>
    <el-divider content-position="left">查询条件</el-divider>
    <span>学年</span>
    <el-select v-model="year" placeholder="请选择" class="in">
      <el-option
        v-for="item in years"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>

    <span>学期</span>
    <el-select v-model="semester" placeholder="请选择" class="in">
      <el-option
        v-for="item in semesters"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>

    <el-button
      type="primary"
      icon="el-icon-search"
      @click="queryScore"
      class="queryButton"
      size="small"
      >查询</el-button
    >
    <br />
    <br />
    <el-divider content-position="left">查询结果</el-divider>
    <div id="course_list">
      <el-table :data="courseData" style="width: 100%" row-key="id" border>
        <el-table-column prop="cour_name" label="课程名"></el-table-column>
        <el-table-column prop="cour_id" label="课程号"></el-table-column>
        <el-table-column prop="curr_id" label="课序号"></el-table-column>
        <el-table-column prop="credit" label="学分"></el-table-column>
        <el-table-column prop="grade" label="成绩"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      courseData: [],
      years: [
        {
          value: 2018,
          label: 2018,
        },
        {
          value: 2019,
          label: 2019,
        },
        {
          value: 2020,
          label: 2020,
        },
        {
          value: 2021,
          label: 2021,
        },
      ],
      year: 2021,
      semesters: [
        {
          value: "spring",
          label: "春季学期",
        },
        {
          value: "autumn",
          label: "秋季学期",
        },
      ],
      semester: "spring",
    };
  },
  methods: {
    queryScore() {
      let that = this;
      axios
        .post("http://muzi.fun:4455/class_selection/student/getClassList", {
          stud_id: this.$root.stud_id,
          year: this.year,
          semester: this.semester,
        })
        .then(function (response) {
          that.courseData = response.data;
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  created() {
    this.queryScore()
  },
};
</script>

<style>
.in {
  width: 20%;
  margin: 20px;
}

.queryButton {
  margin-left: 300px;
}
</style>