$(document).ready(function () {
    visualizer();
    $(".viszer_part_con").click(function(){
        setTimeout(
          function()
          {;
            $(".scrollbarcust").customScrollbar("resize", true);
          }, 100)
    });

    $(".select-cont select").change(function(){
        setTimeout(
          function()
          {;
            $(".scrollbarcust").customScrollbar("resize", true);
          }, 100)
    });
});
