import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import Icon from 'antd/lib/icon'
import Popover from 'antd/lib/popover'

class ResourceView extends Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        schedulerData: PropTypes.object.isRequired,
        contentScrollbarHeight: PropTypes.number.isRequired,
        slotClickedFunc: PropTypes.func,
        slotItemTemplateResolver: PropTypes.func,
        toggleExpandFunc: PropTypes.func
    }

    render() {

        const {schedulerData, contentScrollbarHeight, slotClickedFunc, slotItemTemplateResolver, toggleExpandFunc} = this.props;
        const {renderData, config} = schedulerData;

        // const [open, setOpen] = useState(false);

        let width = schedulerData.getResourceTableWidth() - 2;
        let paddingBottom = contentScrollbarHeight;
        let displayRenderData = renderData.filter(o => o.render);
        // var modal = document.getElementById("changeLaneModal");
        // var span = document.getElementsByClassName("close")[0];

        let resourceList = displayRenderData.map((item) => {
            let bgColor = config.defaultEventBgColor;
            if (!!item.slotColor){
                bgColor = item.slotColor;
            }
            
            let indents = [];
            for(let i=0;i<item.indent;i++) {
                indents.push(<span key={`es${i}`} className="expander-space"></span>);
            }
            let indent = <span key={`es${item.indent}`} className="expander-space"></span>;
            if(item.hasChildren) {
                indent = item.expanded ? (
                    <Icon type="minus-square" key={`es${item.indent}`} style={{}} className=""
                        onClick={() => {
                            if(!!toggleExpandFunc)
                                toggleExpandFunc(schedulerData, item.slotId);
                        }}/>
                ) : (
                    <Icon type="plus-square" key={`es${item.indent}`} style={{}} className=""
                        onClick={() => {
                            if(!!toggleExpandFunc)
                                toggleExpandFunc(schedulerData, item.slotId);
                        }}/>
                );
            }
            indents.push(indent);

            // const handleOpenChange = (newOpen) => {
            //     setOpen(newOpen);
            //   };

            // const closeModal= () => {
            //     modal.toggle = "none";
            // };

            let a = slotClickedFunc != undefined ? <span className="slot-cell">{indents}<a className="slot-text" style={{width: width}} onClick={() => {
                slotClickedFunc(schedulerData, item);
            }}>{item.slotName}</a></span>
                : <span className="slot-cell">{indents}<span className="slot-text header4-text overflow-text" style={{width: width - 80}}>{item.slotName}</span></span>;
            let slotItem = (
                <Popover content={content} title="Title" trigger="click">
                <button style={{width: width}}  id='ChangeLaneButton'>
                    <div className="overflow-text header2-text" style={{textAlign: "left", color: '#F08421', fontSize: '14px', marginBottom:'15px'}}>
                         {item.slotIssue ? item.slotIssue : ''}
                    </div>
                    <div className="overflow-text header2-text" style={{textAlign: "left", }}>
                    {a}
                    </div>
                     <div className="overflow-text header2-text" style={{textAlign: "left", marginTop: '15px'}}>
                         <span className=' overflow-text header3-text'>Assignee:</span> {item.slotAuthor ? item.slotAuthor : 'Unassignee'}
                    </div>
                </button>
                </Popover>
                
                 
            );

            if(!!slotItemTemplateResolver) {
                let temp = slotItemTemplateResolver(schedulerData, item, slotClickedFunc, width, "overflow-text header2-text");
                if(!!temp)
                    slotItem = temp;
            }

            const content = (
                <div>
                  <p>Content</p>
                  <p>Content</p>
                </div>
              );

            // let pop = (
            //     <Popover
            //         content={<a onClick={hide}>Close</a>}
            //         title="Title"
            //         trigger="click"
            //         open={open}
            //         onOpenChange={handleOpenChange}
            //         >
            //         <Button type="primary">Click me</Button>
            //     </Popover>

            // );

            // let laneModal = (
            //     <Popover id="changeLaneModal" placement="right">
            //         <div class="modal-content">
            //             <span class="close" onClick={() => {closeModal();}}>&times;</span>
            //             <p>Some text in the Modal..</p>
            //         </div>
            //     </Popover>
            // );

            let tdStyle = { height: item.rowHeight, display: 'inline-block' };
            if(item.groupOnly) {
                tdStyle = {
                    ...tdStyle,
                    backgroundColor: schedulerData.config.groupOnlySlotColor,
                };
            }

            return (
                <tr key={item.slotId}>
                    <td data-resource-id={item.slotId} style={tdStyle}>
                        <div style={{borderLeft: `6px solid ${bgColor}`}}>
                             {slotItem}
                        </div>
                    </td>
                </tr>
            );
        });

        return (
            <div style={{paddingBottom: paddingBottom}}>
                <table className="resource-table">
                    <tbody>
                        {resourceList}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ResourceView