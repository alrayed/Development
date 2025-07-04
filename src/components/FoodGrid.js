import React from 'react';

const foods = [
  { id: 1, name: 'Burger', img: '/assist/burger.png', price: 5 },
  { id: 2, name: 'Pizza', img: '/assist/pizza.png', price: 8 },
  { id: 3, name: 'Fries', img: '/assist/fries.png', price: 3 },
  { id: 4, name: 'Sandwich', img: '/assist/sandwich.png', price: 4 },
  { id: 5, name: 'Taco', img: '/assist/taco.png', price: 6 },
  { id: 6, name: 'Salad', img: '/assist/salad.png', price: 4 },
  { id: 7, name: 'Hotdog', img: '/assist/hotdog.png', price: 5 },
  { id: 8, name: 'Nuggets', img: '/assist/nuggets.png', price: 4 },
  { id: 9, name: 'Wrap', img: '/assist/wrap.png', price: 5 },
  { id: 10, name: 'Steak', img: '/assist/steak.png', price: 12 },
  { id: 11, name: 'Soup', img: '/assist/soup.png', price: 4 },
  { id: 12, name: 'Pasta', img: '/assist/pasta.png', price: 7 },
  { id: 13, name: 'Rice Bowl', img: '/assist/ricebowl.png', price: 6 },
  { id: 14, name: 'Ice Cream', img: '/assist/icecream.png', price: 3 },
  { id: 15, name: 'Cake', img: '/assist/cake.png', price: 4 },
  { id: 16, name: 'Juice', img: '/assist/juice.png', price: 2 },
];

const FoodGrid = ({ onAdd }) => (
  <div className="food-grid">
    {foods.map(food => (
      <div className="food-card" key={food.id}>
        <img src={food.img} alt={food.name} className="food-img" />
        <div>{food.name}</div>
        <div>${food.price}</div>
        <button onClick={() => onAdd(food)}>Add to Cart</button>
      </div>
    ))}
  </div>
);

export default FoodGrid;