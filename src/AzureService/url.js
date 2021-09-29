const currentEnvironment = process.env.REACT_APP_ENVIRONMENT; 

// export const fetchMarketPriceUrl = "https://apim-price-intg-02.azure-api.net/api/pricingView/pricingdata-get";
export const fetchMarketPriceUrl = "https://func-price-frontapi-"+currentEnvironment+"-wus-01.azurewebsites.net/api/pricingdata-get?code=M0BTqhV8btLr34dDJBRqDIUlyscLkvGX2spRzA1YGB233aT5j0eFaQ==&clientId=apim-apim-price-intg-01";
export const fetchUserPreferenceUrl = "https://apim-price-"+currentEnvironment+"-02.azure-api.net/api/userPreference/preference-get";
export const addUserPreferenceUrl = "https://apim-price-intg-02.azure-api.net/api/userPreference/preference-save";
export const updateUserPreferenceeUrl = "https://apim-price-intg-02.azure-api.net/api/userPreference/preference-update";
export const mockLoginApiEndPoint = `https://func-price-frontapi-intg-01.azurewebsites.net/api/user-get?code=wNq9pj4yR8VI2nS6phAQSQKyWOHioaNpfW2HzIuztExqyjBkVXGVgA==&clientId=apim-apim-price-intg-01==&email=`;
export const loginApiEndPoint = `/userManagement/user-authorization-get?email=`
export const baseURL = "https://apim-price-intg-02.azure-api.net";
