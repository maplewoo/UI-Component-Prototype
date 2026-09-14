# DropdownFooter — ADAPTER

## 输入
- `OptionCheck`：`{ checked }`。
- `OptionCount`：`{ count, mutedAtZero? }`。
- `DropdownFooter`：`{ selectedCount?, left?, right?, onClear?, clearText? }`。

## 输出 / 事件
- `DropdownFooter` 默认右侧"清空"点击 → `onClear()`。传 `right` 时事件由宿主自管。
- 三者自身不改数据；选中值、命中数来自宿主。

## External Dependencies
- antd `Select`（多选）。
- 无外部图标库（勾选为内联 SVG）。
- "命中计数"的来源（当前筛选结果里该项的行数）由宿主计算后传入 `OptionCount.count`。

## 宿主需负责
- `optionRender` 里据当前 `value` 判定 `checked`；`dropdownRender` 里把 `menu` 原样放上面、`DropdownFooter` 放下面。
- 清空 = 把多选 value 置空（在 `onClear` 实现）。
- 面板元素作用在 `popupClassName`：portal 到 body，须用字面颜色（已内置 `dfScope`）。

## 已知坑
- 不关 `.ant-select-item-option-state` 会出现"原生勾 + 自定义框"双勾。
- `right` 传自定义节点（如"模式[任一/全部]"切换）时，交互全在节点里，底栏不含清空。
