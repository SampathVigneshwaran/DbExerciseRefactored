import React from 'react';
import axios from 'axios'


class TradeViewComponent extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            trade:[]
        }
        this.handleClick = this.handleClick.bind(this);
    }

    getService(){
        axios.get('http://localhost:8080/trade').then(res => {
            console.log(res);
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
                <h1 className = "text-center"> Trade List</h1>
                <input type="submit" value="View" onClick = {this.handleClick}/>
                <table className = "table table-striped">
                    <thead>
                        <tr>

                            <td> Trade Id</td>
                            <td> Version</td>
                            <td> Counterparty</td>
                            <td> Book Id</td>
                            <td> Maturity Date</td>
                            <td> Creation Date</td>
                            <td> Expired</td>
                        </tr>

                    </thead>
                    <tbody>
                        {
                            this.state.trade.map(
                                trade => 
                                <tr key = {trade.tradeId}>
                                     <td> {trade.tradeId}</td>
                                     <td> {trade.version}</td>   
                                     <td> {trade.counterParty}</td>   
                                     <td> {trade.bookId}</td>   
                                     <td> {trade.maturityDate}</td>  
                                     <td> {trade.creationDate}</td>  
                                     <td> {trade.expired}</td>   
                                </tr>
                            )
                        }

                    </tbody>
                </table>

            </div>

        )
    }
}

export default TradeViewComponent