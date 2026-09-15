# AttachmentChip — ACCEPTANCE

- [ ] 空态：蓝底白字"上传附件"，点击可选文件；hover 底色变浅(#4096ff)。
- [ ] 上传中：蓝底 + 内部淡蓝 `--brand-hover` 进度条自左向右；文本只显示真实 `N%`，无"上传中"字样。
- [ ] 已上传(fresh)：绿底白字 `--j-pass`；当前附件(服务器)：白底蓝字 `--brand`、**不得用浅蓝 #91caff**。
- [ ] hover 有附件态：右侧划入 28px 红底白 X（`--danger`、右缘圆角 5），文字左移 14px，移开复位。
- [ ] 点击非删除区＝预览(`onOpen`/window.open)；点击 X＝`onRemove`（宿主确认后删），不触发预览。
- [ ] 只读态：白底蓝字"当前附件"、无删除 X、点击预览。
- [ ] 禁用态：不可点、变灰。
- [ ] 不显示文件名、无回形针图标（定稿）。
- [ ] 尺寸 112×28、圆角 6，与图片上传按钮等大对齐。
- [ ] 令牌：颜色/尺寸写成 `var(--token,#字面)`，无裸写死；宿主未声明 `:root` 时按字面兜底仍正确。
- [ ] 脱敏：包内无真实 appType / formUuid / attachmentField 字段 ID / OSS 接口地址 / Token / 公司·人员名；文件名与 URL 为 mock。
- [ ] 独立理解：凭 SPEC + preview + ADAPTER 可接入，不接真接口也能按状态演示。
