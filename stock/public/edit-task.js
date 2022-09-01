const taskIDDOM = document.querySelector('.task-edit-id')
const taskNameDOM = document.querySelector('.task-edit-name')
const taskNosDOM = document.querySelector('.task-nos-edit-name')
const taskPriceDOM = document.querySelector('.task-price-edit-name')
const taskImageDOM = document.querySelector('.task-image-edit-name')
const taskC1 = document.querySelector('.task-category-edit-1')
const taskC2 = document.querySelector('.task-category-edit-2')
const taskC3 = document.querySelector('.task-category-edit-3')
const taskC4 = document.querySelector('.task-category-edit-4')
const taskCompletedDOM = document.querySelector('.task-edit-completed')
const editFormDOM = document.querySelector('.single-task-form')
const editBtnDOM = document.querySelector('.task-edit-btn')
const formAlertDOM = document.querySelector('.form-alert')
const params = window.location.search
const id = new URLSearchParams(params).get('id')
let tempName
var tasker = [];
      tasker[1] = taskC1;
      tasker[2] = taskC2;
      tasker[3] = taskC3;
      tasker[4] = taskC4;

const showTask = async () => {
  try {
    const {
      data: { task },
    } = await axios.get(`/api/v1/tasks/${id}`)
    const { _id: taskID, completed, name, numofstock, price, image, category } = task

    taskIDDOM.textContent = taskID
    taskNameDOM.value = name
    taskNosDOM.value = numofstock
    taskPriceDOM.value = price
    taskImageDOM.value = image
    tempName = name
    if (completed) {
      taskCompletedDOM.checked = true
    }
    for (let i = 1; i <=4; i++) {
      if (category == tasker[i].value) {
       tasker[i].checked = true
      }
    }
  } catch (error) {
    console.log(error)
  }
}

showTask()

editFormDOM.addEventListener('submit', async (e) => {
  editBtnDOM.textContent = 'Loading...'
  e.preventDefault()
  try {
    for (let i = 1; i <=4; i++) {
      if(tasker[i].checked==true){
        var t = tasker[i].value
      }
    }
    const taskName = taskNameDOM.value
    const taskNos = taskNosDOM.value
    const taskPrice = taskPriceDOM.value
    const taskImage = taskImageDOM.value
    const taskCategory = t
    const taskCompleted = taskCompletedDOM.checked
    
    


    const {
      data: { task },
    } = await axios.patch(`/api/v1/tasks/${id}`, {
      name: taskName,
      numofstock: taskNos,
      completed: taskCompleted,
      price: taskPrice,
      image: taskImage,
      category: taskCategory
    })

    const { _id: taskID, completed, name, numofstock, price, image, category } = task

    taskIDDOM.textContent = taskID
    taskNameDOM.value = name
    taskNosDOM.value = numofstock
    taskPriceDOM.value = price
    taskImageDOM.value = image

    tempName = name
    if (completed) {
      taskCompletedDOM.checked = true
    }
    for (let i = 1; i <=4; i++) {
      if (taskCategory == tasker[i].value) {
       tasker[i].checked = true
       tasker[i].value = category
      }
    }
    
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = `success, edited task`
    formAlertDOM.classList.add('text-success')
  } catch (error) {
    console.error(error)
    taskNameDOM.value = tempName
    formAlertDOM.style.display = 'block'
    formAlertDOM.innerHTML = `error, please try again`
  }
  editBtnDOM.textContent = 'Edit'
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success')
  }, 3000)
})
