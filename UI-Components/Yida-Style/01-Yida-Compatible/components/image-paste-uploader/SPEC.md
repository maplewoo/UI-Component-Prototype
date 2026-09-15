# ImagePasteUploader — SPEC

## 0 · 令牌取值约定（Token Defaults）
本组件取色/尺寸/字号/圆角/动画一律引用 `../design-tokens.md` 令牌，实现写成 `var(--token, 兜底字面值)`、不裸写死。有覆盖入口（props）的标 `Default 按令牌`；无覆盖入口的结构性规则标 `MANDATORY`。本件按钮尺寸/锚定盒宽/缩略图尺寸/间隙为定稿固定值（无 prop），相应项 `MANDATORY`；`limit`、文案为 `Default 按令牌`。宿主页面须先声明 :root 令牌块。

## Purpose
锚定盒 + 图片上传按钮（idle/armed 两态）+ 缩略图行（删除/预览）+ 只读态。图片粘贴即上传，**无上传进度百分比**。

## Structure
```
<div class="ip-cell">                        // 112 宽、margin:0 auto 居中（锚定盒）
  idle : <button class="ip-up">图片上传</button>
  armed: <span  class="ip-up armed" tabindex=0 onPaste onBlur(Esc)>[灯点]Ctrl+V</span>
  只读 : (不渲染按钮)
  <div class="ip-thumbs">                     // flex wrap gap:4px 16px margin-top:6
    <Image.PreviewGroup>
      <span class="ip-thumb-wrap">
        <Image width48 height48 .../>
        <span class="ip-thumb-x">×</span>     // hover 淡入，点=删除
      </span> ...
    </Image.PreviewGroup>
  </div>
</div>
```

## States
- idle：蓝底白字"图片上传"，hover 底色变浅(#4096ff)；点击/Enter/Space → armed。
- armed：白底蓝字 + 左侧 6px 圆形灯点随文字同色呼吸闪烁；`Ctrl+V` 粘贴上传；**粘贴完成不退出、可连续粘贴**；复位＝失焦 / Esc。
- 有图：按钮下方并排缩略图；hover 缩略图右上角淡入 16×16 红底白 X。
- readonly：仅缩略图、无按钮、无删除。
- disabled：不响应（无 armed）。
- 达上限：粘贴时若已 `images.length>=limit` → 阻断并 `onLimitReached`（宿主 toast）。

## Interaction Rules
- 粘贴：读 `clipboardData` 中 `image/*`（回退 `clipboardData.files`），`preventDefault`；未超限则把 File 列表交给宿主 `onPaste(files)` 去上传并回填。
- 删除：点 X → `onRemove(index)`（ splice，无二次确认——源如此）。
- 预览：点缩略图 → antd `Image` 放大（`mask:false`，悬停无遮罩）。
- Esc / blur：armed → idle。

## Visual Rules
- 按钮 **112×28**、圆角 `--r-ctrl`、字号 `--f-body`、字重 400、`white-space:nowrap; overflow:hidden`（**MANDATORY**，与附件按钮等大）。
- idle 底/边框 `--brand`、字 `#fff`；hover 底 `#4096ff`（非令牌定稿 hover 值）（**MANDATORY**）。
- armed 底 `#fff`、字 `--brand`；灯点 6px 圆、`background:currentColor`、`cs-blink 1.1s` 呼吸（0%→100% 亮度 .22↔1）（**MANDATORY**：灯点随文字同色）。
- 锚定盒 **112px 固定宽 + `margin:0 auto` 居中**，盒中点恒＝按钮中点；全屏表格把列宽拉伸时盒不变、整体居中，整行余数图靠左（**MANDATORY** §"锚定盒"）：`width:112px = 48 + 16 + 48`。
- 缩略图 **48×48**、圆角 `--r-small`(4)、边框 `1px solid #e8e8e8`、`object-fit:cover`、`cursor:pointer`；间隙横 16 纵 4、`margin-top:6`（**MANDATORY**）。
- 删除 X：`16×16`、圆角 4、底 `--danger`、白 X、边框 `#e8e8e8`、默认 `opacity:0`、hover 淡入、`z-index:2`（**MANDATORY**）。
- 文案 `图片上传 / Ctrl+V / 图示N / 删除图片` 为 design-tokens §5/§9 用词（**Default 按令牌**，可经 prop 覆盖但默认＝定稿）。

## Data Contract
props：
- `images: [{ url|previewUrl|downloadUrl, name? }]`（归一化；按序渲染缩略图）。
- `readonly?: boolean`、`disabled?: boolean`。
- `limit?: number`（**Default 按令牌=4**；宿主从表单 schema 读取后传入）。
- `onPaste?: (files: File[])=>void`（宿主上传并回填；组件已做超限判断）。
- `onRemove?: (index:number)=>void`。
- `onLimitReached?: ()=>void`（宿主 `message.error`）。
- `labelIdle?/labelArmed?/altPrefix?/removeTitle?`（文案覆盖，默认定稿值）。

## External Dependencies
- **OSS 图片上传链**：`onPaste` 背后 签名→上传→`buildImageFieldItem`→追加；粘贴即上传、无进度条（宿主实现，组件不含接口）。
- **数上限来源**：`limit` 原从子表 ImageField 组件配置经接口懒加载（默认 4）——宿主数据层。
- **错误/超限 `message` toast**——宿主提供。
- **图片字段序列化**（JSON 串 ↔ 数组）、**dirty/fresh**——宿主。
- **antd `Image` / `Image.PreviewGroup`** 预览。
- 剪贴板粘贴需**真人 Ctrl+V**：CDP 合成按键不会触发页面 `onPaste`（自动化限制，见 ADAPTER）。

## Implementation Constraints
- 删除 X 用内联 SVG，不引 `@ant-design/icons`。
- 锚定盒宽度与"48+16+48"恒等，改动其一必同步（否则盒中点≠按钮中点，全屏拉伸错位）。
- 粘贴完成后保持 armed（连贴），不自动退出。

## Demo-Only Properties
- 示例图 URL / 名称、`limit` 具体值（示例 4）、按钮所在列宽容器、mock 上传逻辑。

## Migration Rules
- 原页 `cs-imgcell / cs-up(.armed) / cs-lamp / cs-blink / cs-thumbs / cs-thumbx-wrap / cs-thumb-x` → `ip-*`。
- 上传/预览/删除/超限逻辑改为 props 回调 + External Dependency；真实 appType/formUuid/字段ID/OSS 路径全部移除。

## Boundary Conditions
- `images` 空且非只读：仅按钮；只读且空：由宿主决定显 `-`（组件渲染空盒）。
- 粘贴非图片文件：忽略（只取 `image/*`）。
- `limit<=当前张数`：粘贴阻断 + `onLimitReached`，不追加。
