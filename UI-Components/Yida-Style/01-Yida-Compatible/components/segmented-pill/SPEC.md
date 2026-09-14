# SegmentedPill — SPEC

## Purpose
少量互斥分段（Tab）切换：滑块指示选中项，支持每段可选"锁定"。

## Structure
```
<div class="seg-pill" role="tablist">
  <span class="seg-thumb" style="transform:translateX(idx*100%)"/>
  <button class="seg-item is-active|is-locked">label</button> ...
</div>
```
容器 `padding:4px; background:#eef0f3; border-radius:10px`（MANDATORY）；滑块绝对定位在容器内、`width:calc((100% - 8px)/N)`。

## States
- active：滑块覆盖该段，文字白色。
- inactive：透明底，文字 `rgba(0,0,0,0.88)`。
- locked：文字 `rgba(0,0,0,0.25)`，`cursor:not-allowed`；点击不切换、触发 `onLockClick`。

## Interaction Rules
- 点击未锁定段 → `onChange(value)`；滑块随之位移动画。
- 点击锁定段 → 不切换，调用 `onLockClick?(value)`。
- `lockPredicate(value)` 决定哪些段锁定（宿主提供，如"另一个视图有未保存改动时锁定"）。
- 受控：`value` 由宿主持有。

## Visual Rules
- 滑块 `background:var(--sc,#1677ff); border-radius:6px; box-shadow:0 1px 3px rgba(16,24,40,0.15)`；`transition:transform .28s cubic-bezier(.4,0,.2,1)`（MANDATORY：唯一位移动画，颜色可配）。
- 段 `font-size:16px; font-weight:600; padding:8px 12px; border-radius:6px; flex:1 1 50%`（宽度等分，MANDATORY）；`z-index:1` 使文字在滑块之上。
- 段文字色随 active 变白（`transition:color .28s ease`）。
- `:focus-visible` 焦点环 2px 主色（无障碍，MANDATORY 保留可聚焦）。

## Data Contract
props：
- `options: [{ value, label }]`（必填）
- `value: string`（受控当前值，必填）
- `onChange(value)`（必填）
- `lockPredicate?: (value)=>boolean`（选填）
- `onLockClick?: (value)=>void`（选填，默认无操作）
- `activeColor?: string`（滑块/激活主色，默认 `#1677ff`）
- `width?: number|'100%'`（默认固定 360，可 `fill` 撑满）

## External Dependencies
无（不接 message/后端）。"点击锁定段后的提示"由宿主在 `onLockClick` 里用自身 Toast 实现，不进组件。

## Implementation Constraints
- 纯 CSS 位移，不引动画库。滑块位置由 `idx*100%` 计算，段数变化自动适配。
- 等宽分段（`flex:1 1 50%` 类）；如需按内容宽要另做变体（当前不支持）。

## Demo-Only Properties
- `360px` 宽、`16px` 字号（可按密度调，属变体）、示例分段文案"视图A/视图B"。

## Migration Rules
- 原页 `cs-seg / cs-seg-thumb / cs-seg-item(.is-active/.is-locked)` → `seg-pill / seg-thumb / seg-item`。
- 原 `dirtyFlags[otherKey]` 的锁定判断从组件里剥离为 `lockPredicate`；`message.warning('当前有未保存的修改')` 移到宿主 `onLockClick`。

## Boundary Conditions
- `options` 长度 1：滑块满宽、不可点切换（无他段）。
- `value` 不在 options：不显滑块位（回落 idx 0）。
