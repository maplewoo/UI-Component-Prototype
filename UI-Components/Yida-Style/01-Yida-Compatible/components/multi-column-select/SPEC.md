# MultiColumnSelect — SPEC

## 0 · 令牌取值约定（Token Defaults）
本组件取色/尺寸/字号/字重/行高/圆角/阴影/层级一律引用 `../design-tokens.md` 令牌，实现写成 `var(--token, 兜底字面值)`、不裸写死。凡令牌规定的值：组件暴露了覆盖入口（props 中有对应项）的一律标 `Default 按令牌`（默认值＝令牌值，可覆盖但页面别随意改）；仅无任何覆盖入口（没有选择）的结构性规则才标 `MANDATORY`。宿主页面须先声明 design-tokens 的 :root 令牌块。

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
- open：面板含表头 + 行；行 hover 高亮 `#e6f4ff`（`--brand-bg`）（MANDATORY hover 色）。
- loading：Select 原生 loading 态（输入框右侧 spinner）。
- selected：当前值行按 antd 选中态高亮，选中底同为 `#e6f4ff`（`--brand-bg`）（MANDATORY）。
- empty：无匹配时的"无数据"回落 antd。

## Interaction Rules
- 搜索：`showSearch` + `filterOption`（对 `label` 做不区分大小写子串匹配）（MANDATORY：搜索用 label 文本，不用富单元格）。
- 选中：`onChange(value)`。清空：`allowClear` → `onChange(undefined)`。
- 禁用：`disabled` 时不可展开。
- 组件本身不请求数据，选项由宿主传入。

## Visual Rules
- 面板 `min-width: 950px`（**Default 按令牌**，design-tokens §4 默认值，可经 `panelMinWidth` 覆盖、默认必须 = 950）：防止窄容器下旧内核把 grid 列压塌。
- 一级过滤器（选择项目）8 列默认宽 **`90/90/90/140/140/140/90/90`**（**Default 按令牌**：design-tokens §4 默认值，可经 `columns[].width` 覆盖）、+末列 `1fr` 吸收剩余、**8 列默认全部居中**（**Default 按令牌**：§4 默认 `align:center`，可经 `columns[].align` 覆盖）。
- 截断规则（**Default 按令牌**：§4 默认主机厂 `maxChars:3`→42px、总成类别 `maxChars:5`→70px、`truncate:clip`，可经 `columns[].maxChars/.truncate` 覆盖）：超出用 `text-overflow:clip` 直接截断、不显省略号；其余文本列可用 `ellipsis`。
- 覆盖 antd option 默认左右内距：`.mcs-panel .ant-select-item{padding-left:0;padding-right:0}`、`option-content{overflow:visible}`（MANDATORY：否则富单元格被裁切/错位）。
- 迷你进度条高 **8px**（MANDATORY，design-tokens §4）：轨道 `#eef0f3`（`--track`），填充色由列 `progressColor` 决定且默认为令牌值（自查 `#19C355`=`--j-pass`、复查 `#1677ff`=`--brand`），右侧百分比同色（MANDATORY 数字与条同色）。
- 冻结日期色阶（**MANDATORY 用令牌色**；阈值 `Default 按令牌`：默认 14/30 天，可经 `freezeThresholds` prop 覆盖）：无日期=灰底 `#eef0f3`（`--track`）+ 深字 `rgba(0,0,0,0.45)`（`--t3`）；到期（≤14 天）红 `#F44336`（`--j-fail`）；临期（≤30 天）琥珀 `#FFB300`（`--j-cond`）；其余蓝 `#1677ff`（`--brand`），字色 `#fff`（非令牌）。
- 字号：单元格正文/表头 `14px`（`--f-body`）；日期标签与进度百分比 `12px`（`--f-aux`）。表头字重 `600`（`--fw-strong`）、色 `rgba(0,0,0,0.65)`（`--t2`）；日期标签字重 `600`（`--fw-strong`）。数字 `tabular-nums`。
- 日期标签圆角 `4px`（`--r-small`）。表头底边线 `1px solid #f0f0f0`（`--line`）。

## Data Contract
props：
- `value`, `onChange(value)`：受控值。
- `options`: `[{ value, label, cells: { <colKey>: cellValue } }]`。`label` 为收起态文本 + 搜索匹配用。
  - text 列 cells 值 = string
  - progress 列 cells 值 = number（0–100）
  - dateChip 列 cells 值 = `{ date: string, remaining: number|null }`
- `columns`: `[{ key, label, width, align?, type?('text'|'progress'|'dateChip'), maxChars?, truncate?('clip'|'ellipsis'), progressColor?, format? }]`
- 透传：`placeholder`、`loading`、`disabled`、`allowClear`（默认 true）、`showSearch`（默认 true）、`style`、`popupClassName`。
- `panelMinWidth`（**Default 按令牌**，默认 **950**＝design-tokens §4，可覆盖但别随意改）、`freezeThresholds`（**Default 按令牌**，默认 `{ due:14, soon:30 }`）。

## External Dependencies
- 仅 antd `Select`（宜搭运行时已提供）。
- 不内置数据获取 / 字段 ID / 后端接口 / Toast；combos 之类的构造属宿主数据层（见 ADAPTER）。

## Implementation Constraints
- **Portal 样式作用域**：下拉面板 portal 到 `body`；design-tokens 的 `:root` 令牌块全局可见，故面板内颜色一律写 `var(--token, 字面兜底)`（fallback 即本 SPEC 所标字面值，供无令牌环境兜底），禁止裸写死。必须用 `popupClassName` 把 `.mcs-*` 限定在面板内（MANDATORY）。
- `popupMatchSelectWidth={false}` + 面板 `min-width`，否则面板被输入框宽度撑不满导致 grid 错乱。
- 不改 antd 结构：仅用 `optionRender` / `dropdownRender` 定制。

## Demo-Only Properties
- 仅剩示例列的"内容"（列名与文案）、示例数据、示例收起宽度 340 可由 `columns`/`style` 改写。
- 更正：§4 的列宽 `90/90/90/140/140/140/90/90`、`min-width 950`、8 列居中(`align:center`)、主机厂 3 字/总成 5 字 clip(`maxChars`/`truncate:clip`) 一律为 **Default 按令牌**（分别可经 `columns[].width`、`panelMinWidth`、`columns[].align`、`columns[].maxChars/.truncate` 覆盖，默认＝令牌值）。真正无覆盖入口、保持 **MANDATORY** 的只有：表头与行共用同一 grid + 末列 `1fr`、hover/选中底 `--brand-bg`、搜索匹配用 `label` 文本、antd 内距覆盖、portal 内 `var()` 取色与 `popupClassName` 作用域。
- 规范本体：表头与行共用 grid（+末列 `1fr`）+ §4 列宽/居中/clip/min-width（`Default 按令牌`）+ 颜色一律 `var(--token, 兜底字面)`。

## Migration Rules
- 原页 `cs-dd-wrap / cs-dd-head / cs-dd-row / cs-dd-*` → 泛化为 `mcs-*` + `columns/options` 配置。
- 冻结色阶函数 `comboFreezeClass`、进度条内联写法保留，阈值参数化。
- 业务字段（客户/车型/总成/率/工程师）改为 mock；真实 combos 由宿主用自身数据构造后传入。

## Boundary Conditions
- `columns` 顺序即渲染顺序；缺 `width` 的列按 `1fr`。
- `remaining` 非 number 时按"无日期/正常"处理，不抛错。
- 超长 label 在收起态由 antd 默认省略。
