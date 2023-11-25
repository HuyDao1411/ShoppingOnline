import axios from 'axios';
import React , { Component } from 'react';
import withRouter from '../utils/withRouter';
import MyContext from '../contexts/MyContext';

class ProductDetail extends Component {
    static contextType = MyContext ;
    constructor ( props ) {
        super ( props ) ;
        this.state = {
            product : null,
            txtQuantity : 1
        };
    }
    render () {
        const prod = this.state.product ;
        if ( prod != null ) {
            return (
            < div className ="align-center">
                < h2 className ="text-center"> PRODUCT DETAILS</ h2 >
                <div className='card'>
                < figure className ="caption-right">
                    < img src ={"data:image/jpg;base64," + prod.image } width ="250px" height ="250px" alt ="" />
                    < figcaption >
                        < form >
                            < table >
                            < tbody >
                                {/* <tr >
                                    < td align ="right"> ID : </ td >
                                    <td >{ prod._id } </ td >
                                </ tr > */}
                                <tr >
                                    < td id='detail-pro' align='left'> Name : </ td >
                                    <td align='left'>{ prod.name } </ td >
                                    <td width='80px'></td>
                                </ tr >
                                <tr >
                                    < td id='detail-pro' align ="left"> Price : </ td >
                                    <td align='left'>{ prod.price } </ td >
                                </ tr >
                                <tr >
                                    < td id='detail-pro' align ="left"> Category : </ td >
                                    <td align='left'>{ prod.category.name } </ td >
                                </ tr >
                                <tr >
                                    < td id='detail-pro' align ="left"> Quantity : </ td >
                                    <td align='left'> < input type ="number" min ="1" max ="99" value ={ this.state.txtQuantity } onChange ={( e) => { this.setState ({ txtQuantity : e.target.value }) }} /> </ td >
                                </ tr >
                                {/* <tr >
                                    <td align='left'> < input className='login' type ="submit" value ="ADD TO CART" onClick ={( e ) => this.btnAdd2CartClick( e )} /></ td >
                                </ tr > */}
                            </ tbody >
                            </ table >
                                < input className='add2cart' type ="submit" value ="ADD TO CART" onClick ={( e ) => this.btnAdd2CartClick( e )} />

                        </ form >
                    </ figcaption >
                </ figure >

                </div>
                
            </ div >
            ) ;
        }
        return ( < div />) ;
    }
    btnAdd2CartClick ( e ) {
        e.preventDefault () ;
        const product = this.state.product ;
        const quantity = parseInt( this.state.txtQuantity ) ;
        if ( quantity ) {
            const mycart = this.context.mycart ;
            const index = mycart.findIndex ( x => x.product._id === product._id ) ; // check if the _idexists in mycart
            if ( index === -1) { // not found , push newItem
                const newItem = { product : product , quantity : quantity };
                mycart.push( newItem ) ;
            } else { // increasing the quantity
                mycart[ index ].quantity += quantity ;
            }
            this.context.setMycart( mycart ) ;
            alert ('Product was successfully added to your cart!') ;
        } else {
            alert ('Please input quantity ') ;
        }
    }
    componentDidMount () {
        const params = this.props.params ;
        this.apiGetProduct ( params.id ) ;
    }
    // apis
    apiGetProduct ( id ) {
        axios.get ('/api/customer/products/' + id ).then (( res ) => {
            const result = res.data ;
            this.setState ({ product : result }) ;
        }) ;
    }
}
export default withRouter( ProductDetail ) ;