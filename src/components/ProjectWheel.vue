<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { projects } from '../data/projects'

const router = useRouter()

// 转盘参数，与旧版 wheel.js 保持一致
const N = projects.length
const STEP = (2 * Math.PI) / N   // 相邻两张卡之间的角度
const PX_PER_STEP = 90           // 拖动或滚轮转过一张卡所需的距离
const VISIBLE = 2.1              // 超过这个角度（弧度）的卡不显示
const SCALE_MAX = 1.08           // 前方（选中）卡的最大缩放
const SCALE_MIN = 0.62           // 最远卡的缩放下限
const SCALE_FALLOFF = 1.1        // 偏离前方超过这个角度（弧度）后，缩放保持在下限

const angle = ref(0)             // 当前角度；0 时第 0 张卡在最前方
const rimEl = ref(null)
const cardEls = ref([])
const layout = ref({ R: 200, cx: 0, cy: 0, cw: 150, ch: 104 })

const setCardEl = (el, i) => { if (el) cardEls.value[i] = el }

function wrap(a) {
  return Math.atan2(Math.sin(a), Math.cos(a))
}

// 当前离前方最近的卡片索引
const nearestIndex = computed(() => {
  let best = 0
  let bestD = Infinity
  for (let i = 0; i < N; i++) {
    const d = Math.abs(wrap(i * STEP + angle.value))
    if (d < bestD) { bestD = d; best = i }
  }
  return best
})

const activeProject = computed(() => projects[nearestIndex.value])

// 每张卡的位置、缩放、透明度都由 angle 计算出来
const cardStyles = computed(() => {
  const { R, cx, cy, cw, ch } = layout.value
  return projects.map((p, i) => {
    const th = wrap(i * STEP + angle.value)
    const ad = Math.abs(th)
    const depth = (1 + Math.cos(th)) / 2
    const x = cx - R * Math.cos(th)
    const y = cy + R * Math.sin(th)
    const fade = Math.max(0, Math.min(1, (VISIBLE - ad) / 0.6))
    const t = Math.max(0, 1 - ad / SCALE_FALLOFF)   // 1 在前方，0 远处
    const s = SCALE_MIN + (SCALE_MAX - SCALE_MIN) * t
    const rot = (th * 180 / Math.PI) * 0.55
    return {
      transform: `translate(${(x - cw / 2).toFixed(1)}px, ${(y - ch / 2).toFixed(1)}px) rotate(${rot.toFixed(2)}deg) scale(${s.toFixed(3)})`,
      opacity: (fade * (0.35 + 0.65 * depth)).toFixed(3),
      visibility: fade > 0 ? 'visible' : 'hidden',
      zIndex: Math.round(depth * 100),
    }
  })
})

// 尺寸随屏幕变化：读取转盘和卡片的实际大小
function measure() {
  const rim = rimEl.value
  if (!rim) return
  const W = rim.clientWidth
  const H = rim.clientHeight
  if (!W || !H) return
  const first = cardEls.value[0]
  const cw = first ? first.offsetWidth : 150
  const ch = first ? first.offsetHeight : 104
  const R = H * 0.44
  const apexX = Math.max(cw / 2 + 8, W * 0.3)
  layout.value = { R, cx: apexX + R, cy: H / 2, cw, ch }
}

// ---- 吸附动画 ----
let snapTarget = null
let rafId = 0
const reduceMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)

function tick() {
  rafId = 0
  if (snapTarget === null) return
  const diff = wrap(snapTarget - angle.value)
  if (Math.abs(diff) < 0.002 || reduceMotion) {
    angle.value = snapTarget
    snapTarget = null
    return
  }
  angle.value += diff * 0.2
  rafId = requestAnimationFrame(tick)
}

function snapTo(a) {
  snapTarget = a
  if (!rafId) rafId = requestAnimationFrame(tick)
}

function snapNearest() {
  snapTo(-nearestIndex.value * STEP)
}

function spin(delta) {
  snapTarget = null
  angle.value += delta
}

// ---- 滚轮：只在鼠标位于转盘上时生效 ----
let wheelTimer = null
function onWheel(e) {
  e.preventDefault()
  spin(-(e.deltaY / PX_PER_STEP) * STEP)
  clearTimeout(wheelTimer)
  wheelTimer = setTimeout(snapNearest, 160)
}

