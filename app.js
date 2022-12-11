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
let idTaskToBeDeleted = 0

const body = document.querySelector('body')
const myTask = document.createElement('h1')
const position = document.querySelector('.tasks-list')
let taskList = createTasksList()
myTask.textContent = 'Работа с DOM. Часть 2. Задание 3'
body.prepend(myTask)
createModelOverlay()
position.innerHTML = taskList.join('')

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
  }
})

position.addEventListener('click', (event) => {
  const deleteButton = event.target.closest('button')
  if (deleteButton) {
    showAndHideModelOverlay()

    const deleteModalButtons = body.querySelector('.delete-modal__buttons')
    deleteModalButtons.addEventListener('click', (event) => {
      const { classList } = event.target
      if (classList.contains('delete-modal__cancel-button')) {
        showAndHideModelOverlay()
      } else if (classList.contains('delete-modal__confirm-button')) {
        showAndHideModelOverlay()
        deleteTask(deleteButton)
      }
    })
  }
})

function showAndHideModelOverlay() {
  // Скрытие и отображение модального окна
  const showModelOverlay = body.querySelector('.modal-overlay')
  showModelOverlay.classList.toggle('modal-overlay_hidden')
}

function createModelOverlay() {
  // Создание модального окна
  const modelOverlay = document.createElement('div')
  modelOverlay.className = 'modal-overlay modal-overlay_hidden'
  modelOverlay.innerHTML =
    '<div class="delete-modal"><h3 class="delete-modal__question">Вы действительно хотите удалить эту задачу?</h3><div class="delete-modal__buttons"><button class="delete-modal__button delete-modal__cancel-button">Отмена</button><button class="delete-modal__button delete-modal__confirm-button">Удалить</button></div></div>'
  body.prepend(modelOverlay)
}

function createErrorMessageBlock(text) {
  // Создание блока ошибки
  const errorMessageBlock = document.createElement('span')
  errorMessageBlock.className = 'error-message-block'
  errorMessageBlock.textContent = `${text}`
  createTasksBlock.insertAdjacentElement('beforeend', errorMessageBlock)
}

function deleteTask(event) {
  //Если нажата кнопка "Удалить", то...
  const taskItem = event.closest('.task-item') //...ищу ближайшего родителя и...
  const taskItemText = taskItem.querySelector('.task-item__text') //...выбираю span, где расположен текст задачи.
  let indexRemovedElement = -1

  tasks.forEach((item, index) => {
    // Ищу в массиве объектов...
    if (taskItemText.textContent.trim() === item.text) {
      //...совпадение с удаляемой задачей по полю text...
      indexRemovedElement = index //...и нахожу индекс.
    }
  })

  tasks.splice(indexRemovedElement, 1) //Удаляю из массива задачу

  taskItem.remove() // А теперь удаляю из DOM
}

/*
position.addEventListener('click', (event) => {
  const deleteButton = event.target.closest('button')
  if (deleteButton) {
    showAndHideModelOverlay()
  }
})

const deleteModalButtons = body.querySelector('.delete-modal__buttons')
deleteModalButtons.addEventListener('click', (event) => {
  const { classList } = event.target
  if (classList.contains('delete-modal__cancel-button')) {
    showAndHideModelOverlay()
  } else if (classList.contains('delete-modal__confirm-button')) {
    showAndHideModelOverlay()
    deleteTask(deleteButton)
  }
})










position.addEventListener('click', (event) => {
  const deleteButton = event.target.closest('button')
  if (deleteButton) {
    showAndHideModelOverlay()

    const deleteModalButtons = body.querySelector('.delete-modal__buttons')
    deleteModalButtons.addEventListener('click', (event) => {
      const { classList } = event.target
      if (classList.contains('delete-modal__cancel-button')) {
        showAndHideModelOverlay()
      } else if (classList.contains('delete-modal__confirm-button')) {
        showAndHideModelOverlay()
        deleteTask(deleteButton)
      }
    })
  }
})
*/

/*

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

// На этот раз просто поменял логику создания новых задач как указано в задании, теперь она выглядит лаконично =)

let index = Date.now() //Переменная отвечает за индекс очередного добавленного в массив tasks объекта
let idTaskToBeDeleted = 0

const body = document.querySelector('body')
const myTask = document.createElement('h1')
const position = document.querySelector('.tasks-list')
let taskList = createTasksList()
myTask.textContent = 'Работа с DOM. Часть 2. Задание 3'
body.prepend(myTask)
createModelOverlay()
position.innerHTML = taskList.join('')

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
  }
})

position.addEventListener('click', (event) => {
  const deleteButton = event.target.closest('button')
  if (deleteButton) {
    showAndHideModelOverlay()
    idTaskToBeDeleted = event.target.dataset.deleteTaskId
  }
})

const deleteModalButtons = body.querySelector('.delete-modal__buttons')
deleteModalButtons.addEventListener('click', (event) => {
  const { classList } = event.target
  if (classList.contains('delete-modal__cancel-button')) {
    showAndHideModelOverlay()
  } else if (classList.contains('delete-modal__confirm-button')) {
    showAndHideModelOverlay()
    deleteTask(idTaskToBeDeleted)
  }
})

function showAndHideModelOverlay() {
  // Скрытие и отображение модального окна
  const showModelOverlay = body.querySelector('.modal-overlay')
  showModelOverlay.classList.toggle('modal-overlay_hidden')
}

function createModelOverlay() {
  // Создание модального окна
  const modelOverlay = document.createElement('div')
  modelOverlay.className = 'modal-overlay modal-overlay_hidden'
  modelOverlay.innerHTML =
    '<div class="delete-modal"><h3 class="delete-modal__question">Вы действительно хотите удалить эту задачу?</h3><div class="delete-modal__buttons"><button class="delete-modal__button delete-modal__cancel-button">Отмена</button><button class="delete-modal__button delete-modal__confirm-button">Удалить</button></div></div>'
  body.prepend(modelOverlay)
}

function createErrorMessageBlock(text) {
  // Создание блока ошибки
  const errorMessageBlock = document.createElement('span')
  errorMessageBlock.className = 'error-message-block'
  errorMessageBlock.textContent = `${text}`
  createTasksBlock.insertAdjacentElement('beforeend', errorMessageBlock)
}

function deleteTask(event) {
  //Если нажата кнопка "Удалить", то...
  const taskItems = position.querySelectorAll('.task-item__delete-button')
  let foundId = null
  let buttonItem = null
  taskItems.forEach((item, id) => {
    if (item.dataset.deleteTaskId === event) {
      foundId = id
      buttonItem = item
    }
  })
  const taskItem = buttonItem.closest('.task-item')

  tasks.splice(foundId, 1) //Удаляю из массива задачу

  taskItem.remove() // А теперь удаляю из DOM
}

*/
