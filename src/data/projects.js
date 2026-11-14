// 项目数据：增删项目只改这个文件。
// 图片用 import 引入，Vite 构建时会自动处理成正确的最终路径。
import noiseThumb from '../images/thumbs/noise01_thumb.jpg'
import worldThumb from '../images/thumbs/world_agglomerations01_thumb.png'
import landFull from '../images/fulls/land_attr02_full.jpg'
import flightThumb from '../images/thumbs/flight_radius01_thumb.jpg'
import pic02 from '../images/thumbs/pic02.jpg'
import pic03 from '../images/thumbs/pic03.jpg'
import pic04 from '../images/thumbs/pic04.jpg'
import pic05 from '../images/thumbs/pic05.jpg'

// 子页面用的正文配图
import noiseFull from '../images/fulls/noise01_full.jpg'
import noiseFull2 from '../images/fulls/noise02_full.jpg'
import landFull1 from '../images/fulls/land_attr01_full.jpg'
import flightFull from '../images/fulls/flight_radius01_full.jpg'

export const projects = [
  {
    id: 'noise-modelling',
    title: '噪声建模',
    desc: '基于 OpenStreetMap 数据的噪声污染建模',
    thumb: noiseThumb,
    image: noiseFull,
    body: [
      '这是一个针对莫斯科市中心的噪声环境地图建模实验。使用开源工具 NoiseModelling 完成计算，该工具由法国环境声学联合研究单位（UMRAE，古斯塔夫·埃菲尔大学 - Cerema）的声学专家与 Lab-STICC 实验室（CNRS - DECIDE 团队）的地理信息科学专家共同开发。',
      '模型遵循欧盟 CNOSSOS-EU 标准构建，数据主要来自 OpenStreetMap——包括道路路网和建筑轮廓。计算流程为：先从 OSM 提取路网与建筑，再按道路等级赋予交通流量，最后用传播模型逐级计算每个网格点的等效声压级。',
    ],
    gallery: [noiseFull2],
  },
  {
    id: 'world-agglomerations',
    title: '世界城市群增长',
    desc: '全球主要城市群的人口增长',
    thumb: worldThumb,
    image: worldThumb,
    body: [
      '城市人口的爆炸式增长带来一系列社会、环境和经济后果。在发展中国家，许多城市基础设施已经无法满足当前人口的需求，而应对未来的快速增长更需要城市规划的重大改进，其中准确的人口估计是基础。',
      '该地图为 2021 年 30DayMapChallenge 活动制作，用分级设色的方式展示了全球主要城市群的人口规模。',
    ],
    gallery: [],
  },
  {
    id: 'land-attractiveness',
    title: '土地吸引力',
    desc: '面向新建用地的土地适宜性评估',
    thumb: landFull,
    image: landFull1,
    body: [
      '土地吸引力指数用于评估新建民用建筑用地的适宜性。指数综合了多个因子：步行与交通活动的活跃度、到城市中心的距离、以及工程管线的可获得性。',
      '每个因子先归一化到 0–1，再按权重加权求和，最终生成一张连续表面，方便规划人员快速识别适合开发的区域。',
    ],
    gallery: [landFull],
  },
  {
    id: 'flight-radius-population',
    title: '人口飞行半径',
    desc: '按航空飞行半径统计的人口总量',
    thumb: flightThumb,
    image: flightFull,
    body: [
      '以城市为圆心，按 1–3 小时的航空飞行时间画圆，统计每个圆内覆盖的人口总量，用来衡量一座城市在航空尺度上的"可达人口"。',
      '这类分析常用于评估机场选址、航线规划，以及城市在更大区域中的区位优势。',
    ],
    gallery: [],
  },
  {
    placeholder: true,
    title: '待补充项目 5',
    desc: '这里将放入下一个项目',
    thumb: pic02,
  },
  {
    placeholder: true,
    title: '待补充项目 6',
    desc: '这里将放入下一个项目',
    thumb: pic03,
  },
  {
    placeholder: true,
    title: '待补充项目 7',
    desc: '这里将放入下一个项目',
    thumb: pic04,
  },
  {
    placeholder: true,
    title: '待补充项目 8',
    desc: '这里将放入下一个项目',
    thumb: pic05,
  },
]

export function getProject(id) {
  return projects.find((p) => p.id === id) || null
}
