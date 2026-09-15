# StatusFilterSelect — ACCEPTANCE

- [ ] 收起：已选渲染灰底 tag（`--line` 底 / `--t1` 字），× 为 `--t4` 可点删；无选显 placeholder。
- [ ] 展开：每项 = 勾选框 + 状态色点（`--j-*`/选项色）+ 文字；选中项底 `--brand-bg` + 600；hover 高亮。
- [ ] 勾选框：14×14、圆角 `--r-small`、未选 `--line-strong`、选中 `--brand` 白勾；原生右上状态勾已隐藏、无双勾。
- [ ] 底部栏：左"已选 N 项"随选择更新，右"清空"→ 置空（或 `onClearAll`）。
- [ ] `showCount`：右靠命中数、等宽数字、0 淡显 `--t4`。
- [ ] 色点缺省：`color` 未给的选项用 `--j-pending-dot` 灰点，不隐藏色点位。
- [ ] 受控：仅 `value`/`onChange` 驱动，组件不改数据、不做过滤。
- [ ] `maxTagCount:'responsive'`、`width`（默认 190）生效。
- [ ] Portal：真页内 `popupClassName` 生效、颜色 `var()`/字面、不受页面令牌容器限制。
- [ ] 多实例：不同下拉 `popupClassName` 唯一、互不串样式。
- [ ] 令牌一致：色点与判定 pill/进度/徽标共用 `--j-*`（改一处全站同步）。
- [ ] 脱敏：无真实字段 ID / appType / 数据源 / 公司名 / 内部 URL；枚举与计数为 mock。
- [ ] 独立理解：凭 SPEC + preview + ADAPTER + C8 引用可接入。
