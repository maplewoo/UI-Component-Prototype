# MultiColumnSelect — ACCEPTANCE

- [ ] 收起态：显示选中项 `label`；未选显示 `placeholder`。
- [ ] 展开态：表头一行 + 每选项一行，表头与行按同一 `grid-template-columns` 严格对齐。
- [ ] 进度列：条宽 = 值%（限幅 0–100），填充色 = 列 `progressColor`，右侧百分比同色、等宽数字。
- [ ] 日期色阶：无日期灰、剩余≤14 红、≤30 琥珀、其余蓝；`remaining=null` 不误判。
- [ ] 文本截断：`maxChars + truncate:'clip'` 硬截断无省略号；`ellipsis` 显省略号。
- [ ] 搜索：`showSearch` 对 `label` 不区分大小写子串过滤，不误用富单元格文本匹配。
- [ ] hover：行悬停 `#e6f4ff`；选中项按 antd 选中态。
- [ ] loading / disabled / allowClear 透传生效。
- [ ] **Portal 校验**：在宜搭真实页内展开，面板颜色与 option 内距覆盖生效（不被页面令牌容器限制），无白底错位。
- [ ] **宽度校验**：窄容器下面板仍 ≥ `panelMinWidth`，grid 不塌列（宜搭内置浏览器重点测）。
- [ ] 多实例：同页多个下拉互不串样式（`popupClassName` 唯一）。
- [ ] 脱敏：包内无真实字段 ID / appType / 数据源 ID / 公司名 / 客户名 / 内部 URL / Token（demo 全 mock，人名/客户用占位）。
- [ ] 独立理解：仅凭 SPEC + preview + ADAPTER 可接入，无需回看原页面。
