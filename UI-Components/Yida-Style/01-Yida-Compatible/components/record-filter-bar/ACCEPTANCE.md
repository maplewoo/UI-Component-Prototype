# RecordFilterBar — ACCEPTANCE

- [ ] 一行 grid：N 个筛选项 max-content 轨道 + `1fr`，间隙 24；`N` 随 filters 数自动。
- [ ] 标签紧贴其下拉、下拉等宽 190（`selectWidth` 可改）、`maxTagCount:'responsive'`。
- [ ] 归属：多选 + 勾选框 + 右侧命中计数（0 淡显）+ 底部"已选 N 项/清空"（复用 C8）。
- [ ] 自查/复查状态：多选 + 勾选框 + 色点（判定令牌）+ 计数 + 底部清空；已选 tag 判定样式（可选 tagRender）。
- [ ] 关键词：tags 回车加词 + 历史(命中数/勾选) + typed 提示 + 底部"模式[任一/全部]/改为[…]"（复用 C9）。
- [ ] 清除筛选锚定行最右、`margin-right:32`；无任一筛选时禁用。
- [ ] 第二行左侧"批量设为不适用 + 计数胶囊"，`count===0` 禁用（C6 胶囊）。
- [ ] 受控：各 filter 值由宿主传入，`onChange` 上抛；组件不改数据、不做过滤计算。
- [ ] 旧内核不塌：grid 尺寸写成真实 width/max-content，非 flex 均分。
- [ ] 面板 portal：勾选/计数/清空样式在 `popupClassName` 作用域、颜色字面/`var()`。
- [ ] 令牌：全部 `var(--token,#字面)`；判定色与全站一致。
- [ ] 脱敏：无真实字段 ID / appType / 数据源 / 公司名 / 内部 URL；筛选项与计数为 mock。
- [ ] 独立理解：SPEC + preview + ADAPTER + 复用件说明即可接入。
