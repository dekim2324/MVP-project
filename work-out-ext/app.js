var get = function(key) {
  return window.localStorage.getItem(key);
}

var create = function(key, value) {
  return window.localStorage.setItem(key, value);
}

var update = function(key, value) {
  return window.localStorage.setItem(key, value);
}

var removeKey = function(key) {
  return window.localStorage.removeItem(key);
}

// var removeValue = function()

var clear = function() {
  return window.localStorage.clear();
}

var getItemCount = function() {
  return window.localStorage.length;
}

var getKey = function(index) {
  return window.localStorage.key(index);
}

var displayData = function () {
  var dateKey = $('.date-input').val();
  let parsed = JSON.parse(get(dateKey));
  $('ul').html('');

  if (!get(dateKey)) {
    return $('ul').html('');
  } else {
    for (var i = 0; i < parsed.length; i++) {

        $('ul').append(
          `<li><i class="fas fa-backspace"></i>${' '}${parsed[i][0]} ${parsed[i][1]} ${parsed[i][2]}</li>`
        ).fadeIn();

  }
  }

}

var displayData2 = function() {

  let newKey = $('.date-input').val() + 's';
  let newVal = get(newKey);
  newVal = JSON.parse(newVal);

  if(get(newKey)){
    $('.date-here').html('')
    $('.date-here').append(`<div class="text-change">${newVal[2]}</div>`)
  }


  if(!get(newKey)){
    return $('.add-here').html('')
  } else {
    $('.add-here').html('')
    $('.add-here').append(
      `<span>Date: </span><div class='hist1'>${newVal[1]}</div>
      <div class=''>Training Type:  </ class=''><div class='hist2'>${newVal[0]}</div>
      <div>Comment: </div><div class='hist3'>${newVal[3]}</div>`)
  }

}


Date.prototype.toDateInputValue = (function() {
  var local = new Date(this);
  local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
  return local.toJSON().slice(0,10);
});

$(function() {
  let dateKey = $('.date-input').val();

  ($('.date-input').val(new Date().toDateInputValue())) //();

  displayData();
  displayData2();

  $('.container-outer').on('click', 'ul li i', function(){

    dateKey = $('.date-input').val();
    let parsed = JSON.parse(get(dateKey));

    var lineToDelete = $(this).parent().text().slice(1).split(' ').join('').trim();

    let newParsed = [];
    parsed.forEach(function(el) {
      if (el.join('').replace(/\s/g, '') !== lineToDelete) {
        newParsed.push(el)
      }
    });
    update(dateKey, JSON.stringify(newParsed))
    displayData()

    JSON.parse(get(dateKey)).length === 0 ? removeKey(dateKey) : null;

  })



  $('.date-select').on('change', '.date-input', function(){
    displayData();
    displayData2();
  })


  $("form").keypress(function(event){
    dateKey = $('.date-input').val();

    if(event.which === 13){

      if(dateKey !== ''){
        let firstVal = $("form input[type='text'").val();
        let secondVal = $("form input[type='number'").val();
        let thirdVal = $("form select").val();

        let value = [`${firstVal}`, `${secondVal}`, `${thirdVal}`];
        if (firstVal === '' || secondVal === '' || thirdVal === '') {
          return alert('Please fill in all fields!')
        }

        if(!get(dateKey)){
          create(dateKey, JSON.stringify([value]))
        } else {
          let parsed = JSON.parse(get(dateKey));
          parsed.push(value);
          update(dateKey, JSON.stringify(parsed))
        }

        let firstReset = $("form input[type='text'").val('')
        let secondReset = $("form input[type='number'").val('')
      } else {
        alert('insert date!')
      }

      displayData();
    }

  })


  // $('.submits').on('click', function(){
    $('.container-inner').on('click', '.subs', function(){
    let trainingType = $('.t-type').val();
    let dateVal = $('.date-input').val();
    let selected = $('input[name=radAnswer]:checked').val();
    let comment = $('.comments').val();

    let key = dateVal + 's';
    let value = [trainingType, dateVal, selected, comment]
    value = JSON.stringify(value);

    if(trainingType === '' || dateVal === '' || selected === ''){
      return alert('Please fill required inputs')
    }

    $('.comments').val('')
    $("form input[type='text'").val('');
    $("form input[type='number'").val('');

    create(key, value)
    displayData2()


  })

  $('i').css('cursor', 'pointer')
  $('.subs').css('cursor', 'pointer')
})

