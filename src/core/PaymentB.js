import React, {useState, useEffect} from "react"
import {Redirect, ReDirect} from "react-router-dom"
import {cartEmpty} from "./helper/cartHelper"
import {getmeToken, processPayment} from "./helper/paymentHelper"
import {createOrder} from "./helper/orderHelper"
import {isAuthenticated, signout} from "../auth/helper"

import DropIn from "braintree-web-drop-in-react"

const PaymentB = (
    products,
    reload = undefined,
    setReload = f => f,
) => {

    const [info, setInfo] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: "",
        instance: {}
    })

    const userId = isAuthenticated && isAuthenticated().user.id;
    const token = isAuthenticated && isAuthenticated().token;

    const getToken = (userId, token) => {
        getmeToken(userId, token)
        .then(info => {
            if(info.error){
                setInfo({
                    ...info,
                    error: info.error
                })
                signout(() => {
                    return <Redirect to="/" />
                });
            } else{
                const clientToken = info.clientToken;
                setInfo({clientToken})
            }
        })
    }

    useEffect(() => {
        getToken(userId, token)
        
    }, [])

    const getAmount = () => {
        let amount = 0;
        products.map((p) => {
          amount = amount + parseInt(p.price);
        });
        return amount;
      };

    const ShowbtnDropIn = () =>{
        return(
            <div>
                {
                    info.clientToken !== null && products.length > 0 ?
                    (
                        <div>
                            <DropIn
                             options={{authorization: info.clientToken}}
                             onInstance={instance => (info.instance = instance)}
                             >
                            </DropIn>
                            <button className="btn btn-block btn-success">Buy Now</button>
                            
                        </div>
                    ):(
                        <h3>Please login first!</h3>
                    )
                }
            </div>
        )
    }

    return(
        <div>
            <h3>Your bill is {getAmount()}</h3>
            {ShowbtnDropIn()}
        </div>
    )
}

export default PaymentB;