import React from 'react';
import Grid from '@material-ui/core/Grid';
/*import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';*/

import '../css/AddressForm.css'
import { ProductConsumer } from '../Context';


export default function AddressForm() {
  return (
    /*<React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <input
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <input
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField id="state" name="state" label="State/Province/Region" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
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
                                <div className={theme ? "theme-address-section" : "address-section"}>
                                    <span>Shipping address</span>

                                    <div className="firstt">
                                      <div className="labell">
                                          <p>First name:</p>
                                          <Grid>
                                          <input 
                                            required
                                            type="text"
                                            className="form-control"
                                            placeholder="First Name" />
                                            </Grid>
                                      </div>
                                      <div className="labell">
                                          <p>Last Name:</p>
                                          <Grid>
                                          <input
                                            required
                                            type="text"
                                            className="form-control"
                                            placeholder="Last Name"
                                          />
                                          </Grid>
                                      </div>
                                    </div>

                                    <div className="address-input">
                                      <div className="labell">
                                        <p>Address line 1</p>
                                        <Grid>
                                          <input
                                            required
                                            type="text"
                                            className="form-control"
                                            placeholder="Address line"
                                          />
                                          </Grid>
                                      </div>
                                      <div className="labell">
                                        <p>Address line 1</p>
                                        <Grid>
                                          <input
                                            required
                                            type="text"
                                            className="form-control"
                                            placeholder="Address line"
                                          />
                                          </Grid>
                                      </div>
                                    </div>

                                    <div className="secondd">
                                      <div className="labell">
                                          <p>City:</p>
                                          <Grid>
                                          <input 
                                            required
                                            type="text"
                                            className="form-control"
                                            placeholder="City" />
                                            </Grid>
                                      </div>
                                      <div className="labell">
                                          <p>State/province/region:</p>
                                          <Grid>
                                          <input
                                            required
                                            type="text"
                                            className="form-control"
                                            placeholder="State/province/region"
                                          />
                                          </Grid>
                                      </div>
                                    </div>

                                    <div className="thirdd">
                                      <div className="labell">
                                          <p>Zip/postal code:</p>
                                          <Grid>
                                          <input 
                                            required
                                            type="text"
                                            className="form-control"
                                            placeholder="Zip/postal code" />
                                            </Grid>
                                      </div>
                                      <div className="labell">
                                          <p>Country:</p>
                                          <Grid>
                                          <input
                                            required
                                            type="text"
                                            className="form-control"
                                            placeholder="Country"
                                          />
                                          </Grid>
                                      </div>
                                    </div>
                                    
                                    <form>
                                      <input type="checkbox"/>
                                        <p>Use this address for payment details</p>
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