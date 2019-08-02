import React, {Component} from 'react';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component{
  componentWillUpdate(){
    console.log('component will updated');
  }
  // componentDidUpdate(){
  //   console.log('component did updated');
  // }
  render(){
    const ingredientSummary = Object.keys(this.props.ingredients)
      .map(igKey => {
        return <li key={igKey}><span style={{textTransform:"capitalize"}}>{igKey}</span>:{this.props.ingredients[igKey]}</li>
    })
    return (
      <>
        <h3>Your Order</h3>
        <p>A delicious burger with the following Ingredients</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Total Price:{this.props.totalPrice}</strong></p>
        <p>Continue to Checkout..</p>
        <Button btnType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
        <Button btnType="Success" clicked={this.props.purchaseContinue}>CONTINUE</Button>
      </>
    )
  }
}

export default OrderSummary;