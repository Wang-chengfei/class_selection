<template>
  <div>
    <div id="search_options">
      <el-divider content-position="left">新增课程安排信息</el-divider>

      <span>课程号</span>
      <el-input
        size="medium"
        class="arrange_select"
        v-model="cour_id"
        clearable
      >
      </el-input>

      <span>课序号</span>
      <el-input
        size="medium"
        class="arrange_select"
        v-model="curr_id"
        clearable
      >
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
      <el-input
        size="medium"
        class="arrange_select"
        v-model="start_week"
        clearable
      >
      </el-input>

      <span>结束周</span>
      <el-input
        size="medium"
        class="arrange_select"
        v-model="end_week"
        clearable
      >
      </el-input>

      <span>开始节数</span>
      <el-input
        size="medium"
        class="arrange_select"
        v-model="start_class"
        clearable
      >
      </el-input>

      <span>结束节数</span>
      <el-input
        size="medium"
        class="arrange_select"
        v-model="end_class"
        clearable
      >
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
      <el-input
        size="medium"
        class="arrange_select"
        v-model="lect_id"
        clearable
      >
      </el-input>

      <span>教室编号</span>
      <el-input
        size="medium"
        class="arrange_select"
        v-model="room_id"
        clearable
      >
      </el-input>

      <span>课容量</span>
      <el-input
        size="medium"
        class="arrange_select"
        v-model="capacity"
        clearable
      >
      </el-input>

      <el-button
        type="primary"
        icon="el-icon-upload"
        @click="addCurr"
        class="addButton"
        size="small"
        >添加课程安排</el-button
      >
      
      <br />
      <br />
      <br />
      <br />
      <el-divider content-position="left">筛选条件</el-divider>
      <span>学年</span>
      <el-select v-model="this_year" class="arrange_select" placeholder="请选择">
        <el-option
          v-for="item in years"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <span>学期</span>
      <el-select v-model="this_semester" class="arrange_select" placeholder="请选择">
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
        @click="getCurrList"
        class="searchButton"
        size="small"
        >搜索</el-button
      >
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
        <el-table-column prop="semester_face" label="学期"></el-table-column>
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
              @click="deleteCurr(scope.row)"
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
import { ElMessage } from "element-plus";
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
          value: "1",
          label: "星期一",
        },
        {
          value: "2",
          label: "星期二",
        },
        {
          value: "2",
          label: "星期三",
        },
        {
          value: "4",
          label: "星期四",
        },
        {
          value: "5",
          label: "星期五",
        },
        {
          value: "6",
          label: "星期六",
        },
        {
          value: "7",
          label: "星期七",
        },
      ],
      this_year: 2021,
      this_semester: "spring",
      day: "",
      lect_id: "",
      room_id: "",
      capacity: "",
      courseData: [],
    };
  },
  methods: {
    getCurrList() {
      let that = this;
      axios
        .post("http://muzi.fun:4455/class_selection/class/search", {
          campus: "*",
          day: "*",
          depa_name: "*",
          cour_name: "",
          cour_id: "",
          curr_id: "",
          lect_id: "",
          lect_name: "",
          year: this.this_year,
          semester: this.this_semester,
          redundantOnly: "false",
          slot_id: "",
        })
        .then(function (response) {
          that.courseData = response.data;
          console.log(that.courseData);
          for (let i = 0; i < that.courseData.length; i++) {
            if (that.courseData[i].semester == "spring")
              that.courseData[i].semester_face = "春季学期";
            else that.courseData[i].semester_face = "秋季学期";
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    deleteCurr(row) {
      let that = this;
      this.$confirm("是否确认要删除该课程安排?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          that.$message({
            type: "success",
            message: "删除成功",
          });
          axios
            .post("http://muzi.fun:4455/class_selection/admin/dropCurriculum", {
              cour_id: row.cour_id,
              curr_id: row.curr_id,
              year: row.year,
              semester: row.semester
            })
            .then(function () {
              that.getCurrList();
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch(() => {
          that.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    addCurr() {
      let that = this;
      this.slot_id =
        "0" +
        this.day +
        "-" +
        (this.start_class < 10 ? "0" + this.start_class : this.start_class) +
        "-" +
        (this.end_class < 10 ? "0" + this.end_class : this.end_class);
      axios
        .post("http://muzi.fun:4455/class_selection/admin/addCurriculum", {
          cour_id: this.cour_id,
          curr_id: this.curr_id,
          year: this.year,
          semester: this.semester,
          start_week: this.start_week,
          end_week: this.end_week,
          lect_id: this.lect_id,
          room_id: this.room_id,
          slot_id: this.slot_id,
          capacity: this.capacity,
        })
        .then(function () {
          that.getCurrList();
          that.cour_id = "";
          that.curr_id = "";
          that.year = "";
          that.semester = "";
          that.start_week = "";
          that.end_week = "";
          that.lect_id = "";
          that.room_id = "";
          that.day = "";
          that.start_class = "";
          that.end_class = "";
          that.capacity = "";
          ElMessage.success({
            message: "添加成功",
            type: "success",
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },

  created() {
    this.getCurrList();
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