// ---- 拖动与点击 ----
const dragging = ref(false)
let lastY = 0
let moved = 0
let downCardIndex = -1   // pointerdown 落在哪张卡上（-1 表示没落在卡上）

function onPointerDown(e) {
  dragging.value = true
  lastY = e.clientY
  moved = 0
  snapTarget = null
  const card = e.target.closest?.('.wheel-card')
  downCardIndex = card ? Number(card.dataset.index) : -1
  // 注意：setPointerCapture 会让 pointerup / click 都重定向到 rim，
  // 所以点击不能靠卡片的 @click，必须在 pointerup 里自己判定。
  rimEl.value.setPointerCapture(e.pointerId)
}

function onPointerMove(e) {
  if (!dragging.value) return
  const dy = e.clientY - lastY
  lastY = e.clientY
  moved += Math.abs(dy)
  spin((dy / PX_PER_STEP) * STEP)
}

function onPointerUp() {
  if (!dragging.value) return
  const wasTap = moved <= 6 && downCardIndex >= 0
  const idx = downCardIndex
  downCardIndex = -1
  dragging.value = false
  if (wasTap) {
    tapCard(idx)
    return
  }
  snapNearest()
}

// 指针被取消或移出转盘：只收尾，不算点击
function endDrag() {
  if (!dragging.value) return
  downCardIndex = -1
  dragging.value = false
  snapNearest()
}

// ---- 点击：非前方卡先转到前方；前方卡则打开项目页 ----
function tapCard(i) {
  if (i !== nearestIndex.value) {
    snapTo(-i * STEP)
    return
  }
  openProject(projects[i])
}

function openProject(p) {
  if (p.placeholder) return
  router.push({ name: 'project', params: { id: p.id } })
}

// ---- 键盘 ----
function onKeydown(e) {
  const k = e.key
  if (k === 'ArrowDown' || k === 'ArrowRight') {
    e.preventDefault()
    spin(-STEP)
    snapNearest()
  } else if (k === 'ArrowUp' || k === 'ArrowLeft') {
    e.preventDefault()
    spin(STEP)
    snapNearest()
  } else if (k === 'Enter') {
    openProject(activeProject.value)
  }
}

// ---- 尺寸监听 ----
let observer = null
onMounted(() => {
  measure()
  observer = new ResizeObserver(measure)
  observer.observe(rimEl.value)
})
onUnmounted(() => {
  observer?.disconnect()
  clearTimeout(wheelTimer)
  if (rafId) cancelAnimationFrame(rafId)
})
</script>

<template>
  <section id="wheel" aria-label="项目转盘">
    <div class="wheel-row">
      <div :key="nearestIndex" class="wheel-focus is-fresh" aria-live="polite">
        <a class="focus-link" href="#" @click.prevent="openProject(activeProject)">
          <img :src="activeProject.thumb" alt="" />
        </a>
        <div class="focus-body">
          <h3>
            <a href="#" @click.prevent="openProject(activeProject)">{{ activeProject.title }}</a>
          </h3>
          <p>{{ activeProject.desc }}</p>
        </div>
      </div>

      <div
        ref="rimEl"
        class="wheel-rim"
        :class="{ 'is-dragging': dragging }"
        tabindex="0"
        aria-describedby="wheel-hint"
        @wheel="onWheel"
        @pointerdown="onPointerDown"
        @pointermove="onPointerMove"
        @pointerup="onPointerUp"
        @pointercancel="endDrag"
        @pointerleave="endDrag"
        @keydown="onKeydown"
      >
        <div class="wheel-track">
          <div
            v-for="(p, i) in projects"
            :key="i"
            :ref="(el) => setCardEl(el, i)"
            :data-index="i"
            class="wheel-card"
            :class="{ 'is-placeholder': p.placeholder, 'is-active': i === nearestIndex }"
            :style="cardStyles[i]"
          >
            <img :src="p.thumb" alt="" draggable="false" />
          </div>
        </div>
      </div>
    </div>
    <p id="wheel-hint" class="wheel-hint">把鼠标移到转盘上，滚动或拖动以旋转</p>
  </section>
</template>

<style scoped>
/* 由原 wheel.css 收编而来，仅作用于本组件模板内的元素 */
/* 项目转盘（纵向）。尺寸随屏幕缩放：下限为原尺寸，上限为屏幕大小。 */

