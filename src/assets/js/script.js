'use strict';

document.addEventListener('DOMContentLoaded', () => {

  $('.menu-toggle-cont').click(function (e) {
    e.preventDefault();
    if (!$(this).hasClass('menu-toggle-cont_active')) {
      $(this).addClass('menu-toggle-cont_active');
      $('.fixed-menu').slideDown(300);
      $('body').addClass('hidd');
    } else {
      $(this).removeClass('menu-toggle-cont_active');
      $('.fixed-menu').slideUp(300);
      $('body').removeClass('hidd');
    }
  });

  document.querySelectorAll('.main-menu li a').forEach(link => {
    link.addEventListener('click', function (e) {


      document.querySelectorAll('.main-menu li a').forEach(link => {
        link.classList.remove('active');
      });

      this.classList.add('active');

      const targetId = this.getAttribute('data-target');

      if (targetId) {
        e.preventDefault();
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  function onScroll() {
    const sections = document.querySelectorAll('.block-content');
    const sidebarLinks = document.querySelectorAll('.main-menu li a');

    let currentSectionId = '';

    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      const sectionHeight = section.offsetHeight;

      if (sectionTop <= window.innerHeight / 2 && sectionTop + sectionHeight > window.innerHeight / 2) {
        currentSectionId = section.getAttribute('id');
      }
    });

    sidebarLinks.forEach(link => {
      const targetId = link.getAttribute('data-target');
      if (targetId === currentSectionId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', onScroll);

  function checkFormCompletion(formGroup, buttonAdd) {
    const allInputsFilled = Array.from(formGroup.querySelectorAll('input[required]')).every(input => {
      if (input.type === 'file') {
        return input.files.length > 0;
      } else {
        return input.value.trim() !== '';
      }
    });

    if (allInputsFilled) {
      buttonAdd.removeAttribute('disabled');
    } else {
      buttonAdd.setAttribute('disabled', 'disabled');
    }
  }
  function addInputListeners(formGroup, buttonAdd) {
    const inputs = formGroup.querySelectorAll('input[required]');

    inputs.forEach(input => {
      input.addEventListener('input', function () {
        checkFormCompletion(formGroup, buttonAdd);
      });
    });
  }




  function addNewFileInput(targetBlock, indexButton) {
    let inputName = document.createElement('input');
    inputName.classList.add('form-control');
    inputName.setAttribute('type', 'text');
    inputName.setAttribute('placeholder', 'Укажите поставщика');
    inputName.setAttribute('required', 'required');

    let inputCount = document.createElement('input');
    inputCount.classList.add('form-control');
    inputCount.setAttribute('type', 'text');
    inputCount.setAttribute('placeholder', 'Количество коробов');
    inputCount.setAttribute('required', 'required');


    function createFileInput(index) {
      let inputFile = document.createElement('input');
      inputFile.classList.add('form-input', 'actual-btn');
      inputFile.setAttribute('type', 'file');
      inputFile.setAttribute('id', `button-${indexButton}-${index}`);
      inputFile.setAttribute('required', 'required');

      let formFileContent = document.createElement('div');
      formFileContent.classList.add('form-file__content');

      let fileLabel = document.createElement('span');
      fileLabel.classList.add('form-file__label');
      fileLabel.textContent = 'Файл не выбран';

      let fileChosen = document.createElement('span');
      fileChosen.classList.add('form-file__chosen');
      fileChosen.textContent = 'файл';

      formFileContent.appendChild(fileLabel);
      formFileContent.appendChild(fileChosen);

      let fileButtonLabel = document.createElement('label');
      fileButtonLabel.classList.add('form-file__button');
      fileButtonLabel.setAttribute('for', `button-${indexButton}-${index}`);
      fileButtonLabel.textContent = 'Выберите файл';

      let fileClearButton = document.createElement('button');
      fileClearButton.classList.add('form-file__clear');
      fileClearButton.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20">
              <path d="M5.455,20A2.858,2.858,0,0,1,2.646,17.61L.894,7.525A1.1,1.1,0,1,1,3.056,7.14L4.808,17.226a.659.659,0,0,0,.648.551h7.087a.66.66,0,0,0,.649-.551L14.944,7.14a1.1,1.1,0,1,1,2.161.384L15.353,17.61A2.859,2.859,0,0,1,12.543,20H5.455ZM16.9,5.777H1.1a1.111,1.111,0,0,1,0-2.222H4.939V2.888A2.875,2.875,0,0,1,7.793,0h2.415a2.875,2.875,0,0,1,2.853,2.889v.667H16.9a1.111,1.111,0,0,1,0,2.222M7.134,3.555h3.732V2.888a.664.664,0,0,0-.659-.667H7.793a.663.663,0,0,0-.659.667Z" transform="translate(0 0.001)" fill="#a2b6c2"/>
          </svg>
      `;

      let formItem = document.createElement('div');
      formItem.classList.add('form-item', 'form-file');

      formItem.appendChild(inputFile);
      formItem.appendChild(formFileContent);
      formItem.appendChild(fileButtonLabel);
      formItem.appendChild(fileClearButton);

      return formItem;
    }

    const targetForm = document.createElement('div');
    targetForm.classList.add('block-suppliers__item');

    let nameGroup = document.createElement('div');
    nameGroup.classList.add('form-group');
    let nameLabel = document.createElement('label');
    nameLabel.textContent = 'Поставщик';
    nameGroup.appendChild(nameLabel);
    nameGroup.appendChild(inputName);

    let countGroup = document.createElement('div');
    countGroup.classList.add('form-group');
    let countLabel = document.createElement('label');
    countLabel.textContent = 'Количество коробов';
    countGroup.appendChild(countLabel);
    countGroup.appendChild(inputCount);

    let fileGroup1 = document.createElement('div');
    fileGroup1.classList.add('form-group');
    let fileLabel1 = document.createElement('label');
    fileLabel1.textContent = 'Фото документа';
    fileGroup1.appendChild(fileLabel1);
    fileGroup1.appendChild(createFileInput(1));

    let fileGroup2 = document.createElement('div');
    fileGroup2.classList.add('form-group');
    let fileLabel2 = document.createElement('label');
    fileLabel2.textContent = 'Фото упаковки';
    fileGroup2.appendChild(fileLabel2);
    fileGroup2.appendChild(createFileInput(2));

    let nameButton = document.createElement('div');
    nameButton.classList.add('form-group');
    let button = document.createElement('button');
    button.classList.add('button');
    button.classList.add('button-orange');
    button.classList.add('form-file__delete');
    button.innerHTML = `Удалить`;
    nameButton.appendChild(button);

    targetForm.appendChild(nameGroup);
    targetForm.appendChild(countGroup);
    targetForm.appendChild(fileGroup1);
    targetForm.appendChild(fileGroup2);
    targetForm.appendChild(nameButton);

    targetBlock.appendChild(targetForm);

    bindFileInputEvents();

    return targetForm;
  }

  function bindFileInputEvents() {
    document.querySelectorAll('.form-item .actual-btn').forEach(function (inputFile) {
      const fileChosen = inputFile.closest('.form-item').querySelector('.form-file__chosen');
      const fileLabel = inputFile.closest('.form-item').querySelector('.form-file__label');
      const clearButton = inputFile.closest('.form-item').querySelector('.form-file__clear');
      const fileButton = inputFile.closest('.form-item').querySelector('.form-file__button');
      const buttonAdd = document.querySelector('.button-add');

      inputFile.addEventListener('change', function () {
        if (this.files.length > 0) {
          fileChosen.textContent = this.files[0].name;
          fileChosen.classList.add('show');
          fileLabel.classList.add('hide');
          clearButton.classList.add('show');
          fileButton.classList.add('button-hidden');
        } else {
          fileChosen.classList.remove('show');
          fileChosen.textContent = '';
          fileLabel.classList.remove('hide');
          clearButton.classList.remove('show');
          fileButton.classList.remove('button-hidden');
        }

        checkFormCompletion(inputFile.closest('.block-suppliers__item'), buttonAdd);
      });

      clearButton.addEventListener('click', function (event) {
        event.preventDefault();
        inputFile.value = '';  // Очищаем инпут
        fileChosen.classList.remove('show');
        fileChosen.textContent = '';
        fileLabel.classList.remove('hide');
        clearButton.classList.remove('show');
        fileButton.classList.remove('button-hidden');

        checkFormCompletion(inputFile.closest('.block-suppliers__item'), buttonAdd);
      });
    });
  }
  window.addEventListener('load', onScroll);

  document.querySelector('body').addEventListener('click', e => {
    if (e.target.closest('.main-menu__link') && (window.innerWidth <= 991)) {
      $('.fixed-menu').slideUp(300);
      $('body').removeClass('hidd');
      $('.menu-toggle-cont').removeClass('menu-toggle-cont_active');
    }
    if (e.target.closest('.form-file__delete')) {
      const target = e.target.closest('.block-suppliers__item');

      target.remove();

      const blocks = document.querySelectorAll('.block-suppliers__item');
      if (blocks.length === 0) {
        document.querySelector('.button-add').removeAttribute('disabled');
      }
    }
    if (e.target.closest('.to-calculate')) {
      document.querySelector('#calculator').scrollIntoView({ behavior: 'smooth' });
    };
    if (e.target.closest('.button-edit')) {
      document.querySelector('body').classList.add('edit-open');
      e.target.closest('.orders-item').querySelector('.form-edit__hidden').classList.add('show');
    };
    if (e.target.closest('.form-edit__hidden__close')) {
      document.querySelector('body').classList.remove('edit-open');
      document.querySelectorAll('.form-edit__hidden').forEach(item => item.classList.remove('show'));
    };
    if (e.target.closest('.button-add')) {
      const buttonAdd = e.target.closest('.button-add');
      let block = document.querySelector('.block-suppliers');
      let indexButton = document.querySelectorAll('.block-suppliers .block-suppliers__item').length + 1;

      const newFormGroup = addNewFileInput(block, indexButton);

      buttonAdd.setAttribute('disabled', 'disabled');

      addInputListeners(newFormGroup, buttonAdd);
    }
  });


  window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
      document.querySelector('.header').classList.add('sticky');
    } else {
      document.querySelector('.header').classList.remove('sticky');
    }
  });

  if (window.scrollY > 0) {
    document.querySelector('.header').classList.add('sticky');
  } else {
    document.querySelector('.header').classList.remove('sticky');
  }

  setTimeout(function () {
    $('select').styler();
  }, 100)

  jQuery(function ($) {
    $(".phone").mask("+7 (999) 999 - 99 - 99");
  });


  function initFileInputFunctionality(formFile) {
    const actualBtn = formFile.querySelector('.actual-btn');
    const fileChosen = formFile.querySelector('.form-file__chosen');
    const fileCLabel = formFile.querySelector('.form-file__label');
    const fileButton = formFile.querySelector('.form-file__button');
    const clearButton = formFile.querySelector('.form-file__clear');

    if (actualBtn) {
      actualBtn.addEventListener('change', function () {
        if (this.files.length === 0) {
          fileChosen.classList.remove('show');
          fileChosen.textContent = '';
        } else {
          fileChosen.textContent = this.files[0].name;
          fileChosen.classList.add('show');
          fileCLabel.classList.add('hide');
          fileButton.classList.add('button-hidden');
          clearButton.classList.add('show');
        }
      });

      clearButton.addEventListener('click', function (event) {
        event.preventDefault();
        actualBtn.value = '';
        fileChosen.classList.remove('show');
        fileChosen.textContent = '';
        fileCLabel.classList.remove('hide');
        fileButton.classList.remove('button-hidden');
        clearButton.classList.remove('show');
      });
    }
  };

  function initAllFileInputs() {
    document.querySelectorAll('.form-file').forEach(function (formFile) {
      initFileInputFunctionality(formFile);
    });
  }

  initAllFileInputs();

  document.querySelectorAll('input[name="calculator-type"]').forEach(input => {
    input.addEventListener('change', () => {
      const boxContent = document.querySelector('#box-block');
      const indpalletContent = document.querySelector('#pallet-block');
      const cubeContent = document.querySelector('#cube-block');

      document.querySelector('.item-total').classList.remove('show');
      document.querySelector('#to-request').classList.remove('show');


      if (input.value === 'box') {
        boxContent.classList.add('show');
        indpalletContent.classList.remove('show');
        cubeContent.classList.remove('show');
        document.querySelector('.form-group__type').classList.remove('show');
      }
      if (input.value === 'pallet') {
        boxContent.classList.remove('show');
        indpalletContent.classList.add('show');
        cubeContent.classList.remove('show');
        document.querySelector('.form-group__type').classList.add('show');
      }
      if (input.value === 'cube') {
        boxContent.classList.remove('show');
        indpalletContent.classList.remove('show');
        cubeContent.classList.add('show');
        document.querySelector('.form-group__type').classList.remove('show');
      }
    });
  });


  if (document.querySelector('.calculator')) {
    const calcButton = document.getElementById("button-calc");

    // Функция проверки заполненности обязательных полей
    function checkRequiredFields(inputs) {
      let allFilled = true;

      inputs.forEach(input => {
        const parent = input.closest(".form-group");
        if (!input.value.trim()) {
          allFilled = false;
          input.classList.add("error");
          parent.classList.add("form-group__error");
        } else {
          input.classList.remove("error");
          parent.classList.remove("form-group__error");
        }
      });
      return allFilled;
    }

    // Функция для установки обработчиков на инпуты с data-required
    const inputsTotal = document.querySelectorAll('input[data-required]');
    const keyupEvents = (inputs) => {
      inputs.forEach(input => {
        input.addEventListener("input", () => {
          const parent = input.closest(".form-group");
          if (!input.value.trim()) {
            input.classList.add("error");
            parent.classList.add("form-group__error");
          } else {
            input.classList.remove("error");
            parent.classList.remove("form-group__error");
          }
        });
      });
    };

    keyupEvents(inputsTotal);

    const inputsNumbres = document.querySelectorAll('input.size-control');

    // inputsNumbres.forEach(input => {
    //   input.addEventListener("input", (event) => {
    //     let value = event.target.value;

    //     value = value.replace(/,/g, ".");

    //     if (value.startsWith(".")) {
    //       value = "0" + value;
    //     }

    //     value = value.replace(/[^0-9.]/g, "");

    //     const parts = value.split(".");
    //     if (parts.length > 2) {
    //       value = parts[0] + "." + parts[1];
    //     }

    //     event.target.value = value;
    //   });
    // });

    inputsNumbres.forEach(input => {
      input.addEventListener("input", (event) => {
        let value = event.target.value;

        value = value.replace(/,/g, ".");

        if (value.startsWith(".")) {
          value = "0" + value;
        }

        value = value.replace(/[^0-9.]/g, "");

        value = value.replace(/^0+(?=\d)/, "");

        const parts = value.split(".");
        if (parts.length > 2) {
          value = parts[0] + "." + parts[1];
        }

        event.target.value = value;
      });
    });

    const inputs = document.querySelectorAll("input.form-control.input-integer");

    inputs.forEach(input => {
      input.addEventListener("input", (event) => {
        let value = event.target.value;

        value = value.replace(/[^0-9]/g, "");

        event.target.value = value;
      });
    });

    // Функция для расчета объема коробки
    function calculateBoxVolume() {
      const inputs = document.querySelectorAll('#box-block .form-control');
      if (!checkRequiredFields(inputs)) {
        return;
      }

      const length = parseFloat(document.querySelector('input[name="length-box"]').value) || 0;
      const width = parseFloat(document.querySelector('input[name="width-box"]').value) || 0;
      const height = parseFloat(document.querySelector('input[name="height-box"]').value) || 0;
      const weight = parseFloat(document.querySelector('input[name="weight-box"]').value) || 0;

      let volume = length * width * height;

      volume = volume.toFixed(3);

      const volumeInput = document.querySelector('input.form-control.size-control.width-control');
      volumeInput.value = volume;

      const citySelect = document.querySelector('select[name="city-appointments"]');
      if (!checkCitySelection(citySelect)) {
        return;
      }

      const selectedOption = citySelect.options[citySelect.selectedIndex];
      const box = parseFloat(selectedOption.getAttribute('data-box')) || 0;
      const cube = parseFloat(selectedOption.getAttribute('data-cube')) || 0;

      let totalPrice = 0;
      if (volume <= 0.1) {
        totalPrice = box;
      } else {
        let cubesCount = volume;
        totalPrice = cubesCount * cube;
      }

      if (weight > 500) {
        const extraWeight = weight - 500;
        totalPrice += extraWeight * 4;
      }

      const totalBlock = document.querySelector('#totalPrice');
      totalBlock.textContent = totalPrice.toFixed(2);
      document.querySelector('.item-total').classList.add('show');
      document.querySelector('#to-request').classList.add('show')
    }

    function updateBoxVolume() {
      const lengthInput = document.querySelector('input[name="length-box"]');
      const widthInput = document.querySelector('input[name="width-box"]');
      const heightInput = document.querySelector('input[name="height-box"]');

      const length = parseFloat(lengthInput.value) || 0;
      const width = parseFloat(widthInput.value) || 0;
      const height = parseFloat(heightInput.value) || 0;
      if (length > 0 && width > 0 && height > 0) {
        let volume = length * width * height;

        volume = Math.ceil(volume * 1000) / 1000;

        const volumeInput = document.querySelector('input.form-control.size-control.width-control');
        volumeInput.value = volume.toFixed(3);

      }
    }

    document.querySelector('input[name="length-box"]').addEventListener('input', updateBoxVolume);
    document.querySelector('input[name="width-box"]').addEventListener('input', updateBoxVolume);
    document.querySelector('input[name="height-box"]').addEventListener('input', updateBoxVolume);


    // Функция проверки выбранного города
    function checkCitySelection(citySelect) {
      if (citySelect.value === "none") {
        citySelect.parentNode.classList.add("error-city");
        // console.log("Пожалуйста, выберите город назначения.");
        return false;
      } else {
        citySelect.parentNode.classList.remove("error-city");
        return true;
      }
    }


    // Функция для расчета объема типа "Куб"
    function calculateCubeVolume() {
      const cubeInputs = document.querySelectorAll('#cube-block .form-control');

      if (!checkRequiredFields(cubeInputs)) {
        return;
      }

      const countCube = parseFloat(document.querySelector('input[name="count-cube"]').value) || 0;
      const citySelect = document.querySelector('select[name="city-appointments"]');

      if (!checkCitySelection(citySelect)) {
        return;
      }

      const selectedOption = citySelect.options[citySelect.selectedIndex];
      const cubePrice = parseFloat(selectedOption.getAttribute('data-cube')) || 0;

      let sumObject = (countCube * cubePrice).toFixed(2);

      const weightCube = parseFloat(document.querySelector('input[name="weight-cube"]').value) || 0;
      const maxWeight = Math.ceil((countCube / 0.1) * 40);

      if (weightCube > maxWeight) {
        let excessWeight = weightCube - maxWeight;
        let additionalCost = excessWeight * 4;
        sumObject = parseFloat((parseFloat(sumObject) + additionalCost)).toFixed(2);
      }

      const blockTotal = document.querySelector('#totalPrice');
      blockTotal.textContent = `${sumObject} руб.`;
      document.querySelector('.item-total').classList.add('show');
      document.querySelector('#to-request').classList.add('show');
    }

    // Функция для расчета объема типа "Паллет"
    function calculatePalletVolume() {
      const countPalletInput = document.querySelector('input[name="count-pallet"]');
      const weightPalletInput = document.querySelector('input[name="weight-pallet"]');

      const palletInputs = document.querySelectorAll('#pallet-block .form-control');

      if (!checkRequiredFields(palletInputs)) {
        return;
      }

      const countPallet = Math.ceil(parseFloat(countPalletInput.value) || 0);
      const citySelect = document.querySelector('select[name="city-appointments"]');

      if (!checkCitySelection(citySelect)) {
        return;
      }

      const selectedOption = citySelect.options[citySelect.selectedIndex];
      const pallet = parseFloat(selectedOption.getAttribute('data-pallet')) || 0;

      let sumObject = (countPallet * pallet).toFixed(2);

      const weightPallet = Math.ceil(parseFloat(weightPalletInput.value) || 0);
      const maxWeight = countPallet * 500;

      if (weightPallet > maxWeight) {
        let excessWeight = weightPallet - maxWeight;
        let additionalCost = excessWeight * 4;
        sumObject = parseFloat((parseFloat(sumObject) + additionalCost)).toFixed(2);
      }

      const blockTotal = document.querySelector('#totalPrice');
      blockTotal.textContent = `${sumObject} руб.`;
      document.querySelector('.item-total').classList.add('show');
      document.querySelector('#to-request').classList.add('show');
    }


    calcButton.addEventListener("click", e => {
      e.preventDefault();

      const selectedType = document.querySelector('input[name="calculator-type"]:checked').value;

      if (selectedType === "cube") {
        calculateCubeVolume();
      }
      if (selectedType === "pallet") {
        calculatePalletVolume();
      }
      if (selectedType === "box") {
        calculateBoxVolume();
      }

    });

    const countPalletInput = document.querySelector('input[name="count-pallet"]');
    const weightPalletInput = document.querySelector('input[name="weight-pallet"]');

    countPalletInput.addEventListener('input', calculatePalletVolume);
    weightPalletInput.addEventListener('input', calculatePalletVolume);

    const countCubeInput = document.querySelector('input[name="count-cube"]');
    const weightCubeInput = document.querySelector('input[name="weight-cube"]');

    countCubeInput.addEventListener('input', calculateCubeVolume);
    weightCubeInput.addEventListener('input', calculateCubeVolume);

    const lengthBoxInput = document.querySelector('input[name="length-box"]');
    const widthBoxInput = document.querySelector('input[name="width-box"]');
    const heightBoxInput = document.querySelector('input[name="height-box"]');
    const weightBoxInput = document.querySelector('input[name="weight-box"]');

    lengthBoxInput.addEventListener('input', calculateBoxVolume);
    widthBoxInput.addEventListener('input', calculateBoxVolume);
    heightBoxInput.addEventListener('input', calculateBoxVolume);
    weightBoxInput.addEventListener('input', calculateBoxVolume);

    $('select[name="city-appointments"]').on('change', () => {
      const selectedType = document.querySelector('input[name="calculator-type"]:checked').value;

      if (selectedType === "cube") {
        calculateCubeVolume();
      }
      if (selectedType === "pallet") {
        calculatePalletVolume();
      }
      if (selectedType === "box") {
        calculateBoxVolume();
      }
    });

  }

  const buttonSendData = document.getElementById('to-request');
  if (buttonSendData) {
    buttonSendData.addEventListener('click', function (e) {
      e.preventDefault();
      const form = document.querySelector('.calculator-form');
      const formData = new FormData(form);

      const totalPrice = document.getElementById('totalPrice').textContent;
      formData.append('totalPrice', totalPrice);

      if (formData) {
        sendDataToServer(formData, form);
      }
    });

    async function sendDataToServer(formData, form) {
      console.log("Отправка данных на сервер..., ", form.action);
      try {
        const response = await fetch('form.action', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          document.getElementById('responseMessage').textContent = 'Сообщение доставлено.';
        } else {
          document.getElementById('responseMessage').textContent = 'Ошибка доставки сообщения.';
        }
      } catch (error) {
        console.error("Ошибка:", error);
        console.log("Не удалось отправить данные. Проверьте подключение к серверу.");
      }
    }
  }

});
