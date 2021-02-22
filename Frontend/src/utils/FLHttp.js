import Constants from "./Constants";
import Libs from "./Libs";
import qs from 'qs';
import axios from 'axios';
import Auth from './Auth';
//import envConfig from 'EnvConfig.js'
export default class FLHttp {
    constructor(showProcess) {
        this.showProcess = showProcess || false;
    }

    initialize(url, data, method, contentType) {
        var self = this;
        let customerType = !Libs.isBlank(data.customer_type) ? data.customer_type: null;
        // console.log(customerType); return;
        // Setting URL and headers for request
        var json = null;
        if (method === Constants.METHOD.get) {
            if (typeof data != undefined && data != null) {
                json = qs.stringify(data);
            }
        } else {
            if (typeof data != undefined && data != null) {
                json = JSON.stringify(data);
            }
        }
        const protocol = location.protocol;
        const API_HOST =  process.api_host || Constants.API_HOST;
        const API_HTTP_PORT =  process.api_http_port || Constants.API_HTTP_PORT;
        const API_HTTPS_PORT =  process.api_https_port || Constants.API_HTTPS_PORT;
        const API_CONTEXT = Constants.API_CONTEXT;

        let baseUrl = protocol + "//" + API_HOST;

        if (protocol == 'https:') {
            if(!Libs.isBlank(API_HTTPS_PORT)){
                baseUrl = baseUrl + ":" + API_HTTPS_PORT
            }
        } else {
            if(!Libs.isBlank(API_HTTP_PORT)){
                baseUrl = baseUrl + ":" + API_HTTP_PORT
            }
        }

        

        if(!Libs.isBlank(API_CONTEXT)){
            baseUrl = baseUrl + "/"+ API_CONTEXT;
        }
        baseUrl = baseUrl + "/" + url

        let isGetToken = false;
        if(baseUrl.indexOf('oauth/token')>=0){
            isGetToken = true;
        }

        // set header
        
        let header = this.setHeader(method, contentType, isGetToken, 'password', 'backoffice', customerType);

        let idShowProcess = 0;
        if (this.showProcess == true) {
            idShowProcess = this.showProcessLoading();
        }
        // Return new promise 
        return new Promise(function (resolve, reject) {
            if(!Libs.isBlank(customerType) && customerType == Constants.CUSTOMER_TYPE.EMPLOYEE){
                if (!Auth.checkIsLoginAdmin()) {
                    if (window.location.pathname != Constants.FRONT_SITE_URL.ADMIN_LOGIN) {
                        self.hideProcessLoading(idShowProcess);
                        window.location.href = Constants.FRONT_SITE_URL.ADMIN_LOGIN;
                    }
                }
            } else {
                if (!Auth.checkIsLogin()) {
                    if (window.location.pathname != Constants.FRONT_SITE_URL.LOGIN) {
                        self.hideProcessLoading(idShowProcess);
                        window.location.href = Constants.FRONT_SITE_URL.LOGIN;
                    }
                }
            }
            

            // Do async job
            axios.post(baseUrl, json, header)
                .then(function (response) {
                    self.hideProcessLoading(idShowProcess);
                    resolve(response);
                })
                .catch(function (error) {
                    self.hideProcessLoading(idShowProcess);
                    if (error.response && error.response.status == 401) {
                        if (window.location.pathname == Constants.FRONT_SITE_URL.LOGIN) {
                            resolve(error.response);
                        }
                        else
                        {
                            window.location.href = Constants.FRONT_SITE_URL.LOGIN;
                        }
                        return;
                    }else if (error.response && error.response.status == 400) 
                    {
                        resolve(error.response);
                        return;
                    }
                    console.log(error);
                    reject(error);
                });
        })
    }

