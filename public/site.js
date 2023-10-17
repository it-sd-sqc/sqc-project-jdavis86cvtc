const lightSwitch = document.getElementById('style-toggle')

lightSwitch.addEventListener('click', function (event) {
  if (!document.body.classList.contains('dark')) {
    // Apply 'dark' class to all elements
    const allElements = document.querySelectorAll('*')
    allElements.forEach(element => {
      element.classList.add('dark')
    })

    document.querySelector('article').style.border = '1px solid #fff'
    document.querySelector('article').style.padding = '10px'

    document.querySelector('header').classList.remove('dark')
    document.querySelector('nav').classList.remove('dark')
    document.querySelector('ul').classList.remove('dark')

    // Loop through all <a> elements and remove the 'dark' class and set styles
    const anchorElements = document.querySelectorAll('a')
    anchorElements.forEach(element => {
      element.classList.remove('dark')
      element.style.backgroundColor = 'white'
      element.style.color = 'black'
    })

    document.querySelector('header').style.backgroundColor = 'white'
    document.querySelector('nav').style.backgroundColor = 'white'
    document.querySelector('ul').style.backgroundColor = 'white'
    document.querySelector('header').style.color = 'black'
    document.querySelector('nav').style.color = 'black'
    document.querySelector('ul').style.color = 'black'

    lightSwitch.textContent = '☀'
    lightSwitch.style = 'color:orange'
    lightSwitch.style.backgroundColor = 'white'
  } else {
    // Remove 'dark' class from all elements
    const allElements = document.querySelectorAll('*')
    allElements.forEach(element => {
      element.classList.remove('dark')
    })

    // Reset border style on the second child element
    document.body.children[1].style.border = 'none'

    // Reset background color for elements with black background
    const blackBackgroundElements = document.querySelectorAll(
      '[style*="background: black"]'
    )
    blackBackgroundElements.forEach(element => {
      element.style.background = 'black'
    })

    document.querySelector('article').style.border = '1px solid black'
    document.querySelector('article').style.padding = '0' // Remove the margin

    document.querySelector('header').classList.add('dark')
    document.querySelector('nav').classList.add('dark')
    document.querySelector('ul').classList.add('dark')

    // Loop through all <a> elements and add the 'dark' class and set opposite styles
    const anchorElements = document.querySelectorAll('a')
    anchorElements.forEach(element => {
      element.classList.add('dark')
      element.style.backgroundColor = 'black'
      element.style.color = 'white'
    })

    document.querySelector('header').style.backgroundColor = 'black'
    document.querySelector('nav').style.backgroundColor = 'black'
    document.querySelector('ul').style.backgroundColor = 'black'
    document.querySelector('header').style.color = 'white'
    document.querySelector('nav').style.color = 'white'
    document.querySelector('ul').style.color = 'white'

    lightSwitch.textContent = '🌙'
  }
})
