function truncate(str, maxlength) {
  if(str.length > maxlength) {
    return ( str.slice(0, maxlength - 1) + "…" );
  } 
  	return str;
} 


truncate("Вот, что мне хотелось бы сказать на эту тему: eghfnfh", 20);