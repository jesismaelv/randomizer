window.addEventListener("keydown", function(e){
  if (!e) e = window.event;
  var keyCode = e.keyCode || e.which;
  console.log(keyCode);
  if (keyCode == '13'){
    spinOptions();
    return false;
  }
  if (keyCode == '16'){
    toggleCurrentOption();
    return false;
  }
});

zoom = document.querySelectorAll('[data-zoom]');
for( let i = 0; i < zoom.length; i++) {
  zoom[i].addEventListener('click', () => {
    growth = zoom[i].getAttribute('data-zoom');
    const container = document.querySelector('.ruleta__answer__container');
    let fontSize = parseInt(container.style.fontSize);
    if(growth == 'true') fontSize++;
    else fontSize--;
    container.style.fontSize = fontSize + 'px';
  });
}

function spinOptions() {
  const options = document.querySelectorAll('.ruleta__option:not(.--disabled)');
  document.querySelector('[data-spin]').classList.add('--active');
  var interval = setInterval(() => {
    const total = options.length;
    const random = Math.floor(Math.random() * total)
    chooseAvailableOption(random);
  }, 100);

  setTimeout(() => {
    clearInterval(interval);
    document.querySelector('[data-spin]').classList.remove('--active');
  }, 3000);
}

spin = document.querySelectorAll('[data-spin]');
for( let i = 0; i < zoom.length; i++) {
  if(typeof spin[i] === 'undefined') continue;
  spin[i].addEventListener('click', () => {
    spinOptions();
  });
}

toggle = document.querySelector('[data-toggle]');
toggle.addEventListener('click', () => {
  toggleCurrentOption();
});

function toggleCurrentOption() {
  document.querySelector('[data-toggle]').classList.add('--active');
  element = document.querySelector('.ruleta__option.--current');
  if(element.classList.contains('--disabled')) {
    element.classList.remove('--disabled');
  } else {
    element.classList.add('--disabled');
  }
  setTimeout(() => {
    document.querySelector('[data-toggle]').classList.remove('--active');
  }, 100);
}

edit = document.querySelectorAll('[data-edit]');
for( let i = 0; i < edit.length; i++) {
  edit[i].addEventListener('blur', () => {
    field = edit[i].getAttribute('data-edit');
    html = edit[i].innerHTML;
    document.querySelector('.ruleta__option.--current').setAttribute('data-' + field, html);
    if(field == 'title') {
      document.querySelector('.ruleta__option.--current [data-option]').innerHTML = html;
    }
  });
}

dataActive = document.querySelectorAll('[data-active]');
for( let i = 0; i < dataActive.length; i++) {
  dataActive[i].addEventListener('click', () => {
    selector = dataActive[i].getAttribute('data-active');
    element = document.querySelector(selector);
    if(element.classList.contains('--active')) {
      element.classList.remove('--active');
    } else {
      element.classList.add('--active');
    }
  });
}

remove = document.querySelectorAll('[data-remove]');
for( let i = 0; i < remove.length; i++) {
  remove[i].addEventListener('click', () => {
    remove[i].parentNode.remove();
  });
}

document.addEventListener('click',function(e){
  if(e.target && e.target.hasAttribute('data-option')){
    element = e.target.parentNode;
    array = document.querySelectorAll('.ruleta__option');
    index = getIndexOf(element, array);
    chooseOption(index);
   }
});

function getIndexOf(element, array) {
  for( let i = 0; i < array.length; i++) {
    if(element == array[i]) return i;
  }
}

add = document.querySelectorAll('[data-add]');
for( let i = 0; i < add.length; i++) {
  add[i].addEventListener('click', () => {
    document.querySelector('.ruleta__list').insertAdjacentHTML('beforeend', `<li class="ruleta__option"
    data-title="This new title"
    data-subtitle="This new subtitle"
    data-uptitle="This new uptitle">
  <button data-option> This new title </button>
  <button class="button-remove" data-remove>
    X
  </button>
</li>`)
  });
}


function chooseAvailableOption(index) {
  const allOptions = document.querySelectorAll('.ruleta__option');
  removeClass(allOptions, '--current');
  const options = document.querySelectorAll('.ruleta__option:not(.--disabled)');
  options[index].classList.add('--current');

  const title = options[index].getAttribute('data-title');
  const uptitle = options[index].getAttribute('data-uptitle');
  const subtitle = options[index].getAttribute('data-subtitle');

  document.querySelector('.title').innerHTML = title;
  document.querySelector('.subtitle').innerHTML = subtitle;
  document.querySelector('.uptitle').innerHTML = uptitle;
}

function chooseOption(index) {
  const options = document.querySelectorAll('.ruleta__option');
  removeClass(options, '--current');
  options[index].classList.add('--current');

  const title = options[index].getAttribute('data-title');
  const uptitle = options[index].getAttribute('data-uptitle');
  const subtitle = options[index].getAttribute('data-subtitle');

  document.querySelector('.title').innerHTML = title;
  document.querySelector('.subtitle').innerHTML = subtitle;
  document.querySelector('.uptitle').innerHTML = uptitle;
}

function removeClass(arr, cls) {
  for( let i = 0; i < arr.length; i++) {
    arr[i].classList.remove(cls);
  }
}