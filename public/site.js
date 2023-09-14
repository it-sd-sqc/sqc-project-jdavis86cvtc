const lightSwitch = document.getElementById ('style-toggle');

lightSwitch.addEventListener ('click', function (event) {
  if (document.body.classList != 'dark') {
    document.body.classList.add ('dark');
    document.body.children[1].classList.add ('dark');
    document.body.children[1].style = 'border: 1px solid #fff;';
    lightSwitch.textContent = '☀';
  } else {
    // Easy Way:
    // location.reload()

    // Without Reloading:

    document.body.classList.remove ('dark');
    document.body.children[1].classList.remove ('dark');
    document.body.children[1].style = 'border: none;';
    lightSwitch.textContent = '🌙';
  }
});
