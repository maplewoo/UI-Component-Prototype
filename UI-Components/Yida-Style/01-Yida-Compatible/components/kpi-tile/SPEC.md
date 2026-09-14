# KpiTile — SPEC

组件设计与行为的最高依据。只有标 **MANDATORY** 的条目是强制约束；未标的按 `ADAPTER.md` / `preview.html` 说明处理。

## Purpose
并列展示单个关键指标：语义色条 + 标签 + 强调数值。纯展示，无交互。

## Structure
```
<div class="kpi-tile" style="--kc:<color>">
  <span class="kpi-tile-label">label</span>
  <span class="kpi-tile-value">value</span>
</div>
```
- 容器 `position:relative; overflow:hidden`（MANDATORY：色条靠 `::before` 绝对定位在顶部）。
- 顶部色条 `::before`：`left/right/top:0; height:3px; background:var(--kc)`（MANDATORY）。

## States
- default：显示 `value`。
- loading：`value` 位显示占位 `—`（灰色），色条仍显示（MANDATORY 占位符为 `—`，不得撑破高度）。
- 无 hover / focus / disabled：组件不接收指针交互（`pointer-events` 由宿主决定，默认不拦截）。

## Interaction Rules
无内置交互。

## Visual Rules
- 文本层级：label `12px / rgba(0,0,0,0.65)`；value `16px / 600 / 1.3 / letter-spacing -0.2px`（MANDATORY 字号与字重）。
- value 颜色 = `var(--kc)`（MANDATORY：数值与色条同源）。
- `font-variant-numeric: tabular-nums`（MANDATORY：数字等宽，多卡并排对齐）。
- 圆角 `8px`、边框 `1px solid #f0f0f0`、背景 `#fff`、阴影 `0 1px 2px rgba(16,24,40,0.04)`（MANDATORY）。
- label 单行省略（`white-space:nowrap; overflow:hidden; text-overflow:ellipsis`）（MANDATORY）。
- 固定宽度 `98px` 与内距 `10px 6px 8px` 是 **Demo-Only**，宿主可覆盖尺寸；但最小宽度应 ≥ 60px 以免标签整词换行。

## Data Contract（props）
- `label: string` 必填，指标名。
- `value: number | string` 必填，指标值。
- `color: string` 选填，十六进制色值或 CSS 颜色；缺省时 value 回落 `rgba(0,0,0,0.88)`、色条回落 `#ccc`。
- `loading: boolean` 选填，默认 false。

## External Dependencies
无。语义色值（如 `#F44336`/`#19C355`/`#FFB300`）由宿主作为业务约定传入，组件不内置任何业务含义。

## Implementation Constraints
- 不依赖 antd；纯 DOM + CSS，可内联进宜搭页面源码。
- 颜色一律走 CSS 自定义属性 `--kc`，禁止把语义色硬编码进类名。

## Demo-Only Properties（不得当成规范）
- 98px 固定宽度、卡间 gap、页面背景、示例标签文案与示例色值。

## Migration Rules
- 从原页面提取时：`kpiTile(label, value, color)` 的 `--kc` 内联写法保留；业务标签与色值改为 mock。
- 类名 `cs-kpi / cs-k-label / cs-k-value` 统一前缀改名为 `kpi-tile*`，与具体看板解耦。

## Boundary Conditions
- `value` 为空字符串按 loading 之外正常渲染（显示空），不自动转 `—`。
- `label` 超长以省略号收尾，不撑高容器。
