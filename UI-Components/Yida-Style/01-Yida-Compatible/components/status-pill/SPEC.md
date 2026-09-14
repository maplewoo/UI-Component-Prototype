# StatusPill — SPEC

## Purpose
单枚"色点 + 计数 + 标签"胶囊；多枚由宿主并排。

## Structure
```
<span class="status-pill">
  <i class="sp-dot" style="background:color"/>
  <b class="sp-num">count</b>
  <span class="sp-lab">label</span>
</span>
```

## States
- default：三点齐全。
- count=0：照常显示 0（是否淡化由宿主决定，组件不隐藏）。
- 可选 `active`（点击筛选时的高亮描边）——本组件默认不含交互；如宿主要做"点胶囊筛选"，加 `interactive:true` 后 hover/active 有底色。

## Visual Rules
- 胶囊 `height:26px; padding:0 10px; border:1px solid #f0f0f0; border-radius:13px; background:#fff; display:inline-flex; align-items:center; gap:6px`（MANDATORY）。
- 色点 `8×8; border-radius:50%; flex:0 0 auto`（MANDATORY）。
- 计数 `font-weight:600; color:rgba(0,0,0,0.88); font-variant-numeric:tabular-nums`（MANDATORY）。
- 标签 `font-size:12px; color:rgba(0,0,0,0.45)`（MANDATORY）。
- 交互变体：`interactive` 时 `cursor:pointer; flex:0 0 auto`，hover 底色 `#f5f7fa`，active 底 `#e6f4ff` + 边框主色。

## Data Contract
props：
- `label: string`（必填）
- `count: number`（必填）
- `color: string`（必填，点色）
- `shortLabel?: string`（选填，缺省用 label）
- `interactive?: boolean`（默认 false）
- `onClick?: ()=>void`（interactive 时有效）

## External Dependencies
无。计数与配色来自宿主（与判定 pill / 进度条共用同一 `status→color` 映射）。

## Implementation Constraints
- 纯展示（interactive 只是加光标/底色，不改数据）。
- 不内置状态词与色值（示例"待定/通过/…"为 mock）。

## Demo-Only Properties
- `26px` 高、`13px` 圆角、`gap` 等按紧凑默认；一排并排的容器/换行由宿主。`shortLabel`（如"带条件"）为业务简写、属用法。

## Migration Rules
- 原页 `cs-pill2 / .dot / .n / .lab` → `status-pill / sp-dot / sp-num / sp-lab`。
- `JUDGE_DOT`、`带条件通过→带条件` 简写映射外置到宿主 `color/shortLabel`。

## Boundary Conditions
- `count` 非数字按 0 显示。
- `color` 缺省用 `#B0BEC5` 灰点兜底（不隐藏点）。
