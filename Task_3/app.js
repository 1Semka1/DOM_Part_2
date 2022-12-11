const tasks = [
  {
    id: '1138465078061',
    completed: true,
    text: 'Посмотреть новый урок по JavaScript',
  },
  {
    id: '1138465078062',
    completed: true,
    text: 'Выполнить тест после урока',
  },
  {
    id: '1138465078063',
    completed: true,
    text: 'Выполнить ДЗ после урока',
  },
]

let index = Date.now()
let idTaskToBeDeleted //Переменная для удаления задачи после модального окна

const body = document.querySelector('body')
const myTask = document.createElement('h1')
const position = document.querySelector('.tasks-list')
let taskList = createTasksList()
myTask.textContent = 'Работа с DOM. Часть 2. Задание 3'
body.prepend(myTask)
position.innerHTML = taskList.join('')
createModelOverlay()

function createTasksList() {
  //Функция для оптимизации кода
  const task = tasks.map((task, id) => {
    return `<div class="task-item" data-task-id="${id + 1}">
    <div class="task-item__main-container">
        <div class="task-item__main-content">
            <form class="checkbox-form">
                <input class="checkbox-form__checkbox" type="checkbox" id="${
                  'task-' + id + 1
                }" ${task.completed ? 'checked' : ' '}>
                <label for="${'task-' + id + 1}"></label>
            </form>
            <span class="task-item__text">
                ${task.text}
            </span>
        </div>
        <button class="task-item__delete-button default-button delete-button" data-delete-task-id="${
          task.id
        }">
            Удалить
        </button>
    </div>
  </div>`
  })
  return task
}

const createTasksBlock = document.querySelector('.create-task-block')
createTasksBlock.addEventListener('submit', (event) => {
  //Добавление новой задачи

  const deleteErrorMessageBlock = createTasksBlock.querySelector('span') //Проверяю наличие блока ошибки
  if (deleteErrorMessageBlock) {
    deleteErrorMessageBlock.remove() //Удаляю в случае нахождения
  }

  event.preventDefault()
  const textToAdd = event.target.elements.taskName.value.trim() //Получаю строку из поля ввода
  let hasInTasksList = 0 //Переменная, отвечающаа за существование введённой задачи в списке

  tasks.forEach((item) => {
    if (textToAdd.toLowerCase() === item.text.toLowerCase()) {
      hasInTasksList = 1
    }
  })

  if (!textToAdd) {
    createErrorMessageBlock('Название задачи не должно быть пустым')
  } else if (hasInTasksList) {
    createErrorMessageBlock('Задача с таким названием уже существует')
  } else {
    //Иначе заталкиваю задачу в массив задач
    tasks.unshift({ id: `${index}`, completed: false, text: `${textToAdd}` })
    taskList = createTasksList()
    position.innerHTML = taskList.join('') //Обновляю лист задач
    createModelOverlay()
  }
})

position.addEventListener('click', (event) => {
  const { target } = event
  const deleteButton = target.closest('button')
  if (deleteButton) {
    if (deleteButton.classList.contains('task-item__delete-button')) {
      idTaskToBeDeleted = target.dataset.deleteTaskId
      showAndHideModelOverlay()
    } else if (deleteButton.classList.contains('delete-modal__cancel-button')) {
      showAndHideModelOverlay()
    } else if (
      deleteButton.classList.contains('delete-modal__confirm-button')
    ) {
      deleteTask(idTaskToBeDeleted)
      showAndHideModelOverlay()
    }
  }
})

function showAndHideModelOverlay() {
  // Скрытие и отображение модального окна
  const showModelOverlay = position.querySelector('.modal-overlay')
  showModelOverlay.classList.toggle('modal-overlay_hidden')
}

function createModelOverlay() {
  // Создание модального окна
  const modelOverlay = document.createElement('div')
  modelOverlay.className = 'modal-overlay modal-overlay_hidden'
  modelOverlay.innerHTML =
    '<div class="delete-modal"><h3 class="delete-modal__question">Вы действительно хотите удалить эту задачу?</h3><div class="delete-modal__buttons"><button class="delete-modal__button delete-modal__cancel-button">Отмена</button><button class="delete-modal__button delete-modal__confirm-button">Удалить</button></div></div>'
  position.prepend(modelOverlay)
}

function createErrorMessageBlock(text) {
  // Создание блока ошибки
  const errorMessageBlock = document.createElement('span')
  errorMessageBlock.className = 'error-message-block'
  errorMessageBlock.textContent = `${text}`
  createTasksBlock.insertAdjacentElement('beforeend', errorMessageBlock)
}

function deleteTask(event) {
  //Удаление задачи. В функцию передаю Id атрибут нажатой кнопки "Удалить"
  const taskItems = position.querySelectorAll('.task-item__delete-button')
  let foundId
  let buttonItem
  taskItems.forEach((item, id) => {
    //Ищу в массиве объект по полю id
    if (item.dataset.deleteTaskId === event) {
      foundId = id
      buttonItem = item
    }
  })
  const taskItem = buttonItem.closest('.task-item')

  tasks.splice(foundId, 1) //Удаляю из массива задачу

  taskItem.remove() // А теперь удаляю из DOM
}
