// StatusPill — 宜搭兼容参考实现（YidaCodeCanvas / .canvas.jsx）
// 纯展示；计数与配色由宿主传入。可选 interactive 变体用于点击筛选。

var spStyles = `
  .status-pill{display:inline-flex;align-items:center;gap:6px;height:26px;padding:0 10px;border:1px solid #f0f0f0;border-radius:13px;background:#fff;}
  .status-pill .sp-dot{width:8px;height:8px;border-radius:50%;flex:0 0 auto;}
  .status-pill .sp-num{font-weight:600;color:rgba(0,0,0,0.88);font-variant-numeric:tabular-nums;}
  .status-pill .sp-lab{font-size:12px;color:rgba(0,0,0,0.45);}
  .status-pill.interactive{cursor:pointer;flex:0 0 auto;}
  .status-pill.interactive:hover{background:#f5f7fa;}
  .status-pill.interactive.on{background:#e6f4ff;border-color:#1677ff;}
`;

function StatusPill(props) {
  var cls = 'status-pill' + (props.interactive ? ' interactive' : '') + (props.on ? ' on' : '');
  return (
    <span className={cls} onClick={props.interactive ? props.onClick : undefined}>
      <style>{spStyles}</style>
      <i className="sp-dot" style={{ background: props.color || '#B0BEC5' }} />
      <b className="sp-num">{Number(props.count) || 0}</b>
      <span className="sp-lab">{props.shortLabel || props.label}</span>
    </span>
  );
}

// —— Demo ——
function StatusPillDemo() {
  var data = [
    { label: '待定', count: 5, color: '#B0BEC5' },
    { label: '通过', count: 40, color: '#19C355' },
    { label: '带条件通过', shortLabel: '带条件', count: 3, color: '#FFB300' },
    { label: '不通过', count: 2, color: '#F44336' },
  ];
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <style>{spStyles}</style>
      {data.map(function (d, i) { return <StatusPill key={i} label={d.label} shortLabel={d.shortLabel} count={d.count} color={d.color} />; })}
    </div>
  );
}

export { StatusPill };
export default StatusPillDemo;
