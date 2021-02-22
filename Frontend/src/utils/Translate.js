import T from 'i18n-react';
import vi from '../lang/vi.json';
import en from '../lang/en.json';
import Constants from './Constants';
import Libs from './Libs'
export default class Translate {
    constructor() {
        let lang = "en";
        let info = localStorage.getItem(Constants.COMMON.USER_INFO);
        if(!Libs.isBlank(info)){
            try{
                let userInfo = JSON.parse(Libs.base64Decrypt(info));
                // console.log('user info: ', userInfo);
                lang = userInfo.lang;
            }catch(e){
                lang = "en";
            }
        }
        // let accesstoken = localStorage.getItem(Constants.COMMON.TOKEN);
        // let info = localStorage.getItem(Constants.COMMON.USER_INFO);
        // let jsonInfo = Libs.base64Decrypt(info);
        // console.log(jsonInfo);
        // let userInfo = JSON.parse(jsonInfo);
        // console.log(userInfo.user_name,userInfo.lang, userInfo.headquarter_code);

        var userLang = lang || navigator.language || navigator.userLanguage;
        switch (userLang) {
            case 'vi':
                this.langs = vi;
                break;
            case 'en':
            case 'en-US':
                this.langs = en;
                break;
            default:
                this.langs = vi;
                break;
        }
        T.setTexts(this.langs);
    }
    translate(key) {
        return T.translate(key);
    }

    translateKeys(...keys) {
        let result = "";
        keys.forEach(key => {
            if(!Libs.isBlank(result)){
                result+=" "
            }
            result += T.translate(key);
        });
        return result;
    }
}