import React from 'react';
import Grid from '@material-ui/core/Grid';
/*import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';*/

import '../css/AddressForm.css'
import { ProductConsumer } from '../Context';

export default function PaymentForm() {
  return (
    /*<React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField required id="cardName" label="Name on card" fullWidth autoComplete="cc-name" />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField required id="expDate" label="Expiry date" fullWidth autoComplete="cc-exp" />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid>
      </Grid>
    </React.Fragment>*/


    <ProductConsumer>
            {
                value => {
                    const{theme}=value
                    return(
                        <form>
                            <div>
                                <div className="address-section">
                                    <span>Payment method</span>

                                    <div className="firstt">
                                      <div className="labell">
                                          <p>Name on card:</p>
                                          <Grid>
                                          <input 
                                            required
                                            type="text"
                                            className="form-control"
                                            placeholder="Name on card" />
                                            </Grid>
                                      </div>
                                      <div className="labell">
                                          <p>Card number:</p>
                                          <Grid>
                                          <input
                                            required
                                            type="text"
                                            className="form-control"
                                            placeholder="Card number"
                                          />
                                          </Grid>
                                      </div>
                                    </div>

                                    <div className="secondd">
                                      <div className="labell">
                                          <p>Expiry:</p>
                                          <Grid>
                                          <input 
                                            required
                                            type="text"
                                            className="form-control"
                                            placeholder="Expiry" />
                                            </Grid>
                                      </div>
                                      <div className="labell">
                                          <p>Cvv:</p>
                                          <Grid>
                                          <input
                                            required
                                            type="text"
                                            className="form-control"
                                            placeholder="CVV"
                                          />
                                          </Grid>
                                      </div>
                                    </div>
                                    
                                    <form>
                                      <input type="checkbox"/>
                                        <p>Remember credit card details for next time</p>
                                    </form>
                                </div>
                            </div>
                        </form>
                    )
                }
            }
        </ProductConsumer>

  );
}