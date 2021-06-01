<template>
  <div>
    <div id="search_options">
      <el-divider content-position="left">筛选条件</el-divider>
      <span>上课校区 </span>
      <el-select v-model="campus" class="in_select">
        <el-option
          v-for="item in campuses"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>

      <span>上课星期 </span>
      <el-select v-model="day" class="in_select">
        <el-option
          v-for="item in days"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>

      <span>开课院系 </span>
      <el-select v-model="depa_name" class="in_select">
        <el-option
          v-for="item in depa_names"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <br />

      <span>课程名</span>
      <el-input v-model="cour_name" class="in_select" size="medium" clearable>
      </el-input>

      <span>课程号</span>
      <el-input v-model="cour_id" class="in_select" size="medium" clearable>
      </el-input>

      <span>课序号</span>
      <el-input v-model="curr_id" class="in_select" size="medium" clearable>
      </el-input>

      <span>教师名</span>
      <el-input size="medium" class="in_select" v-model="lect_name" clearable>
      </el-input>

      <br />
      <br />
      <br />

      <el-divider content-position="left">课程</el-divider>
      <span>只看有课余量的课程</span>
      <el-switch v-model="redundantOnly" style="margin-left: 5px"> </el-switch>
      <el-button
        type="primary"
        icon="el-icon-search"
        @click="upload"
        class="searchButton"
        size="small"
        >搜索</el-button
      >
    </div>

    <div id="result_list">
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
            <el-button
              @click="selectCourse(scope.row)"
              type="text"
              size="middle"
              >选课</el-button
            >
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
import axios from "axios";
export default {
  data() {
    return {
      campuses: [
        {
          value: "*",
          label: "全部",
        },
        {
          value: "jiangan",
          label: "江安",
        },
        {
          value: "wangjiang",
          label: "望江",
        },
        {
          value: "huaxi",
          label: "华西",
        },
      ],
      campus: "*",

      days: [
        {
          value: "*",
          label: "全部",
        },
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
      day: "*",

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
      cour_name: "",
      cour_id: "",
      curr_id: "",
      lect_name: "",
      redundantOnly: true,
      loading: true,
      courseData: [],
    };
  },
  methods: {
    upload: function () {
      let that = this;
      axios
        .post("http://muzi.fun:4455/class_selection/class/search", {
          pageNum: 0,
          pageSize: 20,
          campus: this.campus,
          day: this.day,
          depa_name: this.depa_name,
          cour_name: this.cour_name,
          cour_id: this.cour_id,
          curr_id: this.curr_id,
          lect_id: "",
          lect_name: this.lect_name,
          redundantOnly: this.redundantOnly,
        })
        .then(function (response) {
          that.courseData = response.data.list;
          console.log(that.courseData);
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
    selectCourse(row) {
      let that = this;

      this.$confirm("是否确认要选该课程?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "选课成功!",
          });

          axios
            .post("http://muzi.fun:4455/class_selection/student/addTake", {
              stud_id: that.$root.stud_id,
              cour_id: row.cour_id,
              curr_id: row.curr_id,
              year: row.year,
              semester: row.semester,
            })
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
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
    this.upload()
    this.$root.stud_id = 2019141460541;
    this.$root.passwd = 123456;
    this.$root.stud_name = "hhm"
  },

  setup() {},
};
</script>

<style>
.searchButton {
  margin-left: 200px;
  margin-bottom: 10px;
}

.in_select {
  width: 17%;
  margin: 20px;
}
</style>