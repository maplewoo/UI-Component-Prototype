# JudgeSelect — ACCEPTANCE

- [ ] 可编辑态：pill 色 = 当前选项色，右侧有小箭头，点击展开。
- [ ] 只读态：同尺寸色块、无箭头、不可点。
- [ ] 展开面板：选项前有同色小方点；选中项高亮；行高 ≥32。
- [ ] 空值：回落 `fallbackValue` 取色，不报错、不塌陷。
- [ ] shortLabel：收起态显示短标签（如"带条件"），选项列表仍显全称。
- [ ] onChange：仅可编辑态触发；只读态不触发。
- [ ] Portal：真页内展开，面板配色/内距生效，不受页面令牌容器限制。
- [ ] 多实例：同页多个下拉 `popupClassName` 唯一、不串色。
- [ ] 尺寸：改 `width` 时 pill/箭头/面板对齐正确。
- [ ] 脱敏：包内无真实字段 ID / appType / 数据源 / 公司名 / 内部 URL；判定色卡为 mock。
- [ ] 独立理解：凭 SPEC + preview + ADAPTER 可接入。
