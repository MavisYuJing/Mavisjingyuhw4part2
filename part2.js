/**
 * USER NAME: Jing Yu
 * CONTACT:jingu@bu.edu
 */

//unique id for tab
var id = 1
var tick = null
// show some message to user interface 
function customAlert(msg,time = false){
    if(tick){
        clearTimeout(tick)
    }

    let dom = document.getElementsByClassName("alert_slot")
    if(dom.length > 0){
        dom[0].innerHTML = msg
    }
    if(!time){
        
        tick = setTimeout(function(){
            dom[0].innerHTML ="" 
        },1000)
    }
    
}
function close(index){
    console.log(index)
}
// render and show table base on four points
function render(one, two, three, four,type=false){
    let dom = document.getElementById("table_slot")
    let _dom = document.getElementById("_table_slot")
    let {scrollTop: top, scrollLeft: left} = dom
    
    let html = ""
    let head = ""
    if(type){
        html += `<div>
            Col-Start-Point: ${one} &nbsp;&nbsp;
            Col-End-Point: ${two} &nbsp;&nbsp;
            Row-Start-Point: ${three} &nbsp;&nbsp;
            Row-End-Point: ${four} &nbsp;&nbsp;
        </div>`
    }
    for(let y = three ; y <= four ; y++){

        html += `<tr>`
        for(let x = one; x <= two ; x ++ ){

            if(y === three){
                if(x === one){
                    if(type){
                        head +=  `<tr><th></th><th>${x}</th>`
                    }else{
                        head +=  `<tr><th style='z-index: 88;position:relative;top: ${top}px'></th><th style='z-index: 88;position:relative;top: ${top}px'>${x}</th>`
                    }
                    
                }else{
                    if(type){
                        head +=  `<th >${x}</th>`
                    }else{
                        head +=  `<th >${x}</th>`
                    }
                    
                }
            }
            
            if(x === one){
                if(type){
                    html += `<td  >${y}</div></td><td>${parseInt(x*y)}</td>`
                }else{
                    html += `<td  >${y}</div></td><td>${parseInt(x*y)}</td>`
                }
                
            }else{
                html += `<td>${parseInt(x*y)}</td>`
            }
        }
        html += `</tr>`
          //appends last tab
        if(y === three){
            head += "</tr>"
        }
    }
     // template HTML for render function https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Traversing_an_HTML_table_with_JavaScript_and_DOM_Interfaces
    let _html = `
        <table class="tb" cellspacing="0" cellpadding="10"  border="1">
            <thead>
                ${head}
            </thead>
            <tbody>
                ${html}
            </tbody>
        </table>`

    
    if(type){
        _dom.innerHTML = _html
        return _html;
    }else{
        dom.innerHTML = _html
        customAlert("DONE!!!")
        return ""
    }
    
}

$.validator.addMethod("oneCheck", function(value, element){
    let two =  parseInt($('#two').val().trim()) 
    if(!isNaN(value) && !isNaN(two)) {
        
        if(!isNaN(two)){
            return this.optional(element) || (parseInt(value) < two); 
        }else{
            return this.optional(element);
        }
        
    } else {
        return this.optional(element)||true;
    }
}, "the start point must lower than the colunm end point, please try another one");

$.validator.addMethod("threeCheck", function(value, element){
    let four =  parseInt($('#four').val().trim()) 
    if(!isNaN(value) && !isNaN(four)) {
        if(!isNaN(four)){
            return this.optional(element) || (parseInt(value) < four); 
        }else{
            return this.optional(element);
        }
        
    } else {
        return this.optional(element)||true;
    }
}, "the start point must lower than the row end point, please try another one");


//wait the document ready