    initializeGet(url, data, method, contentType) {
        var self = this;
        // Setting URL and headers for request
        var json = null;
        if (method === Constants.METHOD.get) {
            if (typeof data !== undefined && data !== null) {
                json = qs.stringify(data);
            }
        } else {
            if (typeof data !== undefined && data !== null) {
                json = JSON.stringify(data);
            }
        }

        const protocol = location.protocol;
        const API_HOST =  process.api_host || Constants.API_HOST;
        const API_HTTP_PORT =  process.api_http_port || Constants.API_HTTP_PORT;
        const API_HTTPS_PORT =  process.api_https_port || Constants.API_HTTPS_PORT;
        const API_CONTEXT = Constants.API_CONTEXT;

        let baseUrl = protocol + "//" + API_HOST;

        if (protocol == 'https:') {
            if(!Libs.isBlank(API_HTTPS_PORT)){
                baseUrl = baseUrl + ":" + API_HTTPS_PORT
            }
        } else {
            if(!Libs.isBlank(API_HTTP_PORT)){
                baseUrl = baseUrl + ":" + API_HTTP_PORT
            }
        }

        if(!Libs.isBlank(API_CONTEXT)){
            baseUrl = baseUrl + "/"+ API_CONTEXT;
        }
        baseUrl = baseUrl + "/" + url

        let isGetToken = false;
        if(url.indexOf('oauth/token')>=0){
            isGetToken = true;
        }
        // set header
        let header = this.setHeader(method, contentType, isGetToken, 'password', 'backoffice');

        let idShowProcess = 0;
        if (this.showProcess == true) {
            idShowProcess = this.showProcessLoading();
        }
        // Return new promise 
        return new Promise(function (resolve, reject) {
            if (!Auth.checkIsLogin()) {
                if (window.location.pathname != Constants.FRONT_SITE_URL.LOGIN) {
                    self.hideProcessLoading(idShowProcess);
                    window.location.href = Constants.FRONT_SITE_URL.LOGIN;
                }
            }
            // Do async job
            axios.get(baseUrl, json, header)
                .then(function (response) {
                    self.hideProcessLoading(idShowProcess);
                    resolve(response);
                })
                .catch(function (error) {
                    self.hideProcessLoading(idShowProcess);
                    if (error.response && error.response.status == 401) {
                        if (window.location.pathname == Constants.FRONT_SITE_URL.LOGIN) {
                            resolve(error.response);
                        }
                        else
                        {
                            window.location.href = Constants.FRONT_SITE_URL.LOGIN;
                        }
                        return;
                    }else if (error.response && error.response.status == 400) 
                    {
                        resolve(error.response);
                        return;
                    }
                    console.log(error);
                    reject(error);
                });
        })
    }

    post(url, params, callBack) {
        let self = this;
        let info = localStorage.getItem(Constants.COMMON.ADMIN_INFO);
        if (!Libs.isBlank(info)) {
            let userInfo = JSON.parse(Libs.base64Decrypt(info));
            params.customer_type = userInfo.customer_type
        }

        var initializePromise = this.initialize(url, params, Constants.METHOD.POST, Constants.CONTENT_TYPE.json);
        initializePromise.then(function (result) {
            if (result.status != 200 && result.status != 400) {
                if(result.status != 401)
                {
                    self.showError(result.status);
                }
                callBack(false, {});
                return;
            }
            let data = result.data;
            if (data != null) {
                callBack(true, data);
                return;
            } else {
                self.showError(Constants.ERROR_CODE.CODE_01);
                callBack(false, {});
            }
        }, function (status, err) {
            self.showError(status);
            callBack(false, err);
        });
    }
    
    postPrint(url, params) {
        let self = this;
        var initializePromise = this.initialize(url, params, Constants.METHOD.POSTPDF, Constants.CONTENT_TYPE.json);
        initializePromise.then(function (result) {
            if (result.status != 200) {
                self.showError(result.status);
                return;
            }
            //callBack(result.status, result.data);
            let blobURL = window.URL.createObjectURL(result.data, { type: 'application/pdf' });
            // console.log(blobURL);
            self.print_pdf(blobURL)
        }, function (status, err) {
            self.showError(err);
        });
    }

    postMultipart(url, params, callBack) {
        let self = this;
        var initializePromise = this.initialize(url, params, Constants.METHOD.POST, Constants.CONTENT_TYPE.multipart);
        initializePromise.then(function (result) {
            if (result.status != 200) {
                self.showError(result.status);
                callBack(false, {});
                return;
            }
            let data = result.data;
            if (data != null) {
                callBack(true, data);
                return;
            } else {
                self.showError(Constants.ERROR_CODE.CODE_01);
                callBack(false, {});
            }
        }, function (status, err) {
            //self.showError(status);
            callBack(false, err);
        });
    }

    async postSynch(url, params) {
        var initializePromise = await this.initialize(url, params, Constants.METHOD.POST, Constants.CONTENT_TYPE.json);
        return initializePromise.data;
    }

