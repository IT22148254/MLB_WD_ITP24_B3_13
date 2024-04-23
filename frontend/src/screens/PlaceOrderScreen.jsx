import React,{ useEffect } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button,Row,Col,ListGroup,Image,Card } from 'react-bootstrap'
import CheckoutSteps from '../content/CheckoutSteps'

const PlaceOrderScreen = () => {

    const navigate = useNavigate()
    const cart = useSelector( (state) => state.cart)

    useEffect( () => {
        if(!cart.shippingAddress.address){
            navigate('/shipping')
        }else if(!cart.paymentMethod){ 
            navigate('/store/paymentt')    
        }
    },[cart.shippingAddress.address,cart.paymentMethod,navigate])

  return (
    <div>

        <CheckoutSteps step1 step2 step3 step4/>

        <Row className='mx-4'>
            <Col md={8}> Col </Col>
            <Col md={4}> Col </Col>
        </Row>

    </div>
  )
}

export default PlaceOrderScreen