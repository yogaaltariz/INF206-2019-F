$(document).on('click', '.caret-icon', function() {
   $(this).toggleClass('fa-caret-up fa-caret-down');
})

setIdFor()

// tambah atribute required
const input = document.querySelectorAll('input')
input.forEach(function(item){
   item.setAttribute('required',true)
})

const allform = document.querySelectorAll('.form-group')
// console.log(allform)
const form = []
// const fieldName = []
// const radio = document.querySelectorAll('input[type="radio"]')

allform.forEach(function(element) {
   if(!(element.childNodes.length === 5)){
      form.push(element)
   }
})
form.forEach(function(element){
   // console.log(element)
   element.appendChild(generateKeterangan(element.childNodes[3].childNodes[1].name))
   // fieldName.push(element.childNodes[3].childNodes[1].name)
   // console.log(document.querySelector(`#${element.childNodes[3].childNodes[1].name}-div`));   
   // addEventToTidak(element.childNodes[3].childNodes[1].name)
})

// const radioTidak = document.querySelectorAll('input[type="radio"][value = "tidak"]')

// radioTidak.forEach(function (element) {
//    element.addEventListener('change', function (e){
//       if (e.target.checked) {
//          document.querySelector()
//       }
//    })
// })

// const radio = document.querySelectorAll('input[type="radio"]')
// var field = 0;
// var loop = 1;
// radio.forEach(function(element){
  
//    if (element.value === 'tidak'){
//       element.addEventListener('change',function (e) {
//          if(e.target.checked){
//             document.querySelector(`#${fieldName[field]}-div`).removeAttribute('class')
//             loop++
//          }
//       })
//    } else {
//       element.addEventListener('click',function (e) {
//          if(e.target.checked){
//             document.querySelector(`#${fieldName[field]}-div`).setAttribute('class','d-none')
//             loop++
//          }
//       })
//    }

//    if (loop > 2) {
//       loop = 1
//       field++
//    }
// })


