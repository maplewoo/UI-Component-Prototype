# MultiColumnSelect — SPEC

## Purpose
antd `Select` 的可复用变体：展开面板带一行表头，每个选项渲染为一行多列（文本 / 迷你进度条 / 色阶日期标签）。选中的收起态仍用普通文本 label。

## Structure
```
<Select optionRender={rowFromColumns} dropdownRender={header + menu} popupMatchSelectWidth={false} />
  dropdown panel (.mcs-panel)  [portal 到 body，用 popupClassName 作用域]
    .mcs-head  一行表头：columns.map(label)
    .mcs-row   每个选项一行：columns.map(cell by type)
       type=text     → span，可按 maxChars 截断
       type=progress → .mcs-bar(i width%) + .mcs-pv 百分比
       type=dateChip → .mcs-date(+色阶类) 显示日期
```
表头与每行共用同一 `grid-template-columns`：由 `columns[].width` 拼接，末尾追加 `1fr` 吸收剩余（MANDATORY，保证表头与行对齐）。

## States
- collapsed：显示选中项 `label`。
- open：面板含表头 + 行；行 hover 高亮 `#e6f4ff`（MANDATORY hover 色）。
- loading：Select 原生 loading 态（输入框右侧 spinner）。
- selected：当前值行按 antd 选中态高亮。
- empty：无匹配时的"无数据"回落 antd。

## Interaction Rules
- 搜索：`showSearch` + `filterOption`（对 `label` 做不区分大小写子串匹配）（MANDATORY：搜索用 label 文本，不用富单元格）。
- 选中：`onChange(value)`。清空：`allowClear` → `onChange(undefined)`。
- 禁用：`disabled` 时不可展开。
- 组件本身不请求数据，选项由宿主传入。

## Visual Rules
- 面板 `min-width`（默认 950px，MANDATORY 可配）：防止窄容器下旧内核把 grid 列压塌。
- 覆盖 antd option 默认左右内距：`.mcs-panel .ant-select-item{padding-left:0;padding-right:0}`、`option-content{overflow:visible}`（MANDATORY：否则富单元格被裁切/错位）。
- 文本截断：可选 `maxChars` + `truncate`：`clip`（硬截断无省略号，主机厂/类别用）或 `ellipsis`（默认）。
- 进度条：轨道 `#eef0f3`，填充色由列 `progressColor` 决定（示例：自查 `#19C355`、复查 `#1677ff`），右侧百分比同色（MANDATORY 数字与条同色）。
- 日期色阶（MANDATORY 阈值，可按需覆盖）：无日期=灰 `#eef0f3/rgba(0,0,0,0.45)`；剩余 ≤14 天=红 `#F44336`；≤30 天=琥珀 `#FFB300`；其余=蓝 `#1677ff`。
- 字号 14px，数字 `tabular-nums`。

## Data Contract
props：
- `value`, `onChange(value)`：受控值。
- `options`: `[{ value, label, cells: { <colKey>: cellValue } }]`。`label` 为收起态文本 + 搜索匹配用。
  - text 列 cells 值 = string
  - progress 列 cells 值 = number（0–100）
  - dateChip 列 cells 值 = `{ date: string, remaining: number|null }`
- `columns`: `[{ key, label, width, align?, type?('text'|'progress'|'dateChip'), maxChars?, truncate?('clip'|'ellipsis'), progressColor?, format? }]`
- 透传：`placeholder`、`loading`、`disabled`、`allowClear`（默认 true）、`showSearch`（默认 true）、`style`、`popupClassName`。
- `panelMinWidth`（默认 950）、`freezeThresholds`（默认 `{ due:14, soon:30 }`）。

## External Dependencies
- 仅 antd `Select`（宜搭运行时已提供）。
- 不内置数据获取 / 字段 ID / 后端接口 / Toast；combos 之类的构造属宿主数据层（见 ADAPTER）。

## Implementation Constraints
- **Portal 样式作用域**：下拉面板 portal 到 `body`，在页面根 `.di-page` 令牌作用域之外 → CSS 变量不生效，**面板内颜色一律写字面值**（本 SPEC 内所有色值即字面值）。必须用 `popupClassName` 把 `.mcs-*` 限定在面板内（MANDATORY）。
- `popupMatchSelectWidth={false}` + 面板 `min-width`，否则面板被输入框宽度撑不满导致 grid 错乱。
- 不改 antd 结构：仅用 `optionRender` / `dropdownRender` 定制。

## Demo-Only Properties
- 示例列（冻结时间/主机厂/车型/类别/自查/复查/产品工程师/资深工程师）、示例数据、示例宽度 340、`90/90/90/140/140/140/90/90/1fr` 这一具体列宽组合——都可由 `columns` 改写。列"内容"不是规范，"表头与行共用 grid + min-width 防塌 + portal 字面色"才是。

## Migration Rules
- 原页 `cs-dd-wrap / cs-dd-head / cs-dd-row / cs-dd-*` → 泛化为 `mcs-*` + `columns/options` 配置。
- 冻结色阶函数 `comboFreezeClass`、进度条内联写法保留，阈值参数化。
- 业务字段（客户/车型/总成/率/工程师）改为 mock；真实 combos 由宿主用自身数据构造后传入。

## Boundary Conditions
- `columns` 顺序即渲染顺序；缺 `width` 的列按 `1fr`。
- `remaining` 非 number 时按"无日期/正常"处理，不抛错。
- 超长 label 在收起态由 antd 默认省略。
