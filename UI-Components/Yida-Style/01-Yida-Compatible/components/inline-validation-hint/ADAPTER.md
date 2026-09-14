# InlineValidationHint — ADAPTER

## 输入（props）
| prop | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| status | 'idle'\|'loading'\|'pass'\|'fail'\|'required'\|'info' | 是 | 互斥单态 |
| text | string | 否 | 理由/提示（pass/fail/info） |
| labels | {loading?,passSuffix?,required?,failDefault?,info?} | 否 | 各态默认文案覆盖 |

## 输出 / 事件
无。纯展示。

## External Dependencies
- 无直接依赖。异步校验来源（平台大模型文本接口 / 后端 / 纯规则）都是宿主能力，不硬编码进组件。

## 宿主需负责（典型接线）
- 字段 `onChange`：改值即把 `status` 复位为 `idle`（清旧结论）。
- 字段 `onBlur`：
  1) 先跑必填逻辑 → 缺失则 `status='required'`；
  2) 需要异步时 → `status='loading'`，请求回来据结果置 `pass/fail/info` 并带理由 `text`。
- 把字段的 `status` 传给输入控件（如 antd `Input.TextArea status={fail/required?'error':pass?'success':''}`），与本提示行同色呼应。
- 保存前统一校验：任一 `required/fail` 未清则拦截提交（业务规则，不属组件）。

## 注意
- `required`（短）与 `fail`（详细异步失败）语义不同、必须分开取用（定稿"两类校验分开"）。
- 值一变要清 `status`，否则旧理由挂在新内容下会误导。
