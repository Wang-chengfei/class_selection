<template>
  <div>
    <div id="search_options">
      <el-divider content-position="left">新增课程安排信息</el-divider>

      <span>课程号</span>
      <el-input size="medium" class="arrange_select" v-model="cour_id" clearable>
      </el-input>

      <span>课序号</span>
      <el-input size="medium" class="arrange_select" v-model="curr_id" clearable>
      </el-input>

      <span>学年</span>
      <el-select v-model="year" class="arrange_select" placeholder="请选择">
        <el-option
          v-for="item in years"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>

      <span>学期</span>
      <el-select v-model="semester" class="arrange_select" placeholder="请选择">
        <el-option
          v-for="item in semesters"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>

      <br />

      <span>开始周</span>
      <el-input size="medium" class="arrange_select" v-model="start_week" clearable>
      </el-input>

      <span>结束周</span>
      <el-input size="medium" class="arrange_select" v-model="end_week" clearable>
      </el-input>

      <span>开始节数</span>
      <el-input size="medium" class="arrange_select" v-model="start_class" clearable>
      </el-input>

      <span>结束节数</span>
      <el-input size="medium" class="arrange_select" v-model="end_class" clearable>
      </el-input>

      <br />

      <span>上课星期</span>
      <el-select v-model="day" class="arrange_select" placeholder="请选择">
        <el-option
          v-for="item in days"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>

      <span>教师编号</span>
      <el-input size="medium" class="arrange_select" v-model="lect_id" clearable>
      </el-input>

      <span>教室编号</span>
      <el-input size="medium" class="arrange_select" v-model="room_id" clearable>
      </el-input>

      <span>课容量</span>
      <el-input size="medium" class="arrange_select" v-model="capacity" clearable>
      </el-input>

      <el-button
        type="primary"
        icon="el-icon-upload"
        @click="addCourse"
        class="addButton"
        size="small"
        >添加课程安排</el-button
      >

      <br />
      <br />
      <br />
      <br />
      <el-divider content-position="left">所有课程安排</el-divider>
    </div>

    <div id="result_list">
      <el-table
        :data="courseData"
        style="width: 100%"
        row-key="id"
        border
        :row-class-name="gray"
      >
        <el-table-column prop="cour_id" label="课程号"></el-table-column>
        <el-table-column prop="curr_id" label="课序号"></el-table-column>
        <el-table-column prop="year" label="学年"></el-table-column>
        <el-table-column prop="semester" label="学期"></el-table-column>
        <el-table-column prop="start_week" label="开始周"></el-table-column>
        <el-table-column prop="end_week" label="结束周"></el-table-column>
        <el-table-column prop="start_class" label="开始节数"></el-table-column>
        <el-table-column prop="end_class" label="结束节数"></el-table-column>
        <el-table-column prop="day" label="上课星期"></el-table-column>
        <el-table-column prop="lect_id" label="教师编号"></el-table-column>
        <el-table-column prop="room_id" label="教室编号"></el-table-column>
        <el-table-column prop="capacity" label="课容量"></el-table-column>
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
      cour_id: "",
      curr_id: "",
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
      year: "",
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
      semester: "",
      start_week: "",
      end_week: "",
      start_class: "",
      end_class: "",
      days: [
        {
          value: "星期一",
          label: "星期一",
        },
        {
          value: "星期二",
          label: "星期二",
        },
        {
          value: "星期三",
          label: "星期三",
        },
        {
          value: "星期四",
          label: "星期四",
        },
        {
          value: "星期五",
          label: "星期五",
        },
        {
          value: "星期六",
          label: "星期六",
        },
        {
          value: "星期七",
          label: "星期七",
        },
      ],
      day: "",
      lect_id: "",
      room_id: "",
      capacity:  ""
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

.arrange_select {
  width: 17%;
  margin: 20px;
}
</style>