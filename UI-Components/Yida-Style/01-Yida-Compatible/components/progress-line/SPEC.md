# ProgressLine — SPEC

## 0 · 令牌合规 Token Compliance（MANDATORY）
本组件所有取色/尺寸/字号/字重/行高/圆角/阴影/层级一律引用 `../design-tokens.md` 定义的令牌变量，实现里写成 `var(--token, 兜底字面值)`，不得裸写死数值。凡 design-tokens 规定的值即本件强制默认值；props 仅作覆盖入口，默认必须等于令牌值，页面级随意改令牌值视为违规。宿主页面须先声明 design-tokens 的 :root 令牌块。下方各节 MANDATORY 项均已按令牌取值。

## Purpose
横向单行进度：`label` + 圆角条 + `value%`。

## Structure
```
<div class="progress-line">
  <span class="pl-label">label</span>
  <span class="pl-track"><i style="width:V%; --pc:color"/></span>
  <span class="pl-pct" style="--pc:color">V%</span>
</div>
```

## States
- default：0–100 线性填充，`width` 限幅。
- 100%：满条；0%：仅轨道。
- 无动画要求（可选平滑 width 过渡，属增强、非强制）。

## Visual Rules
- 轨道 `height:14px; border-radius:99px; background:var(--track,#eef0f3); flex:1 1 auto`（MANDATORY：轨道 = 令牌 `--track`#eef0f3；胶囊圆角）。
- 填充 `i`：`left:0;top:0;bottom:0; border-radius:99px; background:var(--pc,var(--j-pass,#19c355))`（MANDATORY：默认填充 = `--j-pass`#19c355，`color` 仅作覆盖入口）。
- 百分比文字：`font-size:var(--f-title,20px); font-weight:var(--fw-strong,600); line-height:var(--lh-num,1.2); min-width:52px; text-align:right; color:var(--pc,var(--j-pass,#19c355))`（MANDATORY：完成率百分比放大 20 属 `--f-title`（§4），文字色与填充色同源，默认 `--j-pass`）。
- label `font-size:var(--f-body,14px); color:var(--t2,rgba(0,0,0,.65))`（MANDATORY）。
- 行 `display:flex; align-items:center; gap:12px`。
- 数字 `font-variant-numeric: tabular-nums`（MANDATORY）。

## Data Contract
props：
- `label: string` 选填，无则不渲染 label 段。
- `value: number` 必填，0–100（超界自动限幅）。
- `color: string` 选填，填充与百分比色覆盖入口，默认 = 令牌 `--j-pass`#19c355。
- `trackColor: string` 选填，覆盖入口，默认 = 令牌 `--track`#eef0f3。
- `height: number` 选填，默认 14（px）。
- `suffix: string` 选填，默认 `%`。

## External Dependencies
无。完成率的计算（分子/分母/取整）由宿主完成后传入。

## Implementation Constraints
- 不依赖 antd Progress。纯 CSS，可内联进宜搭页源码。
- 颜色一律走 `--pc`，禁止把语义色写死进类名。

## Demo-Only Properties
- 行下 `margin-bottom:14px` 一次性间距、示例文案（自查/复查完成率等）。注：`20px` 百分比字号属完成率令牌 `--f-title`（design-tokens §4 完成率百分比放大 20），已升级 Visual Rules MANDATORY，不再属 Demo-Only。

## Migration Rules
- 原页 `cs-jbarline / cs-jbar / cs-jpct / cs-jlab` → `progress-line / pl-*`。
- `renderJudgeCard` 里 `jc = rev? '#1677ff' : '#19C355'` 的取色逻辑属宿主，改由 `color` 传入。

## Boundary Conditions
- `value` 非数字按 0；<0→0、>100→100。
- `label` 空则百分比仍右对齐。
