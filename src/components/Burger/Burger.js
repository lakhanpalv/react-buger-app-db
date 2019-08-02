import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
  // const transformedIngredients = Object.keys(props.ingredients)
  // .map(igKey => {
  //   retrun [...Array(props.ingredients[igKey])].map((_, i) => {
  //     return <BurgerIngredient key={igKey + i} type={igKey} />;
  //   });
  // });
  const {ingredients} = props;
  let ingredientsArray = [];
  Object.keys(ingredients).forEach(ingKey =>{
    for(let i=0;i<ingredients[ingKey]; i++){
      ingredientsArray.push(<BurgerIngredient key={ingKey + i} type={ingKey}/>);
    }
  })
  //console.log(ingredientsArray);
  // const ingredientArr = Object.keys(props.ingredients);
  // const realIngredients = [];
  // ingredientArr.forEach(ingr=>{
  //   for(let i=0; i < props.ingredients[ingr]; i++){
  //     realIngredients.push(ingr)
  //   }
  // })
  //{
  //   realIngredients.map((ingr,i)=> <BurgerIngredient type={ingr} key={i} /> )
  // }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top"/>
      {(ingredientsArray.length !== 0)?ingredientsArray:<p>Please start adding ingredients!</p>}
      <BurgerIngredient type="bread-bottom"/>
    </div>
  );
};

export default burger;