import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe('pk_test_51Hx04QBc307QPa8J79u3z6kqwHPo16EYKJz5GpLRcAwUkJ5xo7YoCfTa9eF3TroKOHhIjv5GjgJQEKg0tUaU53sF00g8rWs99L');

export const bookTour = async tourId => {

    try {
         // 1) Get checkout session from API 
    const session = await axios(`/api/v1/booking/checkout-session/${tourId}`);

    // console.log(session);

    // 2) Create checkout form + charge credit card
        await stripe.redirectToCheckout({
            sessionId: session.data.session.id
        })


    } catch (err) {
        // console.log(err);
        showAlert('error', err);
    }
   
}