import React from 'react';

import axios from 'axios'
import TradeViewComponent from './tradeView';
import serviceUrl from '../utils/config'



class TradeComponent extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            tradeId :'',
            version:'',
            counterParty:'',
            bookId:'',
            maturityDate:'',
            creationDate:'',
            validated: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        
    }
    
    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
        if (event.target.value === "") 
        {
            this.setState({validated:false})
        }
        else{
        this.setState({validated:true})
          }
    }

      submitHandler(event) {
          event.preventDefault()
               axios.post(serviceUrl,this.state).then(res => {
            this.setState({ trade: res.data})
           
        })
        .catch(error =>{
            console.log(error)
        })
      }


      validateMaturityDate = (value) => {
        this.setState({maturityDate: value});
        var tradeDate = new Date(value);
        var todate = new Date();
        if (tradeDate.getDate() >= todate.getDate() && tradeDate.getMonth() >= todate.getMonth() &&  tradeDate.getFullYear() >= todate.getFullYear()){
            console.log("Correct Maturity dates");
            this.setState({validated:true})
            return 
        }
        this.setState({validated:false})
      }
 

    componentDidMount(){}

    componentDidUpdate(){}

    render (){
        return (
            <div>
            <div className="tradeDiv">
                <h1 className = "text-center"> Create Trade</h1>

                <form onSubmit = {this.submitHandler}>
                    
                    <label>Trade ID:  <input type="text" name="tradeId" value={this.state.tradeId} onChange={this.handleChange} /></label>
                    <label>Version:  <input type="text" name="version" value={this.state.version} onChange={this.handleChange} /></label>
                    <label>counterParty:  <input type="text" name="counterParty" value={this.state.counterParty} onChange={this.handleChange}/></label>
                    <label>Book ID:  <input type="text" name="bookId" value={this.state.bookId} onChange={this.handleChange}/></label>
                    <label>Creation Date:  <input type="text" placeholder="yyyy-mm-dd" name="creationDate" value={this.state.creationDate} onChange={this.handleChange}/></label>
                    <label>Maturity Date:  <input type="text" placeholder="yyyy-mm-dd" name="maturityDate" value={this.state.maturityDate} onChange={(e) => this.validateMaturityDate(e.target.value)}/></label>
                    <br/>
                    <input type="submit" value="Book" disabled={!this.state.validated}/>
                    
                </form>

            </div>
                <TradeViewComponent  />
            </div>
        )
    }
}

export default TradeComponent