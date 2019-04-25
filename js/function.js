//function untuk set id untuk input type radio dan atribut for yang untuk inputnya sendiri pada halaman form
const setIdFor = () => {
	const radio = document.querySelectorAll('input[type="radio"]')
	const label = document.querySelectorAll('.custom-control-label')
	let j = 1
	for (let i = 0; i < radio.length; i++) {
		if (j > 2) {
			j = 1
		}
		radio[i].setAttribute('id', `${radio[i].name}${j}`)
		label[i].setAttribute('for', `${radio[i].name}${j}`)
		radio[i].setAttribute('value', `${(j === 1) ? 'Sesuai persyaratan' : 'Tidak sesuai persyaratan'}`)
		j++
	}
}

const setAttributes = function (elem /* attribute, value pairs go here */) {
    for (var i = 1; i < arguments.length; i+=2) {
        elem.setAttribute(arguments[i], arguments[i+1]);
    }
}

const generateKeterangan = (fieldName) => {
	const divKeterangan = document.createElement('div')
	setAttributes(divKeterangan,
		'class', 'd-none',
		'id',`${fieldName}-div`
	)
	const a = document.createElement('a')
	const collapse = document.createElement('div')
	const textarea = document.createElement('textarea')
	setAttributes(a,
		'href', `#${fieldName}ket`,
		'class', 'text-decoration-none text-body'
	)
	a.innerHTML = `Keterangan <i class="caret-icon fas fa fa-caret-down" data-toggle="collapse" data-target="#${fieldName}ket" aria-expanded="true" aria-controls="${fieldName}ket"></i>`
	setAttributes(collapse,
		'class','collapse',
		'id', `${fieldName}ket`
	)

	setAttributes(textarea,
		'name', `${fieldName}ket`,
		'rows','3',
		'class','form-control ml-2',
		'placeholder','masukkan keterangan'
	)

	collapse.appendChild(textarea)
	divKeterangan.appendChild(a)
	divKeterangan.appendChild(collapse)

	return divKeterangan
}

const addEventToTidak = (fieldName) => {
	
	// if (element.value === 'tidak'){
	// 	element.addEventListener('change',function (e) {
	// 		if(e.target.checked){
	// 			// console.log();
	// 			document.querySelector(`#${fieldName}-div`).removeAttribute('class')
	// 		}
	// 	})
	// } 
	// else {
	// 	element.addEventListener('click',function (e) {
	// 		if(e.target.checked){
	// 			document.querySelector(`#${fieldName}-div`).setAttribute('class','d-none')
	// 		}
	// 	})
	
	// }
	const radio = document.querySelectorAll('input[type="radio"]')

	for (let index = 0; index < radio.length; index++) {
		let element = radio[index];

		if (element.value === 'tidak'){
			element.addEventListener('change',function (e) {
				if(e.target.checked){
					// console.log();
					document.querySelector(`#${fieldName}-div`).removeAttribute('class')
				}
			})
		} 
		else {
			element.addEventListener('click',function (e) {
				if(e.target.checked){
					document.querySelector(`#${fieldName}-div`).setAttribute('class','d-none')
					
				}
			})
		
		}
	}
}