xml-to-js
=========

The object of this module is to provide a direct translation of XML into a JavaScript object. The input paramaters are fairly strict which I'm hoping will result in a straight-forward and lightning fast, is somewhat specialized, module. The XML can only contain "container" tags and key value tags, for example:

    var x = '<maps><china><ancient><map1>changsha</map1><map2>xian</map2></ancient><modern><map1>Shanghai</map1></modern></china></maps>';

The main function is xmlToJs which is used thusly:

    var makeObject = require('xml-to-js').xmlToJs;

    makeObject(x, function(object) {
      console.log(object);
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

The function rawData spits out the data used to make the object and populate it's key-value fields, it returns an object with an "index" property that contains all the container data, and a "values" property that contains the key-value data:

    var getData = require('xml-to-js').rawData;
    
    getData(x, function(data) {
      console.log(data.index);
      res.render('index');
    })
    
    //=>{ index: [ [ { value: 'maps', parent: undefined } ],[ { value: 'china', parent: 'maps' } ],[ { value: 'ancient', parent: 'china' },{ value: 'modern', parent: 'china' } ] ],values: [ { level: 3, key: 'map1', parent: 'ancient', value: 'changsha' }, { level: 3, key: 'map2', parent: 'ancient', value: 'xian' },{ level: 3, key: 'map1', parent: 'modern', value: 'shanghai' } ] }

If for some reason you want to obtain an empty object, that is, a JS object without the key-value pairs contained in the XML, use the emptyObject function:

    var emptyObject = require('xml-to-js').emptyObject;
    
    emptyObject(x, function(object) {
      console.log(object);
    })
    
    //=> { maps: { china: { ancient: {}, modern: {} } } }

TODO: Modify the functions to return an array of objects for XML objects with multiple root nodes.

    
