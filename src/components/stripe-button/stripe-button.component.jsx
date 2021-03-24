import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    // Stripe wants price in cents!!

    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51IYI4MChm2vJJ0h7pWil2LpeAoSTVSaX14PH5H15ZtkrH7jFhqqN9Ju4DeEmLaZpY6xrnLtENgQb0ZyftLSd6pnm00xr1XPlPL';

    // on success handler
    const onToken = token => {
        console.log(token);
        alert('Payment successful');
    }

    return (
        <StripeCheckout
            label='Pay Now'
            name='Crown Clothing Ltd.'
            billingAddresss
            shippingAddressimage='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelabel='Pay Now'
            token={ onToken }
            stripeKey={publishableKey}
        />
    );
};

export default StripeCheckoutButton;