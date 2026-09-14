# KeywordTagSearch — ACCEPTANCE

- [ ] 回车把当前输入加为标签，`onChange` 收到新数组。
- [ ] 输入非历史词时，面板顶部出现"按回车添加「typed」"+ 命中数；命中已选词时不出现。
- [ ] 历史项：勾选框（选中蓝底白勾）+ 命中计数右靠，0 淡显。
- [ ] 点历史项切换勾选（增/删标签）。
- [ ] 开启模式切换时底栏显"模式[..]/改为[..]"，点击回调 `onMatchModeChange`；未开启时显"已选 N 项/清空"。
- [ ] 失焦清空 typed 提示、`allowClear`/标签 × 正常。
- [ ] Portal：真页内 `popupClassName` 生效、颜色字面。
- [ ] 持久化不在组件内：宿主不传 `history` 也能用（仅无历史建议）。
- [ ] 脱敏：包内无真实字段 ID / appType / 数据源 / 公司名 / 内部 URL / localStorage key；关键词与计数为 mock。
- [ ] 独立理解：凭 SPEC + preview + ADAPTER 可接入。
