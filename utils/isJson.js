function isJSON(str) {
	if (typeof str == 'string') {
	    try {
          var obj=JSON.parse(str);
          return true
	
	    } catch(e) {
	        return false;
	    }
	}
}

export default isJSON