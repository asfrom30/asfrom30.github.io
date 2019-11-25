function toggleCollapseList(containerClassName, event) {
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
