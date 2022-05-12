import c3 from "c3";
import d3 from "d3";
const months=["Gen", "Feb", "Mar", "Apr", "May", "June"];
;

window.loadchart = function (json) {
  //console.log(json);
  const obj=JSON.parse(json);
  //console.log(obj);

  //const type=obj.type;
  //const columns=obj.data;
  const{type,data,legend,position}=obj;


  var chart = c3.generate({
    grid: {
      x: {
        show: true
      }
    },
    size: {
      width: 1000,
      height: 800,
    },
    bindto: '#chart',
    axis: {
      x: {
        type: "category",
      },
    },

    data: {
      onclick: function (clickedData) { 
        alert("hi");
        console.log(clickedData);
        const {id, index}=clickedData;
        console.log(id,index);
        const month=months[index];
        console.log(id,index,month);
        const object={id,month};
        //const obj={id: clickedData.id, month: months[clickedData.index]};
        
        console.log(object);
        FileMaker.PerformScript("Get Data",JSON.stringify(object));
       },
      /* selection: {
        multiple: true,
        draggable: true,
      }, */
      stack: {
        normalize: true
      },
      labels: true,
      x: "x",
      type: type,
      columns: data,
    },

    legend: {
      show: legend,
      position: position,
    },
    donut: {
      title: "Fruits"
  }
    // tooltip: {
    //   format: {
    //     title: function (d) { return 'Data ' + d; },
    //     value: d3.format('$')
    //   //   value: function (value, ratio, id) {
    //   //     var format =  d3.format('€') ;
    //   //     return format(value);
    //   // }
    //      }
    //   }
  
          
  });
//transform chart api
window.transformChart=function(type){
  chart.transform(type);
  
};


window.reloadData=function(data){
  const columns=JSON.parse(data);
  chart.load({
    columns: columns,
  })
};

window.groupData=function(data){
  
  const groups=JSON.parse(data);
  console.log(groups);
  chart.groups(groups);

}
}
