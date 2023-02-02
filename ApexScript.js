var objs = []; // we'll store the object references in this array

function walkTheObject( obj ) {
    var keys = Object. getOwnPropertyNames( obj ); // get all own property names of the object

    keys.forEach( function ( key ) {
        var value = obj[ key ]; // get property value

        // if the property value is an object...
        if ( value && typeof value === 'object' ) { 

            // if we don't have this reference...
            if ( objs.indexOf( value ) < 0 ) {
                objs.push( value ); // store the reference
                walkTheObject( value ); // traverse all its own properties
            } 

        }
    });
}

walkTheObject( globalThis ); // start with the global object
