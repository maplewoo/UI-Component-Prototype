# InlineJumpPagination — ADAPTER

## 输入（cfg → useJumpPagination）
| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| current | number | 是 | 当前页（1 起，受控） |
| total | number | 是 | 总条数 |
| pageSize | number | 否 | 默认 10 |
| onChange | (page)=>void | 是 | 页码/跳页变化回调，宿主更新 current 并重取/切片 |
| totalLabel | (total)=>ReactNode | 否 | 默认 `共 N 项` |
| hideJumpWhenEmpty | boolean | 否 | 默认 true，total=0 隐藏跳页框 |

## 输出
- 返回对象展开进 `Table pagination={{ ...ret }}`。
- 无外部事件；分页状态由宿主持有。

## External Dependencies
- antd `Table` + `Input`。
- 数据切片/翻页取数由宿主完成（服务端分页则 `onChange` 里重新请求；前端分页则改 `current` 后本地切片）。

## 宿主需负责
- 给表格包一层 `<div className="ijp-wrap">` 并渲染一次 `<JumpPaginationStyles/>`（作用域样式，勿全局）。
- 维护 `current`，在 `onChange` 更新并驱动数据。
- 若一页多表：`useJumpPagination` 每表各调一次，`current` 分别持有（原页用 `pageMap[instId]` 即为此）。

## 为什么自绘
- 宜搭运行时 antd 无中文 locale，`showQuickJumper` 显英文且 `ConfigProvider locale` 仍可能不生效 → 中文跳页必须自绘。
