# DropdownFooter（多选下拉面板元素集）

给 antd 多选 `Select` 的下拉面板加两件自定义元素：`OptionCheck`（用方形勾选框替代原生勾选态，选中蓝底白勾）与 `DropdownFooter`（面板底部一行"已选 N 项 / 清空"，可换左文案与右操作）。常配套一个右侧计数 `OptionCount`。用于"筛选多选下拉"的统一面板观感。

- 解决的问题：antd 多选下拉默认没有勾选框、没有底部计数/清空，各页各写一套样式；沉淀成标准面板元素。
- 典型场景：列表页筛选栏的多选下拉、批量选择下拉。
- 宜搭兼容版本：是（`01-Yida-Compatible`）。基于 antd `Select` 的 `optionRender`/`dropdownRender`，勾选框样式作用在 `popupClassName`。
- 当前版本：v0.3
