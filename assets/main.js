let form = document.querySelector('form');
let input = document.querySelector('input');
let todoList = document.querySelector('.todo-app-list');
let clearBtn = document.querySelector('.clear-all')
let text = document.createElement('li');
let emptyImg = document.querySelector('#empty-img')


form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (input.value === '') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'ToDo can not be empty!',
          })
        return;
    }

    
    const listItem = document.createElement('li');
    listItem.innerHTML += `
    <span>${input.value}</span>
    <div>
    <button class="complete"><i class="fa-solid fa-check"></i></button>
    <button class="edit"><i class="fa-solid fa-edit"></i></button>
    <button class="delete"><i class="fa-solid fa-trash"></i></button>
    </div>
    `;
    
    todoList.appendChild(listItem);
    input.value = '';
    emptyImg.remove()
    //sweet alert add new todo
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your ToDo has been saved',
        showConfirmButton: false,
        timer: 1000
      })
      

    //delete button
    const deleteBtn = document.querySelector('.delete');
    deleteBtn.addEventListener('click', (e) =>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
            e.target.closest('li').remove();
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          })
    })

    //complete button
    const completeBtn = document.querySelector('.complete');
    completeBtn.addEventListener('click', (e) =>{
        Swal.fire('You have completed your toDo!')
        e.target.closest('li').style.textDecoration = 'line-through';
        e.target.closest('li').style.color= 'gray'
    })


    //edit button
    let editButtons = document.querySelectorAll('.edit');
    editButtons.forEach((editBtn)=>{
      editBtn.addEventListener('click',function(){
        Swal.fire({
          title: 'Edit to do',
          input: 'text',
          inputValue: this.parentElement.previousElementSibling.textContent,
          inputAttributes: {
            autocapitalize: 'off',
          },
          showCancelButton: true,
          confirmButtonText: 'Update',
        }).then((result) => {
          if (result.isConfirmed) {
            if (result.value.trim()==='') {
              Swal.fire({
                title: `input cannot be empty!`,
                icon: 'warning'
              })
            }
            else{
              this.parentElement.previousElementSibling.textContent = result.value;
              Swal.fire({
                title: `Updated successfully!`,
              })
            }
           
          }
        })
    })

    })

//clear all
clearBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if(todoList.children.length === 0){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Your toDo list is alredy empty!'
        })
      }
      
    if(todoList.innerHTML != ``){
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
            todoList.innerHTML = ` <img id="empty-img" class="w-75 h-50 d-block m-auto mt-2" src="https://d12y7sg0iam4lc.cloudfront.net/s/img/marketing/top-todo-app/to-do-list.png" alt="">`
              Swal.fire(
                'Deleted!',
                'Your toDo list has been deleted.',
                'success'
              )
            }
          })
        }
    })


});
