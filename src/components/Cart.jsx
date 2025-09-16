import React from "react";

export default function Cart({ items, onPlaceOrder, onUpdateQty }) {
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <div className="cart">
      <h3>Cart</h3>
      <div className="cart-items">
        {items.length === 0 && <p>Cart is empty</p>}
        {items.map((i) => (
          <div key={i.id} className="cart-item">
            <span className="cart-item-name">{i.name}</span>
            <div className="qty-controls">
              <button onClick={() => onUpdateQty(i.id, -1)}>-</button>
              <span>{i.qty}</span>
              <button onClick={() => onUpdateQty(i.id, 1)}>+</button>
            </div>
            <span>${i.price * i.qty}</span>
          </div>
        ))}
      </div>
      <div className="cart-footer">
        <div className="total">Total: ${total}</div>
        <button onClick={onPlaceOrder} disabled={!items.length}>
          Place Order
        </button>
      </div>
    </div>
  );
}
