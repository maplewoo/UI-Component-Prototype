# KpiTile — ADAPTER

组件进入真实宜搭页面时需要宿主提供的能力。KpiTile 为纯展示组件，外部依赖极少。

## 输入（props）
| prop | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| label | string | 是 | 指标名，业务文案由宿主决定 |
| value | number \| string | 是 | 指标值，通常来自统计字段或聚合结果 |
| color | string | 否 | 语义色；建议宿主集中维护一份 status→color 映射 |
| loading | boolean | 否 | 数据未就绪时显示占位 `—` |

## 输出 / 事件
无。组件不产生事件、不改状态。

## External Dependencies
无（不接 Toast / Save / dataSourceMap / 附件 / 权限 / 路由 / 后端接口）。

## 宿主需负责
- 决定哪些字段构成指标、如何计算 value（应在数据层完成，不把统计逻辑塞进组件）。
- 多张磁贴的排布容器（flex 行 / grid）由宿主页提供；组件只管单卡。
- 语义色一致性：同一状态在页面各处应使用同一 color，避免与进度条、状态徽标取色不统一。
