# CornerBadge — ADAPTER

## 输入（props）
| prop | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| count | number | 是 | 数量，须整数 |
| variant | 'corner' \| 'inline' | 否 | 默认 corner |
| max | number | 否 | 溢出阈值，默认 99 |
| disabled | boolean | 否 | 仅影响 corner 可见性 |

## 输出 / 事件
无事件。计数语义（待保存行数 / 已选行数 / 待新建数）全部由宿主计算后传入。

## External Dependencies
无（不接 Toast / Save / 权限 / 后端）。

## 宿主需负责
- **corner 变体定位上下文**：按钮容器须 `position:relative`。宜搭 antd `Button` 默认样式非 relative，包一层相对定位 div 或给按钮补 `style={{position:'relative'}}`。
- 可见性业务规则：原页"新建在 0 数据时禁用""保存↔撤销切换 20px"等属宿主，不由组件判断。
- `inline` 计数常与 `disabled` 按钮一起出现（如批量按钮 0 选中），组件不隐藏 0，是否禁用按钮由宿主决定。
