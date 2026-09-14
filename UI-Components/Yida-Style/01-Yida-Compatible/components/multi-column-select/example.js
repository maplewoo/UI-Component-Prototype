// MultiColumnSelect — 宜搭兼容参考实现（YidaCodeCanvas / .canvas.jsx）
// 基于 antd Select 的 optionRender + dropdownRender。选项由宿主传入，组件不取数、不含真实字段。
import React from 'react';
import { Select } from 'antd';

// 面板为 portal，但 design-tokens 声明在 :root 全局可见 → 颜色写 var(--token, #字面兜底)，配合 popupClassName 作用域。
function panelScopeStyle(popupClass) {
  return (
    <style>{`
      .${popupClass} .ant-select-item{padding-left:0;padding-right:0;}
      .${popupClass} .ant-select-item .ant-select-item-option-content{overflow:visible;}
    `}</style>
  );
}

function freezeClass(remaining, dateStr, thresholds) {
  if (!dateStr) { return 'none'; }
  var due = thresholds.due == null ? 14 : thresholds.due;
  var soon = thresholds.soon == null ? 30 : thresholds.soon;
  if (typeof remaining === 'number' && remaining <= due) { return 'due'; }
  if (typeof remaining === 'number' && remaining <= soon) { return 'soon'; }
  return '';
}
var FREEZE_BG = { '': 'var(--brand,#1677ff)', soon: 'var(--j-cond,#FFB300)', due: 'var(--j-fail,#F44336)', none: 'var(--track,#eef0f3)' };
var FREEZE_FG = { '': '#fff', soon: '#fff', due: '#fff', none: 'var(--t3,rgba(0,0,0,0.45))' };

function Cell(props) {
  var col = props.col;
  var raw = props.value;
  var base = { fontSize: 'var(--f-body,14px)', overflow: 'hidden', whiteSpace: 'nowrap', minWidth: 0 };
  if (col.align === 'center') { base.textAlign = 'center'; }
  if (col.type === 'progress') {
    var pct = Math.max(0, Math.min(100, Number(raw) || 0));
    var color = col.progressColor || 'var(--j-pass,#19C355)';
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, justifySelf: 'center' }}>
        <span style={{ position: 'relative', flex: '0 0 84px', width: 84, height: 8, borderRadius: 99, background: 'var(--track,#eef0f3)', overflow: 'hidden' }}>
          <span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: pct + '%', borderRadius: 99, background: color }} />
        </span>
        <em style={{ fontStyle: 'normal', fontWeight: 'var(--fw-strong,600)', fontSize: 'var(--f-aux,12px)', color: color, minWidth: 34, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{pct}%</em>
      </span>
    );
  }
  if (col.type === 'dateChip') {
    var d = raw || {};
    var cls = freezeClass(d.remaining, d.date, props.thresholds || {});
    return (
      <span style={{ justifySelf: 'center', fontSize: 'var(--f-aux,12px)', fontWeight: 'var(--fw-strong,600)', color: FREEZE_FG[cls], background: FREEZE_BG[cls], padding: '2px 6px', borderRadius: 'var(--r-small,4px)' }}>
        {d.date || '未设置'}
      </span>
    );
  }
  var style = Object.assign({}, base);
  if (col.maxChars) { style.maxWidth = col.maxChars * 14; } /* 14 = --f-body 字高基准：3字=42px、5字=70px */
  style.textOverflow = col.truncate === 'clip' ? 'clip' : 'ellipsis';
  return <span style={style}>{raw == null || raw === '' ? (col.placeholder || '-') : String(raw)}</span>;
}

function gridTemplate(columns) {
  return columns.map(function (c) { return (c.width || 1) + 'px'; }).join(' ') + ' 1fr';
}

