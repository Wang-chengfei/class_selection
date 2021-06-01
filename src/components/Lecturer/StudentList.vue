<template>
  <div>
    <!-- 授课列表 -->
    <div id="course_list">
      <el-table :data="courseData" style="width: 100%" row-key="id" border>
        <el-table-column prop="depa_name" label="开课院系"></el-table-column>
        <el-table-column
          prop="cour_name"
          label="课程名"
          width="140"
        ></el-table-column>
        <el-table-column prop="cour_id" label="课程号"></el-table-column>
        <el-table-column prop="curr_id" label="课序号"></el-table-column>
        <el-table-column prop="credit" label="学分"></el-table-column>
        <el-table-column prop="exam_type" label="考查类型"></el-table-column>
        <el-table-column prop="time" label="时间"></el-table-column>
        <el-table-column prop="location" label="地点"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template #default="scope">
            <el-button
              @click="checkStudent(scope.row)"
              type="text"
              size="middle"
              >查看选课学生</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 选中课程的学生列表 -->
    <br />
    <el-divider content-position="left">课程学生列表</el-divider>
    <div id="student_list">
      <el-table :data="studentData" style="width: 100%" row-key="id" border>
        <el-table-column prop="stud_id" label="学号"></el-table-column>
        <el-table-column prop="stud_name" label="姓名"></el-table-column>
        <el-table-column prop="depa_name" label="学院"></el-table-column>
        <el-table-column prop="major" label="专业"></el-table-column>
        <el-table-column prop="grade" label="成绩"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template #default="scope">
            <el-button @click="enterGrade(scope.row)" type="text" size="middle"
              >登录成绩</el-button
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
      courseData: [],
      studentData: [],
    };
  },
  methods: {
    getCourse() {
      let that = this;
      axios
        .post("http://muzi.fun:4455/class_selection/lect/getClassList", {
          lect_id: this.$root.lect_id,
          year: 2021,
          semester: "spring",
        })
        .then(function (response) {
          console.log(response.data);
          that.courseData = response.data;
          for (let i = 0; i < that.courseData.length; i++) {
            if (that.courseData[i].campus == "jiangan")
              that.courseData[i].campus = "江安";
            else if (that.courseData[i].campus == "wangjiang")
              that.courseData[i].campus = "望江";
            else that.courseData[i].campus = "华西";
            that.courseData[i].location =
              that.courseData[i].campus +
              that.courseData[i].building +
              that.courseData[i].door;
            that.courseData[i].time =
              that.courseData[i].start_week +
              "-" +
              that.courseData[i].end_week +
              "周 " +
              that.courseData[i].day +
              " " +
              that.courseData[i].start_class +
              "-" +
              that.courseData[i].end_class +
              "节";
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    checkStudent(row) {
      let that = this;
      axios
        .post("http://muzi.fun:4455/class_selection/lect/getStudentList", {
          lect_id: this.$root.lect_id,
          cour_id: row.cour_id,
          curr_id: row.curr_id,
          year: "2021",
          semester: "spring",
        })
        .then(function (response) {
          that.studentData = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    enterGrade(row) {
      console.log(row);
    },
  },
  created() {
    this.getCourse();
  },
  setup() {},
};
</script>

<style>
</style>