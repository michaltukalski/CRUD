const update = document.getElementById('switch');

update.addEventListener('click', ()=>{
  fetch('titles', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'title': 'Title has been changed!!',
      'description': 'desc also'
    })
  }).then(res => {
    window.location.reload();
  }).catch(err =>{
    console.log(err);
  })
})
