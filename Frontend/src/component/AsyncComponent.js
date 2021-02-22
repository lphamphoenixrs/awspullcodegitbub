import React, { Component } from 'react';
export default function asyncComponent(getComponent) {
  class AsyncComponent extends Component {
    static Component = null;
    state = {
      // chổ này hơi tricky, trỏ về chính nó
      Component: AsyncComponent.Component
    };

    componentDidMount(prevProps, prevState) {
      // không re-load nếu đã có rồi
      if (!this.state.Component) {
        getComponent().then(Component => {
          AsyncComponent.Component = Component;
          this.setState({ Component })
        })
      }
    }

    render() {
      const { Component } = this.state;
      if (Component) {
        return <Component {...this.props} />
      }
      return null;
    }
  }
  return AsyncComponent;
}

// import * as React from 'react';
// import Libs from '../utils/Libs';
// // import SettingService from '../services/SettingService';
// const asyncComponent = (importComponent) => {

//   class AsyncComponent extends React.Component {

//     constructor(props) {
//       super(props);

//       this.state = {
//         component: null
//       };
//     }

//     async componentDidMount() {
//       const { default: component } = await importComponent();
//       // await this.getSettings();
//       this.setState({
//         component: component
//       });
//     }
//     /**
//      * @description Được gọi ngay trước khi có props mới tức nextProps
//      * trong hàm này không được phép setState để setState phải gọi đến hàm componentDidUpdate
//      * @author Luyen Nguyen 2018-10-30
//      */
//   //   async getSettings(){
//   //     let info = localStorage.getItem(Constants.COMMON.USER_INFO);
//   //     // let permissions = localStorage.getItem(Constants.COMMON.ACCESS_PARAM);
//   //     let userInfo = JSON.parse(Libs.base64Decrypt(info));
//   //     // let permisInfo = JSON.parse(Libs.base64Decrypt(permissions));
//   //     let user = userInfo;
//   //     let settings = {
//   //         total_number_format: '', 
//   //         display_number_format: '',
//   //         number_round_type: 0,
//   //         date_format: '',
//   //         datetime_format: '',
//   //         total_decimals_lenght: 3,
//   //         tests_department: ''
//   //     }
//   //     var params = [
//   //         {
//   //              "name_field": 'total_number_format',
//   //              "headquarter_id": user.headquarter_id
//   //         },
//   //         {
//   //              "name_field": 'display_number_format',
//   //              "headquarter_id": user.headquarter_id
//   //         },
//   //         {
//   //             "name_field": 'number_round_type',
//   //             "headquarter_id": user.headquarter_id
//   //        },
//   //         {
//   //             "name_field": 'date_format',
//   //             "headquarter_id": user.headquarter_id
//   //        },
//   //         {
//   //             "name_field": 'datetime_format',
//   //             "headquarter_id": user.headquarter_id
//   //        },
//   //         {
//   //             "name_field": 'tests_department',
//   //             "headquarter_id": user.headquarter_id
//   //         }

//   //     ];
//   //     let rs = await SettingService.instance.getSettingByKeys(params);
//   //     if(!rs.data.length || rs.data.length < 0){
//   //         console.log('lỗi lấy config setting', rs);
//   //         rs = null;
//   //     }
//   //     for(let i = 0; i < rs.data.length; i++){
//   //         switch(rs.data[i].name_field){
//   //             case 'total_number_format':
//   //                 settings.total_number_format = rs.data[i].value; 
//   //                 settings.total_decimals_lenght = Libs.getDecimalsOfFomat(settings.total_number_format);
//   //                 break;
//   //             case 'display_number_format':
//   //                 settings.display_number_format = rs.data[i].value; break;
//   //             case 'number_round_type':
//   //                 settings.number_round_type = rs.data[i].value; break;
//   //             case 'date_format':
//   //                 settings.date_format = rs.data[i].value; break;
//   //             case 'datetime_format':
//   //                 settings.datetime_format = rs.data[i].value; break;
//   //             case 'tests_department':
//   //                 settings.tests_department = rs.data[i].value; break;
//   //         }
//   //     }

//   //     global.settings = settings;
//   // }

//     render() {
//         const C = this.state.component;
//         return C
//             ? <C {...this.props} />
//             : <div>loading...</div>;

//     }

//   } 

//   return AsyncComponent;
// };

// export default asyncComponent;