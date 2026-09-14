// KpiTile — 宜搭兼容参考实现（YidaCodeCanvas / .canvas.jsx）
// 纯展示，无外部依赖。Mock 数据仅用于演示，接入真实页面见 ADAPTER.md。

var kpiTileStyles = `
  .kpi-tile{position:relative;overflow:hidden;flex:0 0 98px;width:98px;padding:10px 6px 8px;text-align:center;background:#fff;border:1px solid var(--line,#f0f0f0);border-radius:var(--r-card,8px);box-shadow:var(--sh-card,0 1px 2px rgba(16,24,40,0.04));}
  .kpi-tile::before{content:"";position:absolute;left:0;right:0;top:0;height:3px;background:var(--kc,#ccc);}
  .kpi-tile-label{display:block;font-size:var(--f-aux,12px);color:var(--t2,rgba(0,0,0,0.65));margin-bottom:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
  .kpi-tile-value{display:block;font-size:var(--f-sub,16px);font-weight:var(--fw-strong,600);line-height:var(--lh-heading,1.3);letter-spacing:-.2px;color:var(--kc,var(--t1,rgba(0,0,0,0.88)));font-variant-numeric:tabular-nums;}
`;

function KpiTile(props) {
  var label = props.label;
  var value = props.loading ? '—' : props.value;
  var valueColor = props.loading ? 'var(--t4,rgba(0,0,0,0.25))' : undefined;
  return (
    <div className="kpi-tile" style={{ '--kc': props.color || '' }}>
      <style>{kpiTileStyles}</style>
      <span className="kpi-tile-label">{label}</span>
      <span className="kpi-tile-value" style={valueColor ? { color: valueColor } : undefined}>{value}</span>
    </div>
  );
}

// —— Demo：多个磁贴并排（真实页面应由宿主传入 label/value/color）——
function KpiTileDemo() {
  var tiles = [
    { label: '待处理', value: 12, color: '#F44336' },
    { label: '已完成', value: 128, color: '#19C355' },
    { label: '进行中', value: 7, color: '#FFB300' },
    { label: '加载中', value: 0, color: '#1677ff', loading: true },
  ];
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      {tiles.map(function (t, i) {
        return <KpiTile key={i} label={t.label} value={t.value} color={t.color} loading={t.loading} />;
      })}
    </div>
  );
}

export { KpiTile };
export default KpiTileDemo;
