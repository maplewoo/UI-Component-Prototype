# ProgressLine — ADAPTER

## 输入（props）
| prop | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | number | 是 | 0–100，超界自动限幅 |
| label | string | 否 | 左侧文字 |
| color | string | 否 | 填充与百分比色，默认 `#19C355` |
| trackColor | string | 否 | 轨道色，默认 `#eef0f3` |
| height | number | 否 | 轨道粗细，默认 14 |
| suffix | string | 否 | 单位后缀，默认 `%` |

## 输出 / 事件
无。纯展示。

## External Dependencies
无（不接数据源 / 后端 / Toast）。

## 宿主需负责
- 完成率的分子/分母与取整在宿主计算（如"通过+带条件+不适用 / 总数"），不要把统计口径塞进组件。
- 语义取色与页面其它状态件（KPI、判定 pill、状态胶囊）保持一致：建议集中维护 `status→color`。
- 多条并排的容器与间距由宿主页给；组件只管单条。
