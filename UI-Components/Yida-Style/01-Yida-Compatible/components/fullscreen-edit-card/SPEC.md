# FullscreenEditCard — SPEC

## 0 · 令牌取值约定（Token Defaults）
取色/尺寸/阴影/层级引用 `../design-tokens.md`，实现写成 `var(--token, 兜底字面值)`。有覆盖入口（props）标 `Default 按令牌`；无覆盖入口的结构性规则标 `MANDATORY`。

## Purpose
给一张卡片加"全屏编辑"能力：普通/全屏两态、头部全屏切换按钮、Esc 退出、锁 body 滚动、进入全屏前复位兄弟卡 transform（与整卡吸顶互斥）。受控：`active`/`onActiveChange` 由宿主持有（页面级同一时刻至多一张全屏）。

## Structure
```
<Card class="fc-card" style={active? FULL : NORMAL}
      title={children title} extra={[host extra..., FullscreenButton]}>
  {children  // 可滚内容}
</Card>
// active=true 的副作用：body.style.overflow='hidden' + keydown(Escape)→onActiveChange(false)
// 点全屏：先 onBeforeEnter()（宿主清兄弟卡 transform）→ onActiveChange(true)
```
NORMAL：`marginBottom:14; display:flex; flex-direction:column; max-height:calc(100vh - 72px)`（72=顶栏 60 + 上边距 12）。
FULL：`position:fixed; top/left/right/bottom: inset(默认12); margin:0; width:auto; z-index:--z-full(950); background:#fff; box-shadow:--sh-full; max-height:calc(100vh - 24px)`。

## States
- normal：卡片在文档流内，内部滚动。
- fullscreen：fixed 铺满（内缩 inset）、抬升阴影、盖住工作台外壳（z 序：950 > 遮罩 900、< 弹窗 1000）。
- 切换按钮 title：normal→"全屏编辑…"，fullscreen→"退出全屏（Esc）"。

## Interaction Rules
- 点全屏按钮：若当前非全屏 → `onBeforeEnter?.()`（复位兄弟吸顶）→ `onActiveChange(true)`；若全屏 → `onActiveChange(false)`。
- Esc：全屏时 → `onActiveChange(false)`。
- 进入全屏锁 `body` 滚动，退出恢复原值（cleanup 必还原，防泄漏）。

## Visual Rules
- 卡圆角 `--r-card`(8)、底 `#fff`、边框 `--line`（normal）（**MANDATORY**）。
- FULL：`z-index` 用 `--z-full`(950)（**MANDATORY**，低于弹窗 1000 以免盖住自家 Modal/抽屉）、`box-shadow` 用 `--sh-full`(`0 8px 32px rgba(0,0,0,.20)`)（**MANDATORY**）。
- inset 默认 **12**（**Default 按令牌/定稿**：可经 `inset` prop 覆盖）；`max-height` 两态分别 `calc(100vh - 72px)` / `calc(100vh - 24px)`（**MANDATORY**：24=12×2 上下内缩）。
- 全屏按钮：`type=text` 图标按钮、与头部其它按钮同排（§2 图标按钮 32×32 档）。
- 内容区 `flex:1 1 auto; min-height:0; overflow:auto` 保证全屏/普通都能内滚（**MANDATORY**）。

## Data Contract
props：
- `active: boolean`（受控）
- `onActiveChange(active:boolean)`（受控回调）
- `title`、`extra`（宿主头部内容；组件在其后追加全屏按钮）
- `children`（卡片内容）
- `inset?: number`（**Default 按令牌=12**）
- `onBeforeEnter?: ()=>void`（宿主复位兄弟卡吸顶 transform）
- `enterTitle?/exitTitle?`（按钮 title 文案，默认定稿）
- `antd Card` 透传 `className`、`size` 等

## External Dependencies
- `document.body.style.overflow`（滚动锁）与 `window` keydown（Esc）——浏览器能力，组件内实现但影响全局，宿主须接受"全屏期间 body 被锁"。
- 兄弟卡 transform 复位逻辑本身属宿主/`scroll-pin-card`——经 `onBeforeEnter` 注入。
- 卡内容（表格/筛选/保存撤销等）由宿主提供，不属本件。

## Implementation Constraints
- 必须 `useEffect` cleanup 还原 body.overflow 并 removeEventListener（StrictMode/多实例下不泄漏）。
- 同一页面同时只允许一张全屏：受控 `active` 由宿主持有，组件不各自为政。
- 图标用内联 SVG，不引 `@ant-design/icons`。

## Demo-Only Properties
- 卡片内容、示例 title/extra、`inset` 具体值、max-height 里的 72/24 数值语境（随宿主顶栏高变化时按宿主调）。

## Migration Rules
- 原页 `cs-record-card` 的 `isFs` 三元 style + 全屏 Button + `useEffect[fullscreenInst]` → 收敛为 `fullscreen-edit-card`（受控）。
- `[].slice.call(document.querySelectorAll('.cs-record-card[data-cs-pin="1"]')).forEach(c=>c.style.transform='')` → 抽成宿主 `onBeforeEnter`。

## Boundary Conditions
- `active` 恒 false：等同普通卡片 + 一个不生效的按钮（宿主不接则无切换）。
- 卸载时若仍全屏：cleanup 仍还原 body.overflow。
- `onBeforeEnter` 缺省：不执行复位（页面若没有吸顶兄弟则无需）。
