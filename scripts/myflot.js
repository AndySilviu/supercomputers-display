
$(function() {

  var d1 = [];
  for (var i = 0; i <= 11; i += 1) {
    d1.push([i, parseInt(Math.random() * 30)]);
  }

  var d2 = [];
  for (var i = 0; i <= 11; i += 1) {
    d2.push([i, parseInt(Math.random() * 30)]);
  }

  var d3 = [];
  for (var i = 0; i <= 5; i += 1) {
    d3.push([i, parseInt(Math.random() * 30)]);
  }

  var stack = 0,
    bars = true,
    lines = false,
    steps = false;


    $.plot("#placeholder_GPU", [d3 ], {
      series: {
          bars: {
                show: true,
                barWidth: 0.8,
                fillColor:'rgba(0, 75, 121, 0.65)',
                fill: true,
                lineWidth:0}
                },
      xaxis: { tickLength: 0 },
    });
    $.plot("#placeholder_CPU", [ d2 ], {
      series: {
          bars: {
                show: true,
                barWidth: 0.8,
                fillColor:'rgba(0, 75, 121, 0.65)',
                fill: true,
                lineWidth:0}
                },
      xaxis: { tickLength: 0 },
    });

    $.plot("#placeholder_GPU2", [ d1], {
      series: {
          bars: {
                show: true,
                barWidth: 0.8,
                fillColor:'rgba(0, 75, 121, 0.65)',
                fill: true,
                lineWidth:0}
                },
      xaxis: { tickLength: 0 },
    });






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
			series = Math.floor(Math.random() * 6) + 3;

		for (var i = 0; i < series; i++) {
			data[i] = {
				label: "Series" + (i + 1),
				data: Math.floor(Math.random() * 100) + 1
			}
		}

		var placeholder = $("#diskspaceplaceholder");
		var placeholder2 = $("#diskspace2placeholder");
    var placeholder3 = $("#memoryplaceholder");
		$(function() {

			placeholder.unbind();
			$.plot(placeholder, data, {
				series: {
					pie: {
						innerRadius: 0.5,
						show: true
					}
				}
			});

			$.plot(placeholder2, data, {
				series: {
					pie: {
						innerRadius: 0.5,
						show: true
					}
				}
			});
      $.plot(placeholder3, data, {
        series: {
          pie: {
              show: true
          }
      }
      });
      function labelFormatter(label, series) {
        return "<div style='font-size:8pt; text-align:center; padding:2px; color:white;'>" + label + "<br/>" + Math.round(series.percent) + "%</div>";
      }

		});

	});

	// A custom label formatter used by several of the plots
