$(document).ready(function() {
  $(".fancybox").fancybox();
  $(window).scroll(function() {
    if (
      $(window).scrollTop() >
      $(".important-item").offset().top - $(".important-item").height() - 500
    ) {
      console.log(
        $(".important-item").offset().top - $(".important-item").height()
      );
      $(".important-item").addClass("flip-in-x");
    }
  });
});
