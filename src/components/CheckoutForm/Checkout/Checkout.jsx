import React, {useState, useEffect} from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import {commerce} from '../../../lib/commerce'
import useStyles from './styles';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';

const steps = ['Shipping address', 'Payment details']

const Checkout = ({cart, order, onCaptureChekout, error }) => {

    const classes = useStyles()
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [isFinished, setIsFinished] = useState(false);
    const [shippingData, setShippingData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if(cart.id){
        const generateToken = async () => {
            try{
                const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'});

                setCheckoutToken(token);
            }catch(error){
                if (activeStep !== steps.length) navigate('/');
            }
        }

        generateToken();
    };
    }, [cart]);

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const next = (data) => {
        setShippingData(data);

        nextStep();
    }

    const timeout = () => {
        setTimeout(() => {
            setIsFinished(true);
        }, 3000)
    }

    let Confirmation = () => order.custumer ?  (
        <>
            <div>
                <Typography variant='h5'>Thank you for you purchase, {order.custumer.fistname} {order.custumer.lastnasme}</Typography>
                <Divider className={classes.divider}/>
                <Typography variant='subtitle2'>Order ref: {order.custumer_reference}</Typography>
            </div> 
            <br/>
            <Button component={Link} to="/" variant='outlined' type='button'>Back to home</Button>   
        </>
    ) : isFinished ? (
        <div>
            <Typography variant='h5'>Thank you for you purchase</Typography>
            <Divider className={classes.divider}/>
        </div> 
    ) : (
        <div className={classes.spinner}>
            <CircularProgress />
        </div>
    );

    if(error){
        <>
            <Typography variant='h5'>Error: {error}</Typography>
            <br/>
            <Button component={Link} to="/" variant='outlined' type='button'>Back to home</Button> 
        </>
    }

    const Form = () => activeStep === 0
    ? <AddressForm checkoutToken={checkoutToken} next={next}/>
    : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} backStep={backStep} nextStep={nextStep} onCaptureChekout={onCaptureChekout} timeout={timeout}/>


    return (
        <>
        <CssBaseline/>
            <div className={classes.toolbar} />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align='center'>Checkout</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step)=>(
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? <Confirmation/> : checkoutToken && <Form/>}
                </Paper>
            </main>
        </>
    );
}

export default Checkout;