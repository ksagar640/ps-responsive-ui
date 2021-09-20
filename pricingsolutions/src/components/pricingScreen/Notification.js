import {  toast } from 'react-toastify';

export const  ApplySuccessNotify = () => toast.success("Preferences Applied");
export const  ApplyErrorNotify = () => toast.error("Error in Applying Preferences");
export const  SaveSuccessNotify = () => toast.success("Preferences Saved");
export const  SaveErrorNotify = () => toast.error("Error in Saving Preferences ");  
