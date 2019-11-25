function test(event) {
  event.preventDefault();

  const $_node = $(event.currentTarget);
  const highlightTarget = $_node.find(".home-menu__collapse-title");
  const collapseTarget = $_node.find(".home-menu__collapse-list");

  if (highlightTarget.hasClass("highlight")) {
    // collapse
    highlightTarget.removeClass("highlight");
    collapseTarget.hide("slow");
  } else {
    // show
    highlightTarget.addClass("highlight");
    collapseTarget.show("slow");
  }

  console.log(highlightTarget);
  console.log(collapseTarget);
}

function toggleCollapseList(containerClassName, event) {
  event.preventDefault();
  console.log(containerClassName);
  const $_target = $(event.target);
  const flag = $_target.hasClass("highlight");

  console.log(flag);

  // highlight clicked title
  $(".highlight").removeClass("highlight");

  if (flag) {
    $(`.${containerClassName} .home-menu__collapse-list`).hide("slow");
  } else {
    $(`.${containerClassName} .home-menu__collapse-title`).addClass("highlight");
    $(`.home-menu__collapse-list`).hide("slow"); // collapse all
    $(`.${containerClassName} .home-menu__collapse-list`).toggle("slow");
  }
}
