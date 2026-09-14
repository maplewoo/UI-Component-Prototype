// JudgeSelect — 宜搭兼容参考实现（YidaCodeCanvas / .canvas.jsx）
// antd Select 定制；只读态用纯 span。选项与配色由宿主传入（不含任何真实业务字段）。
import React from 'react';
import { Select } from 'antd';

function jsScope(cls, w) {
  return (
    <style>{`
      .${cls} .ant-select-selector{border:none !important;box-shadow:none !important;background:transparent !important;padding:0 !important;height:28px;overflow:hidden;border-radius:6px;}
      .${cls} .ant-select-arrow{display:none;}
      .${cls} .js-face{width:${w}px;height:28px;display:flex;align-items:center;justify-content:center;border-radius:6px;background:var(--jc,#ECEFF1);color:var(--jc-t,#fff);font-size:14px;position:relative;white-space:nowrap;overflow:hidden;font-variant-numeric:tabular-nums;}
      .${cls} .js-face::after{content:"";position:absolute;right:9px;top:50%;width:6px;height:6px;border-right:1.4px solid var(--jc-t,#fff);border-bottom:1.4px solid var(--jc-t,#fff);transform:translateY(-70%) rotate(45deg);opacity:.7;}
      .js-pop .ant-select-item{min-height:32px;padding:5px 10px;display:flex;align-items:center;font-size:14px;font-weight:400;}
      .js-pop .js-dot{width:8px;height:8px;border-radius:2px;flex:0 0 auto;}
    `}</style>
  );
}

function byValue(options, v) {
  var hit = null;
  (options || []).forEach(function (o) { if (o.value === v) { hit = o; } });
  return hit;
}

function JudgePill(props) {
  var opt = byValue(props.options, props.value) || byValue(props.options, props.fallbackValue) || {};
  return (
    <span className="js-pill" style={{ '--jc': opt.color || '#ECEFF1', '--jc-t': opt.textColor || '#fff', width: (props.width || 112), height: 28, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, background: 'var(--jc)', color: 'var(--jc-t)', fontSize: 14, fontVariantNumeric: 'tabular-nums' }}>
      {(opt.shortLabel || opt.label || props.value || '')}
    </span>
  );
}

function JudgeSelect(props) {
  if (props.readonly) { return <JudgePill options={props.options} value={props.value} fallbackValue={props.fallbackValue} width={props.width} />; }
  var w = props.width || 112;
  var lookup = function (v) {
    var o = byValue(props.options, v) || byValue(props.options, props.fallbackValue) || {};
    return o;
  };
  return (
    <Select
      className="js-sel"
      popupClassName="js-pop"
      style={{ width: w }}
      value={props.value}
      onChange={props.onChange}
      options={(props.options || []).map(function (o) { return { label: o.label, value: o.value }; })}
      labelRender={function (option) {
        var o = lookup(option.value);
        return (
          <span className="js-face" style={{ '--jc': o.color || '#ECEFF1', '--jc-t': o.textColor || '#fff' }}>{o.shortLabel || option.label}</span>
        );
      }}
      optionRender={function (option) {
        var o = lookup(option.value);
        return (<span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><i className="js-dot" style={{ background: o.color || '#B0BEC5' }} /><span>{option.label}</span></span>);
      }}
    />
  );
}

// —— Demo（判定色卡为 mock，宿主换自身状态集合）——
var JUDGE_OPTIONS = [
  { value: '待定', label: '待定', shortLabel: '待定', color: '#ECEFF1', textColor: 'rgba(0,0,0,0.65)' },
  { value: '通过', label: '通过', color: '#19C355', textColor: '#fff' },
  { value: '带条件通过', label: '带条件通过', shortLabel: '带条件', color: '#FFB300', textColor: '#fff' },
  { value: '不通过', label: '不通过', color: '#F44336', textColor: '#fff' },
  { value: '不适用', label: '不适用', color: '#9E9E9E', textColor: '#fff' },
];

function JudgeSelectDemo() {
  var st = React.useState('通过');
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <style>{`.js-sel .ant-select-selector,.js-pill{border:0;}`}</style>
      {jsScope('js-sel', 112)}
      <JudgeSelect options={JUDGE_OPTIONS} value={st[0]} onChange={st[1]} fallbackValue="待定" />
      <JudgeSelect options={JUDGE_OPTIONS} value="带条件通过" readonly fallbackValue="待定" />
    </div>
  );
}

export { JudgeSelect, JudgePill };
export default JudgeSelectDemo;
