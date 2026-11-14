<script setup>
// 草稿：内容为占位，替换成你自己的履历即可
const skills = [
  { label: '编程', value: 'Python（NumPy、pandas、GeoPandas、ArcPy、PyQGIS）、SQL、Shell' },
  { label: '数据库', value: 'PostgreSQL/PostGIS、SQLite/SpatiaLite' },
  { label: '工具', value: 'ArcGIS Pro、QGIS、GDAL、FME、Git、Docker' },
  { label: '语言', value: '中文（母语）、英语' },
]

const experience = [
  {
    company: '待填写公司',
    role: '待填写职位',
    place: '城市',
    period: '2023 – 至今',
    points: ['负责内容一：替换为你的实际工作描述。', '负责内容二：替换为你的实际工作描述。'],
  },
]
</script>

<template>
  <div id="main" class="alt">
    <section id="one">
      <div class="inner">
        <header class="major">
          <h1>简历</h1>
          <p>GIS 数据工程师 / 空间数据分析</p>
        </header>

        <div class="row">
          <div class="row-6 row-12-mobilep">
            <h3>个人简介</h3>
            <p>这里写两三句自我介绍：你的专业背景、擅长做什么、想找什么样的岗位。</p>
          </div>
        </div>

        <div class="row">
          <div class="row-6 row-12-mobilep">
            <h3>技能</h3>
            <table class="no-border">
              <tbody>
                <tr v-for="s in skills" :key="s.label">
                  <td class="align-right"><b>{{ s.label }}：</b></td>
                  <td>{{ s.value }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="row">
          <div class="row-6 row-12-mobilep">
            <h3>工作经历</h3>
            <div v-for="(job, i) in experience" :key="i" class="table-wrapper">
              <table>
                <tbody>
                  <tr>
                    <td><b>{{ job.company }}</b><br />{{ job.role }}</td>
                    <td class="align-right"><i>{{ job.place }}</i><br /><i>{{ job.period }}</i></td>
                  </tr>
                </tbody>
              </table>
              <ul>
                <li v-for="(p, j) in job.points" :key="j" class="indent">{{ p }}</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="row-6 row-12-mobilep">
            <h3>教育背景</h3>
            <p>待填写学校、专业、学位、时间。</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
