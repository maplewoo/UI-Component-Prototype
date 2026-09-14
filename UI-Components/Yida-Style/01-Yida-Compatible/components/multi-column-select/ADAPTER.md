# MultiColumnSelect — ADAPTER

## 输入（props，摘要）
- `columns`：列定义（key/label/width/align/type/maxChars/truncate/progressColor/placeholder）。顺序即渲染顺序。
- `options`：`[{ value, label, cells:{colKey: 值} }]`。`label` 用于收起态显示 + 模糊搜索匹配。
- `value` / `onChange`：受控选择。
- 透传 `placeholder/loading/disabled/allowClear/showSearch/style/popupClassName/filterOption`。
- `panelMinWidth`（默认 950）、`freezeThresholds`（默认 `{due:14, soon:30}`）。

## 输出 / 事件
- `onChange(value)`：选中；清空时 `value` 为 `undefined`。
- 不产生其它事件。

## External Dependencies
- antd `Select`（宜搭运行时内置）。
- 无数据接口：宿主负责把自身查询结果构造成 `options[].cells`（示例中的 `combos` 构造、率计算、冻结剩余天数计算均在宿主数据层，不属本组件）。

## 宿主需负责
- **单元格数据成型**：进度百分比、冻结 `{date, remaining}` 由宿主算好再传；组件只渲染。
- **列宽与内容匹配**：`width` 要与实际列内容量匹配；窄列配 `maxChars + truncate:'clip'` 做硬截断。
- **主色一致**：进度条 `progressColor` 应与页面状态色统一（示例绿 `#19C355`/蓝 `#1677ff`）。

## 已知坑（务必核对）
1. **Portal 作用域**：面板渲染在 `body`，脱离页面根令牌容器 → 颜色必须写字面值，覆盖 antd 的 padding/overflow 必须挂在 `popupClassName` 作用域内（已内置 `panelScopeStyle`）。
2. **面板宽度**：`popupMatchSelectWidth={false}` + `panelMinWidth`；否则窄输入框把面板撑窄、grid 塌列、内容错位。旧内核尤其明显。
3. **antd 中文 locale 无关**：本组件不涉及分页/日期选择器文案，无 locale 依赖。
4. **不要改 antd 结构**：只走 `optionRender`/`dropdownRender`，勿塞受控 DOM 覆盖选中态。
