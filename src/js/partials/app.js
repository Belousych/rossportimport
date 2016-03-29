$(document).ready(function () {
    tag();
    star();
    teamToggle();
    checkAll();
    countCart();

    photo();
    cartChartTrigger();


    mobileTbl();


    chart();
});
var mobileTbl = function () {
    var $tbl = $('table');
    $tbl.wrap('<div class="tbl-wrap"></div>');
}
var tag = function () {
    var $tag = $('.js-tag');
    $tag.on('click', function () {
        var $this = $(this);
        $this.toggleClass('active');
    });
}

var star = function () {
    var $star = $('.star'),
        $starToggle = $('.js-star-toggle');
    $star.on('click', function () {
        var $this = $(this);
        $this.toggleClass('star_active');
    });
    $starToggle.on('click', function () {
        var $this = $(this),
            $txt = $(this).text();

        if ($txt == 'Добавить в избранное') {
            $this.text('Убрать из избранного');
        } else {
            $this.text('Добавить в избранное');
        }
        $this.prev($star).toggleClass('star_active');
    });
}

var teamToggle = function () {
    var $teamItem = $('.js-team'),
        $teamCont = $('.js-team-txt'),
        $heightArr = [];

    $teamCont.each(function () {
        var $this = $(this),
            $height = $this.outerHeight();
        $heightArr.push($height);
        $this.hide().css({
            'left': 0,
            'visibility': 'visible'
        })
    });

    $teamItem.each(function () {
        var $this = $(this),
            $thisCont = $this.find($teamCont),
            $id = $this.index();
        $this.on('click', function () {
            $teamCont.hide();
            $teamItem.css({
                'padding-bottom': 0
            });
            $thisCont.slideDown('400');
            $this.css({
                'padding-bottom': $heightArr[$id]
            })


        })
    });
}


var checkAll = function () {
    var $box = $('.cart-tbl'),
        $checkboxes = $box.find('input[type="checkbox"]'),
        $checkTrigger = $('#cart-check-all');

    $checkTrigger.on('change', function () {
        $checkboxes.prop("checked", $checkTrigger.prop("checked"));
    })

    $box.find('label.check').click(function (e) {
        e.stopPropagation();

    });
}

var cartChartTrigger = function () {
    $('#cart-chart-trigger').on('click', function () {
        $('#js-cart-chart').toggleClass('on');
        $('.cart-chart__link').toggleClass('uk-hidden');
    });
}

var chart = function () {
    $('.js-cart-chart-toggle').slideUp(function () {
        $(this).addClass('uk-hidden');
    });


    var data = {
        labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
        datasets: [
            {
                label: "My First dataset",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: [65, 59, 90, 81, 56, 55, 40]
        },
            {
                label: "My Second dataset",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: [28, 48, 40, 19, 96, 27, 100]
        }
    ]
    };
    var ctx = document.getElementById("myChart").getContext("2d");
    var myRadarChart = new Chart(ctx).Radar(data, {

        //Boolean - Whether to show lines for each scale point
        scaleShowLine: true,

        //Boolean - Whether we show the angle lines out of the radar
        angleShowLineOut: true,

        //Boolean - Whether to show labels on the scale
        scaleShowLabels: false,

        // Boolean - Whether the scale should begin at zero
        scaleBeginAtZero: true,

        //String - Colour of the angle line
        angleLineColor: "rgba(0,0,0,.1)",

        //Number - Pixel width of the angle line
        angleLineWidth: 1,

        //String - Point label font declaration
        pointLabelFontFamily: "'Arial'",

        //String - Point label font weight
        pointLabelFontStyle: "normal",

        //Number - Point label font size in pixels
        pointLabelFontSize: 10,

        //String - Point label font colour
        pointLabelFontColor: "#666",

        //Boolean - Whether to show a dot for each point
        pointDot: true,

        //Number - Radius of each point dot in pixels
        pointDotRadius: 3,

        //Number - Pixel width of point dot stroke
        pointDotStrokeWidth: 1,

        //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
        pointHitDetectionRadius: 20,

        //Boolean - Whether to show a stroke for datasets
        datasetStroke: true,

        //Number - Pixel width of dataset stroke
        datasetStrokeWidth: 2,

        //Boolean - Whether to fill the dataset with a colour
        datasetFill: true,

        //String - A legend template
        legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"


    });
}

var countCart = function () {
    var $count = $('.js-count'),
        $dec = $count.find('.count__dec'),
        $inc = $count.find('.count__inc'),
        $input = $count.find('input');

    $input.val('1');


    $input.on('keypress', function (e) {

        e = e || event;

        if (e.ctrlKey || e.altKey || e.metaKey) return;

        var chr = getChar(e);

        // с null надо осторожно в неравенствах,
        // т.к. например null >= '0' => true
        // на всякий случай лучше вынести проверку chr == null отдельно
        if (chr == null) return;

        if (chr < '0' || chr > '9') {
            return false;
        }
    });



    function getChar(event) {
        if (event.which == null) {
            if (event.keyCode < 32) return null;
            return String.fromCharCode(event.keyCode) // IE
        }

        if (event.which != 0 && event.charCode != 0) {
            if (event.which < 32) return null;
            return String.fromCharCode(event.which) // остальные
        }

        return null; // специальная клавиша
    }

    $count.on('click', function (e) {
        e = e || event;
        var $target = $(e.target),
            $this = $(this),
            $input = $this.find('input'),
            val = parseInt($this.find('input').val());

        if ($target.hasClass('count__dec')) {

            if (val <=0) {
                return false;
            } else {
                val--;
            }
        }
        if ($target.hasClass('count__inc')) {
            val++;
        }

        $input.val(val);

    });
}


var photo = function () {
    var $photoBox = $('#js-photo'),
        $big = $photoBox.find('.catalog-item-photo__big a'),
        $bigImg = $photoBox.find('.catalog-item-photo__big img'),
        $mini = $photoBox.find('.catalog-item-photo__mini');
    $mini.on('click', function(e) {
       var $this = $(this),
           index = $this.index(),
           href = $this.find('img').data('href');
        $big.removeClass('active')  ;
        $big.eq(index).addClass('active');
        $bigImg.prop('src', href);
        return false;
    });
};
