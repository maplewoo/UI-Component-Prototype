# JudgeSummaryCard — ADAPTER

## 输入（props）
| prop | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| title | string | 是 | 卡头标题（自查判定/复查判定…） |
| rate | number | 是 | 完成率 0–100（宿主按公式算好） |
| items | [{label,count,color,shortLabel?}] | 是 | 状态计数，色点取判定令牌 |
| barColor | string | 否 | 完成率条色，**Default 按令牌=`--j-pass`**（复查卡传 `--brand`） |
| total | number | 否 | 右上"共 N 项"；缺省＝items 之和 |
| rateLabel | string | 否 | 进度条标签，默认"完成率" |
| onItemClick | (item)=>void | 否 | 提供则胶囊可点（筛选） |

## 输出 / 事件
- `onItemClick(item)`（选填）。

## External Dependencies
- 无接口。
- **完成率公式**：`rate = round((通过+带条件通过+不适用)/总数 * 100)`（design-tokens §5 口径）——宿主数据层算，组件不含。
- **counts 聚合**：按判定状态统计行数由宿主完成。
- 复用件 `progress-line`、`status-pill`（单一来源，勿在本卡重复实现子件样式）。

## 宿主需负责
- 声明 :root 令牌块（用 `--j-*`、`--brand`、`--head-bg`、`--line`、`--t1/--t3`、`--r-card`、`--sh-card` 等）。
- 两卡并排容器（`flex gap:16`）与"自查/复查"各自的 rate/items 数据。
- 胶囊点击若要驱动表格筛选，宿主接 `onItemClick`。

## 注意
- 完成率的"完成"口径（哪些状态算完成）是业务定义；本卡不内置该判定，避免与不同页口径冲突（照抄 B 页关闭率≠A 页完成率 的教训）。
