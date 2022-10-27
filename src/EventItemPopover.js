import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import Col from 'antd/lib/col'
import Row from 'antd/lib/row'
import 'antd/lib/grid/style/index.css'

class EventItemPopover extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        schedulerData: PropTypes.object.isRequired,
        eventItem: PropTypes.object.isRequired,
        title: PropTypes.string.isRequired,
        startTime: PropTypes.string.isRequired,
        endTime: PropTypes.string.isRequired,
        statusColor: PropTypes.string.isRequired,
        subtitleGetter: PropTypes.func,
        viewEventClick: PropTypes.func,
        viewEventText:PropTypes.string,
        viewEvent2Click: PropTypes.func,
        viewEvent2Text: PropTypes.string,
        eventItemPopoverTemplateResolver: PropTypes.func
    }

    render(){
        const {schedulerData, eventItem, title, startTime, endTime, statusColor,subtitleGetter, viewEventClick, viewEventText, viewEvent2Click, viewEvent2Text, eventItemPopoverTemplateResolver} = this.props;
        const {localeMoment, config} = schedulerData;
        let start = localeMoment(startTime), end = localeMoment(endTime);

        if (eventItemPopoverTemplateResolver != undefined) {
            return eventItemPopoverTemplateResolver(schedulerData, eventItem, title, start, end, statusColor);
        } else {
            let subtitleRow = <div />;
            if(subtitleGetter !== undefined){
                let subtitle = subtitleGetter(schedulerData, eventItem);
                if(subtitle != undefined){
                    subtitleRow = (
                        <Row type="flex" align="middle">
                            <Col span={2}>
                                <div />
                            </Col>
                            <Col span={22} className="overflow-text">
                                <span className="header2-text" title={subtitle}>{subtitle}</span>
                            </Col>
                        </Row>
                    );
                }
            }

            let opsRow = <div />;
            if(viewEventText !== undefined && viewEventClick !== undefined && (eventItem.clickable1 == undefined || eventItem.clickable1)){
                let col = (
                    <Col span={22}>
                        <span className="header2-text" style={{color: '#108EE9', cursor: 'pointer'}} onClick={() => {viewEventClick(schedulerData, eventItem);}}>{viewEventText}</span>
                    </Col>
                );
                if(viewEvent2Text !== undefined && viewEvent2Click !== undefined && (eventItem.clickable2 == undefined || eventItem.clickable2)) {
                    col = (
                        <Col span={22}>
                            <span className="header2-text" style={{color: '#108EE9', cursor: 'pointer'}} onClick={() => {viewEventClick(schedulerData, eventItem);}}>{viewEventText}</span><span className="header2-text" style={{color: '#108EE9', cursor: 'pointer', marginLeft: '16px'}} onClick={() => {viewEvent2Click(schedulerData, eventItem);}}>{viewEvent2Text}</span>
                        </Col>
                    )
                };
                opsRow = (
                    <Row type="flex" align="middle">
                        <Col span={2}>
                            <div />
                        </Col>
                        {col}
                    </Row>
                );
            }
            else if(viewEvent2Text !== undefined && viewEvent2Click !== undefined && (eventItem.clickable2 == undefined || eventItem.clickable2)) {
                let col = (
                    <Col span={22}>
                        <span className="header2-text" style={{color: '#108EE9', cursor: 'pointer'}} onClick={() => {viewEvent2Click(schedulerData, eventItem);}}>{viewEvent2Text}</span>
                    </Col>
                );
                opsRow = (
                    <Row type="flex" align="middle">
                        <Col span={2}>
                            <div />
                        </Col>
                        {col}
                    </Row>
                );
            }

            let dateFormat = config.eventItemPopoverDateFormat;
            return (
                <div style={{width: '300px'}}>
                    <Row type="flex" align="middle">
                        <Col span={2}>
                            <div className="status-dot" style={{backgroundColor: statusColor}} />
                        </Col>
                        <Col className="overflow-text" style={{paddingTop: '6px'}}>
                            <h2 className="header-text">{title}</h2>
                        </Col>
                        <Col style={{marginLeft: '90px'}}>
                            <th className="help-text">{start.format(dateFormat)}</th><th className="header2-text">-</th><th className="help-text" style={{paddingLeft: '12px'}}>{end.format(dateFormat)}</th>
                        </Col>
                    </Row>
                    {subtitleRow}
                    <Row type="flex" align="middle">
                        <Col span={2}>
                            <div />
                        </Col>
                        <Col span={22}>
                            <th>Working Days: </th>
                        </Col>
                    </Row>
                    <Row type="flex" align="middle">
                      <Col span={2}>
                        <div />
                      </Col>
                      <Col span={22}>
                        <th>Off Days: </th>
                      </Col>
                    </Row>
                </div>
            );
        }
    }
}

export default EventItemPopover
