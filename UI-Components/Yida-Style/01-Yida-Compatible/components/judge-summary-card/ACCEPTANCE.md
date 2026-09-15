# JudgeSummaryCard — ACCEPTANCE

- [ ] 卡头：左标题 16/600、右"共 N 项" 12 灰；底 `--head-bg`、下 1px `--line`。
- [ ] 完成率条复用 `progress-line`：`barColor` 自查绿/复查蓝，百分比同色、20px、右对齐、tabular。
- [ ] 状态胶囊行整行卡内居中、横向可滚；色点/数字/标签取自 `status-pill` 令牌。
- [ ] 胶囊放不下时用 `shortLabel` 缩标签（带条件通过→带条件），不换行溢出。
- [ ] `total` 缺省＝items 之和；显式传入以传入为准。
- [ ] `rate` 限幅 0–100；counts 为 0 显 0（不隐藏）。
- [ ] `onItemClick` 提供时胶囊 hover 有底色、可点；不提供时纯展示无指针。
- [ ] 两卡一行并排（宿主容器 gap 16）互不干扰。
- [ ] 令牌：全部写成 `var(--token,#字面)`；判定色与全站一致（改一处同步）。
- [ ] 单一来源：本卡不重复实现进度条/胶囊样式，复用 C3/C4。
- [ ] 脱敏：无真实字段 ID / appType / 数据源 / 公司名 / 内部 URL；rate/counts 为 mock。
- [ ] 独立理解：凭 SPEC + preview + ADAPTER 可接入。
