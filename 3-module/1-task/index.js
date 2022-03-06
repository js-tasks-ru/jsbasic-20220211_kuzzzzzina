let vasya = { name: 'Вася', age: 25 };
let petya = { name: 'Петя', age: 30 };
let masha = { name: 'Маша', age: 28 };

let users = [ vasya, petya, masha ];

//let names = users.map(item => item.name); 
        
/*let names = users.map( function (item) {
  	return item.name
});  */  
      

function namify(users) {
	return users.map(user => user.name)
   }
   
let names = namify(users);  
   

  