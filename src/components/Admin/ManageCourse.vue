<template>
  <div>
    <div id="search_options">
      <el-divider content-position="left">新增课程信息</el-divider>
      <span>开课院系</span>
      <el-select v-model="depa_name" class="in_select">
        <el-option
          v-for="item in depa_names"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>

      <span>课程名</span>
      <el-input size="medium" class="in_select" v-model="cour_name" clearable>
      </el-input>

      <span>课程号</span>
      <el-input v-model="cour_id" class="in_select" size="medium" clearable>
      </el-input>

      <span>课程类型</span>
      <el-select v-model="type" class="in_select" placeholder="请选择">
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
      <el-select v-model="exam_type" class="in_select" placeholder="请选择">
        <el-option
          v-for="item in exam_types"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>

      <span>学分</span>
      <el-input size="medium" class="in_select" v-model="credit" clearable>
      </el-input>

      <span>选课限制</span>
      <el-input size="medium" class="in_select" v-model="requirement" clearable>
      </el-input>

      <span>教师编号</span>
      <el-input size="medium" class="in_select" v-model="lect_id" clearable>
      </el-input>

      <el-button
        type="primary"
        icon="el-icon-search"
        @click="addCourse"
        class="addCoursehButton"
        size="small"
        >添加课程</el-button
      >

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
        <el-table-column
          prop="cour_name"
          label="课程名"
          width="140"
        ></el-table-column>
        <el-table-column prop="cour_id" label="课程号"></el-table-column>
        <el-table-column prop="type" label="课程类型"></el-table-column>
        <el-table-column prop="exam_type" label="考查类型"></el-table-column>
        <el-table-column prop="credit" label="学分"></el-table-column>
        <el-table-column prop="requirement" label="选课限制"></el-table-column>
        <el-table-column prop="lect_name" label="教师编号"></el-table-column>
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
          value: "*",
          label: "全部",
        },
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
      depa_name: "*",
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
      lect_id: "",
      courseData: [],
    };
  },
  methods: {},

  created() {
    let that = this;
    axios
      .post("http://muzi.fun:4455/class_selection/class/search", {
        stud_id: this.$root.stud_id,
        year: 2021,
        semester: "spring",
      })
      .then(function (response) {
        for (let i = 0; i < that.courseData.length; i++) {
          let flag = 0;
          let stud_num = Number(that.courseData[i].capacity.split("/")[0]);
          let capacity = Number(that.courseData[i].capacity.split("/")[1]);
          if (stud_num >= capacity) {
            flag = 1;
          }
          for (let j = 0; j < response.data.length; j++) {
            if (
              (that.courseData[i].cour_id == response.data[j].cour_id &&
                that.courseData[i].curr_id == response.data[j].curr_id &&
                that.courseData[i].year == response.data[j].year &&
                that.courseData[i].semester == response.data[j].semester) ||
              (that.courseData[i].day == response.data[j].day &&
                that.courseData[i].end_class >= response.data[j].start_class &&
                that.courseData[i].start_class <= response.data[j].end_class)
            ) {
              flag = 1;
              break;
            }
          }
          if (flag == 1) {
            that.gray_index.push(i);
          }
        }
        // let select_buttons = document.querySelectorAll(".el-button");
        // console.log(select_buttons[0]);
        // select_buttons[0].setAttribute("disabled", true)
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  setup() {},
};
</script>

<style>
.addCoursehButton {
  float: right;
  margin-right: 80px;
}

.in_select {
  width: 19%;
  margin: 20px;
}
</style>