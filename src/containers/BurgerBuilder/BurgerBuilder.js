import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5, 
  cheese: 0.2,
  meat: 1.1,
  bacon:0.6
}
class BuilderBurger extends Component{
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount(){
    //add firebcase datbase url
    axios.get('https://xxxxxxx.firebaseio.com/ingredients.json')
      .then(response =>{
        console.log(response);
        this.setState({ingredients:response.data});
      })
      .catch(error=> {
        this.setState({error:true});
      })
  }
  purchaseHandler =() =>{
    this.setState({purchasing:true});
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey]
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0)
      this.setState({purchasable:sum>0})
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type]=updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({totalPrice: newPrice, ingredients:updatedIngredients});
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler =(type) => {
    const oldCount = this.state.ingredients[type];
    if(oldCount <= 0) return;
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type]=updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({totalPrice:newPrice, ingredients:updatedIngredients}) 
    this.updatePurchaseState(updatedIngredients);
  } 

  purchaseCancelHandler =() =>{
    this.setState({purchasing:false});
  }

  purchaseContinueHandler =() =>{
    //alert('You Continue');
    this.setState({loading:true});
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer:{
        name:'Vivek Lakhanpal',
        address:{
          street:'acbd',
          zipCode:'a9a3ld',
          country:'Canada'
        },
        email:'test@test.com'
      },
      deliveryMethod: 'express'
    }
    axios.post('/orders.json', order)
      .then(response =>{
        console.log(response);
        this.setState({loading:false, purchasing:false});
      })
      .catch(error =>{
        console.log(error);
        this.setState({loading:false, purchasing: false});
      })
  }

  render () {
    const disabledInfo = {
      ...this.state.ingredients
    }
    for(let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null;

    let burger = this.state.error? <p>Ingredients can't be loaded!!!</p>:<Spinner />
    
    if(this.state.ingredients){
      burger =(
        <>
          <Burger ingredients={this.state.ingredients}/>
          <BuildControls 
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
            price={this.state.totalPrice}/>
        </>
      );
      orderSummary = <OrderSummary 
        ingredients={this.state.ingredients}
        totalPrice={(this.state.totalPrice).toFixed(2)}
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinue={this.purchaseContinueHandler}
      />;
    }
    if(this.state.loading){
      orderSummary=<Spinner />;
    }
    
    return (
      <>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </>
    )
  }
}

export default withErrorHandler(BuilderBurger, axios);