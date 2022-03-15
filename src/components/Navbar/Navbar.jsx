//rafce
import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';

import { Link, useLocation } from 'react-router-dom';

import useStyles from './styles';

import logo from '../../assets/commerce.png';

const Navbar = ({ totalItems }) => {
  const classes = useStyles();
  const location = useLocation();

  return (
        <>
            <AppBar position='fixed' className={classes.appBar} color='inherit'>
                <Toolbar>
                    <Typography component={Link} to="/" variant='h6' className={classes.title} color='inherit'>
                        <img src={logo} alt="Commerce.js" height="25px" className={classes.image}/>
                        Commece.js
                    </Typography>
                    <div className={classes.grow}></div>
                    {location.pathname === '/' ? (
                    <div className={classes.button}>
                        <IconButton component={Link} to="/Cart" aria-label="Show cart items" color='inherit'>
                            <Badge badgeContent={totalItems} color='secondary'>
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                    </div>):null
                    }
                </Toolbar>
            </AppBar>
        </>
  );
};

export default Navbar;
