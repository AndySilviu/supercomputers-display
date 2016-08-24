
var file_path = 'sysmon/', folders = ["BEAST","ROGUE","ROGUE"];

$(function() {

  var stack = 0,
    bars = true,
    lines = false,
    steps = false;

  var gpu_data = [], c = 0;

gpu_read(0);
function gpu_read(n){

if(n==folders.length) {

  $.plot("#placeholder_GPU", [gpu_data ], {
    series: {
        bars: {
              show: true,
              align: "center",
              barWidth: 0.8,
              fillColor:'rgba(0, 75, 121, 0.65)',
              lineWidth:0}
              },
              grid:{borderColor:'#ccc',borderWidth:1},
              xaxis: { mode:"categories", tickLength: 0 },
              yaxis: {
                tickFormatter: function (val, axis) {
               return val + "%";
               },
                 min: 0,
                 max: 100,
             },
  });
}
else {
  $.get(file_path+folders[n]+'/gpuinfo.txt',function(gpu_info){

    var d = gpu_info.split("%");

    for (var i = 0; i < d.length-1; ++i) {
      gpu_data.push([d[i]+"%",   parseInt(d[i])]);

      //hacky way for preventing the bars to merge:
      for(var j=0; j < c; ++j) {
        gpu_data[c][0] += " ";
      }
      ++c;
    }
    gpu_read(n+1);
},"text");
}
}

var gpu2_data = [], c2 = 0;

gpu2_read(0);
function gpu2_read(n){

if(n==folders.length) {
  $.plot("#placeholder_GPU2", [gpu2_data], {
    series: {
        bars: {
              show: true,
              barWidth: 0.8,
              align: "center",
              fillColor:'rgba(0, 75, 121, 0.65)',
              fill: true,
              lineWidth:0}
              },
              grid:{borderColor:'#ccc',borderWidth:1},
              xaxis: { mode:"categories", tickLength: 0, labelWidth:30 },
              yaxis: {
                 tickFormatter: function (val, axis) {
               return val + "%";
                },
                 min: 0,
                 max: 100,
             },
  });
}

else {

  $.get(file_path+folders[n]+'/gpumeminfo.txt',function(gpumem_info){

  var d = gpumem_info.split("MiB");

  for (var i = 0; i < d.length; ++i) {
    gpu2_data.push([" "+((parseInt(d[i*2]))/1024).toFixed(1)+"G / "+((parseInt(d[i*2+1]))/1024).toFixed(1)+"G ",  parseInt(d[i*2])*100/parseInt(d[i*2+1])]);

    //same hacky way:
    for(var j=0; j < c2; ++j) {
      gpu2_data[c2][0] += " ";
    }
    ++c2;
  }

  gpu2_read(n+1);

},"text");
}
}

$.get(file_path+folders[0]+'/cpuinfo.txt',function(cpu_info){
$.get(file_path+folders[0]+'/cpucoreinfo.txt',function(cpucore_info){

  var d = cpu_info.split(",");
  var cpu_data = [[d[0]+" (1min)", d[0]],[d[1]+" (5min)", d[1]],[d[2]+" (15min)", d[2]]];
  var core_number = cpucore_info.split(" ").length-1;
    $.plot("#placeholder_CPU", [ cpu_data ], {
      series: {
          bars: {
                show: true,
                barWidth: 0.8,
                align: "center",
                fillColor:'rgba(0, 75, 121, 0.65)',
                fill: true,
                lineWidth:0}
                },
                grid:{borderColor:'#ccc',borderWidth:1},
                xaxis: { mode:"categories", tickLength: 0 },
                yaxis: {
                   min: 0,
                   max: core_number,
                   tickSize: 2,
                   tickDecimals: 0,
               },
    });

},"text");
},"text");

$.get(file_path+folders[0]+'/cpuinfo.txt',function(cpu_info){
$.get(file_path+folders[0]+'/cpucoreinfo.txt',function(cpucore_info){


  var d = cpu_info.split(",");
  var cpu_data = [[d[0]+" (1min)", d[0]],[d[1]+" (5min)", d[1]],[d[2]+" (15min)", d[2]]];
    var core_number = cpucore_info.split(" ").length-1;

    $.plot("#placeholder_CPU2", [ cpu_data ], {
      series: {
          bars: {
                show: true,
                barWidth: 0.8,
                align: "center",
                fillColor:'rgba(0, 75, 121, 0.65)',
                fill: true,
                lineWidth:0}
                },
                grid:{borderColor:'#ccc',borderWidth:1},
                xaxis: { mode:"categories", tickLength: 0 },
                yaxis: {
                   min: 0,
                   max: core_number,
                   tickSize: 2,
                   tickDecimals: 0,
               },
    });

},"text");
},"text");

});



