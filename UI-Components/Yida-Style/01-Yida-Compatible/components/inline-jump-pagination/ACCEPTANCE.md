# InlineJumpPagination — ACCEPTANCE

- [ ] 展开进 `Table pagination` 后页码正常，控件高 28、圆角 6、字体 PingFang/YaHei。
- [ ] `showTotal` 左侧显"共 N 项"，右侧显中文"跳至 [__] 页"（无英文 Go to）。
- [ ] 跳页输入只收数字；回车夹到 `[1,maxPage]` 并触发 `onChange`，之后清空。
- [ ] `showQuickJumper=false`，无双跳页框。
- [ ] `total=0` 默认隐藏跳页框（`hideJumpWhenEmpty` 可关）。
- [ ] `current` 越界显示时夹到 maxPage。
- [ ] `padding-right` 让位生效，跳页区不压页码。
- [ ] 样式仅在 `.ijp-wrap` 内，不污染同页其它表格（多表各持 current）。
- [ ] 脱敏：包内无真实字段 ID / appType / 数据源 / 公司名 / 内部 URL。
- [ ] 独立理解：凭 SPEC + preview + ADAPTER 可接入。