function MultiColumnSelect(props) {
  var columns = props.columns || [];
  var options = props.options || [];
  var popupClass = props.popupClassName || 'mcs-panel-pop';
  var minW = props.panelMinWidth || 950;
  var thresholds = props.freezeThresholds || { due: 14, soon: 30 };
  var grid = { display: 'grid', alignItems: 'center', gap: 10, gridTemplateColumns: gridTemplate(columns), minWidth: minW };

  var header = (
    <div className="mcs-head" style={Object.assign({}, grid, { padding: '6px 8px', borderBottom: '1px solid var(--line,#f0f0f0)', fontSize: 'var(--f-body,14px)', fontWeight: 'var(--fw-strong,600)', color: 'var(--t2,rgba(0,0,0,0.65))' })}>
      {columns.map(function (c) {
        return <span key={c.key} style={{ textAlign: c.align || 'left' }}>{c.label}</span>;
      })}
      <span />
    </div>
  );

  return (
    <React.Fragment>
      {panelScopeStyle(popupClass)}
      <Select
        allowClear={props.allowClear !== false}
        showSearch={props.showSearch !== false}
        disabled={props.disabled}
        loading={props.loading}
        placeholder={props.placeholder}
        value={props.value}
        options={options}
        style={props.style || { width: 340 }}
        onChange={props.onChange}
        popupMatchSelectWidth={false}
        popupClassName={popupClass}
        filterOption={props.filterOption || function (input, option) {
          return String(option.label || '').toLowerCase().indexOf(String(input || '').toLowerCase()) >= 0;
        }}
        optionRender={function (option) {
          var cells = (option.data && option.data.cells) || {};
          return (
            <div style={grid}>
              {columns.map(function (c) { return <Cell key={c.key} col={c} value={cells[c.key]} thresholds={thresholds} />; })}
              <span />
            </div>
          );
        }}
        dropdownRender={function (menu) {
          return (<div className="mcs-panel">{header}{menu}</div>);
        }}
      />
    </React.Fragment>
  );
}

// —— Demo：客户-型号-类别 多列对比（数据为 mock，宿主应换成自身 combos）——
var DEMO_COLUMNS = [
  { key: 'freeze', label: '冻结时间', width: 90, align: 'center', type: 'dateChip' },
  { key: 'customer', label: '主机厂', width: 90, align: 'center', maxChars: 3, truncate: 'clip' },
  { key: 'vehicle', label: '车型代号', width: 90, align: 'center' },
  { key: 'category', label: '总成类别', width: 140, align: 'center', maxChars: 5, truncate: 'clip' },
  { key: 'selfRate', label: '自查', width: 140, align: 'center', type: 'progress', progressColor: 'var(--j-pass,#19C355)' },
  { key: 'reviewRate', label: '复查', width: 140, align: 'center', type: 'progress', progressColor: 'var(--brand,#1677ff)' },
  { key: 'pe', label: '产品工程师', width: 90, align: 'center' },
  { key: 'se', label: '资深工程师', width: 90, align: 'center' },
];
var DEMO_OPTIONS = [
  { value: 'A||1||x', label: '甲 - A-1 - 前围', cells: { freeze: { date: '09-20', remaining: 6 }, customer: '甲', vehicle: 'A-1', category: '前围', selfRate: 40, reviewRate: 10, pe: '张三', se: '李四' } },
  { value: 'B||2||y', label: '乙 - B-2 - 侧围总成装饰板', cells: { freeze: { date: '10-05', remaining: 21 }, customer: '乙丙丁', vehicle: 'B-2', category: '侧围总成装饰板', selfRate: 75, reviewRate: 55, pe: '王五', se: '赵六' } },
  { value: 'C||3||z', label: '丙 - C-3 - 后背门', cells: { freeze: { date: '11-30', remaining: 77 }, customer: '丙', vehicle: 'C-3', category: '后背门', selfRate: 100, reviewRate: 92, pe: '孙七', se: '周八' } },
  { value: 'D||4||w', label: '丁 - D-4 - 翼子板', cells: { freeze: { date: '', remaining: null }, customer: '丁', vehicle: 'D-4', category: '翼子板', selfRate: 0, reviewRate: 0, pe: '吴九', se: '郑十' } },
];

function MultiColumnSelectDemo() {
  var state = React.useState(undefined);
  var val = state[0], setVal = state[1];
  return (
    <MultiColumnSelect
      placeholder="主机厂-车型代号-总成类别（支持模糊搜索）"
      columns={DEMO_COLUMNS}
      options={DEMO_OPTIONS}
      value={val}
      onChange={setVal}
    />
  );
}

export { MultiColumnSelect };
export default MultiColumnSelectDemo;
