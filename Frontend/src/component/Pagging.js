import React, { Component } from 'react'
export const Pagging = (props) => {
    let pages = [];
    let max_show = 2;
    let half = parseInt(max_show / 2);
    var start = 1;
    if (props.total > max_show) {

        if (props.current > half) {
            start = props.current - half;
        }
        if (props.current + half >= props.total) {
            start = props.total - max_show;
        }
    }
    max_show += start
    for (var i = start; i <= max_show && i <= props.total; i++) {
        pages[i] = (i == props.current) ?
            <li key={"page_" + i} className="active" aria-current="page">
                <a href="javascript:void(0);">{i}</a>
            </li>
            : <li key={"page_" + i}><a href="javascript:void(0);" onClick={props.onSelectPage(i)}>{i}</a></li>
    }
    return <React.Fragment>
        {props.total > 1 &&
            <div className="paging">
                <ul>
                    {/* <li>
                        Trang {props.current}/{props.total}
                    </li> */}

                    {props.current == 1 ? <li className="page-item disabled previous">
                        <a href="javascript:void(0);">
                            <i className="icon icon-angle-double-left"></i>
                        </a>
                    </li>
                        : <li className="page-item previous">
                            <a href="javascript:void(0);" onClick={props.onSelectPage(1)}>
                            <i className="icon icon-angle-double-left" aria-hidden="true"></i>
                            </a>
                        </li>
                    }

                    {props.current == 1 ? <li className="page-item disabled previous">
                        <a href="javascript:void(0);">
                            <i className="icon icon-angle-left" aria-hidden="true"></i>
                        </a>
                    </li>
                        : <li className="page-item previous">
                            <a href="javascript:void(0);" onClick={props.onSelectPage(props.current - 1)}>
                            <i className="icon icon-angle-left"></i>
                            </a>
                        </li>
                    }

                    {(start > 1) &&
                        <React.Fragment>
                            <li><a href="javascript:void(0);" onClick={props.onSelectPage(1)}>1</a></li>
                            <li>
                                <span>
                                    ...
                                </span>
                            </li>
                        </React.Fragment>
                    }
                    {pages}
                    {(max_show < props.total) &&
                        <React.Fragment>
                            <li className="page-item active" aria-current="page">
                                <span>
                                    ...
                                </span>
                            </li>
                            <li className="page-item"><a href="javascript:void(0);" onClick={props.onSelectPage(props.total)}>{props.total}</a></li>
                        </React.Fragment>
                    }
                    {props.current == props.total ?
                        <li className="page-item disabled next">
                            <a href="javascript:void(0);">
                                <i className="icon icon-angle-right"></i>
                            </a>
                        </li>
                        : <li className="page-item next">
                            <a  href="javascript:void(0);" onClick={props.onSelectPage(props.current + 1)}>
                            <i className="icon icon-angle-right"></i>
                            </a>
                        </li>
                    }

                    {props.current == props.total ?
                        <li className="page-item disabled next">
                            <a href="javascript:void(0);">
                            <i className="icon icon-angle-double-right"></i>
                            </a>
                        </li>
                        : <li className="page-item next">
                            <a  href="javascript:void(0);" onClick={props.onSelectPage(props.total)}>
                            <i className="icon icon-angle-double-right"></i>
                            </a>
                        </li>
                    }

                </ul>
            </div>
        }
    </React.Fragment>
}
