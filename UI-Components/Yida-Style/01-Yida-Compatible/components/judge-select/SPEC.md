# JudgeSelect — SPEC

## 0 · 令牌取值约定（Token Defaults）
本组件取色/尺寸/字号/字重/行高/圆角/阴影/层级一律引用 `../design-tokens.md` 令牌，实现写成 `var(--token, 兜底字面值)`、不裸写死。凡令牌规定的值：组件暴露了覆盖入口（props 中有对应项）的一律标 `Default 按令牌`（默认值＝令牌值，可覆盖但页面别随意改）；仅无任何覆盖入口（没有选择）的结构性规则才标 `MANDATORY`。宿主页面须先声明 design-tokens 的 :root 令牌块。

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
- pill 尺寸固定 `112px × 28px`（MANDATORY，见 design-tokens §4：判定块=图片上传按钮=附件按钮三者等大）。高 = `--h-ctrl`(28)（无覆盖入口，MANDATORY）；宽度 `Default 按令牌`：默认 112＝令牌值，可经 `width` 覆盖。
- pill 底色一律取判定令牌（MANDATORY：design-tokens §2 判定状态单一来源、`var(--j-*, #字面)` 不裸写死；具体色值 `Default 按令牌`，可经 `options[].color` 覆盖，默认＝令牌值）：待定 `--j-pending`(#eceff1，浅灰底、文字保持深色) / 通过 `--j-pass`(#19c355) / 带条件通过 `--j-cond`(#ffb300) / 不通过 `--j-fail`(#f44336) / 不适用 `--j-na`(#9e9e9e)；实现写成 `var(--j-*, #字面)`，禁止裸写死。
- 背景 = 选项 `color`(=上述判定令牌，`Default 按令牌`：可经 `options[].color` 覆盖，默认＝令牌值)，文字 = 选项 `textColor`（`Default 按令牌`：可经 `options[].textColor` 覆盖，默认＝令牌值）；圆角 `--r-ctrl`(6px)、字号 `--f-body`(14px)、居中（无覆盖入口，MANDATORY）。
- 可编辑态右侧画一个小下拉箭头（`::after` 45° 双边框，取文字色，opacity .7）（MANDATORY：这是与只读态唯一视觉区别）。
- hover / 选中底 `--brand-bg`(#e6f4ff)（MANDATORY）。
- 选项点 `optionRender`：色点 `8×8`、圆角 2px + 文字 gap 8（MANDATORY），色点取该选项判定令牌（如待定点 `--j-pending-dot`#b0bec5）。
- Select 原生 selector 去边框/阴影/背景、箭头隐藏，外观完全由 pill 承担（MANDATORY）。
- 下拉面板（portal）：行高 ≥ `--h-ctrl-lg`(32)、左右内距 10（MANDATORY，写在 popupClassName 作用域）。

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
- 五档判定的具体文案词（待定/通过/带条件通过/不通过/不适用）与 `带条件通过→带条件` 的短写、112/28 之外的一次性间距、示例 onChange 逻辑。注：判定色值本身由 design-tokens §2 规定，在 Visual Rules 标为 `Default 按令牌`（可经 `options[].color/textColor` 覆盖），不再属 Demo-Only。

## Migration Rules
- 原页 `cs-jctl / cs-jctl-pop / cs-jctl-ro / cs-jface / cs-jdot` → 泛化类名 `judge-select* / judge-pill`。
- `JUDGE_BG/JUDGE_TEXT/JUDGE_DOT/JUDGE_SHORT` 四张映射表合并为 `options[].color/textColor/shortLabel` 由宿主传入。

## Boundary Conditions
- `value` 不在 options 内：pill 取 `fallbackValue` 色，文字按原样。
- `readonly` 下 `onChange` 不会被触发。
