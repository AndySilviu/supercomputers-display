
var file_path = 'sysmon/', folders = ["beast","rogue"];//,"another"];
var folders_length = folders.length;
var refresh_rate = 3000;

//setTimeout(function(){
//  window.location.reload(1);
//}, refresh_rate); // refresh rate in miliseconds

$(function() {

  var stack = 0,
  bars = true,
  lines = false,
  steps = false;

  //align gpu charts
  var chart_size = $(".gpu2-placeholder").css("height").split("px");
  $(".gpu2-placeholder").css("height",parseInt(chart_size[0])+18+"px");

  gpu_read(0, [], 0);
  setInterval(function () {
    gpu_read(0, [], 0);
  }, refresh_rate);
  function gpu_read(n, gpu_data, c){

    if(n==folders_length) {

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
        gpu_read(n+1, gpu_data, c);
      },"text");
    }
  }

 gpu2_read(0, [], 0);
  setInterval(function () {
    gpu2_read(0, [], 0);
  }, refresh_rate);
  function gpu2_read(n, gpu2_data, c2){

    if(n==folders_length) {
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
        xaxis: { mode:"categories", tickLength: 0, labelWidth:35 },
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
          gpu2_data.push([" "+((parseInt(d[i*2]))/1024).toFixed(1)*1+"G / "+((parseInt(d[i*2+1]))/1024).toFixed(1)*1+"G ",  parseInt(d[i*2])*100/parseInt(d[i*2+1])]);

          //same hacky way:
          for(var j=0; j < c2; ++j) {
            gpu2_data[c2][0] += " ";
          }
          ++c2;
        }

        gpu2_read(n+1, gpu2_data, c2);

      },"text");
    }
  }

  cpu_read(0, 0);
  setInterval(function () {
    cpu_read(0, 1);
  }, refresh_rate);
  function cpu_read(n, t) {

    if(n < folders_length) {
      $.get(file_path+folders[n]+'/cpuinfo.txt',function(cpu_info){
        $.get(file_path+folders[n]+'/cpucoreinfo.txt',function(cpucore_info){


          var d = cpu_info.split(",");
          var cpu_data = [[d[0]+" (1min)", d[0]],[d[1]+" (5min)", d[1]],[d[2]+" (15min)", d[2]]];
          var core_number = cpucore_info.split(" ").length-1;
          
          if(t == 0) {
            $(".left_content").append("<div id=\"cpu-container"+n+"\" class=\"cpu-container\"></div>");
            $("#cpu-container"+n).css("width", 99/folders_length+"%");
            $("#cpu-container"+n).append( "<h1> CPU utilisation "+folders[n]+"</h1>  <div id=\"placeholder_CPU"+n+"\" class=\"cpu-placeholder\"></div> ");
          }

          $.plot("#placeholder_CPU"+n, [ cpu_data ], {
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
      cpu_read(n+1, t);

    }

  }

});

/*$(window).resize(function () {
  location.reload();
});*/

$(function() {

  disk_read(0, 0);
  setInterval(function () {
    disk_read(0, 1);
  }, refresh_rate);
  function disk_read(n, t) {
    $.get(file_path+folders[n]+'/diskinfo.txt',function(disk_info){
      if(t == 0) {
        $(".footer_content").append("<div id=\"diskspace-container"+n+"\" class=\"diskspace-container\"></div>");
        $("#diskspace-container"+n).css("width", 38/folders_length+"%");
        $("#diskspace-container"+n).append("<div class=\"header_pie\">  <h1>Disk space "+folders[n]+"</h1></div>");
        if(n==folders_length-1) {
          $(".footer_content").append("<div class=\"separator-container\"></div>");
        }
      }
      var disk_data = disk_info.split(" ");

      for (var i = 0; i < disk_data.length-1; i+=3) {
        if(t == 0) {
          $("#diskspace-container"+n).append( "<div id=\"diskspaceholder"+n+"0"+i+"\" class=\"diskspace-holder\"></div>" );
          var fit_space = Math.ceil((disk_data.length-1)/6);
          if(fit_space < 3){
            fit_space = 3;
          }
          $("#diskspaceholder"+n+"0"+i).css("width",+100/fit_space+"%");
          $("#diskspaceholder"+n+"0"+i).append( "<div id=\"diskspaceplaceholder"+n+"0"+i+"\" class=\"diskspace-placeholder\"></div>" );
        }
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

        $.plot("#diskspaceplaceholder"+n+"0"+i, data, {
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
        if(t == 0) {
          $("#diskspaceholder"+n+"0"+i).append("<p>"+disk_data[i+2]+"</p>");
        }
      }
    },"text");

    if(n<folders_length-1) {
      disk_read(n+1, t);
    }
  }

  mem_read(0, 0);
  setInterval(function () {
    mem_read(0, 1);
  }, refresh_rate);
  function mem_read(n, t) {
    $.get(file_path+folders[n]+'/meminfo.txt',function(mem_info){

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
      if(t == 0) {
        $(".footer_content").append("<div id=\"memory-container"+n+"\" class=\"memory-container\"></div>");
        $("#memory-container"+n).css("width", 36/folders_length+"%");
        $("#memory-container"+n).append("<div class=\"header_pie\">  <h1>Memory utilisation "+folders[n]+"</h1></div>")
        $("#memory-container"+n).append("<div id=\"memoryplaceholder"+n+"\" class=\"memory-placeholder\"></div>");
      }

      $.plot("#memoryplaceholder"+n, data, {
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
              radius: 3/4,
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

    if(n<folders_length-1) {
      mem_read(n+1, t);
    }

  }


});

$(function() {

  $.get(file_path+folders[0]+'/userinfo.txt',function(user_info){
    if(folders_length == 1) {
      $("#hold_info").append("<br><br>");
    }
    $("#hold_info").append("<h1>Number of sessions on " + folders[0] + "</h1><br><div class=\"circlehold\"><h2 id=\"sessions0\"</h2></div>");
    document.getElementById("sessions0").innerHTML = user_info ;

  },"text");

  if(folders_length>1) {
    ses_read(1);
  }
  function ses_read(n) {
    $.get(file_path+folders[n]+'/userinfo.txt',function(user_info){
      if(folders_length==2) {
        $("#hold_info").append("<br><br><br><hr><br><br><br><br>");
      }
      else {
        $("#hold_info").append("<br><hr><br>");
      }
      $("#hold_info").append("<h1>Number of sessions on " + folders[n] + "</h1><br><div class=\"circlehold\"><h2 id=\"sessions"+n+"\"</h2></div>");
      document.getElementById("sessions"+n).innerHTML = user_info ;

    },"text");

    if(n<folders_length-1) {
      ses_read(n+1);
    }

  }
  setInterval(function () {
    ses_update(0);
  }, refresh_rate);
  
  function ses_update(n) {
    $.get(file_path+folders[n]+'/userinfo.txt',function(user_info){
      document.getElementById("sessions"+n).innerHTML = user_info ;
    },"text");
    if(n<folders_length-1) {
      ses_update(n+1);
    }
  }

});
