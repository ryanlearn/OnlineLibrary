 app.filter('rounddown', function(){
     return function (int) {
        
        return Math.floor(Number(int));

    };
 });

 app.filter('iif', function () {
   return function(input, trueValue, falseValue) {
        return input ? trueValue : falseValue;
   };
});


app.filter('length', function(){
 	return function (text) {
    	return String(text.length);
	};
});

app.filter('truncate', function () {
    return function (text, length, end) {
        if (isNaN(length))
            length = 10;

        if (end === undefined)
            end = "...";

        if (text.length <= length || text.length - end.length <= length) {
            return text;
        }
        else {
            return String(text).substring(0, length-end.length) + end;
        }

    };
});

app.filter('makeNumber', function(){
    return function(text){
        return Number(text);
    }
});

app.filter('pos', function(){
    return function(num){
        return Math.abs(num);
    }
});

app.filter('noDecimal', function(){
    /* 

    or use string.split('.') (en)
           string.split(',') (fr)
    then assign to variable, which becomes array
    array[0] is your non decimal

    */

    return function(text, lang){
        if (lang == 'fr'){
             return parseInt(text);
        } else {
             return parseInt(text);
        }
    }
});