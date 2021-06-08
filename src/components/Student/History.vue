<template>
  <div>
    <!-- 选择学年学期 -->
    <div id="selectYear">
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
        @click="queryCourse"
        class="queryButton"
        size="small"
        >查询</el-button
      >
    </div>
    <br />

    <!-- 当前学期课程表 -->
    <div>
      <el-divider content-position="left">课程表</el-divider>
      <div id="courseTable">
        <el-table
          :data="courseTable"
          style="width: 100%"
          row-key="id"
          border
          stripe
        >
          <el-table-column prop="section" label="节次"></el-table-column>
          <el-table-column prop="sunday" label="星期日"></el-table-column>
          <el-table-column prop="monday" label="星期一"></el-table-column>
          <el-table-column prop="tuesday" label="星期二"></el-table-column>
          <el-table-column prop="wednesday" label="星期三"></el-table-column>
          <el-table-column prop="thursday" label="星期四"></el-table-column>
          <el-table-column prop="friday" label="星期五"></el-table-column>
          <el-table-column prop="saturday" label="星期六"></el-table-column>
        </el-table>
      </div>
    </div>
    <br />
    <br />

    <!-- 当前学期课程信息 -->
    <el-divider content-position="left">课程信息</el-divider>
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
        <el-table-column prop="prerequisite" label="先修课程"></el-table-column>
        <el-table-column prop="requirement" label="选课限制"></el-table-column>
        <el-table-column prop="lect_name" label="教师"></el-table-column>
        <el-table-column prop="time" label="时间" width="160"></el-table-column>
        <el-table-column
          prop="location"
          label="地点"
          width="130"
        ></el-table-column>
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
      courseTable: [],
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
    queryCourse() {
      let that = this;
      axios
        .post("http://muzi.fun:4455/class_selection/student/getClassList", {
          stud_id: this.$root.stud_id,
          year: this.year,
          semester: this.semester,
        })
        .then(function (response) {
          that.courseTable = [
            {
              section: 1,
              sunday: "",
              monday: "",
              tuesday: "",
              wednesday: "",
              thursday: "",
              friday: "",
              saturday: "",
            },
            {
              section: 2,
              sunday: "",
              monday: "",
              tuesday: "",
              wednesday: "",
              thursday: "",
              friday: "",
              saturday: "",
            },
            {
              section: 3,
              sunday: "",
              monday: "",
              tuesday: "",
              wednesday: "",
              thursday: "",
              friday: "",
              saturday: "",
            },
            {
              section: 4,
              sunday: "",
              monday: "",
              tuesday: "",
              wednesday: "",
              thursday: "",
              friday: "",
              saturday: "",
            },
            {
              section: 5,
              sunday: "",
              monday: "",
              tuesday: "",
              wednesday: "",
              thursday: "",
              friday: "",
              saturday: "",
            },
            {
              section: 6,
              sunday: "",
              monday: "",
              tuesday: "",
              wednesday: "",
              thursday: "",
              friday: "",
              saturday: "",
            },
            {
              section: 7,
              sunday: "",
              monday: "",
              tuesday: "",
              wednesday: "",
              thursday: "",
              friday: "",
              saturday: "",
            },
            {
              section: 8,
              sunday: "",
              monday: "",
              tuesday: "",
              wednesday: "",
              thursday: "",
              friday: "",
              saturday: "",
            },
            {
              section: 9,
              sunday: "",
              monday: "",
              tuesday: "",
              wednesday: "",
              thursday: "",
              friday: "",
              saturday: "",
            },
            {
              section: 10,
              sunday: "",
              monday: "",
              tuesday: "",
              wednesday: "",
              thursday: "",
              friday: "",
              saturday: "",
            },
            {
              section: 11,
              sunday: "",
              monday: "",
              tuesday: "",
              wednesday: "",
              thursday: "",
              friday: "",
              saturday: "",
            },
            {
              section: 12,
              sunday: "",
              monday: "",
              tuesday: "",
              wednesday: "",
              thursday: "",
              friday: "",
              saturday: "",
            },
          ];
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

            for (
              let j = Number(that.courseData[i].start_class);
              j <= Number(that.courseData[i].end_class);
              j++
            ) {
              let day = that.courseData[i].day;
              if (day == "星期日")
                that.courseTable[j - 1].sunday = that.courseData[i].cour_name;
              else if (day == "星期一")
                that.courseTable[j - 1].monday = that.courseData[i].cour_name;
              else if (day == "星期二")
                that.courseTable[j - 1].tuesday = that.courseData[i].cour_name;
              else if (day == "星期三")
                that.courseTable[j - 1].wednesday =
                  that.courseData[i].cour_name;
              else if (day == "星期四")
                that.courseTable[j - 1].thursday = that.courseData[i].cour_name;
              else if (day == "星期五")
                that.courseTable[j - 1].friday = that.courseData[i].cour_name;
              else
                that.courseTable[j - 1].sunday = that.courseData[i].cour_name;
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },

  created() {
    this.queryCourse();
  },
  setup() {},
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