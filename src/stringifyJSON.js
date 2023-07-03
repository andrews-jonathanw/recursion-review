// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

//input: string, array, object, number, boolean, null, function, undefined, literally anything

//output: is a string of the input, but literally all of it, including brackets and braces

//constraints: must use recursion

//edgecases: array(they are technically objects), nested arrays and objects, null vs undefined


var stringifyJSON = function(obj) {
//psudocode

  var result = [];
  //create an innerfunction that takes obj
  // variable for the object type
  var innerfunction = function(obj) {
    var inputType = typeof obj;
    // console.log({inputType, obj});

    if (inputType === 'number' || inputType === 'boolean') {
      result.push(obj.toString());
    }
    if ( inputType === 'string') {
      result.push('"' + obj + '"');
    }

    if (Array.isArray(obj)) {
      if (obj.length === 0) {
        result.push('[]');
      } else {
        obj.forEach(function(input, index) {
          if ( index === 0) {
            result.push('[');
          }
          if (index < obj.length && index > 0 ) {
            result.push(',');
          }
          innerfunction(input);
        });
        result.push(']');
      }
    }

    if ( obj === null) {
      result.push('null');
    } else if (inputType === 'object' && !Array.isArray(obj)) {
      //create an array to hold keys
      var objKeys = Object.keys(obj);
      //check if obj is empty
      if (objKeys.length === 0) {
        result.push('{}');
      }
      //iterate through the keys
      for (var key in obj) {
        if (objKeys[0] === key) {
          result.push('{');
        }
        //create variable to hold value of key in obj
        var value = obj[key];
        innerfunction(key);
        result.push(':');
        innerfunction(value);
        //check if key is the last key in array containg keys
        //if true push closing bracket otherwise push comma to result array
        if (objKeys[objKeys.length - 1] === key) {
          result.push('}');
        } else {
          result.push(',');
        }
      }
    }
  };
  innerfunction(obj);
  var stringified = result.join('');
  return stringified;
};
