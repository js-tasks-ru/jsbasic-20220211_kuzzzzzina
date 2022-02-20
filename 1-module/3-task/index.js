let str = 'вася'

function ucFirst(str) {
  if (!str) {
    return str
  }
    return( str[0].toUpperCase() + str.slice(1) );
}

//проверка
ucFirst(' ');
ucFirst('вася');
ucFirst('в');
