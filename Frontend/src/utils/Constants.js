const Constants = {
    "USER_STATIC_KEY" : "6UTcKodwS4mSBIZgI9pC11vLfcTobNkz5ivqVVGn0PiC44Hev9w3vGZ4NU1RZqQL",
    "GOOLGE_APP": {
        "CLIENT_ID": "56493813142-e54ro8e4vq190rnrvddlmp8v6snke8dg.apps.googleusercontent.com",
        "CLIENT_SECRET": "mpwy4os9Jz7NEeczkX1T3MFC",
        "KEY": "AIzaSyAcnxpFfuogXDczwhNGwNTULJ-4h2urdNM",
        "CAPTCHA_SITE_KEY": "6Lf5W6YZAAAAAI8Vxghb9fCgBOn3K3Y4pkNT0emm",
        "CAPTCHA_SECRECT_KEY": "6Lf5W6YZAAAAAFQB5HeqzKweF5nmOSYTo4EBJb3j"
    },

    "WEATHER_API": {
        "KEY": "868e4c309abc11cdfd41b07b84c4cd7f"
    },

    "CUSTOMER_TYPE": {
        "CLIENT": "4ed69755138c0dde957520f6b995a98b",
        "EMPLOYEE": "1d607a2011ba58ed52cc32db71ffd37d"
    },
    "SERVER_DATA": "http://localhost:3009/api-server/image/",
    // "SERVER_DATA": "http://api.vinarealtor.com.vn/api-server/image/",
    // "API_HOST": 'localhost',
    // "API_HOST": 'api.vinarealtor.com.vn',
    // "API_HTTP_PORT": 3009,
    // "API_HTTPS_PORT": 8002,
    "API_CONTEXT": "api-server",

    "REG_EXP_NATURAL_NUMBER": /^[0-9\b]+$/,
    "REG_EXP_NUMBER_DOT_COMMA": /^[0-9]{1,3}([.]([\0]?|[0-9]{1,2}))?$/,
    "AUTH_FULL_MASK": 511,
    "DATE_FORMAT": {
        "offset_from": "-08:00",
        "localization_format": "yyyy-MM-dd",
        "format_sql_short": "%Y-%m-%d",
        "format_sql_long": "%Y-%m-%d %H:%i:%s %p",
        "format_sql_string_short": "%W, %b %d, %Y",
        "format_sql_string_long": "%W, %b %d, %Y %H:%i",
        "format_sql_string_mdy": "%M %d, %Y"
    },
    "COMMON": {
        "PER_PAGE": 10,
        "LIMIT": 10,
        "CONFIG": "config",
        "POST": "ga-notification-post",
        "REMEMBER": "remember",
        "TOKEN": "phoenixrs-access-token",
        "ADMIN_TOKEN": "admin-phoenixrs-access-token",
        "ACCESS_PARAM": "access-param",
        "ADMIN_ACCESS_PARAM": "admin-access-param",
        "USER_INFO": "info",
        "ADMIN_INFO": "inf",
        "ACCEPT_LANG": "accept_lang",
        "CURRENT_PATH": "current_path",
        
        "DEFAULT_COUNTRY": "VN",
        "DEFAULT_ACTIVE": 1,
        "DEFAULT_DELETE": 0, 
        "DEFAULT_GENDER": 1,
        "DATE_FORMAT": "dd/mm/yyyy",
        "TIME_FORMAT": "HH:mm:ss",
        "NUMBER_FORMAT": '#.###',
        "IMAGE_FOLDER_TYPE": {
            "UPLOAD": 0,
            "PATIENT": 1
        },
        "LIMIT_IMG": 16,
        "MAX_FILE_SIZE": 2097152,
        "MAX_VIDEO_SIZE": 15728640,

        "ROUND_NUMBER": 2 // Làm tròn số. ex: 3.776 => 3.78
    },
    "URL": {
        "FORGOT_PASSWORD": "user/forgotpassword",
        "USER": {
            "LOGIN": "auth/login",
            "CHECK_USER_BY_HASH": "user/check-hash-by-user",
            "RESET_PASSWORD": "user/resetpassword",
            "CHANGE_PASSWORD": "user/changepassword",
            "ADMIN_CHANGE_PASSWORD": "user/admin-change-password"
        },

        "ROLE": {
            "LIST":"role/list",
            "SAVE": "role/save",
            "DELETE": "role/delete",
            "UPDATE_STATUS": "role/update-status",
            "LIST_SCREEN": "role/get-list-screen-permission",
            "UPDATE_PERMISSIONS": "role/update-role-permission",
            "ALL": "role/get-all-role",
            "UPDATE_ALL_PERMISSION": "role/update-all-permission"
        },

        "CUSTOMER": {
            "LIST":"customer/list",
            "SAVE": "customer/save",
            "DELETE": "customer/delete",
            "UPDATE_STATUS": "customer/update-status",
            "ALL": "customer/all"
        },

        "EMPLOYEE": {
            "LIST":"employee/list",
            "SAVE": "employee/save",
            "DELETE": "employee/delete",
            "UPDATE_STATUS": "employee/update-status"
        },

        "SITE_TYPE": {
            "ALL": "site-type/all"
        },
        "VENDOR": {
            "LIST_DROPDOWN": "vendor/list-dropdown"
        },

        "PORTFOLIO": {
            "LIST": "portfolio/list"
        },

        "SITE": {
            "LIST_ALL_SITE": "site/get-employee-manage-list-site",
            "ADD_MANAGE_SITE": "site/add-manage-site-by-employee",
            "SAVE": "site/save",
            "LIST": "site/list",
            "UPDATE_STATUS": "site/update-status",
            "DELETE": "site/delete",
            "ALL_BY_EMPLOYEE": "site/all-by-employee",


            "ALL": "site/all",
            "SITE_SUMMARY": "site/get-summary-site-by-customer",
            "SITE_DASHBOARD_DETAIL": "site/detail",
            "CHART_KPI_DAY": "site/get-chart-kpi-day",
            "UPDATE": "site/update",
            "QUICK_QUERY": "site/report-quick-query",
            "SPECIFIC_YIELD_MONTH": "site/specific-yield-month",
            "SPECIFIC_YIELD_YEAR": "site/specific-yield-year",
            "DAILY_REPORT": "site/daily-report",
            "DAILY_REPORT_CHART": "site/daily-report-chart",
            "EXPORT_DAILY_REPORT": "site/daily-report-chart",
            "REPORT_VISUALIZATION_DEVICE": "site/report-visualization-device",
            "REPORT_VISUALIZATION_DEVICE_DAY": "site/report-visualization-device-by-day",
            "ANNUAL_COMPARISON": "site/annual-comparison"
        },

        "MINI_SITE": {
            "INFO": "minisite/info",
            "CHART_INVERTER_PERFORMANCE": "minisite/get-chart-minisite-inverter-performance"
        },

        "CUSTOMER_VIEW": {
            "INFO": "customer-view/get-customer-view-info",
            "CHART_DATA": "customer-view/get-chart-data-performance",
            "LIST_SITE": "customer-view/list-site-by-customer"
        },

        "TIME_ZONE": {
            "LIST": "time-zone/list"
        },

        "ERROR_LEVEL": {
            "LIST": "error-level/list"
        },

        "DEVICE_TYPE": {
            "LIST_DROPDOWN": "device-type/list-dropdown"
        }, 
        "DEVICE_GROUP": {
            "LIST_DROPDOWN": "device-group/list-dropdown"
        }, 
        
        "DEVICE": {
            "LIST_BY_DEVICE_TYPE": "device/list-by-id-device-type",
            "LIST_DEVICE_BY_GROUP_ID": "device/list-device-by-id-group",
            "LIST_DEVICE_BY_SITE": "device/list-device-by-site",
            "UPDATE_STATUS" : "device/update-status",
            "DELETE": "device/delete",
            "SAVE": "device/save"
        },

        "DEVICE_PARAMETER": {
            "LIST_BY_DEVICE": "device-parameter/list-by-device"
        },

        "COUNTRY": {
            "LIST": "country/list"
        },

        "ALERT": {
            "LIST": "alert/list",
            "DETAIL": "alert/alert-detail",
            "LIST_ID_SITES": "alert/list-by-id-sites"
        },

        "DEMO": {
            "LIST": "demo/list"
        },

    },

    
    
    "FRONT_SITE_URL": {
        "LOGIN": "/login",
        "ADMIN_LOGIN": "/admin",
        "DEFAULT_PAGE":"/",
        "ADMIN_DEFAULT_PAGE": "/management"
    },
    "METHOD": {
        POST: "post",
        GET: "get",
        DELETE: "delete",
        PUT: "put",
        POSTEXCEL: "postexcel",
        POSTPDF: "postpdf"
    },
    "CONTENT_TYPE": {
        json: "application/json",
        stream: "application/octet-stream",
        excel: "application/vnd.ms-excel",
        multipart: "multipart/form-data"
    },
    // MODALTYPE:{primary:1, success:2, warning:3,danger:4, info:5,defaultVal:1}
    "SCREEN_MODE": {
        "VIEW": 0,
        "ADD": 1,
        "EDIT": 2
    },
    "AUTH_MODE": {
        "VIEW": 0,
        "NEW": 1,
        "DEL": 2,
        "EDIT": 3,
        "EXCEL": 4,
        "PDF": 5,
        "PRINT": 6,
        "TRANSLATE": 7,
        "APPROVAL": 8,
        "FULL" : 511
    },

    "AUTH_DATA_KEY" : {
        "VIEW": "view",
        "NEW": "new",
        "EDIT": "edit",
        "DEL": "delete",
        "PRINT": "print",
        "PDF": "pdf",
        "EXCEL": "excel",
        "TRANSLATE": "translate",
        "APPROVAL":"approval",
        "FULL": "auths"
    },

    
    "PUBLIC_PAGE":[
        'forgot-password',
        'reset-password'
    ],


    "SUPER_ADMIN": 1,
    
    "ERROR_CODE": {
        "CODE_01": 1,
        "CODE_02": 1,
    },

    
    "ERROR_MSG_TIMEOUT": 8000,
   
};
export default Constants;