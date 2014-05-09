xml-to-js
=========

The object of this module is to provide a direct translation of XML into a JavaScript object. The input paramaters are fairly strict which I'm hoping will result in a straight-forward and lightning fast, is somewhat specialized, module. The XML can only contain "container" tags and key value tags, for example:

    var x = '<maps><china><ancient><map1>changsha</map1><map2>xian</map2></ancient><modern><map1>Shanghai</map1></modern></china></maps>';

The main function is xmlToJs which is used thusly:

    var makeObject = require('xml-to-js').xmlToJs;

    makeObject(x, function(object) {
      console.log(object);
      res.render('index');
	    })

Which renders the following object:

{ maps: { 
    china: { 
        ancient: { 
            map1: 'Changsha', 
            map2: 'xian'
            }, 
        modern: { 
            map1: 'Shanghai' 
            } 
        } 
      } 
    }

Note that this object is not JSON, so dot notation is possible, thus

    object.maps.china.ancient
    
    //=> { map1: 'Changsha', map2: 'xian' }

    
