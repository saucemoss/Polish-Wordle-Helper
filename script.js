

async function loadLocalFile() {



    try {
      var output = document.getElementById("outputBox");
      var response = await fetch("slowa5.txt");
      if (!response.ok) throw new Error("Failed to load file");
      var content = await response.text();
      var words = content.split(',');

      var misses = [];
      var greens = [];
      var yellows = [];


      var elements = document.getElementsByTagName("input");
      for (var i=0; i<elements.length; i++) {

        if (elements[i].style.backgroundColor == "white" || elements[i].style.backgroundColor == ""){
          misses.push(elements[i].value);
        }
        if (elements[i].style.backgroundColor == "green"){
          greens[i%5] = elements[i].value;
        }
        if (elements[i].style.backgroundColor == "goldenrod"){
          yellows[i%5] = elements[i].value;
        }

      }


      for(var j = 0; j<words.length; j++){

        //filter out misses
        misses.forEach(e => {
          if(e != "" && words[j].includes(e)){
            words[j] = "";
          }
        });

        //compare with greens
        for(var l = 0; l<greens.length; l++){
          if(greens[l] != undefined && words[j] != "" && words[j].charAt(l)!=greens[l]){
              words[j] = "";
            }
        }
        //yellows - included in word but other position
        for (var n = 0; n<yellows.length; n++){
          if(words[j] != "" && yellows[n]!=undefined ){
            if(!words[j].includes(yellows[n]) || words[j].charAt(n)==yellows[n]){
              words[j]="";
            }
          }
        }

      }
      words = words.filter(element => element !== "")
      output.textContent = words;


  } catch (error) {
    console.error("Error:", error);
  }


  }

  function changeColor(color, id) {

    document.getElementById(id).style.backgroundColor = document.getElementById(id).style.backgroundColor == color ? "white" : color;

  }