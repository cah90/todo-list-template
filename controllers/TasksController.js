const fs = require('fs')

const tasks = require('../tasks.json')

function writingOnJSONFile(filename, data) {
  fs.writeFile(filename, JSON.stringify(data, null, 2), function(err) {
    if (err) {
      console.log("Write file error.")
    }
  })
}


module.exports = {

  all(req,res) {
    allTasks = tasks.allTasks

    return res.render("index", {tasks: allTasks})
  }, 

  create(req,res) {

    return res.render("create")
  },

  post(req,res) {
    const data = req.body

    const lastTask = tasks.allTasks[tasks.allTasks.length - 1]
    let id

    if(lastTask) {
      id = lastTask.id + 1
    } else {
      id = 1
    }

    tasks.allTasks.push({
      id,
      ...data
    })

    writingOnJSONFile("tasks.json", tasks)

    res.redirect('/tasks')
  },

  edit(req,res) {
    const {id} = req.params

    for(task of tasks.allTasks) {
      if(task.id == id) {
        return res.render("edit", {task})
      } 
    }

    return res.send("We did not find the requested task.")
  }, 
  
  put(req,res) {
    const data = req.body
    data.id = Number(data.id)

    for(let i = 0; i < tasks.allTasks.length; i++) {
      if(tasks.allTasks[i].id == data.id) {
        tasks.allTasks[i] = data
      }
    }

    writingOnJSONFile("tasks.json", tasks)

    res.redirect('/tasks')

  },

  delete(req,res) {
    const {id} = req.body

    for(let i = 0; i < tasks.allTasks.length; i++) {
      if(tasks.allTasks[i].id == id) {
        tasks.allTasks.splice(i, 1)
      }
    }

    writingOnJSONFile("tasks.json", tasks)

    res.redirect('/tasks')
  },

  deleteLink(req,res) {
    const {id} = req.params

    for(let i = 0; i < tasks.allTasks.length; i++) {
      if(tasks.allTasks[i].id == id) {
        tasks.allTasks.splice(i,1)
      }
    }

    writingOnJSONFile("tasks.json", tasks)

    res.redirect('/tasks')

  }

}