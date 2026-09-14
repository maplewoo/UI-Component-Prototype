# ProgressLine — ACCEPTANCE

- [ ] 默认：14px 胶囊条，填充/百分比同为 `color`，百分比右对齐大号数字。
- [ ] 0% / 100% 边界正确，不溢出、不塌陷。
- [ ] 超界值（-10 / 130）被限幅到 0 / 100。
- [ ] 无 label：百分比仍右对齐、轨道 flex 占满。
- [ ] 自定义 color/trackColor/height 生效。
- [ ] 数字等宽（tabular-nums），多条并排右端对齐。
- [ ] 多实例：`--pc` 各条独立不串色。
- [ ] 脱敏：包内无真实字段 ID / appType / 数据源 / 公司名 / 内部 URL。
- [ ] 独立理解：凭 SPEC + preview 可接入。
