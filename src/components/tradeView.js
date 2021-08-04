import React from 'react';
import axios from 'axios'
import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import serviceUrl from '../utils/config'


class TradeViewComponent extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            trade:[]
        }
        this.handleClick = this.handleClick.bind(this);
    }

    getService(){
        axios.get(serviceUrl).then(res => {
            this.setState({ trade: res.data})
        });
    }

    componentDidMount(){
        this.getService()
    
 
    }

    handleClick(event) {
        this.getService();
      }


    render (){
        return (
            <div>
                <div className="textDiv">
                    <h1 className = "text-center"> Trade List</h1>
                    <input type="submit" value="View" onClick = {this.handleClick}/>
                </div>
            <div className="tradeViewDiv">

            <div className="ag-theme-alpine" style={{height: 400, width: 1400}}>
                <AgGridReact
                    rowData={this.state.trade}>
                    <AgGridColumn field="tradeId"></AgGridColumn>
                    <AgGridColumn field="version"></AgGridColumn>
                    <AgGridColumn field="counterParty"></AgGridColumn>
                    <AgGridColumn field="bookId"></AgGridColumn>
                    <AgGridColumn field="maturityDate"></AgGridColumn>
                    <AgGridColumn field="creationDate"></AgGridColumn>
                    <AgGridColumn field="expired" ></AgGridColumn>
                </AgGridReact>
                </div>
            </div>
            </div>

        )
    }
}

export default TradeViewComponent