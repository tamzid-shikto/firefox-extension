var first_input_id = document.querySelector(".formTxtBox_2").id;
console.log(document.querySelector(".formTxtBox_2"));
first_input_id = first_input_id.replace("row", "");
first_input_id = first_input_id.replace("_1_1", "");

var f_i_n = parseInt(first_input_id);

var data = {};

//----------------------------------------
var name_box = _("row" + (f_i_n + 0) + "_1_1");
var email_box = _("row" + (f_i_n + 0) + "_1_2");

var z1_box = _("row" + (f_i_n + 3) + "_1_1");
var z2_box = _("row" + (f_i_n + 3) + "_1_2");
var z3_box = _("row" + (f_i_n + 3) + "_1_3");
var z4_box = _("row" + (f_i_n + 3) + "_1_4");
var z5_box = _("row" + (f_i_n + 3) + "_1_5");

var y1_box = _("row" + (f_i_n + 2) + "_1_1");
var y2_box = _("row" + (f_i_n + 2) + "_1_2");
var y3_box = _("row" + (f_i_n + 2) + "_1_3");


function replace_all__(str){
  var st = str;
  var from = "\"";
  var to = "";
  while(st.includes(from)){
    st = st.replace(from, to);
  }  
  return st;
}

function _(id){
  return document.getElementById(id);
}

function fill_now(id){   
  name_box.focus();
  name_box.value = replace_all__(data[id]["name"]);
  name_box.blur();
  
  email_box.focus();
  email_box.value = replace_all__(data[id]["email"]);
  email_box.blur();
  
  z1_box.focus();
  z1_box.value = "0";
  z1_box.blur();
  
  z2_box.focus();
  z2_box.value = "N/A";
  z2_box.blur();
  
  z3_box.focus();
  z3_box.value = "N/A";
  z3_box.blur();
  
  z4_box.focus();
  z4_box.value = "N/A";
  z4_box.blur();
  
  z5_box.focus();
  z5_box.value = "N/A";
  z5_box.blur();
  
  y1_box.focus();
  y1_box.value = "N/A";
  y1_box.blur();
  
  y2_box.focus();
  y2_box.value = "0";
  y2_box.blur();
  
  y3_box.focus();
  y3_box.value = "N/A";
  y3_box.blur();
  
  
  document.documentElement.scrollTop = 0;
  
  console.log(id);
}

set_buttons();

async function set_buttons(){
  var db_url = "https://shikto-98080.firebaseio.com/firebase-extension/data.json";
  var res = await fetch(db_url);
  var g_data = await res.text();  
  data = JSON.parse(g_data);

  var dtext = "tenderId";

  var box = document.createElement("DIV");
  document.body.appendChild(box);
  box.style = "height:auto;width:auto;position:fixed;bottom:0px;background:white;border: 2px solid black;";

  if(name_box != null){
    var result = "";

    for (var [key, value] of Object.entries(data)) {
      var k = key;
      var v = value;

      var n_btn = document.createElement("BUTTON");
      n_btn.innerHTML = k;
      n_btn.id = key;
      n_btn.style = "background:#2196F3;color:white;padding:10px;font-size:15px;border:0;border-radius:5px;margin:5px;cursor:pointer;";
      box.appendChild(n_btn);
      n_btn.setAttribute("onclick", "fill_now(this.id)");
    }

    console.log(document.querySelector(".formTxtBox_2").id);
  }else{
    var n_btn = document.createElement("BUTTON");
    n_btn.innerHTML = "I have seen";
    n_btn.style = "background:#2196F3;color:white;padding:10px;font-size:15px;border:0;border-radius:5px;margin:5px;cursor:pointer;";
    box.appendChild(n_btn);
    n_btn.setAttribute("onclick", "seen()");
  }
}

function seen(){
  var all_selects = document.getElementsByClassName("formSelect_1");
  console.log(all_selects);

  if(all_selects.length > 0){
    for(var i in all_selects){
      var this_select = all_selects[i];
      this_select.focus();
      this_select.value = this_select.length;
      this_select.blur();
      this_select.onchange();

      window.scrollTo(0,document.body.scrollHeight);
    }
  }
}









