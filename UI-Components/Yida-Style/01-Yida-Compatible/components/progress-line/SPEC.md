# ProgressLine — SPEC

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
- 轨道 `height:14px; border-radius:99px; background:var(--track,#eef0f3); flex:1 1 auto`（MANDATORY 胶囊圆角与轨道填充）。
- 填充 `i`：`left:0;top:0;bottom:0; border-radius:99px; background:var(--pc,#19C355)`（MANDATORY）。
- 百分比文字：`font-size:20px; font-weight:600; min-width:52px; text-align:right; color:var(--pc)`（MANDATORY：文字色与填充色同源）。
- label `14px / rgba(0,0,0,0.65)`（MANDATORY）。
- 行 `display:flex; align-items:center; gap:12px`。
- 数字 `font-variant-numeric: tabular-nums`（MANDATORY）。

## Data Contract
props：
- `label: string` 选填，无则不渲染 label 段。
- `value: number` 必填，0–100（超界自动限幅）。
- `color: string` 选填，填充与百分比色，默认 `#19C355`。
- `trackColor: string` 选填，默认 `#eef0f3`。
- `height: number` 选填，默认 14（px）。
- `suffix: string` 选填，默认 `%`。

## External Dependencies
无。完成率的计算（分子/分母/取整）由宿主完成后传入。

## Implementation Constraints
- 不依赖 antd Progress。纯 CSS，可内联进宜搭页源码。
- 颜色一律走 `--pc`，禁止把语义色写死进类名。

## Demo-Only Properties
- 行下 `margin-bottom:14px`、示例文案、`20px` 百分比字号可按场景微调（但默认值即规范默认，改动记录为变体）。

## Migration Rules
- 原页 `cs-jbarline / cs-jbar / cs-jpct / cs-jlab` → `progress-line / pl-*`。
- `renderJudgeCard` 里 `jc = rev? '#1677ff' : '#19C355'` 的取色逻辑属宿主，改由 `color` 传入。

## Boundary Conditions
- `value` 非数字按 0；<0→0、>100→100。
- `label` 空则百分比仍右对齐。
