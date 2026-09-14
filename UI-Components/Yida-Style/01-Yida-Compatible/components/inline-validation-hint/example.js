// InlineValidationHint — 宜搭兼容参考实现（YidaCodeCanvas / .canvas.jsx）
// 纯展示；异步校验（AI/规则/必填）由宿主执行，仅回填 status/text。勾为内联 SVG，不引图标库。

var vhStyles = `
  .vh-hint{display:inline-block;margin-top:4px;font-size:12px;line-height:1.5715;max-width:100%;white-space:normal;word-break:break-word;}
  .vh-hint.vh-loading{color:#1677ff;}
  .vh-hint.vh-info{color:rgba(0,0,0,0.45);}
  .vh-hint.vh-pass{color:#19C355;}
  .vh-hint.vh-fail,.vh-hint.vh-required{color:#F44336;}
  .vh-hint svg{vertical-align:-1px;margin-right:2px;}
`;

function PassIcon() {
  return <svg viewBox="0 0 12 12" width="11" height="11" fill="none" stroke="#19C355" strokeWidth="2"><path d="M2.5 6.5l2.5 2.5 4.5-5" /></svg>;
}

function InlineValidationHint(props) {
  var status = props.status || 'idle';
  var labels = props.labels || {};
  if (status === 'idle') { return null; }
  var body;
  if (status === 'loading') { body = props.text || labels.loading || '校验中…'; }
  else if (status === 'pass') { body = props.text || labels.passSuffix || '校验通过'; }
  else if (status === 'required') { body = labels.required || '必填'; }
  else if (status === 'fail') { body = props.text || labels.failDefault || '校验未通过，请补充'; }
  else if (status === 'info') { body = props.text || labels.info || ''; }
  else { return null; }

  if (status !== 'loading' && status !== 'info' && !body) { return null; }

  return (
    <span className={'vh-hint vh-' + status}>
      <style>{vhStyles}</style>
      {status === 'pass' ? <PassIcon /> : null}
      {status === 'fail' || status === 'required' ? '! ' : null}
      {status === 'required' ? '必填' : body}
    </span>
  );
}

// —— Demo：宿主算出的多种结果分别渲染（真实用法只渲染当前一种 status）——
function InlineValidationHintDemo() {
  return (
    <div style={{ display: 'grid', gap: 14, maxWidth: 320 }}>
      <style>{vhStyles}</style>
      <InlineValidationHint status="pass" text="说明具体、可核验" />
      <InlineValidationHint status="loading" />
      <InlineValidationHint status="fail" text="未写明实测值与判定依据，请补充" />
      <InlineValidationHint status="required" />
      <InlineValidationHint status="info" text="智能校验暂不可用，请人工确认" />
    </div>
  );
}

export { InlineValidationHint };
export default InlineValidationHintDemo;
