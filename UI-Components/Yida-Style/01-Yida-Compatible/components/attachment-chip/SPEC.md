# AttachmentChip — SPEC

## 0 · 令牌取值约定（Token Defaults）
本组件取色/尺寸/字号/字重/行高/圆角/阴影一律引用 `../design-tokens.md` 令牌，实现写成 `var(--token, 兜底字面值)`、不裸写死。凡令牌规定的值：组件暴露了覆盖入口（props 中有对应项）的一律标 `Default 按令牌`；仅无任何覆盖入口（没有选择）的结构性规则才标 `MANDATORY`。本件颜色/尺寸多为定稿固定值、无覆盖 prop，故相应项为 `MANDATORY`。宿主页面须先声明 design-tokens 的 :root 令牌块。

## Purpose
单文件附件按钮，五态合一：空 / 上传中 / 已上传(fresh) / 当前附件(服务器) / 只读预览。

## Structure
```
空:      <Upload>{<button class="att-chip empty">上传附件</button>}</Upload>
上传中:   <span  class="att-chip uploading"><i class="ac-fill" style="width:N%"/><span class="ac-txt">N%</span></span>
有附件:   <button class="att-chip [delable][uploaded]" onClick=预览><span class="ac-txt">已上传|当前附件</span><span class="ac-del">×</span></button>
只读:     <button class="att-chip" onClick=预览><span class="ac-txt">当前附件</span></button>   // 无删除
```
（有文件 + 非上传中 → `attFresh` 真＝`已上传`绿，假＝`当前附件`白；只读一律白、无 X。）

## States
- empty：蓝底白字"上传附件"，可点选文件。
- uploading：蓝底、内部淡蓝进度条自左向右、文本只显示真实百分比 `N%`（无"上传中"字样）。
- uploaded(fresh)：绿底白字"已上传"，可 hover 删除。
- server(当前附件)：白底蓝字"当前附件"，可 hover 删除。
- readonly：白底蓝字"当前附件"，点击预览，无删除。
- disabled 由 `disabled` prop 控制（灰态）。

## Interaction Rules
- 空态：点击 → 系统选文件 → `beforeUpload` 校验（类型/大小/数量，返回 `Upload.LIST_IGNORE` 拦下并 `message`）→ `customRequest` 上传（宿主 OSS）。
- 上传中：由宿主回传的 `percent` 驱动，文本＝该百分比。
- 有附件态：点击非删除区 → `onOpen(file)`（默认 `window.open(file.url)`）；点击右侧 X → `onRemove(file)`（宿主 `Modal.confirm` 后删）。
- hover 有附件态：X 从右侧 `right:-28→0` 划入（0.18s），文字同步 `translateX(-14px)`；移开复位。

## Visual Rules
- 尺寸 **112×28**、圆角 **6px**、字号 **14**、字重 **400**、`overflow:hidden`、`white-space:nowrap`（**MANDATORY**，design-tokens §4：与图片上传按钮等大）。
- 蓝态（empty/uploading）边框一律 `--brand`(#1677ff)、底 `--brand`、字 `#fff`（**MANDATORY**）。empty hover 底色 `#4096ff`（非令牌，定稿 hover 值）。
- 上传中 fill `--brand-hover`(#69b1ff)（**MANDATORY**）；文本只显示真实 `N%`（**MANDATORY** §5）。
- 已上传(fresh)：边框+底 `--j-pass`(#19C355)、字 `#fff`（**MANDATORY**）。
- 当前附件/只读：底 `#fff`、字与边框 `--brand`；**不得用浅蓝 #91caff**（**MANDATORY** 定稿）。
- 删除区 `ac-del`：`28px` 宽（= `--h-ctrl`）满高、底 `--danger`(#F44336)、白 X、圆角 `0 5px 5px 0`、`right:-28→0` 过渡（**MANDATORY**）。
- 一律不显示文件名、无回形针图标（**MANDATORY** 定稿：上传后被平台改乱码，显示反误导）。
- 状态文案 `上传附件 / 当前附件 / 已上传 / 删除附件` 为 design-tokens §5 用词（**MANDATORY**，无覆盖入口）。

## Data Contract
props：
- `files: AttachmentItem[]`：归一化附件（`{ name?, url, uid? }`），`length>=1` 即有附件。
- `uploading?: boolean` + `percent?: number`（0–100）：上传中态与进度。
- `fresh?: boolean`：true→`已上传`(绿)，false→`当前附件`(白)。
- `readonly?: boolean`：只读预览（无删除）。
- `disabled?: boolean`。
- `onOpen?(file)`：预览，缺省 `window.open(file.url)`。
- `onRemove?(file)`：点删除 X 回调（宿主弹确认+删）。
- 透传 antd Upload：`beforeUpload`、`customRequest`、`accept`、`maxCount`。

## External Dependencies
- **OSS 上传链**（`customRequest` 背后：签名→上传→回调）——宿主实现，组件不含真实接口。
- **附件预览/下载 URL** 与 `window.open`——页面能力。
- **删除确认 `Modal.confirm`** + **错误 `message` toast**——宿主提供。
- **数量上限 / 类型(.pptx/.pdf) / 单文件 20MB 校验**：`beforeUpload` 策略，上限原从表单 schema 读取，属宿主数据层。
- **fresh/dirty 判定**（"本次会话新写入未保存" vs 服务器值）由宿主 `hasDraftField` 之类传入，组件只按 `fresh` 显示。

## Implementation Constraints
- 删除 X 用内联 SVG，不引 `@ant-design/icons`。
- 颜色一律 `var(--token, #字面)`；"三蓝态边框统一 --brand、当前附件禁 #91caff"是硬约束。
- 与图片上传按钮共宽 112，二者在表格列内应等大对齐（见 image-paste-uploader，若提取）。

## Demo-Only Properties
- 示例文件名/URL、`percent` 演示值、`accept`/`maxCount`/20MB 等具体限额（宿主按其 schema/业务设置）、按钮所在的列宽容器。

## Migration Rules
- 原页 `cs-att / cs-fill / cs-att-del / cs-txt`（`.cs-att-delable/.uploaded/.empty/.uploading`）→ `att-chip / ac-fill / ac-del / ac-txt`。
- 上传函数、`Modal.confirm`、`message`，以及真实的应用/表单/字段 ID、OSS 接口路径一律移除，改 Mock + External Dependency。

## Boundary Conditions
- `files` 空且非 uploading → 空态；`uploading` 优先于 `files` 显示。
- `readonly` 且无文件：由宿主轴外决定显 `-`（组件可被条件渲染，不在此内置）。
- `percent` 缺省按 0；越界夹到 0–100。
