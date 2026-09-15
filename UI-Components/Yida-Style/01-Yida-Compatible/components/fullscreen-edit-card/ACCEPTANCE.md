# FullscreenEditCard — ACCEPTANCE

- [ ] 普通态：卡片在文档流内，`max-height calc(100vh-72px)`、内部滚动、卡头 `--head-bg`。
- [ ] 全屏态：`position:fixed` 四边内缩 `inset`(默认 12)、`z-index:950`、`box-shadow --sh-full`、`max-height calc(100vh - inset*2)`、内容内滚。
- [ ] 切换：点头部图标在 normal↔full 间切换；title 在"全屏编辑/退出全屏（Esc）"间切换。
- [ ] Esc：全屏时按 Esc → `onActiveChange(false)`。
- [ ] 滚动锁：进入全屏 `body.overflow='hidden'`；退出/卸载还原原值（不泄漏）。
- [ ] 复位兄弟卡：进入全屏前调用 `onBeforeEnter`，其它卡的吸顶 `transform` 清零，全屏卡不从视口边缘顶偏（§6 坑）。
- [ ] z 序：全屏卡(950) 低于自家 Modal/Drawer(1000)，全屏时弹窗仍浮于其上。
- [ ] 受控单例：同一时刻仅一张 `active`（宿主以 `fullscreenId===id` 驱动）。
- [ ] 透传：`extra`（保存/撤销等）在全屏按钮左侧、随卡头右排；切全屏后按钮位置一致。
- [ ] 令牌：`--r-card/--line/--head-bg/--z-full/--sh-full` 写成 `var(--token,#兜底)`，宿主无 :root 时字面兜底仍正确。
- [ ] 无越界图标库：全屏/退出用内联 SVG。
- [ ] 脱敏：无真实字段 ID / appType / 数据源 / 公司名 / 内部 URL；卡内容为 mock。
- [ ] 独立理解：SPEC + preview + ADAPTER 可接入；与 `scroll-pin-card`(P3) 的互斥关系已在 ADAPTER 说明。
