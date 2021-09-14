import React from 'react';
import { useEffect,useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { useForm, Form } from "../components/useForm"
import Button from '../Controls/Button';
import Input from '../Controls/Input';
import './apiConfiguration.css'
import axios from 'axios';
import SimpleMenu from '../Controls/Menu';
import { GET_URL, POST_URL, PUT_URL } from '../constants/apiConfigurationConstants';


const modelObject = {
  apiEndpointId: '',
  apiEndpointUrl: '',
  region: '',
  symbols: '',
  apiHost: '',
  apiKey: '',
  frequency: 'Daily'

}
const modelObjectRef = {
  apiEndpointId: '',
  apiEndpointUrl: '',
  region: '',
  symbols: '',
  apiHost: '',
  apiKey: '',
  frequency: 'Daily'

}
function ApiConfiguration() {
  const {
    values,
    setValues,
    handleInputChange,
    resetForm
  } = useForm(modelObject);
 

  
  const handleSubmit = e => {
    e.preventDefault();
    // send request 
      // console.log(values)
      if(responseObject.apiEndpointId === ""){
        console.log("POST REQUEST SENT")
        axios.post(POST_URL,values)
        .then((response) => {console.log(response.data)})
        
      }
      else{
        console.log("PUT REQUEST SENT")
        axios.put(PUT_URL,values)
        .then((response) => {console.log(response.data)})
      }

  }

 
  const [responseObject, setResponseObject] = useState(modelObjectRef)
  useEffect(() => {
    // console.log("hit")
       fetch(GET_URL)
        .then(response => response.json())
        .then((result) => {
          setValues(result);
          setResponseObject(result)
        });
    
  },[])
  
  //console.log(requestType)
  return (
    <div class="center" >
      <h1>API Configuration</h1>
      <Form onSubmit={handleSubmit}>
        <Grid class container>
          <Grid item justifyContent="center" xs={12}>
            <Input name="apiEndpointId" label="API Endpoint Id" value={values.apiEndpointId} onChange={handleInputChange} />
            <Input name="apiEndpointUrl" label="Endpoint URL" value={values.apiEndpointUrl} onChange={handleInputChange} />
            <Input name="region" label="Region" value={values.region} onChange={handleInputChange} />
            <Input name="symbols" label="Symbols *Enter comma separated symbols" value={values.symbols} onChange={handleInputChange} />
            <Input name="apiHost" label="API Host" value={values.apiHost} onChange={handleInputChange} />
            <Input name="apiKey" label="API Key" value={values.apiKey} onChange={handleInputChange} /><br />
            <SimpleMenu menuNameValue = {values.frequency} />
            <Button type ="submit" text="Submit" onClick={handleSubmit} />
          </Grid>
        </Grid>
      </Form>
    </div>
  );
}

export default ApiConfiguration;