$(function(){
    var tabs = $( "#tabs" ).tabs({
        active: 1
    });

    console.log(tabs)
    var slider1 = $( "#slider_1" ).slider({
        range: "max",
        min: -50,
        max: 50,
        value: 0,
        slide: function( event, ui ) {
            $( "#one" ).val( ui.value );
            // $("#input_slot").validate()
            $("#input_slot").submit()
        }
    });
    var slider2 = $( "#slider_2" ).slider({
        range: "max",
        min: -50,
        max: 50,
        value: 0,
        slide: function( event, ui ) {
            $( "#two" ).val( ui.value );
            $("#input_slot").submit()
        }
    });
    var slider3 = $( "#slider_3" ).slider({
        range: "max",
        min: -50,
        max: 50,
        value: 0,
        slide: function( event, ui ) {
            $( "#three" ).val( ui.value );
            $("#input_slot").submit()
        }
    });
    var slider4 = $( "#slider_4" ).slider({
        range: "max",
        min: -50,
        max: 50,
        value: 0,
        slide: function( event, ui ) {
            $( "#four" ).val( ui.value );
            $("#input_slot").submit()
        }
    });
    $("#one").on('input propertychange', function(e) {
        console.log(e)
        if(e.target.value && !isNaN(e.target.value)){
            let val = parseInt(e.target.value)
            if(val > 50) val = 50
            if(val < -50) val = -50
            slider1.slider( "value",  val);
            
        }
    });
    $("#two").on('input propertychange', function(e) {
        console.log(e)
        if(e.target.value && !isNaN(e.target.value)){
            let val = parseInt(e.target.value)
            if(val > 50) val = 50
            if(val < -50) val = -50
            slider2.slider( "value",  val);
            
        }
    });
    $("#three").on('input propertychange', function(e) {
        console.log(e)
        if(e.target.value && !isNaN(e.target.value)){
            let val = parseInt(e.target.value)
            if(val > 50) val = 50
            if(val < -50) val = -50
            slider3.slider( "value",  val);
            
        }
    });
    $("#four").on('input propertychange', function(e) {
        console.log(e)
        if(e.target.value && !isNaN(e.target.value)){
            let val = parseInt(e.target.value)
            if(val > 50) val = 50
            if(val < -50) val = -50
            slider4.slider( "value",  val);
            
        }
    });
    $("#CloseOtherTabs").click(function(){
        let navs = $(".myTabs")
        console.log(navs)
        navs.remove()
        tabs.tabs( "refresh" )
        
    })
    $("#addTab").click(function(){

        let thtml = $("#_table_slot").html()
        if(thtml.trim()){
            tabs.find( ".ui-tabs-nav" ).append(
            ` <li class="myTabs" id='item_${id}' ><a href='#tabs-${id}'>tab${id}</a><span data-id="${id}" class='close'>x</span></li>`
            );
            tabs.append(`
            <div id="tabs-${id}" class="myTabs">
                <div class="table_slot">
                    ${thtml}
                </div>
            </div>
            `)
            tabs.tabs( "refresh" )
            id++
            customAlert("ADD TO TAB DONE!!!")
            $(".close").click(function(e){
                
                let id = e.target.dataset.id

                var options = tabs.tabs( "option" );
                console.log(options)
                $(`#item_${id}`).remove()
                $(`#tabs-${id}`).remove()
                tabs.tabs( "refresh" )
            })
        }else{
            customAlert("Please generate a table first!")
        }
        
    })
    $.validator.setDefaults({
        submitHandler: function(res) {
            console.log("defaul")
             //handle submit button click event
            let one = parseInt(document.getElementById("one").value)
            let two =  parseInt(document.getElementById("two").value)
            let three =  parseInt(document.getElementById("three").value)
            let four =  parseInt(document.getElementById("four").value)
            render(one, two, three, four)
            //render fake template https://vuejsdevelopers.com/2017/04/09/vue-laravel-fake-server-side-rendering/
            render(one, two, three, four, true)
            
        }
    });
    document.getElementById("table_slot").addEventListener("scroll",function(e){
        let {scrollLeft:left,scrollTop:top} = e.target
        let trs = document.getElementsByTagName("tr")

        for(let i=0; i<trs.length; i++){
            trs.item(i).firstElementChild.setAttribute("style",`z-index: 8;position:relative;left: ${left}px`)
            if(i===0){
                for(let j = 0 ; j<trs[i].children.length; j++){
                    trs.item(i).children.item(j).setAttribute("style",`z-index: 88;position:relative;top: ${top}px`)
                }
            }
            
        }
    })
    $("#input_slot").validate({
        rules: {
            one: {
                required: true,
                range:[-50, 50],
                number: true,
                oneCheck: true
            },
            two: {
                required: true,
                range:[-50, 50],
                number: true,
            },
            three: {
                required: true,
                range:[-50, 50],
                number: true,
                threeCheck: true
            },
            four: {
                required: true,
                range:[-50, 50],
                number: true,
            },
            
        },
        messages: {
            one: {
                required: "please provide a valid digit",
                range: "Please enter a number in the range of - 50 to 50",
                number:"please enter digital data"
            },
            two: {
                required: "please provide a valid digit",
                range: "Please enter a number in the range of - 50 to 50",
                number:"please enter digital data"
            },
            three: {
                required: "please provide a valid digit",
                range: "Please enter a number in the range of - 50 to 50",
                number:"please enter digital data"
            },
            four: {
                required: "please provide a valid digit",
                range: "Please enter a number in the range of - 50 to 50",
                number:"please enter digital data"
            }
        }
    });
    
})