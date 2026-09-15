# JudgeSummaryCard（判定统计卡 · Pattern）

类型：**Pattern**（由 `progress-line` + `status-pill` 组合的卡片）。

一张"判定概览"卡：卡头标题 + 右上"共 N 项"；卡体一行**完成率进度条**（复用 C4 `progress-line`）＋ 一行**状态计数胶囊**（复用 C3 `status-pill`，色点/数字/标签）。用于在看板顶部并排给出"自查判定 / 复查判定"两张概览卡。

- 解决的问题：把"完成率条 + 一组状态计数徽标 + 卡头计数"这套固定组合沉淀成一个卡，避免每页各拼一次、取色不齐。
- 宜搭兼容版本：是（`01-Yida-Compatible`）。
- 当前版本：v0.1
- 依赖组件：`../progress-line/`、`../status-pill/`（同仓库）。
