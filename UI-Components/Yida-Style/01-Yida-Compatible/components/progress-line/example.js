// ProgressLine — 宜搭兼容参考实现（YidaCodeCanvas / .canvas.jsx）
// 纯展示，无外部依赖。完成率计算由宿主完成后传入。

var plStyles = `
  .progress-line{display:flex;align-items:center;gap:12px;}
  .progress-line .pl-label{font-size:var(--f-body,14px);color:var(--t2,rgba(0,0,0,.65));}
  .progress-line .pl-track{position:relative;flex:1 1 auto;height:14px;border-radius:99px;background:var(--track,#eef0f3);overflow:hidden;}
  .progress-line .pl-track i{position:absolute;left:0;top:0;bottom:0;border-radius:99px;background:var(--pc,var(--j-pass,#19c355));}
  .progress-line .pl-pct{font-size:var(--f-title,20px);font-weight:var(--fw-strong,600);line-height:var(--lh-num,1.2);color:var(--pc,var(--j-pass,#19c355));min-width:52px;text-align:right;font-variant-numeric:tabular-nums;}
`;

function ProgressLine(props) {
  var v = Number(props.value);
  if (isNaN(v)) { v = 0; }
  v = Math.max(0, Math.min(100, v));
  var height = props.height || 14;
  var suffix = props.suffix == null ? '%' : props.suffix;
  return (
    <div className="progress-line" style={{ '--pc': props.color || '#19C355', '--track': props.trackColor || '#eef0f3' }}>
      <style>{plStyles}</style>
      {props.label ? <span className="pl-label">{props.label}</span> : null}
      <span className="pl-track" style={{ height: height }}><i style={{ width: v + '%' }} /></span>
      <span className="pl-pct">{v}{suffix}</span>
    </div>
  );
}

// —— Demo ——
function ProgressLineDemo() {
  return (
    <div style={{ maxWidth: 480 }}>
      <style>{plStyles}</style>
      <div style={{ display: 'grid', gap: 14 }}>
        <ProgressLine label="自查完成率" value={72} color="#19C355" />
        <ProgressLine label="复查完成率" value={40} color="#1677ff" />
        <ProgressLine label="细轨道" value={64} height={8} />
        <ProgressLine value={100} />
      </div>
    </div>
  );
}

export { ProgressLine };
export default ProgressLineDemo;