    get(url, params, callBack) {
        
        var initializePromise = this.initializeGet(url, params, Constants.METHOD.GET, Constants.CONTENT_TYPE.json);
        initializePromise.then(function (result) {
            callBack(result.status, result.data);
        }, function (status, err) {
            callBack(false, err);
        });
    }
    async getSynch(url, params) {
        
        var initializePromise = await this.initializeGet(url, params, Constants.METHOD.GET, Constants.CONTENT_TYPE.json);
        return initializePromise.data;
    }
    setHeader(method, contentType, isLogin = false, grantType, clientId, customerType) {
        var lang = "en";
        let info = localStorage.getItem(Constants.COMMON.USER_INFO);
        if (!Libs.isBlank(info)) {
            try {
                let userInfo = JSON.parse(Libs.base64Decrypt(info));
                lang = userInfo.lang;
            } catch (e) {
                lang = "en";
            }
        }

        let token = '';
        if(isLogin){
            token = 'Basic ' + Libs.base64Encrypt("backoffice:secret");
        }else{
           token = "Bearer "+localStorage.getItem(customerType == Constants.CUSTOMER_TYPE.EMPLOYEE ? Constants.COMMON.ADMIN_TOKEN: Constants.COMMON.TOKEN); 
        }

        let headers = {
            'grant_type' : grantType,
            'client_id' : clientId,
            'Content-Type': contentType,
            'customer_type': customerType,
            'x-access-token': localStorage.getItem('phoenixrs-access-token'),
            'lang': lang
        }

        let ar = window.location.pathname.split("/");
		let path = ar.length>1?ar[1]:"";
		let isCheck = true;
		if(path!='' ){
			isCheck = Constants.PUBLIC_PAGE.indexOf(path)<0
		}
		if(isCheck || path =='login' ){
			headers.Authorization = token;
        }
        
        let header = { headers: headers,timeout:180000 };
        if (method == Constants.METHOD.POSTEXCEL) {
            header['responseType'] = 'blob';
            headers['Accept'] = 'application/vnd.ms-excel';
            header.headers = headers;
        }
        if (method == Constants.METHOD.POSTPDF) {
            header['responseType'] = 'blob';
            headers['Accept'] = 'application/pdf';
            header.headers = headers;
        }
        return header;
    }
    /**
     * show process loading
     */
    showProcessLoading() {
        var progress_id = "disabled_div" + globalIdProgress;
        var div = document.createElement("div");
        div.className = 'disabled_div';
        div.id = progress_id;
        div.style.position = 'fixed';
        div.style.width = '100%';
        div.style.height = '100%';
        div.style.zIndex = 2000;
        div.style.left = '0px';
        div.style.top = '0px';
        var divInner = document.createElement("div");
        divInner.style.width = '66px';
        divInner.style.height = '66px';
        divInner.style.display = 'block';
        divInner.style.position = 'fixed';
        divInner.style.top = '50%';
        divInner.style.left = '50%';
        divInner.style.marginLeft = '-33px';
        divInner.style.marginTop = '-33px';
        divInner.style.zIndex = 1500;
        var img = document.createElement("img");
        img.src = "/assets/images/loading.gif";
        divInner.appendChild(img);
        div.appendChild(divInner);
        var body = document.getElementById("root");
        // body.append(div);
        body.appendChild(div);
        return globalIdProgress;
    };
    /**
     * hide process loading
     * @param {string} id 
     */
    hideProcessLoading(id) {
        if (id != null) {
            $('#' + "disabled_div" + id).remove();
        } else {
            $('.' + "disabled_div").remove();
        }
    };
    checkIsLogin() {
        // This code is not active
        // var token = localStorage.getItem(Constants.TOKEN) || null;
        // if (!token) {
        // 	window.location.href = Constants.FRONT_SITE_URL.LOGIN;
        // 	return false;
        // }
        return true;
    }

