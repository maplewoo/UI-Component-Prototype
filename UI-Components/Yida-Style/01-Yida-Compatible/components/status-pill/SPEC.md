# StatusPill — SPEC

## 0 · 令牌合规 Token Compliance（MANDATORY）
本组件所有取色/尺寸/字号/字重/行高/圆角/阴影/层级一律引用 `../design-tokens.md` 定义的令牌变量，实现里写成 `var(--token, 兜底字面值)`，不得裸写死数值。凡 design-tokens 规定的值即本件强制默认值；props 仅作覆盖入口，默认必须等于令牌值，页面级随意改令牌值视为违规。宿主页面须先声明 design-tokens 的 :root 令牌块。下方各节 MANDATORY 项均已按令牌取值。

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
- 胶囊 `height:26px; padding:0 10px; border:1px solid var(--line,#f0f0f0); border-radius:13px; background:#fff; display:inline-flex; align-items:center; gap:6px`（MANDATORY；圆角属"小元素/胶囊"档，边框 = `--line`#f0f0f0）。
- 色点 `8×8; border-radius:50%; flex:0 0 auto`（MANDATORY，design-tokens §4 色点 8）。
- 计数 `font-weight:var(--fw-strong,600); color:var(--t1,rgba(0,0,0,.88)); font-variant-numeric:tabular-nums`（MANDATORY）。
- 标签 `font-size:var(--f-aux,12px); color:var(--t3,rgba(0,0,0,.45))`（MANDATORY）。
- 交互变体：`interactive` 时 `cursor:pointer; flex:0 0 auto`，hover 底 `--fill-hover`(#f5f7fa)，选中底 `--brand-bg`(#e6f4ff) + 边框 `--brand`(#1677ff)（MANDATORY）。

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
- `color` 缺省用 `var(--j-pending-dot,#b0bec5)` 灰点兜底（不隐藏点）。
