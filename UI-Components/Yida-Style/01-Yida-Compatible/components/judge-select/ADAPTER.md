# JudgeSelect — ADAPTER

## 输入（props）
| prop | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | string | 是 | 当前值 |
| onChange | (v)=>void | 可编辑时必填 | 选值回调 |
| options | [{value,label,color,textColor,shortLabel?}] | 是 | 状态集合与配色，宿主定义 |
| readonly | boolean | 否 | 默认 false；true 时渲染只读 pill |
| width | number | 否 | 默认 112 |
| fallbackValue | string | 否 | 空值兜底取色 |

## 输出 / 事件
- `onChange(value)`。无其它事件。

## External Dependencies
- antd `Select`。
- 无数据接口 / 字段 ID / Toast。行内联动（如改判定后清 AI 校验、触发必填校验、重算统计）属宿主，在 `onChange` 里做，不进组件。

## 宿主需负责
- 提供统一的状态→配色表（与页面其它状态件取色一致：进度条、KPI、状态胶囊）。
- 判定值集合与业务语义（"通过/不通过/…"）是业务约定，不属组件内置。
- `popupClassName` 唯一，避免同页多实例串样式。

## 已知坑
- Portal 面板色值写字面（已内置）。
- 只读态与可编辑态唯一区别是箭头；如需更强可点性提示，宿主可加 Tooltip，不改进组件视觉规范。
