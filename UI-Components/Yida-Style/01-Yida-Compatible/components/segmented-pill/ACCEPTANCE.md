# SegmentedPill — ACCEPTANCE

- [ ] 默认：滑块位于选中段、文字白色；切换后滑块平滑位移、文字色过渡。
- [ ] 受控：仅 `value` 决定滑块位；不点不自动变。
- [ ] 锁定段：灰字 + 禁止光标；点击不切换、触发 `onLockClick`。
- [ ] 当前值段即使被 `lockPredicate` 命中也不显锁定（不锁自己）。
- [ ] 三段/多段：滑块宽 = (100%-8px)/N、位移正确。
- [ ] 自定义 `activeColor` 生效（滑块 + focus 环）。
- [ ] 键盘可达：按钮可聚焦、`:focus-visible` 有焦点环。
- [ ] 多实例：各自受控、互不干扰。
- [ ] 脱敏：包内无真实字段 ID / appType / 数据源 / 公司名 / 内部 URL；分段为 mock。
- [ ] 独立理解：凭 SPEC + preview + ADAPTER 可接入。