#wheel {
  padding: 0;
  /* 页面内跳转（如横幅"开始浏览"）时留出固定顶部栏的高度 */
  scroll-margin-top: 3.25em;
  /* 配合 html 上的 scroll-snap-type：滚动靠近时轻吸到转盘区，防止误滑走 */
  scroll-snap-align: start;
  /* 卡片绝对定位可伸出转盘左右边界，clip 防止把文档撑宽出现横向滚动条 */
  overflow-x: clip;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
}

.wheel-row {
  display: flex;
  align-items: center;
  gap: clamp(1.5em, 2.5vw, 2.5em);
  width: min(100%, 1600px);
  margin: 0 auto;
  padding: clamp(1em, 3vh, 3em) clamp(1em, 3vw, 3em);
  box-sizing: border-box;
}

/* 左侧：放大的当前卡片。宽度随屏幕增长，但不超过转盘区域的可用宽度 */
.wheel-focus { flex: 1 1 auto; min-width: 0; }

.wheel-focus img {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35);
}

.wheel-focus .focus-body { padding-top: clamp(0.8em, 1.5vh, 1.4em); }

.wheel-focus h3 {
  margin: 0 0 0.35em;
  font-size: clamp(1.3em, 2.2vw, 2.4em);
  line-height: 1.25;
}

.wheel-focus h3 a { color: inherit; }

.wheel-focus p {
  margin: 0 0 0.35em;
  opacity: 0.8;
  font-size: clamp(0.95em, 1.2vw, 1.25em);
}

.wheel-focus.is-fresh { animation: wheelFocusIn 0.45s ease both; }

@keyframes wheelFocusIn {
  from { opacity: 0; transform: translateX(-14px); }
  to   { opacity: 1; transform: none; }
}

/* 右侧：竖向转盘。高度 = 屏幕高度（下限 560px），宽度按比例 */
.wheel-rim {
  position: relative;
  flex: 0 0 clamp(260px, 18vw, 340px);
  height: clamp(480px, 84vh, 100vh);
  touch-action: none;
  cursor: ns-resize;
  outline: none;
  border-radius: 12px;
}

.wheel-rim.is-dragging { cursor: grabbing; }

.wheel-rim:focus-visible { box-shadow: 0 0 0 2px rgba(155, 241, 255, 0.45); }

.wheel-track { position: absolute; inset: 0; }

/* 卡片尺寸随转盘宽度缩放。JS 读取实际尺寸来计算圆弧位置。 */
.wheel-card {
  position: absolute;
  left: 0;
  top: 0;
  width: clamp(120px, 11vw, 170px);
  height: auto;
  aspect-ratio: 150 / 104;
  border-radius: 8px;
  overflow: hidden;
  background: #2a2f4a;
  border: 1px solid rgba(212, 212, 255, 0.18);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.35);
  cursor: pointer;
  will-change: transform, opacity;
}

.wheel-card img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}

.wheel-card.is-active {
  border-color: rgba(155, 241, 255, 0.6);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.5), 0 0 0 2px rgba(155, 241, 255, 0.35);
}

.wheel-hint {
  margin: 1.2em 0 0;
  text-align: center;
  font-size: 0.9em;
  opacity: 0.7;
}

@media (max-width: 736px) {
  .wheel-row { flex-direction: column; gap: 1.2em; padding: 1em; }
  .wheel-rim { flex: none; width: 100%; height: clamp(340px, 60vh, 560px); }
  .wheel-focus h3 { font-size: 1.3em; }
}

@media (prefers-reduced-motion: reduce) {
  .wheel-focus.is-fresh { animation: none; }
}

/* 焦点卡的链接：保持原来的文字颜色，悬停时高亮 */
.wheel-focus a { color: inherit; text-decoration: none; }
.wheel-focus h3 a:hover { color: #9bf1ff; }
.wheel-focus .focus-link { display: block; }
.wheel-focus .focus-link:focus-visible { outline: 2px solid #9bf1ff; outline-offset: 4px; border-radius: 8px; }

/* 占位卡：灰色显示，提示尚未填入真实项目 */
.wheel-card.is-placeholder img { filter: grayscale(0.85) brightness(0.7); }

</style>