    /**
     * show error popup with style modal bootstrap
     */
    showError(message_code) {
        var message = this.getErrorMessage(message_code);
        this.showErrorMessage(message);
    };
    getErrorMessage(code) {
        var msg = "";
        switch (code) {
            case 201:
                msg = trans.translate("message.msg_err_201");
                break;
            case 203:
                msg = trans.translate("message.msg_err_203");
                break;
            case 204:
                msg = trans.translate("message.msg_err_204");
                break;
            case 205:
                msg = trans.translate("message.msg_err_205");
                break;
            case 206:
                msg = trans.translate("message.msg_err_206");
                break;
            case 500:
                msg = trans.translate("message.msg_err_500");
                break;
            case 501:
                msg = trans.translate("message.msg_err_501");
                break;
            case 502:
                msg = trans.translate("message.msg_err_502");
                break;
            case 503:
                msg = trans.translate("message.msg_err_503");
                break;
            case 504:
                msg = trans.translate("message.msg_err_504");
                break;
            case 505:
                msg = trans.translate("message.msg_err_505");
                break;
            default: msg = code;
                break;
        }
        return msg;
    }
    printPreview(url) {
        var urlPrintPreview = "printPreview.htm?url=" + URLEncoder.encode(url);
        var iframe = "<html><head><style>body{margin:0;padding:0;}</style></head><body><iframe id=\"framePrintId\" name=\"framePrintId\" onload=\"this.contentWindow.focus();\" " +
            "frameborder=\"0\"  style=\"width: 100%; height: 100%;  margin: 0px 0px 0px 0px;\" src=\"" + urlPrintPreview + "\"></iframe></body></html>";
        return iframe;
    }
    print_pdf(url) {

        /*In PDF*/
        var popError = document.querySelector('#showPrint');
        if (popError != null && popError != 'undefined') {
            return;
        }

        var close = () => {
            popError = document.querySelector('#showPrint');
            popError.remove();

        }
        var div = document.createElement("div");
        div.id = "showPrint";
        div.className = "modal fade show";
        div.role = "dialog"
        div.ariaHidden = "false"
        div.tabIndex = "-1"
        div.ariaLabelledby = "contained-modal-title"
        div.style.cssText = "display: block;"
        var modalDialog = document.createElement("div");
        modalDialog.className = "modal-dialog  modal-xl modal-dialog-scrollable modal-printf";
        modalDialog.role = "document";
        var modalContent = document.createElement("div");
        modalContent.className = "modal-content";

        var modalHeader = document.createElement("div");
        modalHeader.className = "modal-header";

        var printBtn = document.createElement("button");
        printBtn.type = "button";
        printBtn.className = "btn btn-main-color";
        printBtn.dataDismiss = "modal";
        printBtn.ariaHidden = "true";
        printBtn.innerHTML = "<i class='fa fa-print'>In</i>";
        // closeBt.style.cssText = "margin-top: -10px;";
        // closeBt.innerText = "x";
        printBtn.onclick = function () { callPrint() };
        modalHeader.append(printBtn);
        // modalContent.append(modalHeader);
        // var pdf = '<object	data="' + url + '#toolbar=1&amp;navpanes=0&amp;scrollbar=1&amp;page=1&amp;view=FitH" type="application/pdf" width="100%" height="100%">'
        // var pdf = '<embed src="' + url + '" type="application/pdf" class="pdf-view"/>'
       
        var pdf_url = document.location.origin;
        pdf_url += '/assets/vendor/pdfjs/web/viewer.html?file=';
        pdf_url = pdf_url + url;
        var pdf = '<iframe src="' + pdf_url + '" style="width: 100%;position: absolute;height: 100%;box-sizing: border-box;left: 0%;top: 0%;" frameborder="0" scrolling="no"></iframe>'
        var modalBody = document.createElement("div");
        modalBody.className = "modal-body";
        modalBody.innerHTML = pdf;
        // modalBody.append();
        modalContent.append(modalBody);
        modalDialog.append(modalContent);
        div.append(modalDialog);
        var body = document.getElementById("root");
        body.append(div);
    }

    /**
     * @description Add text error message when not calling server or api error
     * @author LuyenNguyen 2018-11-07
     */
    showErrorMessage(msg) {
        $('body').addClass('system-error');
        var html = '<div class="notification-error">';
        html += '<p>';
        html += msg;
        html += '<a class="close-notification-error fa fa-times" href="javascript::void(0)">&nbsp;</a>';
        html += '</p>'
        html += '</div>';
        if (!$('.notification-error').length) {
            $('#root').prepend(html);
        }
        if ($('.close-notification-error').length) {
            $('.close-notification-error').on('click', function () {
                if ($('.system-error').length) {
                    $('body').removeClass('system-error');
                }
                if ($('.notification-error').length) {
                    $('.notification-error').remove();
                }
            });
        }
        setTimeout(function () {
            if ($('.system-error').length) {
                $('body').removeClass('system-error');
            }
            if ($('.notification-error').length) {
                $('.notification-error').remove();
            }
        }, Constants.ERROR_MSG_TIMEOUT);
    }
}

