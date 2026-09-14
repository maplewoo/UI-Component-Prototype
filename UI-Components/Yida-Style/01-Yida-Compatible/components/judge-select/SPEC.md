# JudgeSelect — SPEC

## Purpose
色彩编码的单选下拉（可编辑）与其只读态（色块 pill）。选中值用背景/文字色直接表达语义状态。

## Structure
可编辑：
```
<Select className="judge-select" popupClassName="judge-select-pop" labelRender={colorPill} optionRender={dot + label} />
```
只读：
```
<span className="judge-pill" style="--jc:..;--jc-t:..">短标签</span>
```

## States
- editable：显示当前值色块 + 下拉箭头；点击展开，选项含同色点，hover 高亮。
- readonly：仅色块 pill，无箭头、不可点。
- 空值：回落到 `fallbackValue`（如"待定"），显示其色块。

## Interaction Rules
- 可编辑：`onChange(value)`；选值即回写；`readonly` 时无任何交互。
- 组件不发请求、不校验；校验/联动由宿主在 `onChange` 里做。

## Visual Rules
- pill 尺寸 `112px × 28px`（宽度 MANDATORY 可配 `width`，默认 112；高 28px MANDATORY）。
- 背景 = 选项 `color`，文字 = 选项 `textColor`；圆角 6px；字号 14px；居中（MANDATORY）。
- 可编辑态右侧画一个小下拉箭头（`::after` 45° 双边框，取文字色，opacity .7）（MANDATORY：这是与只读态唯一视觉区别）。
- 选项点 `optionRender`：色点 `8×8`、圆角 2px + 文字 gap 8（MANDATORY）。
- Select 原生 selector 去边框/阴影/背景、箭头隐藏，外观完全由 pill 承担（MANDATORY）。
- 下拉面板（portal）：行高 ≥32、左右内距 10（MANDATORY，写在 popupClassName 作用域）。

## Data Contract
props：
- `value: string`
- `onChange(value)`（readonly 时可省）
- `options: [{ value, label, color, textColor, shortLabel? }]`
  - `shortLabel`：收起态显示的短文案（缺省用 `label`）。色点/文字仍用 `label`。
- `readonly: boolean`（默认 false）
- `width: number`（默认 112）
- `fallbackValue: string`（value 为空时用于取色的兜底，如 `'待定'`）

## External Dependencies
- antd `Select`（宜搭运行时内置）。
- 无接口 / Toast / 字段 ID；语义状态集合（选项 + 配色）由宿主传入。

## Implementation Constraints
- Portal：`popupClassName` 作用域内写字面色值（面板在 body、脱离页面令牌作用域）。
- 不内置任何具体业务状态词与色值；示例（待定/通过/带条件通过/不通过/不适用 + 其配色）为 mock。

## Demo-Only Properties
- 五档判定的具体文案与色值、`带条件通过→带条件` 的短写、112/28 之外的间距、示例 onChange 逻辑。

## Migration Rules
- 原页 `cs-jctl / cs-jctl-pop / cs-jctl-ro / cs-jface / cs-jdot` → 泛化类名 `judge-select* / judge-pill`。
- `JUDGE_BG/JUDGE_TEXT/JUDGE_DOT/JUDGE_SHORT` 四张映射表合并为 `options[].color/textColor/shortLabel` 由宿主传入。

## Boundary Conditions
- `value` 不在 options 内：pill 取 `fallbackValue` 色，文字按原样。
- `readonly` 下 `onChange` 不会被触发。
