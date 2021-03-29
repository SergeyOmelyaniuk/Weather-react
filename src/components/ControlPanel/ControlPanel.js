import React from 'react';
import './ControlPanel.scss';
import { translate } from '../../constants';

function ControlPanel(props) {
    const onClickHandlerLang = (e) => props.updateLang(e.target.value);
    const onClickHandlerTemp = (e) => props.updateTypeTemp(e.target.value);
    return (
        <div className="control-panel">
            <div className="controls">
                <button className='controls__refresh btn' onClick={props.updateBackground}>&#8635;</button>
                <select value={props.lang} className='controls__lang-menu btn' onChange={onClickHandlerLang}>
                    <option value="en">EN</option>                       
                    <option value="ru">RU</option>
                </select>
                <div id="temperature">
                    <button className={props.typeTemp === 'F'? 'controls__type-f btn active':'controls__type-f btn'} value="F" onClick={onClickHandlerTemp}>°F</button>
                    <button className={props.typeTemp === 'C'? 'controls__type-c btn active':'controls__type-c btn'} value="C" onClick={onClickHandlerTemp}>°C</button>
                </div>
            </div>
            <form className="search" onSubmit={props.verify}>
                <input id='city' className={props.error === false? 'search__input' : 'search__input error'} type="search" placeholder={translate[props.lang].queryString} />
                <button className='search__button btn' type="submit">{translate[props.lang].search}</button>
            </form>
        </div>
    );
}

export default ControlPanel;