# CornerBadge — ACCEPTANCE

只保留适用项（无 hover/focus/loading/回填/删除等）。

- [ ] corner 有值：右上角红角标，纯红底白字、无白圈/描边（定稿 MANDATORY）。
- [ ] corner count=0：不渲染。
- [ ] corner disabled：不渲染。
- [ ] corner 溢出：count>99 显示 `99+`。
- [ ] inline：始终渲染，含 0；半透明白胶囊贴在按钮文字后。
- [ ] 数字等宽（tabular-nums），两位数不撑破圆形高度。
- [ ] corner 依赖 relative 容器：容器无 position:relative 时能按 ADAPTER 复现/纠正。
- [ ] 多实例：同页多个角标互不串位（绝对定位各自相对其按钮）。
- [ ] 脱敏：包内无真实字段 ID / appType / 数据源 / 公司名 / 内部 URL。
- [ ] 独立理解：仅凭 SPEC + preview 可用。