$(window).resize(function () {
    location.reload();
});

	$(function() {

		// Example Data

		//var data = [
		//	{ label: "Series1",  data: 10},
		//	{ label: "Series2",  data: 30},
		//	{ label: "Series3",  data: 90},
		//	{ label: "Series4",  data: 70},
		//	{ label: "Series5",  data: 80},
		//	{ label: "Series6",  data: 110}
		//];

		//var data = [
		//	{ label: "Series1",  data: [[1,10]]},
		//	{ label: "Series2",  data: [[1,30]]},
		//	{ label: "Series3",  data: [[1,90]]},
		//	{ label: "Series4",  data: [[1,70]]},
		//	{ label: "Series5",  data: [[1,80]]},
		//	{ label: "Series6",  data: [[1,0]]}
		//];

		//var data = [
		//	{ label: "Series A",  data: 0.2063},
		//	{ label: "Series B",  data: 38888}
		//];

		// Randomly Generated Data

		var data = [],
			series = 2;

		for (var i = 0; i < series; i++) {
    };
			data[0] = {
				label: "Used",
				data: Math.floor(Math.random() * 100) + 1,
        color: '#004b79'
			}

      data[1] = {
				label: "Free",
				data: Math.floor(Math.random() * 100) + 1,
        color: 'rgba(0, 75, 121,0.2)'
			}



		var placeholder2 = $("#diskspace2placeholder");
    var placeholder3 = $("#memoryplaceholder");
    var placeholder4 = $("#memory2placeholder");



  $.get(file_path+folders[0]+'/diskinfo.txt',function(disk_info){

    var disk_data = disk_info.split(" ");

    for (var i = 0; i < disk_data.length-1; i+=3) {

$( ".diskspace-container" ).append( "<div id=\"diskspaceplaceholder"+i+"\" class=\"diskspace-placeholder\"></div>" );

    var placeholder = $("#diskspaceplaceholder"+i);




//<div id="diskspaceplaceholder" class="diskspace-placeholder"></div>
  //  var placeholder0 = $(stuff);
  //  var placeholder0_1 =$("#diskspaceplaceholder1");



      var data = [],
  			series = 2;

  			data[0] = {
  				label: "Used",
  				data: disk_data[i],
          color: '#004b79'
  			}

        data[1] = {
  				label: "Free",
  				data: disk_data[i+1],
          color:'rgba(0, 75, 121,0.2)'
  			}


		//	placeholder.unbind();
			$.plot(placeholder, data, {
				series: {
          pie: {
              innerRadius:0.5,
              stroke:{
                width:0,
                color:'#ddd'
              },
              show: true,
              radius: 1,
              label: {
                  show: false,
                  radius: 1,
                  formatter: function(label, series) {
                      return '<div style="font-size:12.5px; bottom:0; position:relative; padding: 2px; color:white;">'+label+'<br/>'+Math.round(series.percent)+'%</div>';
                  },
                  background: {
                      opacity: 0.8,
                      color: '#444'
                  }
              }
          }
				},   legend: {
        show: false
    }
			});
}
/*      $.plot(placeholder0, data, {
        series: {
          pie: {
              innerRadius:0.5,
              stroke:{
                width:0,
                color:'#ddd'
              },
              show: true,
              radius: 1,
              label: {
                  show: false,
                  radius: 1,
                  formatter: function(label, series) {
                      return '<div style="font-size:12.5px; bottom:0; position:relative; padding: 2px; color:white;">'+label+'<br/>'+Math.round(series.percent)+'%</div>';
                  },
                  background: {
                      opacity: 0.8,
                      color: '#444'
                  }
              }
          }
        },   legend: {
        show: false
    }
      });
      $.plot(placeholder0_1, data, {
        series: {
          pie: {
              innerRadius:0.5,
              stroke:{
                width:0,
                color:'#ddd'
              },
              show: true,
              radius: 1,
              label: {
                  show: false,
                  radius: 1,
                  formatter: function(label, series) {
                      return '<div style="font-size:12.5px; bottom:0; position:relative; padding: 2px; color:white;">'+label+'<br/>'+Math.round(series.percent)+'%</div>';
                  },
                  background: {
                      opacity: 0.8,
                      color: '#444'
                  }
              }
          }
        },   legend: {
        show: false
    }
      });

*/

      },"text");





			$.plot(placeholder2, data, {
				series: {
          pie: {
              innerRadius:0.5,
              stroke:{
                width:0,
                color:'#ddd'
              },
              show: true,
              radius: 1,
              label: {
                  show: true,
                  radius: 1,
                  formatter: function(label, series) {
                      return '<div style="font-size:12.5px; text-align:center; padding:2px; color:white;">'+label+'<br/>'+Math.round(series.percent)+'%</div>';
                  },
                  background: {
                      opacity: 0.8,
                      color: '#444'
                  }
              }
          }
        },   legend: {
        show: false
      }
			});

      $.get(file_path+folders[0]+'/meminfo.txt',function(mem_info){


          var mem_data = mem_info.split(" ");

          var data = [],
            series = 3;

            data[0] = {
              label: "Used",
              data: parseInt(mem_data[0]),
              color: '#004b79'
            }

            data[1] = {
              label: "Free",
              data: parseInt(mem_data[1]),
              color: 'rgba(0, 75, 121,0.2)'
            }

            data[2] = {
              label: "Buff/Cache",
              data: parseInt(mem_data[2]),
              color: '#00b1a7'
            }

      $.plot(placeholder3, data, {
        series: {
          pie: {
            stroke:{
              width:0,
              color:'#ddd'
            },
            show: true,
            radius: 1,
            label: {
                show: true,
                radius: 1,
                formatter: function(label, series) {
                    return '<div style="font-size:12.5px; text-align:center; padding:2px; color:white;">'+label+'<br/>'+Math.round(series.percent)+'%</div>';
                },
                background: {
                    opacity: 0.8,
                    color: '#444'
                }
            }
        }
      },   legend: {
      show: false
    }
      });

  },"text");

      function labelFormatter(label, series) {
        return "<div style='font-size:8pt; text-align:center; padding:2px; color:white;'>" + label + "<br/>" + Math.round(series.percent) + "%</div>";
      }
      $.plot(placeholder4, data, {
        series: {
          pie: {
            stroke:{
              width:0,
              color:'#ddd'
            },
            show: true,
            radius: 1,
            label: {
                show: true,
                radius: 1,
                formatter: function(label, series) {
                    return '<div style="font-size:12.5px; text-align:center; padding:2px; color:white;">'+label+'<br/>'+Math.round(series.percent)+'%</div>';
                },
                background: {
                    opacity: 0.8,
                    color: '#444'
                }
            }
        }
      },   legend: {
      show: false
    }
      });
      function labelFormatter(label, series) {
        return "<div style='font-size:8pt; text-align:center; padding:2px; color:white;'>" + label + "<br/>" + Math.round(series.percent) + "%</div>";
      }


	});

$.get(file_path+folders[0]+'/userinfo.txt',function(user_info){

  document.getElementById("beast_users").innerHTML = user_info ;

},"text");
