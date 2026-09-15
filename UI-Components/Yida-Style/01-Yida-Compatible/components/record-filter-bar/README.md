# RecordFilterBar（记录卡筛选栏 · Pattern）

类型：**Pattern**（组合 `dropdown-footer` C8 + `keyword-tag-search` C9 的行内筛选工具条）。

一行多下拉筛选栏：`归属`（多选+计数/清空，C8）、`自查状态`/`复查状态`（多选+色点+判定 tag，C8）、`检查内容关键词`（tags+历史+任一/全部，C9），行尾锚定"清除筛选"，下一行左置"批量设为不适用"。用于表格上方的行内过滤 + 批量操作入口。

- 解决的问题：把"多个自定义面板多选 + 关键词标签 + 清除 + 批量"这一整套筛选栏布局与观感固化成一个条，栅格对齐/右锚/等宽一致，避免每页各拼。
- 宜搭兼容版本：是（`01-Yida-Compatible`）。基于 antd `Select`/`Button`。
- 当前版本：v0.1
- 依赖组件：`../dropdown-footer/`、`../keyword-tag-search/`。
