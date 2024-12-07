// script.js

const taskInput = document.getElementById('taskInput');
const taskDate = document.getElementById('taskDate');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const quoteElement = document.getElementById('quote');
const progressChartCanvas = document.getElementById('progressChart');

const quotes = [
  "Discipline is the bridge between goals and accomplishment. - Jim Rohn",
  "We do today what they won’t, so tomorrow we can do what they can’t. - Dwayne Johnson",
  "Discipline equals freedom. - Jocko Willink",
  "Success is nothing more than a few simple disciplines practiced every day. - Jim Rohn",
  "Without self-discipline, success is impossible. - Lou Holtz"
];

let tasks = [];
let completedTasks = 0;

// Display a random quote
function displayQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  quoteElement.textContent = quotes[randomIndex];
}

// Add Task
addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  const taskDueDate = taskDate.value;

  if (taskText === '' || taskDueDate === '') {
    alert('Please enter a task and select a date.');
    return;
  }

  const task = {
    text: taskText,
    dueDate: taskDueDate,
    completed: false,
  };
  tasks.push(task);
  renderTaskList();
  taskInput.value = '';
  taskDate.value = '';
  updateChart();
});

// Render Task List
function renderTaskList() {
  taskList.innerHTML = ''; // Clear existing tasks
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span style="text-decoration: ${task.completed ? 'line-through' : 'none'};">
        ${task.text} (Due: ${task.dueDate})
      </span>
      <button class="delete-btn" data-index="${index}">Delete</button>
    `;

    // Mark task as complete/incomplete
    li.querySelector('span').addEventListener('click', () => {
      task.completed = !task.completed;
      renderTaskList();
      updateChart();
    });

    // Delete task
    li.querySelector('.delete-btn').addEventListener('click', (e) => {
      tasks.splice(index, 1);
      renderTaskList();
      updateChart();
    });

    taskList.appendChild(li);
  });
}

// Chart Configuration
const ctx = progressChartCanvas.getContext('2d');
const chart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['Completed Tasks', 'Remaining Tasks'],
    datasets: [{
      data: [0, 1], // Initial values
      backgroundColor: ['#E5D4ED', '#6D72C3'], // Updated colors
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#352230', // Legend color matching theme
          font: {
            size: 16, // Increased font size
          }
        }
      }
    }
  }
});

// Update Chart Data
function updateChart() {
  completedTasks = tasks.filter(task => task.completed).length;
  const remainingTasks = tasks.length - completedTasks;
  chart.data.datasets[0].data = [completedTasks, remainingTasks];
  chart.update();
}

// Initial Setup
displayQuote();
updateChart();
