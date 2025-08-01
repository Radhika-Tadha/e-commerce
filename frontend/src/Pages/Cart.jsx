import React from "react";
import { useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../redux/cartSlice";

export default function Cart() {
    const navigate = useNavigate();
    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();

    const totalPrice = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    const handleClear = () => {
        dispatch(clearCart());
    };
    const goTo = (productId) => {
        navigate(`/product/${productId}`);
    };

    return (
        <div className="container mt-4">
            <h2>Your Shopping Cart</h2>
            {cartItems.length > 0 ? (
                <>
                    {cartItems.map((item) => (
                        <div key={item._id} className="row my-3 border-bottom pb-3">
                            <div className="col-sm-2" onClick={() => goTo(item._id)} >
                                <img
                                    src={`http://localhost:8000/uploads/${item.image}`}
                                    alt={item.name}
                                    className="img-fluid"
                                    style={{ width: "100%", height: "auto", objectFit: "cover" }}
                                />
                            </div>
                            <div className="col-sm-6">
                                <h5>{item.name}</h5>
                                <p>Category: {item.category}</p>
                            </div>
                            <div className="col-sm-2">
                                <p>Qty: {item.quantity}</p>
                            </div>
                            <div className="col-sm-2">
                                <p>₹{item.price} x {item.quantity} = ₹{item.price * item.quantity}</p>
                            </div>

                        </div>
                    ))}

                    <div className="mt-4">
                        <h4>Total: ₹{totalPrice}</h4>
                        <button className="btn btn-warning" onClick={handleClear}>Clear Cart</button>
                    </div>

                </>

            ) : (
                <p className="mt-3">Your cart is empty.</p>

            )}
        </div>
    );
}
