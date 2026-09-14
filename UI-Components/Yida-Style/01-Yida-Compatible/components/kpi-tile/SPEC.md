# KpiTile — SPEC

## 0 · 令牌合规 Token Compliance（MANDATORY）
本组件所有取色/尺寸/字号/字重/行高/圆角/阴影/层级一律引用 `../design-tokens.md` 定义的令牌变量，实现里写成 `var(--token, 兜底字面值)`，不得裸写死数值。凡 design-tokens 规定的值即本件强制默认值；props 仅作覆盖入口，默认必须等于令牌值，页面级随意改令牌值视为违规。宿主页面须先声明 design-tokens 的 :root 令牌块。下方各节 MANDATORY 项均已按令牌取值。

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
- 顶部色条 `::before`：`left/right/top:0; height:3px; background:var(--kc)`（MANDATORY，3px 见 design-tokens §4）。

## States
- default：显示 `value`。
- loading：`value` 位显示占位 `—`（灰色），色条仍显示（MANDATORY 占位符为 `—`、占位色 `rgba(0,0,0,0.25)`=`--t4`，不得撑破高度）。
- 无 hover / focus / disabled：组件不接收指针交互（`pointer-events` 由宿主决定，默认不拦截）。

## Interaction Rules
无内置交互。

## Visual Rules
- 文本层级：label `12px`（`--f-aux`）/ `rgba(0,0,0,0.65)`（`--t2`）；value `16px`（`--f-sub`）/ `600`（`--fw-strong`）/ `1.3`（`--lh-heading`）/ letter-spacing -0.2px（非令牌，design-tokens 未定义）（MANDATORY 字号与字重）。
- value 颜色 = `var(--kc)`（MANDATORY：数值与色条同源）。
- `font-variant-numeric: tabular-nums`（MANDATORY：数字等宽，多卡并排对齐）。
- 圆角 `8px`（`--r-card`）、边框 `1px solid #f0f0f0`（`--line`）、背景 `#fff`（非令牌）、阴影 `0 1px 2px rgba(16,24,40,0.04)`（`--sh-card`）（MANDATORY）。
- label 单行省略（`white-space:nowrap; overflow:hidden; text-overflow:ellipsis`）（MANDATORY）。
- 固定宽度 `98px` **MANDATORY**（design-tokens §4：KPI/项目级指标 tile 宽 98，不得页面级改动）；loading 占位 `—` 用 `rgba(0,0,0,0.25)`（`--t4`）**MANDATORY**。内距 `10px 6px 8px` 为 Demo-Only，宿主可覆盖；但最小宽度应 ≥ 60px 以免标签整词换行。

## Data Contract（props）
- `label: string` 必填，指标名。
- `value: number | string` 必填，指标值。
- `color: string` 选填，CSS 颜色（建议传 `var(--token,#字面)` 形式）；缺省时 value 回落 `rgba(0,0,0,0.88)`（`--t1`）、色条回落 `#ccc`（非令牌兜底）。
- `loading: boolean` 选填，默认 false。

## External Dependencies
无。语义色值（如 `#F44336`=`--j-fail` / `#19C355`=`--j-pass` / `#FFB300`=`--j-cond` / `#1677ff`=`--brand`）由宿主作为业务约定传入（优先写 `var(--token,#字面)`），组件不内置任何业务含义。

## Implementation Constraints
- 不依赖 antd；纯 DOM + CSS，可内联进宜搭页面源码。
- 颜色一律走 CSS 自定义属性 `--kc`，禁止把语义色硬编码进类名；除 `--kc` 覆盖入口外，其余取色/圆角/字号/字重/行高/阴影一律写 `var(--token, 兜底字面值)`。

## Demo-Only Properties（不得当成规范）
- 卡间 gap、页面背景、示例标签文案与示例色值。（98px 固定宽度与 3px 色条已按 design-tokens §4 升级为 MANDATORY，不再属 Demo。）

## Migration Rules
- 从原页面提取时：`kpiTile(label, value, color)` 的 `--kc` 内联写法保留；业务标签与色值改为 mock。
- 类名 `cs-kpi / cs-k-label / cs-k-value` 统一前缀改名为 `kpi-tile*`，与具体看板解耦。

## Boundary Conditions
- `value` 为空字符串按 loading 之外正常渲染（显示空），不自动转 `—`。
- `label` 超长以省略号收尾，不撑高容器。
