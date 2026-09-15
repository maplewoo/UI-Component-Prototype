# JudgeSummaryCard — SPEC

## 0 · 令牌取值约定（Token Defaults）
本卡取色/尺寸/字号/圆角/阴影一律引用 `../design-tokens.md`，实现写成 `var(--token, 兜底字面值)`、不裸写死。有覆盖入口（props）的标 `Default 按令牌`；无覆盖入口的结构性规则标 `MANDATORY`。卡体子件（进度条、计数胶囊）各自令牌见 `progress-line`/`status-pill`。

## Purpose
判定概览卡 = 卡头(标题+共N项) + 完成率进度条 + 状态计数胶囊行。`自查判定` / `复查判定` 两张并排。

## Structure
```
Card(class jc-card)  title=标题   extra="共 N 项"
  - ProgressLine(label 完成率, value=rate, color=barColor)   [复用 progress-line]
  - 一行 StatusPill[](items)                                 [复用 status-pill]
```

## States
- 默认：`total>0` 正常显示；`total===0` 进度条 0%、胶囊各计 0（仍显 0，不隐藏）。
- 可选点击筛选：给 `onItemClick` 时胶囊可点（interactive 态），否则纯展示。

## Interaction Rules
- 组件自身不算完成率、不聚合数据；`rate`、`items[].count`、`total` 由宿主传入。
- `onItemClick(item)` 选填：点某状态胶囊回传（宿主用于筛选表格）。

## Visual Rules
- 卡：`flex:1 1 420px; min-width:360px`、圆角 `--r-card`(8)、边框 `--line`、阴影 `--sh-card`（**MANDATORY**）。卡头 `min-height:40px; padding:8px 16px; background:--head-bg; border-bottom:1px solid --line`（**MANDATORY**）。
- 标题 `16/600 --t1`（`--f-sub`/`--fw-strong`）；右上"共 N 项" `12 --t3`（`--f-aux`）。
- 完成率条：走 `progress-line`，`barColor` 默认 `--j-pass`(绿，自查)；复查卡传 `--brand`(蓝)。
- 胶囊行：`display:flex; justify-content:center; gap:8px; overflow-x:auto`（**MANDATORY 整行卡内居中**）；胶囊走 `status-pill`（色点 `--j-*`）。放不下优先用 `shortLabel` 缩标签（§4）。
- 两卡一行、间距由宿主容器给（`gap`，示例 16）。

## Data Contract
props：
- `title: string`（卡头标题）
- `rate: number`（0–100，宿主按完成率公式算好）
- `items: [{ label, count, color, shortLabel? }]`（状态计数，色点取判定令牌）
- `barColor?: string`（完成率条色，**Default 按令牌=`--j-pass`**）
- `total?: number`（右上计数；缺省＝items 之和）
- `onItemClick?: (item)=>void`（选填筛选）

## External Dependencies
- 无接口依赖；但**完成率公式**（(通过+带条件+不适用)/总数，见 §5）与 counts 聚合属宿主数据层，组件只渲染传入值。
- 复用件 `progress-line`、`status-pill`。

## Implementation Constraints
- 完成率条与胶囊必须共用全站判定令牌色（改一处全站同步）。
- 不自绘进度条/胶囊，直接组合两子件（单一来源）。

## Demo-Only Properties
- 示例 counts/率/标签文案、`min-width 360 / flex 1 1 420` 的可压缩性、两卡间距。

## Migration Rules
- 原页 `renderJudgeCard` + `cs-jcard / cs-jbarline / cs-pills / cs-pill2` → `judge-summary-card` 组合 `progress-line`+`status-pill`。
- `selfCounts/reviewCounts`、`jc = rev?'#1677ff':'#19C355'` 上移宿主：分别传 `rate/items/barColor`。

## Boundary Conditions
- `items` 空：仅显进度条。
- `total` 与 items 之和不一致时以传入 `total` 为准（宿主负责一致）。
