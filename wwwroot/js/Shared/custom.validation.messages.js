jQuery.extend(jQuery.validator.messages, {
    required: "Поле обязательно для заполнения",
    remote: "Исправьте это поле",
    email: "Неверный электронный адрес",
    url: "Неверная ссылка",
    date: "Неверное значение даты",
    dateISO: "Неверное значение даты (ISO)",
    number: "Неверное число",
    digits: "Для ввода разрешены только цифры",
    equalTo: "Повторите ввод еще раз",
    maxlength: $.validator.format( "Нельзя ввести больше {0} символов" ),
    minlength: $.validator.format( "Нельзя ввести меньше {0} символов" ),
    rangelength: $.validator.format( "Введите строку длиной от {0} до {1} символов" ),
    range: $.validator.format( "Введите значение в диапазоне от {0} до {1}" ),
    max: $.validator.format( "Введите значение не больше, чем {0}" ),
    min: $.validator.format( "Введите значение не меньшее, чем {0}" ),
    step: $.validator.format( "Введите несколько {0}" )
});