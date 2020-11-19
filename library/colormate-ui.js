class ColormateUI {
    constructor() {
     
    }         
}

function _(id){
  return document.getElementById(id);
}

class Web {  
  static async Get (url){
    var res = await fetch(url);
    var text = await res.text();    
    return text;
  }
  static async Request(url, method, data){
  const response = await fetch(url, {
    method: method, // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
  }
}

class Bridge2API {
    static On(EventTrigger, Function) {
        window["Bridge2API_" + EventTrigger] = Function;
    }

    static Emit(EventTrigger, Arguments) {
        console.log("Call;" + EventTrigger + ";" + JSON.stringify(Arguments));
    }
    
    static Get(EventTrigger, Arguments, Function){
        this.On(EventTrigger, Function);
        this.Emit(EventTrigger, Arguments);
    }
  
    static Call(EventTrigger, Arguments) {
        if (window["Bridge2API_" + EventTrigger]) {
            window["Bridge2API_" + EventTrigger](Arguments);
        }
    }
}

class Airtable{
    constructor(base_id, api_key) {
        if (base_id) {
            this.base_id = base_id;
        }
        if (api_key) {
            this.api_key = api_key;
        }
    }

    GetTable(table, callback) {
        fetch(('https://api.airtable.com/v0/' + this.base_id + "/" + table + "?api_key=" + this.api_key))
            .then(response => response.json())
            .then(data => callback(data));
    }
}

class FirebaseDatabase{
  constructor(url){
    this.url = url;
  }
  
  async Get(path, ValueIfTagNotThere){
    var dt = await Web.Get(this.url + path + ".json");
        
    return dt;
  }
  
  async Update(path, new_data){
    var dt = await Web.Request(this.url + path + ".json", "PUT", new_data);
    return dt;
  }
}

class CustomListView{
  constructor(base, html, data){
    this.id = "CustomListView" + GenerateID();
    this.base = base;
    this.html = html;
    window.last_ele_id = 1;
  }
  
  AddElement(data){
    var new_html = this.html;
    var new_element = document.createElement("DIV");
    //new_element.id = 
    var id = this.id;
    //var last_id = this.last_ele_id;
    Object.keys(data).forEach(function(k){
        var key = k;
        var value = data[k];
        //console.log("changing..." + key);
        new_html = _replaceAll(key, "CustomListViewElement_Node" + id + "_" + CustomListView.last_id(), new_html);
        //console.log("OUT..." + new_html);
        data[key]['new_id'] = "CustomListViewElement_Node" + id + "_" + CustomListView.last_id();
      
        //console.log(CustomListView.last_id());
        CustomListView.ChangeLastID();
    });
    
    console.log(new_html);
    //console.log(this.ChangeLastID());
    
    _(this.base).appendChild(new_element);
    //new_element.id = "CustomListViewElement" + id + "_" + CustomListView.last_id();
    new_element.outerHTML = new_html;
    //new_element.className = "fill-flex";
    
    
    Object.keys(data).forEach(function(k){
        var key = k;
        var value = data[k];
      
        Object.keys(value).forEach(function(vk){
            var v_key = vk;
            var v_value = value[vk];            
            //console.log(JSON.stringify(data));
          
            //_(data[key]["new_id"]).setAttribute(v_key, v_value);
          
            _(data[key]["new_id"])[v_key] = v_value;
        });
    });
    //console.log(new_element.innerHTML);
    
  }
  
  static ChangeLastID(){
    window.last_ele_id++;
  }
  
  static last_id(){
    return window.last_ele_id;
  }
}

class ImageListView{
  constructor(base){
    this.id = "ImageListView" + GenerateID();
    this.base = base;
    this.html = "";
    this.last_used_id = 0;
  }
  
  AddElement(image, title, subtitle){
    var new_html = this.html;
    new_html = _replaceAll("###image###", image, new_html);
    new_html = _replaceAll("###title###", title, new_html);
    new_html = _replaceAll("###subtitle###", subtitle, new_html);
    
    var new_element = document.createElement("DIV");
    new_element.innerHTML = new_html;
    new_element.id = "ImageListViewElement" + this.id + "_" + this.last_used_id;
    new_element.style.width = "100%";
    new_element.className = "gravity-center";
    
    _(this.base).appendChild(new_element);
      
    this.last_used_id++;
  }
}

class Screen{
    constructor(ScreenHTML) {
        this.html = ScreenHTML;
    }
    Open() {
        //document.write("");
        //document.write(this.html);
        document.body.innerHTML = this.html;
    }
}

class Dialogue{
    constructor(dialogue_HTML) {
        this.Object = document.createElement("DIV");
        this.Object.className = "float fill";
        this.Object.innerHTML = dialogue_HTML;
        //console.log(this.Object.outerHTML);
    }
    Show() {
        document.body.prepend(this.Object);     
        //console.log("show");
    }
    Close() {
        document.body.removeChild(this.Object);
    }
}

class Widget{
    constructor() {
        
    }
}

class Clock{
    constructor(delay) {
        if (delay) {
            this.Delay = delay;
            this.Id = GenerateID();
            while (window[this.Id]) {
                this.Id = GenerateID();
            }
            //console.log(this.Id);
        }
    }

    Stop() {
        clearInterval(this.timer);
        this.running = false;
    }


    Start() {
        if (!this.running) {
            //var TriggerFunction = this.Trigger;
            //TriggerFunction.id = this.Id;
            this.timer = setInterval(window["Bridge2API_" + this.Id], this.Delay);
            this.running = true;
        }
        //console.log(this.Id);
    }

    SetDelay(delay) {
        if (delay) {
            this.Stop();
            this.Delay = delay;
            this.Start();
        }
    }

    OnTrigger(Function) {
        this.Stop();
        var id = this.Id;
        window["Bridge2API_" + id] = Function;
        if (this.running) {
            this.Start();
        }

    }
  
    static Delay(delayInms){
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(2);
        }, delayInms);
      });
    }
}

function ImportHTML(id) {
    var HTML = document.getElementById(id).outerHTML;
    document.getElementById(id).outerHTML = "";
    return HTML;
}

function GenerateID() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

function _replaceAll(from, to, inString){
  var st = inString;
  while(st.includes(from)){
    st = st.replace(from, to);
  }  
  return st;
}

function file_exists(file){
    if(window.localStorage[file] && window.localStorage[file] != ""){
        return true;
    }else{
        return false;
    }
}

function read(file){
    return window.localStorage[file];
}

function update(file, data, callback){
    window.localStorage[file] = data;
    if(callback){
        callback(data);
    }
}

function localImport(url, filename, callback){
    fetch(url)
      .then(response => response.text())
      .then(data => update(filename, data, callback));
      
}

function try_import(url, filename, callback){
    if(!file_exists(filename)){
        localImport(url, filename, callback);
    }else{
        callback();
    }
}

function new_import(url, filename, callback){
    update(filename);
    localImport(url, filename, callback);
}

function add_script(code){
    var script = document.createElement("SCRIPT");
    script.innerHTML = code;
    document.head.appendChild(script);
}

function add_html(code, top){
  if(top){
    document.body.innerHTML = code + document.body.innerHTML;
  }else{
    document.body.innerHTML += code;
  }    
}

function add_style(code){
    document.head.innerHTML += "<style>" + code + "</style>";
}

function visible(id){
  _(id).style.display = "block";
}

function show(id){
  visible(id);
}

function hide(id){
  _(id).style.display = "none";
}

async function require(filename){
  if(file_exists(filename)){
    return read(filename);
  }else{
    var res = await fetch(filename);
    var text = await res.text();
    update(filename, text);
    return text;
  }
}

