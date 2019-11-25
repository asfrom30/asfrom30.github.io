$(document).ready(function() {
  $(".home__root a").click(function(e) {
    e.stopPropagation();
  });
});

function toggleCollapseList(event) {
  event.preventDefault();

  const $_node = $(event.currentTarget);
  const highlightTarget = $_node.find(".js-row__title");
  const collapseTarget = $_node.find(".js-row__body");

  if ($_node.hasClass("active")) {
    $_node.removeClass("active");
    highlightTarget.removeClass("highlight");
    collapseTarget.hide("slow");
  } else {
    const alreadyActiveEls = $.find(".active");
    alreadyActiveEls.forEach(el => {
      $(el).removeClass("active");
      $(el)
        .find(".js-row__title")
        .removeClass("highlight");
      $(el)
        .find(".js-row__body")
        .hide("slow");
    });

    setTimeout(() => {
      $_node.addClass("active");
      highlightTarget.addClass("highlight");
      collapseTarget.show("slow");
    }, 0);
  }
}
