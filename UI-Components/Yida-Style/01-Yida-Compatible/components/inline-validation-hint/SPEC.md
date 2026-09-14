# InlineValidationHint — SPEC

## Purpose
字段下方一行状态提示，展示（异步）校验结果；本身不校验、不发请求。

## Structure
```
<span class="vh-hint vh-{status}">[icon] text</span>   // status!=idle/无文本时不渲染
```

## States
- `idle` 或 `text` 空且非 loading：渲染 null（不占位）。
- `loading`：蓝 `#1677ff`，文案默认"校验中…"。
- `pass`：绿 `#19C355` + 勾选图标 + 理由。
- `fail`：红 `#F44336` + `!` + 理由（详细）。
- `required`：红短样式 `! 必填`（逻辑必填，与 `fail` 的异步失败区分——定稿要求两者分开）。
- `info`：灰 `rgba(0,0,0,0.45)`，用于"暂不可用/需人工确认"等中性提示。

## Interaction Rules
- 无交互。宿主在字段 `onBlur/onChange` 里异步校验，算出 `status + text` 回填。
- 建议宿主：值变化时把状态复位（清上一次结果），避免旧结论误导。

## Visual Rules
- `font-size:12px; line-height:1.5715; margin-top:4px; display:inline-block; max-width:100%; white-space:normal; word-break:break-word`（MANDATORY）。
- 颜色按 status：loading `#1677ff` / pass `#19C355` / fail·required `#F44336` / info `rgba(0,0,0,0.45)`（MANDATORY 与页面状态色一致）。
- pass 前 11px 勾、fail/required 前置 `!`（MANDATORY 语义前缀）；勾为内联 SVG，不引图标库。
- `word-break:break-word`：长理由换行不撑破列宽。

## Data Contract
props：
- `status: 'idle'|'loading'|'pass'|'fail'|'required'|'info'`
- `text?: string`（pass/fail/info 的理由或提示；缺省时各态有默认文案）
- `labels?: { loading?, passSuffix?, failPrefix?, required?, info? }`（文案覆盖）

## External Dependencies
无。异步校验（AI/接口/规则）由宿主在字段事件里执行，仅把结果 `status/text` 传入。

## Implementation Constraints
- 纯展示，不持有校验状态。
- 必填 vs 异步失败必须走不同 status（`required` 短、`fail` 详细），对应定稿"两类校验分开"。

## Demo-Only Properties
- 具体理由文案、"校验通过/校验中"默认字样（`labels` 可换）。

## Migration Rules
- 原页 `cs-ai / .pass / .fail` + 三行 tipText/okText/errorText + `errKind==='req'?'! 必填'` → 收敛为单组件 `status`。
- AI 调用 `aiValidateSelfNote`、`validateSelfNote`（必填）留宿主。

## Boundary Conditions
- 同时只会有一种状态（status 互斥）。
- `fail` 无 text：显示默认"校验未通过，请补充"。
