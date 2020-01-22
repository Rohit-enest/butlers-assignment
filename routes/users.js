var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/allocateAndReport', function (req, res, next) {
  const { body } = req;

  // sort tasks into decanding order 
  const tasks = body.sort((x, y) => y.hours - x.hours);
  const butlers = [];
  const totalTime = tasks.map(x => x.hours).reduce((a, b) => a + b, 0);
  const butlersCount = Math.ceil(totalTime / 8);
  const assignedTasks = [];

  for (var i = 0; i < butlersCount; i++) {
    let butler = {
      id: i,
      tasks: [],
      totalTime: 0
    };

    for (let index = 0; index < 8; index++) {
      tasks.forEach(task => {
        // check if task is assigned to butler or not 
        const isAssigned = assignedTasks.some(y => y.requestId == task.requestId);

        // if task is not assigned yet
        if (!isAssigned) {
          // imagnire object to check if time exceed or not 
          const tempTotalTime = butler.totalTime + task.hours;
          if (butler.totalTime <= 8 && tempTotalTime <= 8) {
            butler.totalTime += task.hours;
            butler.tasks.push(task);
            assignedTasks.push(task);
          }
        }
      });
    }
    butlers.push(butler);
  }
  res.send(butlers);
});

module.exports = router;
