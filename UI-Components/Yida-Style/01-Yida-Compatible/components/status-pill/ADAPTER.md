# StatusPill — ADAPTER

## 输入（props）
| prop | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| label | string | 是 | 状态名 |
| count | number | 是 | 计数 |
| color | string | 是 | 色点颜色（宿主状态色） |
| shortLabel | string | 否 | 简写标签（缺省用 label） |
| interactive | boolean | 否 | 点击筛选变体 |
| on | boolean | 否 | interactive 下的选中态 |
| onClick | ()=>void | 否 | interactive 时的点击回调 |

## 输出 / 事件
- 仅 `onClick`（interactive）。不改变数据。

## External Dependencies
无。

## 宿主需负责
- 计数来源（按状态聚合的行数）与配色（与判定 pill / 进度条一致）。
- 一排的并排容器与换行策略；"点胶囊→筛选表格"的过滤逻辑。
