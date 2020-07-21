import * as React from "react";
import { Match } from "../model/Match";

export class Set2 extends  React.Component<{m:Match}, {}> {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div className="set">
                <p>Set</p>
                <input readOnly type="text" value={ this.props.m.getSet() } />
            </div>
        )
    }

}