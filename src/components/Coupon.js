import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { applyCoupon, removeCoupon } from '../redux/actions';

function Coupon() {
  const dispatch = useDispatch();
  const [couponCode, setCouponCode] = useState('');
  const coupon = useSelector(state => state.coupon);
  const discount = useSelector(state => state.discount);

  const availableCoupons = [
    { code: 'SAVE10', discount: 10 },
    { code: 'SAVE20', discount: 20 },
    { code: 'SAVE50', discount: 50 },
    { code: 'DISCOUNT20', discount: 20 },
    { code: 'WELCOME10', discount: 10 }
  ];

  const handleApplyCoupon = () => {
    const trimmedCode = couponCode.trim().toUpperCase();
    const validCoupon = availableCoupons.find(c => c.code === trimmedCode);
    
    if (validCoupon) {
      dispatch(applyCoupon(trimmedCode));
    } else {
      alert('Invalid coupon code. Please try again.');
    }
  };

  const handleRemoveCoupon = () => {
    dispatch(removeCoupon());
    setCouponCode('');
  };

  return (
    <div className="coupon">
      <h2>🏷️ Discount Coupons</h2>
      
      <div className="coupon-input">
        <input
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="Enter coupon code"
          className="coupon-input-field"
        />
        <button 
          className="btn-apply"
          onClick={handleApplyCoupon}
          disabled={!couponCode.trim() || !!coupon}
        >
          Apply Coupon
        </button>
        {coupon && (
          <button 
            className="btn-remove"
            onClick={handleRemoveCoupon}
          >
            Remove Coupon
          </button>
        )}
      </div>

      {coupon && (
        <div className="active-coupon">
          <p>✅ Coupon <strong>{coupon}</strong> applied!</p>
          <p>You get <strong>{discount}%</strong> discount</p>
        </div>
      )}

      <div className="available-coupons">
        <h3>Available Coupons</h3>
        <div className="coupon-list">
          {availableCoupons.map((c, index) => (
            <div key={index} className="coupon-item">
              <span className="coupon-code">{c.code}</span>
              <span className="coupon-discount">{c.discount}% OFF</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Coupon;
