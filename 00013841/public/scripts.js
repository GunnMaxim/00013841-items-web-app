let deleteBtns = document.querySelectorAll('.delete-btn')
let updateBtns = document.querySelectorAll('.update-btn')
let updateRecord = document.getElementById('update-record')
let form = document.getElementById('update-form');

deleteBtns.forEach(btn => {
    btn.addEventListener('click', e => {
    	fetch('/items/delete', {
    		method: 'DELETE',
    		headers: {
    			'Content-Type': 'application/json'
    		},
    		body: JSON.stringify({ id: item.id })
    	})
    	.then(res => res.json())
    	.then(data => {
    		if (data.deleted) {
    			e.target.parentElement.parentElement.remove()
    		}
    	})
    })
})

updateBtns.forEach(btn => {
    btn.addEventListener('click', e => {
    	window.location = `/${item.id}/update`
    })
})

form.addEventListener('submit', e => {
    e.preventDefault()

    let formData = new FormData(form)

    fetch(`/items/update/${item.id}`, {
    	method: 'PUT',
    	headers: {
    		'Content-Type': 'application/json'
    	},
    	body: JSON.stringify({ data: Object.fromEntries(formData)})
    })
    .then(res => res.json())
    .then(data => {
    	console.log(data)
    })
})