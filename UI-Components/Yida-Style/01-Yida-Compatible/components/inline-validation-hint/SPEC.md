# InlineValidationHint — SPEC

## 0 · 令牌合规 Token Compliance（MANDATORY）
本组件所有取色/尺寸/字号/字重/行高/圆角/阴影/层级一律引用 `../design-tokens.md` 定义的令牌变量，实现里写成 `var(--token, 兜底字面值)`，不得裸写死数值。凡 design-tokens 规定的值即本件强制默认值；props 仅作覆盖入口，默认必须等于令牌值，页面级随意改令牌值视为违规。宿主页面须先声明 design-tokens 的 :root 令牌块。下方各节 MANDATORY 项均已按令牌取值。

## Purpose
字段下方一行状态提示，展示（异步）校验结果；本身不校验、不发请求。

## Structure
```
<span class="vh-hint vh-{status}">[icon] text</span>   // status!=idle/无文本时不渲染
```

## States
- `idle` 或 `text` 空且非 loading：渲染 null（不占位）。
- `loading`：蓝 `--brand`，文案默认"校验中…"。
- `pass`：绿 `--j-pass` + 勾选图标 + 理由。
- `fail`：红 `--j-fail`（=`--danger`） + `!` + 理由（详细）。
- `required`：红 `--j-fail` 短样式 `! 必填`（逻辑必填，与 `fail` 的异步失败区分——定稿要求两者分开）。
- `info`：灰 `--t3`，用于"暂不可用/需人工确认"等中性提示。

## Interaction Rules
- 无交互。宿主在字段 `onBlur/onChange` 里异步校验，算出 `status + text` 回填。
- 建议宿主：值变化时把状态复位（清上一次结果），避免旧结论误导。

## Visual Rules
- `font-size:12px` = `--f-aux` / `line-height:1.5715` = `--lh-body` / `margin-top:4px; display:inline-block; max-width:100%; white-space:normal; word-break:break-word`（MANDATORY）。
- 纯彩色文字：无气泡、无背景、无边框（MANDATORY：只取色，不画底色/描边）。
- 颜色按 status：loading `--brand` / pass `--j-pass` / fail·required `--j-fail`（=`--danger`）/ info `--t3`（MANDATORY，与页面判定色单一来源一致）。
- 两类校验区分（MANDATORY）：`required` = 短"！ 必填"（逻辑必填）；`fail` = 红色详细理由（智能校验不通过）；`pass` 只写"✓ 校验通过"，不赘述。
- 措辞铁律（MANDATORY）：用"智能校验"，不用"AI"字样。
- 语义前缀：pass 前置"✓"（内联 SVG 勾，不引图标库）、fail/required 前置 `!`（MANDATORY）。
- `word-break:break-word`：长理由换行不撑破列宽。

## Data Contract
props：
- `status: 'idle'|'loading'|'pass'|'fail'|'required'|'info'`
- `text?: string`（pass/fail/info 的理由或提示；缺省时各态有默认文案）
- `labels?: { loading?, passSuffix?, failPrefix?, required?, info? }`（文案覆盖）

## External Dependencies
无。异步校验（智能校验/接口/规则）由宿主在字段事件里执行，仅把结果 `status/text` 传入。

## Implementation Constraints
- 纯展示，不持有校验状态。
- 必填 vs 异步失败必须走不同 status（`required` 短、`fail` 详细），对应定稿"两类校验分开"。

## Demo-Only Properties
- 具体理由文案（示例中"说明具体、可核验""未写明实测值与判定依据…"等）属真示例内容。"校验通过 / 校验中 / 必填"等状态字样是 design-tokens §5 MANDATORY 用词（见 Visual Rules），`labels` 仅作覆盖入口且默认必须等于令牌值，不作可随意改的 Demo 项。

## Migration Rules
- 原页 `cs-ai / .pass / .fail` + 三行 tipText/okText/errorText + `errKind==='req'?'! 必填'` → 收敛为单组件 `status`。
- 智能校验调用 `aiValidateSelfNote`、`validateSelfNote`（必填）留宿主。

## Boundary Conditions
- 同时只会有一种状态（status 互斥）。
- `fail` 无 text：显示默认"校验未通过，请补充"。
