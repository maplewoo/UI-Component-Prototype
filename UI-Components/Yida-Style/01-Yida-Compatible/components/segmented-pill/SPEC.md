# SegmentedPill — SPEC

## 0 · 令牌合规 Token Compliance（MANDATORY）
本组件所有取色/尺寸/字号/字重/行高/圆角/阴影/层级一律引用 `../design-tokens.md` 定义的令牌变量，实现里写成 `var(--token, 兜底字面值)`，不得裸写死数值。凡 design-tokens 规定的值即本件强制默认值；props 仅作覆盖入口，默认必须等于令牌值，页面级随意改令牌值视为违规。宿主页面须先声明 design-tokens 的 :root 令牌块。下方各节 MANDATORY 项均已按令牌取值。

## Purpose
少量互斥分段（Tab）切换：滑块指示选中项，支持每段可选"锁定"。

## Structure
```
<div class="seg-pill" role="tablist">
  <span class="seg-thumb" style="transform:translateX(idx*100%)"/>
  <button class="seg-item is-active|is-locked">label</button> ...
</div>
```
容器 `padding:4px`（灰槽内距 4，MANDATORY）`background:var(--track,#eef0f3); border-radius:10px`（MANDATORY）；滑块绝对定位在容器内、`width:calc((100% - 8px)/N)`。

## States
- active：滑块覆盖该段，文字白色。
- inactive：透明底，文字 `var(--t1,rgba(0,0,0,.88))`（`--t1`）。
- locked：文字 `var(--t4,rgba(0,0,0,.25))`（`--t4`），`cursor:not-allowed`；点击不切换、触发 `onLockClick`。

## Interaction Rules
- 点击未锁定段 → `onChange(value)`；滑块随之位移动画。
- 点击锁定段 → 不切换，调用 `onLockClick?(value)`。
- `lockPredicate(value)` 决定哪些段锁定（宿主提供，如"另一个视图有未保存改动时锁定"）。
- 受控：`value` 由宿主持有。

## Visual Rules
- 滑块 `background:var(--sc,var(--brand,#1677ff)); border-radius:var(--r-ctrl,6px); box-shadow:0 1px 3px rgba(16,24,40,0.15)`；`transition:transform .28s cubic-bezier(.4,0,.2,1)`（MANDATORY：唯一位移动画；底色默认 `--brand`#1677ff，`activeColor` 仅作覆盖入口）。
- 段字号属"卡片标题级"：`font-size:var(--f-sub,16px); font-weight:var(--fw-strong,600)`（MANDATORY，design-tokens §3）；`padding:8px 12px; border-radius:var(--r-ctrl,6px); flex:1 1 50%`（宽度等分，MANDATORY）；`z-index:1` 使文字在滑块之上。
- 段文字色随 active 变白（选中项白字，MANDATORY），`transition:color .28s ease`。
- `:focus-visible` 焦点环 2px `--brand`(#1677ff) + 2px 外偏移（无障碍，MANDATORY 保留可聚焦）；禁用（locked）态不给焦点环（design-tokens §5）。

## Data Contract
props：
- `options: [{ value, label }]`（必填）
- `value: string`（受控当前值，必填）
- `onChange(value)`（必填）
- `lockPredicate?: (value)=>boolean`（选填）
- `onLockClick?: (value)=>void`（选填，默认无操作）
- `activeColor?: string`（滑块/激活主色覆盖入口，默认 = 令牌 `--brand`#1677ff）
- `width?: number|'100%'`（默认固定 360，可 `fill` 撑满）

## External Dependencies
无（不接 message/后端）。"点击锁定段后的提示"由宿主在 `onLockClick` 里用自身 Toast 实现，不进组件。

## Implementation Constraints
- 纯 CSS 位移，不引动画库。滑块位置由 `idx*100%` 计算，段数变化自动适配。
- 等宽分段（`flex:1 1 50%` 类）；如需按内容宽要另做变体（当前不支持）。

## Demo-Only Properties
- `360px` 默认宽（`width` prop 覆盖入口，属页面布局而非令牌）、示例分段文案"视图A/视图B"。注：`16px` 字号属"卡片标题级"由 design-tokens §3 规定，已升级 Visual Rules MANDATORY，不再属 Demo-Only。

## Migration Rules
- 原页 `cs-seg / cs-seg-thumb / cs-seg-item(.is-active/.is-locked)` → `seg-pill / seg-thumb / seg-item`。
- 原 `dirtyFlags[otherKey]` 的锁定判断从组件里剥离为 `lockPredicate`；`message.warning('当前有未保存的修改')` 移到宿主 `onLockClick`。

## Boundary Conditions
- `options` 长度 1：滑块满宽、不可点切换（无他段）。
- `value` 不在 options：不显滑块位（回落 idx 0）。
