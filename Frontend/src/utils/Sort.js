import Libs from './Libs'
const dirMap = {
    // greater-than
    gt: { asc: 1, desc: -1 },
    // less-than
    lt: { asc: -1, desc: 1 }
  };
  
  const doSort = (A, B, property, direction = 'ASC') => {
    var a =  eval("A."+property);//A[ property ];
    var b = eval("B."+property);//B[ property ];
    var is_number=false;
    

    //console.log(A,property);
    if (a != null && b != null) {
      a = a.toString();
      b = b.toString();
      //console.log(a.toString(),Libs.isInteger(a.toString()));
      if(Libs.isInteger(a) && Libs.isInteger(b)){
        is_number = true;
      }
      if(!is_number){
        if (a.toLowerCase() < b.toLowerCase()) {
          return dirMap.lt[direction.toLowerCase()];
        }
        if (a.toLowerCase() > b.toLowerCase()) {
          return dirMap.gt[direction.toLowerCase()];
        }
      }else{
        //sort theo numberic
        if(a*1>b*1){
          return dirMap.gt[direction.toLowerCase()]; 
        }
        if(a*1<b*1){
          return dirMap.lt[direction.toLowerCase()];
        }
      }
    }
    return 0;
  }
  
  const createSorter = (...args) => {
    if (typeof args[0] === 'string') {
      args = [
        {
          direction: args[1],
          property: args[0]
        }
      ];
    }
  
    return (A, B) => {
      let ret = 0;
  
      args.some(sorter => {
        const { property, direction = 'ASC' } = sorter;
        const value = doSort(A, B, property, direction);
  
        if (value === 0) {
          // they are equal, continue to next sorter if any
          return false;
        } else {
          // they are different, stop at current sorter
          ret = value;
  
          return true;
        }
      })
  
      return ret;
    }
  }
  
  export { createSorter };
  