document.querySelectorAll("[data-edit]").forEach(btn =>
    btn.addEventListener("click", edit)
  );
  
  function edit(ev) {
    ev.preventDefault();
    const cmd_val = this.getAttribute("data-edit").split(":");
    document.execCommand(cmd_val[0], false, cmd_val[1]);
  }