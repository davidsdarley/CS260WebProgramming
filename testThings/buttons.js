function sayHello() {
  alert("Hello! The button worked!")
}
function sayGoodbye(){
  alert("Goodbye! The button worked!")
}

function diaglogue(){
  document.getElementById("dialogue").innerHTML = "General Kenobi!"
}
function progress(){
  let lines = ["Hello There!", "General Kenobi!", "You are a bold one"]
  let curLine = document.getElementById("dialogue").innerHTML
  let newline = lines[0]
  if (curLine == lines[0]){ 
    newline = lines[1]
  }
  else if (curLine == lines[1]){
    newline = lines[2]
  }
  document.getElementById("dialogue").innerHTML = newline
}