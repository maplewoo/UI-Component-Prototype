# StatusPill — ACCEPTANCE

- [ ] 默认：色点 + 加粗计数 + 灰标签，26px 圆角胶囊。
- [ ] 色点圆 8px、取 `color`；缺省灰点不隐藏。
- [ ] 数字等宽；计数随值正确显示，0 正常展示。
- [ ] `shortLabel`：有则显简写（色点/数值不变）。
- [ ] interactive：hover 有底色、`on` 显主色描边 + 浅蓝底；非 interactive 不响应点击。
- [ ] 多枚并排不拉伸（`flex:0 0 auto`），换行由宿主容器。
- [ ] 脱敏：包内无真实字段 ID / appType / 数据源 / 公司名 / 内部 URL；状态集合为 mock。
- [ ] 独立理解：凭 SPEC + preview 可接入。
