xml-to-js
=========
<img src='https://travis-ci.org/incrediblesound/xml-to-js.svg?branch=master'></img>

<strong>New in 0.0.5</strong> Added support for empty spaces and the following characters where they occur as content between tags: ! ? ( ) - . & % @ : $     
The following value type will no longer cause an error: !i-hate $not?@snide.com     

The object of this module is to provide a direct translation of XML into a JavaScript object. The input paramaters are fairly strict which I'm hoping will result in a straight-forward and lightning fast, if somewhat specialized, module. The XML can only contain "container" tags and key value tags, for example:

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

If your XML object has multiple root nodes you can use xmlToJsArray to return an array of objects for each root node:

    var xml = '<people><john><place>2</place></john><mary><place>1</place></mary></people><things><cleanup>broom</cleanup><records>penpaper</records></things>'

    var makeObjectArray = require('xml-to-js').xmlToJsArray;

    makeObjectArray(xml, function (object) {
    console.log(object);
    })

    //=> [ { people: { john: { place: '2' }, mary: { place: '1' } } }, { things: { cleanup: 'broom', records: 'penpaper' } } ]
    
