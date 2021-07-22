import React from 'react';

import axios from 'axios'
import TradeViewComponent from './tradeView';


class TradeComponent extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            tradeId :'',
            version:'',
            counterParty:'',
            bookId:'',
            maturityDate:'',
            creationDate:''
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }
    
    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
      }

      submitHandler(event) {
          event.preventDefault()
          console.log(this.state)
          console.log("submitHandler Ends")
               axios.post('http://localhost:8080/trade',this.state).then(res => {
            console.log(res);
            this.setState({ trade: res.data})
           
        })
        .catch(error =>{
            console.log(error)
        })
      }

 

    componentDidMount(){}

    componentDidUpdate(){}

    render (){
        return (
            <div>
                <h1 className = "text-center"> Create Trade</h1>
                <form onSubmit = {this.submitHandler}>
                    
                    <label>Trade ID:  <input type="text" name="tradeId" value={this.state.tradeId} onChange={this.handleChange} /></label>
                    <label>Version:  <input type="text" name="version" value={this.state.version} onChange={this.handleChange} /></label>
                    <label>counterParty:  <input type="text" name="counterParty" value={this.state.counterParty} onChange={this.handleChange}/></label>
                    <label>Book ID:  <input type="text" name="bookId" value={this.state.bookId} onChange={this.handleChange}/></label>
                    <label>Maturity Date:  <input type="text" name="maturityDate" value={this.state.maturityDate} onChange={this.handleChange}/></label>
                    <label>Creation Date:  <input type="text" name="creationDate" value={this.state.creationDate} onChange={this.handleChange}/></label>
                    <br/>
                    <input type="submit" value="Book" />
                    
                </form>

                <TradeViewComponent  />

            </div>

        )
    }
}

export default TradeComponent