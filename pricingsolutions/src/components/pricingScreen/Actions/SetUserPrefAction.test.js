import renderer from 'react-test-renderer'
import './SetUserPrefAction'
import { setPreference, setPreferenceError } from './SetUserPrefAction';
import { SET_PREF, API, API_ERROR } from './types';


test("Set preference", () => {
    let preference = setPreference("abc");
    expect(preference).toStrictEqual({"type": SET_PREF, "payload": "abc"})
});


test("Error in set preference", () => {
    let errorInSetPreference = setPreferenceError("abc");
    expect(errorInSetPreference).toStrictEqual({"type":API_ERROR,"payload":SET_PREF})
});

