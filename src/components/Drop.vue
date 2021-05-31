<template>
  <div>
    <div id="course_list">
      <el-table :data="courseData" style="width: 100%" row-key="id" border>
        <el-table-column prop="depa_name" label="开课院系"></el-table-column>
        <el-table-column prop="cour_name" label="课程名" width="140"></el-table-column>
        <el-table-column prop="cour_id" label="课程号"></el-table-column>
        <el-table-column prop="curr_id" label="课序号"></el-table-column>
        <el-table-column prop="credit" label="学分"></el-table-column>
        <el-table-column prop="exam_type" label="考查类型"></el-table-column>
        <el-table-column prop="prerequisite" label="先修课程"></el-table-column>
        <el-table-column prop="requirement" label="选课限制"></el-table-column>
        <el-table-column prop="lect_name" label="教师"></el-table-column>
        <el-table-column prop="time" label="时间" width="160"></el-table-column>
        <el-table-column
          prop="location"
          label="地点"
          width="130"
        ></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template #default="scope">
            <el-button @click="dropCourse(scope.row)" type="text" size="middle"
              >退课</el-button
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
    };
  },
  methods: {
    getCourse() {
      let that = this;
      axios
        .post("http://muzi.fun:4455/class_selection/student/getClassList", {
          stud_id: this.$root.stud_id,
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
    dropCourse(row) {
      let that = this
      this.$confirm("你是否确认要退出该课程？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          axios
            .post("http://muzi.fun:4455/class_selection/student/dropTake", {
              stud_id: this.$root.stud_id,
              cour_id: row.cour_id,
              curr_id: row.curr_id,
              year: row.year,
              semester: row.semester,
            })
            .then(function (response) {
              console.log(response);
              that.getCourse()
            })
            .catch(function (error) {
              console.log(error);
            });

          this.$message({
            type: "success",
            message: "退出成功",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作",
          });
        });
    },
  },
  created() {
    this.getCourse()
  },
  setup() {},
};
</script>

<style>
</style>