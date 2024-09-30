try {
  const cardSettings = JSON.parse(document.querySelector("#settings").textContent)

  // Set Card Height & Width
  document.querySelectorAll("#front, #back").forEach(item => {
    Object.assign(item.style, {
      width: cardSettings.size.width + cardSettings.size.unit.value,
      height: cardSettings.size.height + cardSettings.size.unit.value,
    })
  })

  // Set Default Variable Values
  Object.keys(cardSettings.defaultVariablesValue).map(key => {
    replaceContent("{{" + key + "}}", cardSettings.defaultVariablesValue[key])
  })

  // Modify HTML
  document.querySelectorAll('[data-info]').forEach(el => {
    const elementData = JSON.parse(attrDoubleQuoteToSingle(el.dataset.info))
    replaceContent("[[" + elementData.id + "]]", elementData.value)
  })

  document.querySelectorAll('[data-info]').forEach(el => {
    const elementData = JSON.parse(attrDoubleQuoteToSingle(el.dataset.info))
    if (!elementData.enable) el.style.display = 'none'
    if (elementData.type === 'image') el.setAttribute('alt', elementData.label)
  })

  // Below Are Utility Functions
  function replaceContent(replaceTo, replaceWith) {
    const replaceText = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const parent = node.parentNode
        const content = node.nodeValue.split(replaceTo).join(replaceWith)
        parent.innerHTML = parent.innerHTML.split(replaceTo).join(replaceWith)
      }
    }

    const replaceAttributes = (node) => {
      if (node.attributes) {
        for (let attr of node.attributes) {
          if (attr.value.includes(replaceTo)) {
            attr.value = attr.value.split(replaceTo).join(replaceWith)
          }
        }
      }
    }

    const traverseDOM = (node) => {
      replaceText(node)
      replaceAttributes(node)
      node = node.firstChild
      while (node) {
        traverseDOM(node)
        node = node.nextSibling
      }
    }

    traverseDOM(document.body)
  }


  function attrDoubleQuoteToSingle(value) {
    return value.split('="').map((item, index) => {
      if (index === 0) return item
      const attrEndDoubleQuoteIndex = item.indexOf('"')
      let temArray = item.split('')
      temArray[attrEndDoubleQuoteIndex] = "'"
      item = temArray.join('')
      return item
    }).join("='")
  }
}
catch (error) {
  alert("Something is wrong with the card. Please check the console.")
  console.error(error)
}