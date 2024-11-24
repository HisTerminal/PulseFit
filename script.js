// Store exercises and their durations for each day
const exercises = {
    monday: [
      { name: 'Push-ups', duration: 30 },
      { name: 'Squats', duration: 45 },
      { name: 'Lunges', duration: 45 },
      { name: 'Plank', duration: 60 },
      { name: 'Burpees', duration: 60 }
    ],
    tuesday: [
      { name: 'Jumping Jacks', duration: 30 },
      { name: 'Mountain Climbers', duration: 45 },
      { name: 'Sit-ups', duration: 45 },
      { name: 'High Knees', duration: 30 },
      { name: 'Push-ups', duration: 45 }
    ],
    wednesday: [
      { name: 'Jumping Jacks', duration: 30 },
      { name: 'Plank', duration: 60 },
      { name: 'Squats', duration: 45 },
      { name: 'Lunges', duration: 45 },
      { name: 'Burpees', duration: 60 }
    ],
    thursday: [
      { name: 'Push-ups', duration: 30 },
      { name: 'Plank', duration: 60 },
      { name: 'Jumping Jacks', duration: 30 },
      { name: 'Mountain Climbers', duration: 45 },
      { name: 'Lunges', duration: 45 }
    ],
    friday: [
      { name: 'Burpees', duration: 60 },
      { name: 'Squats', duration: 45 },
      { name: 'Sit-ups', duration: 45 },
      { name: 'High Knees', duration: 30 },
      { name: 'Push-ups', duration: 30 }
    ],
    saturday: [
      { name: 'Jumping Jacks', duration: 30 },
      { name: 'Mountain Climbers', duration: 45 },
      { name: 'Plank', duration: 60 },
      { name: 'Squats', duration: 45 },
      { name: 'Burpees', duration: 60 }
    ]
  };
  
  let currentExercise = null;
  let timerInterval = null;
  let currentTime = 0;
  let isTimerRunning = false;
  
  // Event listener for day selection
  document.getElementById('day-select').addEventListener('change', function() {
    const selectedDay = this.value;
    if (selectedDay) {
      displayExercises(selectedDay);
    }
  });
  
  // Function to display exercises for the selected day
  function displayExercises(day) {
    const exerciseList = document.getElementById('exercise-list');
    exerciseList.innerHTML = ''; // Clear previous exercises
  
    exercises[day].forEach((exercise, index) => {
      const exerciseDiv = document.createElement('div');
      exerciseDiv.classList.add('exercise-item');
      exerciseDiv.innerHTML = `
        <span>${exercise.name} - ${formatTime(exercise.duration)}</span>
        <button onclick="startExercise(${index}, '${day}')">Start</button>
      `;
      exerciseList.appendChild(exerciseDiv);
    });
  }
  
  // Function to start the selected exercise
  function startExercise(index, day) {
    if (isTimerRunning) {
      clearInterval(timerInterval); // Stop the current timer if running
      isTimerRunning = false;
    }
  
    // Set the current exercise and its duration
    currentExercise = exercises[day][index];
    currentTime = currentExercise.duration;
  
    // Show the Done button
    document.getElementById('done-button').style.display = 'inline-block';
  
    // Start the timer
    startTimer();
  }
  
  // Function to start the timer
  function startTimer() {
    const timerElement = document.getElementById('timer');
    const progressBar = document.getElementById('progress');
  
    // Start the countdown
    timerInterval = setInterval(function() {
      if (currentTime <= 0) {
        clearInterval(timerInterval); // Stop the timer when it reaches 0
        isTimerRunning = false;
        document.getElementById('beep-sound').play(); // Play beep sound
        alert('Time is up! Take a 5-minute rest.');
  
        logExercise(); // Log the completed exercise
        timerElement.textContent = '00:00'; // Reset timer to 00:00
        document.getElementById('done-button').style.display = 'none'; // Hide Done button
        return;
      }
  
      currentTime--;
      timerElement.textContent = formatTime(currentTime); // Update timer display
      updateProgressBar(currentTime); // Update progress bar
    }, 1000);
  
    isTimerRunning = true;
  }
  
  // Function to stop the timer manually when "Done" is clicked
  function stopTimer() {
    clearInterval(timerInterval); // Stop the timer
    logExercise(); // Log the exercise if stopped before time is up
    document.getElementById('done-button').style.display = 'none'; // Hide "Done" button
    const timerElement = document.getElementById('timer');
    timerElement.textContent = '00:00'; // Reset timer to 00:00
    isTimerRunning = false;
  }
  
  // Function to log completed exercises
  function logExercise() {
    const log = document.getElementById('exercise-log');
    const logItem = document.createElement('li');
    logItem.textContent = `${currentExercise.name} - ${formatTime(currentExercise.duration)} - Completed`;
    log.appendChild(logItem); // Add the completed exercise to the log
    currentExercise = null; // Reset current exercise
  }
  
  // Function to format time (minutes:seconds)
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  }
  
  // Function to update the progress bar
  function updateProgressBar(currentTime) {
    const totalTime = currentExercise.duration;
    const progress = (currentTime / totalTime) * 100;
    const progressBar = document.getElementById('progress');
    progressBar.style.width = `${progress}%`; // Update progress bar width
  }
  
  // Event listener for the "Done" button
  document.getElementById('done-button').addEventListener('click', stopTimer);
  